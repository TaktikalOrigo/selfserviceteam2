// IE doesn’t have trunc.
Math.trunc =
  Math.trunc ||
  function(x) {
    if (isNaN(x)) {
      return NaN;
    }
    if (x > 0) {
      return Math.floor(x);
    }
    return Math.ceil(x);
  };

interface Options {
  decimal: string;
  thousands: string;
  showCurrency: boolean;
}

// (5000000.5, ",", ".") => 5,000,000.5
function withDecimals(amount: number, options: Omit<Options, "showCurrency">) {
  const { decimal, thousands } = options;

  const absValue = Math.trunc(amount);
  const decimalValue = amount - absValue;
  const priceStr = Math.trunc(amount).toString();
  const finalStr = priceStr.replace(/\B(?=(\d{3})+(?!\d))/g, thousands);

  const decimalString =
    decimalValue > 0
      ? decimal +
        decimalValue
          .toFixed(2)
          .toString()
          .replace(/^0./, "")
      : "";

  return finalStr + decimalString;
}

export default function formatCurrency(amount: number, options: Partial<Options> = {}): string {
  const { decimal = ",", thousands = ".", showCurrency = true } = options;

  if (!showCurrency) {
    return withDecimals(amount, { decimal, thousands });
  }

  return `${withDecimals(amount, { decimal, thousands })} kr.`;
}
