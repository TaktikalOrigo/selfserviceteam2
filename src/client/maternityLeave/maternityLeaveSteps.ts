import { Step, StepComponentProps } from "~/client/components/stepManager/StepManager";
import { MaternityLeaveAuth } from "~/client/maternityLeave/steps/Auth";
import { MaternityLeaveDataAgreement } from "~/client/maternityLeave/steps/DataAgreement";
import { MaternityLeaveDateOfBirth } from "~/client/maternityLeave/steps/DateOfBirth";

interface TimePeriod {
  startDate: string; // yyyy/mm/dd
  endDate: string; // yyyy/mm/dd
}

interface MaternityLeaveFields {
  name: string;
  ssn: string;
  email: string;
  phoneNumber: string;
  bankNumber: string;
  expectedDateOfBirth: string; // yyyy/mm/dd
  personalTaxCreditUsagePercent: number; // 0 - 100
  union: string;
  pensionFund: string;
  personalFundContribution: 0 | 2 | 4;
  monthsOfLeaveAvailable: number;
  timePeriods: TimePeriod[];
  hasEmployeeAccepted: boolean;
  hasGovernmentAccepted: boolean; // Vinnumálastofnun
}

export type MaternityLeaveProps = StepComponentProps<MaternityLeaveFields>;

export const maternityLeaveSteps: Step<MaternityLeaveFields>[] = [
  {
    name: "auth",
    component: MaternityLeaveAuth,
  },
  {
    name: "dataAgreement",
    component: MaternityLeaveDataAgreement,
  },
  {
    name: "dateOfBirth",
    component: MaternityLeaveDateOfBirth,
  },
];
