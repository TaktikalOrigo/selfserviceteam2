import { Application } from "~/server/entities/Application";
import { BaseEntity } from "typeorm";
import { Person } from "~/server/entities/Person";

export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;
export type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
type SubtractKeys<T, U> = { [K in keyof T]: K extends keyof U ? never : K }[keyof T];
export type Subtract<T, U> = { [K in SubtractKeys<T, U>]: T[K] };

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

interface BaseEntityFields {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ApplicationFields = Subtract<Subtract<Application, BaseEntity>, BaseEntityFields>;

export type PersonFields = Subtract<Subtract<Person, BaseEntity>, BaseEntityFields>;
