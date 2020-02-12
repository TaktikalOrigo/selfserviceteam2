import { compileStylesheet, StyleParams } from "@taktikal/stylesheets";

interface MarginObject {
  left?: number;
  right?: number;
  top?: number;
  bottom?: number;
}

type Margin = number | MarginObject;

export interface MarginProps {
  margin?: Margin;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
}

const firstUpper = (str: string) => str.toUpperCase().substr(0, 1) + str.substr(1);

/**
 * Utility to remove the margin props when using object spread as props
 * to a Component/Element
 */
export const removeMarginProps = <T extends MarginProps>(props: T) => {
  const { margin, marginBottom, marginLeft, marginRight, marginTop, ...rest } = props;
  return rest;
};

const keys = ["left", "right", "top", "bottom"] as Array<keyof MarginObject>;

export function computeMargin(props: MarginProps, defaultMargin?: Margin) {
  const margin: MarginObject = {};

  if (typeof defaultMargin === "number") {
    keys.forEach(key => {
      margin[key] = defaultMargin;
    });
  } else if (typeof defaultMargin === "object") {
    keys.forEach(key => {
      if (typeof defaultMargin[key] === "number") {
        margin[key] = defaultMargin[key];
      }
    });
  }

  if (typeof props.margin === "number") {
    keys.forEach(key => {
      margin[key] = props.margin as number;
    });
  } else if (typeof props.margin === "object") {
    keys.forEach(key => {
      if (typeof (props.margin as MarginObject)[key] === "number") {
        margin[key] = (props.margin as MarginObject)[key];
      }
    });
  }

  keys.forEach(key => {
    const propKey = `margin${firstUpper(key)}` as
      | "marginLeft"
      | "marginRight"
      | "marginTop"
      | "marginBottom";
    if (typeof props[propKey] === "number") {
      margin[key] = props[propKey];
    }
  });

  return margin;
}

export function marginsToClassName(margin: MarginObject) {
  const s = compileStylesheet(({ css: c }: StyleParams) => {
    const keyArr = Object.keys(margin) as typeof keys;
    return keyArr
      .map(key => {
        return c`margin-${key}: ${margin[key]}px;`;
      })
      .reduce<{ [key: string]: string }>((obj, value, i) => {
        obj[keyArr[i]] = value;
        return obj;
      }, {});
  }, {} as any);

  return Object.keys(margin)
    .map(key => s(key))
    .join(" ");
}

/**
 * Serialize margin props to a className string.
 *
 * @returns empty string if no margin props are provided
 */
export function createMarginClassName(props: MarginProps, defaultMargin?: Margin) {
  const margin = computeMargin(props, defaultMargin);
  return marginsToClassName(margin);
}
