import React, { useRef, useState, useEffect } from "react";

import { inputTypeToInputProps, TextFieldType } from "~/constants";
import {
  MarginProps,
  computeMargin,
  marginsToClassName,
  removeMarginProps,
} from "~/client/util/createMarginClassName";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import styles from "./Textfield.styles";
import { getFieldError } from "~/common/util/form/getFieldError";
import TextFieldIcon from "~/client/elements/TextfieldIcon";
import Input from "~/client/elements/Input";

const DEFAULT_MARGIN_BOTTOM = 40;
const DEFAULT_MESSAGE_MARGIN_BOTTOM = 16;
const MESSAGE_ACTIVE_THRESHOLD = 16; // Messages are 22 at the lowest if active

const s = compileStaticStylesheet(styles);

const masks: Partial<{ [key in TextFieldType]: Array<RegExp | string> }> = {
  phone: [/\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/],
  ssn: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/],
  bankNumber: [/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
};

type ExtendProps = React.InputHTMLAttributes<HTMLInputElement> & MarginProps;
interface Props extends ExtendProps {
  type?: TextFieldType;
  label?: string;
  loading?: boolean;
  value?: string;
  defaultValue?: string;
  iconLeft?: JSX.Element;
  iconLeftKey?: string;
  errorMessage?: string;
  successMessage?: string;
  showSuccessIcon?: boolean;
  messageMarginBottom?: number;
  inputKey?: string;
  maxWidth?: number;
  showValueError?: boolean;
  align?: "left" | "center" | "right";
}

export const Textfield: React.FC<Props> = (props: Props) => {
  const messages = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const marginBottomEl = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
  const [value, setValue] = useState(props.defaultValue || "");
  const [error, setError] = useState("");
  const [hasChanged, setHasChanged] = useState(false);
  const [hasBlurredAfterChange, setHasBlurredAfterChange] = useState(false);

  const type = props.type || "text";

  useEffect(() => {
    setError(getFieldError(type, value, { required: props.required }));
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (!messages.current || !marginBottomEl.current) {
        return;
      }

      const messageMarginBottom =
        typeof props.messageMarginBottom === "number"
          ? props.messageMarginBottom
          : DEFAULT_MESSAGE_MARGIN_BOTTOM;

      const margin = computeMargin(props, { bottom: DEFAULT_MARGIN_BOTTOM });

      const marginBottom = margin.bottom || 0;

      const messageScrollHeight = messages.current.scrollHeight;
      const messageHeight =
        messageScrollHeight > MESSAGE_ACTIVE_THRESHOLD
          ? messageScrollHeight + messageMarginBottom
          : 0;

      const newMarginBottom = Math.max(messageHeight, marginBottom);
      const currentHeight = parseInt(marginBottomEl.current.style.marginBottom || "0", 10);

      if (newMarginBottom !== currentHeight) {
        marginBottomEl.current.style.marginBottom = newMarginBottom + "px";
      }
    });
  });

  const {
    label,
    required,
    loading,
    iconLeft,
    iconLeftKey,
    successMessage,
    showSuccessIcon,
    errorMessage,
    className,
    messageMarginBottom,
    align,
    maxWidth,
    showValueError,
    ...rest
  } = props;

  const inputProps = removeMarginProps(rest);

  const showError = errorMessage ? true : !!(error && (hasBlurredAfterChange || showValueError));
  const showSuccessMessage = !!(!showError && successMessage);
  const showSuccess = !!((showSuccessMessage || showSuccessIcon) && !showError);

  const margin = computeMargin(props, { bottom: DEFAULT_MARGIN_BOTTOM });

  const marginBottom = margin.bottom || 0;
  margin.bottom = 0;

  const marginClassName = marginsToClassName(margin);
  const alignDirection = align || "left";

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasChanged) {
      setHasChanged(true);
    }

    if (typeof props.onChange === "function") {
      props.onChange(e);
    }

    const { value } = e.currentTarget;
    const error = getFieldError(type, value, { required: !!props.required });

    setValue(value);
    setError(error);
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!hasBlurredAfterChange && hasChanged) {
      setHasBlurredAfterChange(true);
    }

    if (typeof props.onBlur === "function") {
      props.onBlur(e);
    }
  };

  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    if (hasBlurredAfterChange && !error) {
      setHasBlurredAfterChange(false);
    }

    if (typeof props.onFocus === "function") {
      props.onFocus(e);
    }
  };

  const getValue = (): string => {
    return typeof props.value === "undefined" ? value : props.value;
  };

  return (
    <div
      className={
        (marginClassName ? `${marginClassName} ` : "") +
        s("container", { [`align-${alignDirection}`]: true }) +
        (className ? ` ${className}` : "")
      }
    >
      <label style={typeof maxWidth === "number" ? { maxWidth } : {}}>
        {typeof label === "string" && <div className={s("label")}>{label}</div>}
        <div className={s("contentWrapper")}>
          {iconLeft ? <TextFieldIcon icon={iconLeft} direction="left" /> : null}
          <div
            className={s("inputWrapper", {
              "icon-left": !!iconLeft,
              "icon-right": loading || showError || showSuccess,
            })}
          >
            <Input
              {...inputTypeToInputProps[type]}
              {...inputProps}
              value={getValue()}
              onChange={onChange}
              onBlur={onBlur}
              onFocus={onFocus}
              mask={masks[type]}
            />
          </div>
          <TextFieldIcon
            loading={!!loading}
            error={showError}
            success={showSuccess}
            direction="right"
          />
        </div>
        <div className={s("messageContainer")}>
          <div className={s("margin")} ref={marginBottomEl} style={{ marginBottom }} />
          <div className={s("messageWrapper")} ref={messages}>
            <div className={s("message", { error: true, active: showError })}>
              {errorMessage || error}
            </div>
            <div className={s("message", { success: true, active: showSuccessMessage })}>
              {successMessage}
            </div>
          </div>
        </div>
      </label>
    </div>
  );
};
