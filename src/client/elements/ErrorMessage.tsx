import React from "react";

import { MarginProps, createMarginClassName } from "~/client/util/createMarginClassName";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import styles from "~/client/elements/ErrorMessage.styles";

const ExclamationCircleIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 16C12.418 16 16 12.4183 16 8C16 3.58173 12.418 0 8 0C3.58203 0 0 3.58173 0 8C0 12.4183 3.58203 16 8 16ZM8 3C7.44727 3 7 3.44769 7 4V9C7 9.55231 7.44727 10 8 10C8.55273 10 9 9.55231 9 9V4C9 3.44769 8.55273 3 8 3ZM8 13C8.55273 13 9 12.5523 9 12C9 11.4477 8.55273 11 8 11C7.44727 11 7 11.4477 7 12C7 12.5523 7.44727 13 8 13Z"
    />
  </svg>
);

const s = compileStaticStylesheet(styles);

interface Props extends MarginProps {
  align?: "left" | "center" | "right";
  active?: boolean;
  message: string;
  icon?: JSX.Element;
}

export function ErrorMessage(props: Props) {
  const { message, active } = props;
  if (typeof active === "boolean" && !active) {
    return null;
  }

  if (!message) {
    return null;
  }

  const alignDirection = props.align;
  const marginClassName = createMarginClassName(props);

  return (
    <div className={s("container", { [`align-${alignDirection}`]: !!alignDirection })}>
      <div className={s("wrapper") + ` ${marginClassName}`}>
        <div className={s("errorMessage")}>
          <i className={s("errorMessage__icon")}>{props.icon || <ExclamationCircleIcon />}</i>
          <span className={s("errorMessage__label")}>{message}</span>
        </div>
      </div>
    </div>
  );
}
