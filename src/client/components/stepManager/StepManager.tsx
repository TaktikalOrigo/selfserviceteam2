import React, { useState, useRef, useEffect } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { handleError } from "@taktikal/error";
import { ErrorBoundary } from "~/client/components/error/ErrorBoundary";
import { GeneralError } from "~/client/components/error/GeneralError";
import { createAction, ActionType, getType } from "typesafe-actions";
import { disableScroll, enableScroll } from "~/client/util/scroll";
import { animate } from "~/client/util/animation/animate";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import styles from "~/client/components/stepManager/StepManager.styles";
import { MaternityLeaveProgressNew } from "~/client/maternityLeave/Progress";

const s = compileStaticStylesheet(styles);

interface GoToStepOptions {
  transitionDirection?: "forward" | "back";
}

export interface StepComponentProps<T> {
  fields: T;
  setFields: (fields: Partial<T>) => void;

  goToStep: (name: string, options?: GoToStepOptions) => void;
  nextStep: (options?: GoToStepOptions) => void;
  prevStep: (options?: GoToStepOptions) => void;

  __goToStepUnsafe__: (name: string, options?: GoToStepOptions) => void;
  __nextStepUnsafe__: (options?: GoToStepOptions) => void;
  __prevStepUnsafe__: (options?: GoToStepOptions) => void;
}
export type StepComponent<T> = React.ComponentType<StepComponentProps<T>>;
export interface Step<T> {
  name: string;
  icon?: React.ReactNode;
  sectionName?: string;
  skipStep?: (fields: T) => boolean;
  beforeEnter?: (fields: T) => Promise<Partial<T>>;
  component: StepComponent<T>;
  hidden?: boolean;
}

export const stepActions = {
  setStepIndex: createAction("step/SET_STEP_INDEX", resolve => {
    return (stepIndex: number) => resolve({ stepIndex });
  }),

  setFields: createAction("step/SET_FIELDS", resolve => {
    return (fields: any) => resolve({ fields });
  }),
};

type Action = ActionType<typeof stepActions>;

export interface StepReducerState<T> {
  stepIndex: number;
  fields: T;
}

export const createInitialStepReducerState = <T extends {}>(
  steps: Step<T>[],
  fields: T,
): StepReducerState<T> => {
  let stepIndex = 0;

  for (; stepIndex < steps.length; stepIndex++) {
    const skipFn = steps[stepIndex].skipStep;
    if (typeof skipFn !== "function" || !skipFn(fields)) {
      break;
    }
  }

  return { stepIndex, fields };
};

export function stepReducer<T>(state: StepReducerState<T>, action: Action): StepReducerState<T> {
  switch (action.type) {
    case getType(stepActions.setStepIndex): {
      const { stepIndex } = action.payload;
      return { ...state, stepIndex };
    }
    case getType(stepActions.setFields): {
      const { fields } = action.payload;
      return { ...state, fields: { ...state.fields, ...fields } };
    }

    default: {
      return state;
    }
  }
}

interface OwnProps<T> {
  layoutComponent: React.ComponentType<{
    children: React.ReactNode;
    stepIndex: number;
    steps: Array<Step<T>>;
  }>;
  steps: Array<Step<T>>;
  initialFields: T;
  scrollContainerToY?: (y: number) => void;
  getContainerScrollY?: () => number;
  onStateChange?: (state: T) => void;
}
type Props<T> = OwnProps<T>;

