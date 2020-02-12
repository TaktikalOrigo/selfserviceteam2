import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useStylesheet } from "@taktikal/stylesheets";
import Input from "~/client/elements/Input";
import styles from "./TextFieldInput.styles";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: Array<string | RegExp>;
  inputKey?: string;
}

export const TextFieldInput: React.FC<Props> = props => {
  const s = useStylesheet(styles);
  const { inputKey, ...rest } = props;

  const input = <Input {...rest} className={s("input")} />;

  if (typeof inputKey === "undefined") {
    return input;
  }

  return (
    <TransitionGroup
      className={s("input", { disabled: !!rest.disabled, readonly: !!rest.readOnly })}
    >
      <CSSTransition
        key={inputKey || "default"}
        timeout={380}
        classNames={{
          enterActive: s("inputEnterActive"),
          exitActive: s("inputExitActive"),
        }}
      >
        {input}
      </CSSTransition>
    </TransitionGroup>
  );
};
