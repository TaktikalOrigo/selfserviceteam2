import React from "react";
import MaskedInput from "react-text-mask";
import { useStylesheet } from "@taktikal/stylesheets";
import styles from "./Input.styles";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: Array<string | RegExp>;
}

const Input: React.FC<Props> = (props: Props) => {
  const s = useStylesheet(styles);

  const { mask, ...rest } = props;

  return (
    <>
      {mask ? (
        <MaskedInput className={s("input")} {...rest} mask={mask} guide={false} />
      ) : (
        <input className={s("input")} {...rest} />
      )}
    </>
  );
};

export default Input;
