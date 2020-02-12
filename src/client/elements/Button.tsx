import React, { ReactNode } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import {
  MarginProps,
  createMarginClassName,
  removeMarginProps,
} from "~/client/util/createMarginClassName";
import { LoadingIcon } from "~/client/icon/LoadingIcon";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import styles from "./Button.styles";

type ExtendProps = MarginProps & React.HTMLProps<HTMLButtonElement>;
export interface ButtonProps extends ExtendProps {
  children?: ReactNode;
  primary?: boolean;
  secondary?: boolean;
  small?: boolean;
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
  loading?: boolean;
  iconLeft?: JSX.Element | null;
  iconLeftKey?: string;
  type?: "submit" | "button" | "reset";
  align?: "left" | "center" | "right";
  inline?: boolean;
}

const s = compileStaticStylesheet(styles);

export const Button: React.FC<ButtonProps> = props => {
  const {
    children,
    primary = false,
    secondary = false,
    small = false,
    loading = false,
    disabled = false,
    fullWidth = false,
    inline = false,
    className,
    iconLeft,
    iconLeftKey,
    onClick,
    ...rest
  } = props;

  const alignDirection = props.align || "left";
  const marginClassName = createMarginClassName(props);
  const filteredProps = removeMarginProps(rest);

  return (
    <div
      className={s("wrapper", {
        inline: inline && !fullWidth,
        [alignDirection]: !inline,
      })}
    >
      <button
        disabled={disabled}
        className={
          (marginClassName ? marginClassName + " " : "") +
          s("button", {
            primary,
            disabled,
            "full-width": fullWidth,
          }) +
          (className ? " " + className : "")
        }
        onClick={e => (!disabled && !loading && onClick ? onClick(e) : null)}
        tabIndex={0}
        {...filteredProps}
      >
        <div className={s("button__focus")} tabIndex={-1}>
          <div className={s("label", { "icon-left": !!iconLeft })}>
            <div className={s("icon", { left: true })}>
              <TransitionGroup>
                <CSSTransition
                  key={iconLeftKey || "default"}
                  timeout={390}
                  classNames={{
                    enterActive: s("enterActive"),
                    exitActive: s("exitActive"),
                  }}
                >
                  <div data-icon-wrapper className={s("iconWrapper")}>
                    {iconLeft}
                  </div>
                </CSSTransition>
              </TransitionGroup>
            </div>
            <div className={s("content")}>
              <div className={s("content__loader", { active: loading })}>
                <LoadingIcon />
              </div>
              <div className={s("content__text", { active: !loading })}>{children}</div>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};
