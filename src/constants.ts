import React from "react";
export const IS_SERVER = typeof window === "undefined";
export const IS_PROD_ENV = process.env.NODE_ENV === "production";
export const IS_DEV_ENV = process.env.NODE_ENV === "development";

export enum PublicEnv {
  SITE_URL = "SITE_URL",
}

export enum PrivateEnv {
  ENVIRONMENT = "ENVIRONMENT",
  DB_URL = "DB_URL",
  DB_USE_SSL = "DB_USE_SSL",
}

export type TextFieldType = "text" | "email" | "phone" | "ssn" | "bankNumber";

export interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: Array<string | RegExp>;
}

export const inputTypeToInputProps: Partial<{ [key in TextFieldType]: MaskedInputProps }> = {
  text: {
    name: "text",
    type: "text",
  },
  email: {
    name: "email",
    type: "email",
    inputMode: "email",
  },
  phone: {
    name: "phone",
    mask: [/\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/],
    type: "tel",
    inputMode: "numeric",
  },
  ssn: {
    name: "kennitala",
    mask: [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/],
    type: "text",
    inputMode: "numeric",
  },
  bankNumber: {
    name: "bankanumer",
    type: "text",
    inputMode: "numeric",
    mask: [/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
  },
};

// Each months is defined as being 30 days. I'm not sure if this is the technically
// correct way to go about this but I haven't found a better solution.
export const DAYS_PER_MONTH = 30;

export const MONTHS_OF_MATERNITY_LEAVE_PER_PARENT = 3;
export const MONTHS_OF_SHARED_MATERNITY_LEAVE = 3;
