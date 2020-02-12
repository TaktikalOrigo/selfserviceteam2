import { ErrorCase } from "@taktikal/error";

export enum Errors {
}

export const globalErrorCases: ErrorCase[] = [
  /**
   * Yup
   */
  {
    test: (e: any) => e && e.name === "ValidationError",
    message: "Innsend gögn eru á vitlausu formi",
    statusCode: 400,
  },

  /**
   * Generic
   */
  {
    test: /^Network Error$/i,
    message: "Gat ekki tengst vefþjóni",
  },
];
