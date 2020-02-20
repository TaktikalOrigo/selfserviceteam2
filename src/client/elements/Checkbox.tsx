import React, { useState } from "react";
import { useStylesheet } from "@taktikal/stylesheets";
import styles from "./Checkbox.styles";

interface Props extends React.HTMLProps<HTMLInputElement> {
  label: string;
  testId?: string;
}

const Checkbox: React.FC<Props> = props => {
  const s = useStylesheet(styles);

  const { label, testId, ...rest } = props;
  const [checked, setChecked] = useState(props.defaultChecked || false);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (typeof props.onChange === "function") {
      props.onChange(e);
    }

    setChecked(e.currentTarget.checked);
  };

  const isChecked = typeof props.checked === "boolean" ? props.checked : checked;

  return (
    <label className={s("label")} htmlFor="hidden-checkbox" data-testid={testId}>
      <div className={s("container")}>
        <input
          {...rest}
          tabIndex={0}
          type="checkbox"
          className={s("visibleInput")}
          onChange={onChange}
        />
        <div className={s("box", { checked: isChecked })}>
          <div className={s("fillWrapper", { checked: isChecked })}>
            <div className={s("fill")} />
          </div>
        </div>
        <div className={s("inputContainer")}>
          <input
            {...rest}
            id="hidden-checkbox"
            tabIndex={-1}
            type="checkbox"
            className={s("hiddenInput")}
            onChange={onChange}
          />
        </div>
      </div>
      <span className={s("text")}>{label}</span>
    </label>
  );
};

export default Checkbox;
