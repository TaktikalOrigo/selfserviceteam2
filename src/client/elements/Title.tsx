import React from "react";
import { MarginProps, createMarginClassName } from "~/client/util/createMarginClassName";
import { useStylesheet } from "@taktikal/stylesheets";
import styles from "./Title.styles";

const defaultMarginBottom = {
  h1: 40,
  h2: 32,
  h3: 24,
  h4: 16,
  h5: 16,
  h6: 16,
};

interface Props extends MarginProps {
  heading?: 1 | 2 | 3 | 4 | 5 | 6;
  element?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  align?: "left" | "center" | "right";
  maxWidth?: number;
  children?: React.ReactNode;
}

export const Title: React.FC<Props> = (props: Props) => {
  const heading = props.heading || 1;
  const Tag = ((props.element || `h${heading}`) as typeof props.element)!;
  const alignDirection = props.align || "left";
  const marginClassName = createMarginClassName(props, {
    bottom: defaultMarginBottom[Tag],
  });
  const s = useStylesheet(styles);
  return (
    <div className={s("wrapper", { [`align-${alignDirection}`]: true })}>
      <Tag
        className={`${s("title", { [heading]: true })} ${marginClassName}`}
        style={props.maxWidth ? { maxWidth: props.maxWidth } : {}}
      >
        {props.children}
      </Tag>
    </div>
  );
};
