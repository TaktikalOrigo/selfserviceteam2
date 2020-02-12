const digitReg = /^\d$/; // Matches a single digit

export const digits = (numString: string) => numString.split("").filter(digit => digitReg.test(digit)).join("");
