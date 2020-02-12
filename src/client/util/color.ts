// From https://codepen.io/jreyesgs/pen/yadmge

const addLight = (hex: string, amount: number) => {
  let cc = parseInt(hex, 16) + amount;
  let c: string | number = cc > 255 ? 255 : cc;
  c = c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
  return c;
};

const subtractLight = (hex: string, amount: number) => {
  let cc = parseInt(hex, 16) - amount;
  let c: string | number = cc < 0 ? 0 : cc;
  c = c.toString(16).length > 1 ? c.toString(16) : `0${c.toString(16)}`;
  return c;
};

export const lightenColor = (hex: string, amount: number) => {
  hex = hex.indexOf("#") >= 0 ? hex.substring(1, hex.length) : hex;
  amount = Math.floor((255 * amount) / 100);
  return (hex = `#${addLight(hex.substring(0, 2), amount)}${addLight(
    hex.substring(2, 4),
    amount,
  )}${addLight(hex.substring(4, 6), amount)}`);
};

export const darkenColor = (hex: string, amount: number) => {
  hex = hex.indexOf("#") >= 0 ? hex.substring(1, hex.length) : hex;
  amount = Math.floor((255 * amount) / 100);
  return (hex = `#${subtractLight(hex.substring(0, 2), amount)}${subtractLight(
    hex.substring(2, 4),
    amount,
  )}${subtractLight(hex.substring(4, 6), amount)}`);
};
