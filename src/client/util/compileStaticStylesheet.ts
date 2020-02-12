import { StyleParams, compileStylesheet } from "@taktikal/stylesheets";

export const compileStaticStylesheet = <T extends (params: StyleParams) => any>(stylesheet: T) =>
  compileStylesheet<T>(stylesheet, {});
