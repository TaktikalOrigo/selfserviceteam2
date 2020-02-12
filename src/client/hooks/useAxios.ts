import { StandardError, handleError } from "@taktikal/error";
import Axios, { AxiosRequestConfig } from "axios";
import { createAction, ActionType, getType } from "typesafe-actions";
import { useReducer, useEffect, useRef } from "react";
import { resolveAfter } from "~/client/util/animation/resolveAfter";

interface State {
  data: any | null;
  pending: boolean;
  loaded: boolean;
  err: StandardError | null;
}

interface Response<T> {
  data: T;
  pending: boolean;
  loaded: boolean;
  err: StandardError | null;
  refetch: () => void;
  clear: () => void;
}

const actions = {
  resolve: createAction("useAxios/RESOLVE", resolve => {
    return (data: any) => resolve({ data });
  }),
  reject: createAction("useAxios/REJECT", resolve => {
    return (error: any, defaultErrorMessage?: string) => resolve({ error, defaultErrorMessage });
  }),
  pending: createAction("useAxios/PENDING", resolve => {
    return () => resolve({});
  }),
  clear: createAction("useAxios/CLEAR", resolve => {
    return () => resolve({});
  }),
};

type Action = ActionType<typeof actions>;

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case getType(actions.resolve): {
      const { data } = action.payload;
      return {
        ...state,
        data,
        err: null,
        pending: false,
        loaded: true,
      };
    }
    case getType(actions.reject): {
      const { error, defaultErrorMessage } = action.payload;
      const [err] = handleError(error, defaultErrorMessage);
      return {
        ...state,
        data: null,
        err,
        pending: false,
        loaded: false,
      };
    }
    case getType(actions.pending): {
      return {
        ...state,
        data: null,
        err: null,
        pending: true,
        loaded: false,
      };
    }
    case getType(actions.clear): {
      return {
        ...state,
        data: null,
        err: null,
        pending: false,
        loaded: false,
      };
    }
    default:
      return state;
  }
};

export const useAxios = <T>(
  requestConfig: AxiosRequestConfig,
  opts: {
    resolveAfterMs?: number;
    fetchOnMount?: boolean;
    onSuccess?: (data: T) => void;
    initialData?: T;
    defaultErrorMessage?: string;
  } = {},
): Response<T> => {
  const _n = useRef(0);
  const createId = () => {
    _n.current += 1;
    return _n.current.toString();
  };

  const unmounted = useRef(false);
  useEffect(() => {
    return () => {
      unmounted.current = true;
    };
  }, []);

  const fetchOnMount = opts.initialData ? false : opts.fetchOnMount ?? true;
  const { resolveAfterMs = 0, onSuccess, initialData } = opts;

  const [state, dispatch] = useReducer(
    reducer,
    initialData
      ? {
          pending: false,
          err: null,
          data: initialData,
          loaded: true,
        }
      : {
          pending: fetchOnMount,
          err: null,
          data: null,
          loaded: false,
        },
  );

  const latestIdRef = useRef(createId());

  const fetchData = async () => {
    const id = createId();
    latestIdRef.current = id;

    resolveAfter(resolveAfterMs, Axios(requestConfig))
      .then(({ data }) => {
        if (id !== latestIdRef.current || unmounted.current) {
          return;
        }

        dispatch(actions.resolve(data));
        if (onSuccess) {
          onSuccess(data);
        }
      })
      .catch(
        e => id === latestIdRef.current && dispatch(actions.reject(e, opts.defaultErrorMessage)),
      );
  };

  useEffect(() => {
    if (fetchOnMount) {
      fetchData();
    }
  }, []);

  const refetch = () => {
    dispatch(actions.pending());
    fetchData();
  };

  const clear = () => {
    createId();
    dispatch(actions.clear());
  };

  return { ...state, refetch, clear };
};
