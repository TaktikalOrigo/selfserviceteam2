// IE doesn’t have trunc.
// tslint:disable-next-line:only-arrow-functions
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

// (5000000, ",") => 5,000,000
function withDecimals(amount: number, decimal = ".", thousands = ",") {
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

const formatters = {
  isk: (amount: number) => `${withDecimals(amount)} kr.`,
  // [Currency.USD]: amount => `$${withDecimals(amount, ",")}`,
};

export default function formatCurrency(
  amount: number,
  currency: keyof typeof formatters = "isk",
): string {
  if (typeof formatters[currency] !== "function") {
    throw new Error(`No formatter defined for currency: '${currency}'.`);
  }

  return formatters[currency](amount);
}
