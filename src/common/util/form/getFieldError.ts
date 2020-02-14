import { TextFieldType } from "~/constants";
import { digits } from "~/common/util/form/digits";

const phoneRegex = /^\d{7}$/;
const ssnRegex = /^\d{10}$/;
const bankNumberRegex = /^\d{4}-\d{2}-\d{3}/;
const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const defaultRequiredErrorMessage = "Þessi reitur er nauðsynlegur";

const getError: { [key in TextFieldType]: (value: string) => string } = {
  text: () => "",
  email: (value: string) => (emailRegex.test(value) ? "" : "Þetta er ekki gilt netfang"),
  phone: (value: string) =>
    phoneRegex.test(digits(value)) ? "" : "Símanúmer verður að vera 7 tölustafir",
  ssn: (value: string) =>
    ssnRegex.test(digits(value)) ? "" : "Kennitala verður að vera 10 tölustafir",
  bankNumber: (value: string) =>
    bankNumberRegex.test(value) ? "" : "Bankanúmer er ekki á réttu formi",
};

const requiredErrorMessages: Partial<{ [key in TextFieldType]: string }> = {
  email: "Vinsamlegast sláðu inn netfangið þitt",
  phone: "Vinsamlegast sláðu inn símanúmer",
  ssn: "Vinsamlegast sláðu inn kennitölu",
};

interface Options {
  required?: boolean;
}

/**
 * @returns empty string if no error
 */
export const getFieldError = (type: TextFieldType, value: string, opts: Options = {}): string => {
  const required = opts.required || true;

  if (required && !value) {
    return requiredErrorMessages[type] || defaultRequiredErrorMessage;
  }

  if (!required && !value) {
    return "";
  }

  if (!getError[type]) {
    throw new Error(`No validator defined for field type '${type}'.`);
  }

  return getError[type](value);
};

export const isValueValid = (type: TextFieldType, value: string, opts: Options = {}): boolean =>
  !getFieldError(type, value, opts);