export const StepManager = <T extends {}>(props: Props<T>) => {
  const getScrollY = () => {
    if (typeof props.getContainerScrollY === "function") {
      return props.getContainerScrollY();
    }
    return window.scrollY;
  };

  const scrollToY = (y: number) => {
    if (typeof props.scrollContainerToY === "function") {
      return props.scrollContainerToY(y);
    }
    return window.scrollTo(0, y);
  };

  const [minStepHeight, setMinStepHeight] = useState(0);

  const setMinStepHeightToCurrentStep = () => {
    const el = document.querySelector("[data-step-index]") as HTMLElement;

    if (!el) {
      setMinStepHeight(0);
      return;
    }

    el.style.minHeight = "";
    const rect = el.getBoundingClientRect();
    setMinStepHeight(rect.height);
  };
  useEffect(() => {
    setMinStepHeightToCurrentStep();
    window.addEventListener("resize", setMinStepHeightToCurrentStep);
    return () => window.removeEventListener("resize", setMinStepHeightToCurrentStep);
  }, []);

  const stateRef = useRef(createInitialStepReducerState(props.steps, props.initialFields));
  const [{ fields, stepIndex }, _setState] = useState(stateRef.current);

  const dispatch = (action: any) => {
    const newState = stepReducer(stateRef.current, action);
    stateRef.current = newState;
    _setState(newState);
  };

  const [showErrorScreen, setShowErrorScreen] = useState(false);
  const [transitionDirection, setTransitionDirection] = useState<"forward" | "back">("forward");

  const StepComponent = props.steps[stepIndex].component;
  const ContentContainer = props.layoutComponent || "div";

  const unsafe__goToStepAtIndex = async (index: number, options: GoToStepOptions = {}) => {
    const nextStep = props.steps[index];
    const { fields, stepIndex } = stateRef.current;

    try {
      if (!nextStep) {
        console.warn(`No step at index ${index}`);
        return;
      }

      if (typeof nextStep.skipStep === "function") {
        const shouldSkipStep = nextStep.skipStep(fields);

        if (shouldSkipStep) {
          unsafe__goToStepAtIndex(index > stepIndex ? index + 1 : index - 1);
          return;
        }
      }

      if (typeof nextStep.beforeEnter === "function") {
        const partialFieldData = await nextStep.beforeEnter(fields);
        dispatch(stepActions.setFields(partialFieldData));

        // Wait for React to rerender
        await new Promise(resolve => setTimeout(resolve));

        props.onStateChange?.(stateRef.current.fields);
      }

      setTransitionDirection(
        options.transitionDirection || (index > stepIndex ? "forward" : "back"),
      );

      await new Promise(resolve => setTimeout(resolve));

      const scrollY = getScrollY();

      dispatch(stepActions.setStepIndex(index));

      requestAnimationFrame(() => {
        disableScroll();
        animate(
          {
            from: scrollY,
            to: 0,
            duration: 550,
            bezier: [0.49, 0.01, 0.08, 0.99],
          },
          scrollToY,
        ).then(() => {
          enableScroll();
          scrollToY(0);
        });
      });
    } catch (e) {
      handleError(e);
      setShowErrorScreen(true);
    }
  };

  const unsafe__goToStepWithName = (name: string, options: GoToStepOptions = {}) => {
    for (let i = 0; i < props.steps.length; i += 1) {
      if (props.steps[i].name === name) {
        unsafe__goToStepAtIndex(i, options);
        return;
      }
    }

    throw new Error(`No step with name '${name}'.`);
  };

  const goToStepWithName = (calleIndex: number, name: string, options: GoToStepOptions = {}) => {
    if (stepIndex !== calleIndex) {
      console.warn(
        `Step at index ${calleIndex} attempted to go to step '${name}'.\n` +
          `Current index is ${stepIndex}.`,
      );
      return;
    }
    unsafe__goToStepWithName(name, options);
  };

  const goToStepAtIndex = (calleIndex: number, index: number, options: GoToStepOptions = {}) => {
    if (stepIndex !== calleIndex) {
      console.warn(
        `Step at index ${calleIndex} attempted to go to step at index ${index}.\n` +
          `Current index is ${stepIndex}.`,
      );
      return;
    }
    unsafe__goToStepAtIndex(index, options);
  };

  const isMovingForward = transitionDirection === "forward";

  return (
    <>
      <MaternityLeaveProgressNew steps={props.steps as any} stepIndex={stepIndex} />
      <div className={s("container")}>
        <TransitionGroup>
          <CSSTransition
            key={stepIndex}
            timeout={550}
            classNames={{
              enterActive: isMovingForward ? s("enterActive") : s("enterActiveBack"),
              exitActive: isMovingForward ? s("exitActive") : s("exitActiveBack"),
            }}
            onEntered={setMinStepHeightToCurrentStep}
          >
            <div
              data-step-index={stepIndex}
              className={s("step")}
              style={{ minHeight: minStepHeight }}
            >
              {showErrorScreen ? (
                <GeneralError />
              ) : (
                <ErrorBoundary FallbackComponent={() => <GeneralError />}>
                  <ContentContainer stepIndex={stepIndex} steps={props.steps}>
                    <StepComponent
                      fields={fields as T}
                      setFields={async _fields => {
                        dispatch(stepActions.setFields(_fields));
                        await new Promise(resolve => setTimeout(resolve));
                        props.onStateChange?.(stateRef.current.fields);
                      }}
                      goToStep={(name, options = {}) => goToStepWithName(stepIndex, name, options)}
                      nextStep={() => goToStepAtIndex(stepIndex, stepIndex + 1)}
                      prevStep={() => goToStepAtIndex(stepIndex, stepIndex - 1)}
                      __goToStepUnsafe__={unsafe__goToStepWithName}
                      __nextStepUnsafe__={(options = {}) =>
                        unsafe__goToStepAtIndex(stepIndex + 1, options)
                      }
                      __prevStepUnsafe__={(options = {}) =>
                        unsafe__goToStepAtIndex(stepIndex - 1, options)
                      }
                    />
                  </ContentContainer>
                </ErrorBoundary>
              )}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  );
};
