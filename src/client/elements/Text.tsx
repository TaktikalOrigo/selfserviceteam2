import React from "react";
import { MarginProps, createMarginClassName } from "~/client/util/createMarginClassName";
import styles from "./Text.styles";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";

const defaultMarginBottom = {
  body: 16,
};

const s = compileStaticStylesheet(styles);

interface Props extends MarginProps {
  id?: string;
  type?: "body";
  maxWidth?: number;
  align?: "left" | "center" | "right";
  children?: React.ReactNode;
}

export const Text: React.FC<Props> = (props: Props) => {
  const type = props.type || "body";
  const Tag = "p";
  const alignDirection = props.align || "left";
  const marginClassName = createMarginClassName(props, {
    bottom: defaultMarginBottom[type],
  });
  return (
    <div
      className={s("wrapper", {
        [`align-${alignDirection}`]: true,
      })}
    >
      <Tag
        id={props.id}
        className={
          marginClassName +
          " " +
          s("text", {
            alignCenter: alignDirection === "center",
            [type]: true,
          })
        }
        style={props.maxWidth ? { maxWidth: props.maxWidth } : {}}
      >
        {props.children}
      </Tag>
    </div>
  );
};
