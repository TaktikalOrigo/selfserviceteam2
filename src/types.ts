export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

export interface TestPersonData {
  name: string;
  ssn: string;
  address: string;
  spouseName: string;
  spouseSsn: string;
}

export interface MaternityData {
  personalTaxBreakRate: number;
  salary: number;
  otherSalary: number;
  pensionOptionalPercentage: number;
  jobPercentage: number;
  unionPercentage: number;
  pensionPercentage: number;
}

export interface MaternityResults {
  total: number;
  pension: number;
  pentionOptional: number;
  totalTax: number;
  taxToPay: number;
  union: number;
  userPersonalTaxBreaks: number;
}

export interface TimePeriod {
  startDate: Date | null;
  endDate: Date | null;
}
