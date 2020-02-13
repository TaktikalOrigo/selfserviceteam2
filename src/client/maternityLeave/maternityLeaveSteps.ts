import { addDays, startOfDay } from "date-fns";
import { Step, StepComponentProps } from "~/client/components/stepManager/StepManager";
import { MaternityLeaveAuth } from "~/client/maternityLeave/steps/Auth";
import { MaternityLeaveDataAgreement } from "~/client/maternityLeave/steps/DataAgreement";
import { MaternityLeaveDateOfBirth } from "~/client/maternityLeave/steps/DateOfBirth";
import { MaternityLeaveTimePeriods } from "~/client/maternityLeave/steps/TimePeriods";
import { TimePeriod } from "~/types";
import { DAYS_PER_MONTH } from "~/constants";

interface MaternityLeaveFields {
  name: string;
  ssn: string;
  email: string;
  phoneNumber: string;
  bankNumber: string;
  expectedDateOfBirth: Date | null;
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
  {
    name: "timePeriods",
    component: MaternityLeaveTimePeriods,
    beforeEnter: async state => {
      const startDate = state.expectedDateOfBirth || startOfDay(new Date());
      return {
        timePeriods: state.timePeriods.length
          ? state.timePeriods
          : [{ startDate, endDate: addDays(startDate, DAYS_PER_MONTH * 3 - 1) }],
      };
    },
  },
];
