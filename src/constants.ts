import React from "react";
export const IS_SERVER = typeof window === "undefined";
export const IS_PROD_ENV = process.env.NODE_ENV === "production";
export const IS_DEV_ENV = process.env.NODE_ENV === "development";

export enum PublicEnv {
  SITE_URL = "SITE_URL",
}

export enum PrivateEnv {
  ENVIRONMENT = "ENVIRONMENT",
}

export type TextFieldType = "text" | "email" | "phone" | "ssn";

export interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: Array<string | RegExp>;
}

export const inputTypeToInputProps: Partial<{ [key in TextFieldType]: MaskedInputProps }> = {
  text: {
    name: "text",
    type: "text"
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
  }
}
