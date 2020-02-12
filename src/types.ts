export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;