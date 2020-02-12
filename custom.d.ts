import "@taktikal/stylesheets";
import express from "express";

declare global {
  export namespace Express {
    /**
     * To extend Express' request object, add properties to the
     * Request interface below.
     */
    export interface Request {
    }
  }
}

declare module "@taktikal/stylesheets" {
  export interface CSSVariables {
    // Dynamic-at-runtime CSS variables go here
  }
}
