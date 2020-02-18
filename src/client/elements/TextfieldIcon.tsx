import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { LoadingIcon } from "~/client/icon/LoadingIcon";
import { ErrorIcon } from "~/client/icon/ErrorIcon";
import { SuccessIcon } from "~/client/icon/SuccessIcon";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import styles from "./TextfieldIcon.styles";

const s = compileStaticStylesheet(styles);

interface Props {
  direction: "left" | "right";
  readonly?: boolean;
  icon?: React.ReactNode;
  loading?: boolean;
  success?: boolean;
  error?: boolean;
}

const TextFieldIcon: React.FC<Props> = (props: Props) => {
  const { loading, success, error, direction, readonly } = props;

  let icon = props.icon;
  let iconKey = "normal";

  if (loading) {
    icon = <LoadingIcon />;
    iconKey = "loading";
  } else if (error) {
    icon = <ErrorIcon />;
    iconKey = "error";
  } else if (success) {
    icon = <SuccessIcon />;
    iconKey = "success";
  }

  return (
    <div className={s("icon", { [direction]: true, readonly: !!readonly })}>
      <TransitionGroup className={s("iconContainer")}>
        {icon && true ? (
          <CSSTransition
            key={iconKey || "default"}
            timeout={380}
            classNames={{
              enterActive: s("enterActive"),
              exitActive: s("exitActive"),
            }}
          >
            <div className={s("iconWrapper")}>{icon}</div>
          </CSSTransition>
        ) : null}
      </TransitionGroup>
    </div>
  );
};

export default TextFieldIcon;
