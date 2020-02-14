import { addDays, startOfDay } from "date-fns";
import { Step, StepComponentProps } from "~/client/components/stepManager/StepManager";
import { MaternityLeaveAuth } from "~/client/maternityLeave/steps/Auth";
import { MaternityLeaveDataAgreement } from "~/client/maternityLeave/steps/DataAgreement";
import { MaternityLeaveDateOfBirth } from "~/client/maternityLeave/steps/DateOfBirth";
import { MaternityLeaveTimePeriods } from "~/client/maternityLeave/steps/TimePeriods";
import { TimePeriod } from "~/types";
import { DAYS_PER_MONTH } from "~/constants";
import { MaternityLeaveConfirmation } from "~/client/maternityLeave/steps/Confirmation";
import { MaternityLeaveComplete } from "~/client/maternityLeave/steps/Complete";
import { CalendarIcon } from "~/client/icon/CalendarIcon";
import { PersonIcon } from "~/client/icon/PersonIcon";
import { PencilIcon } from "~/client/icon/PencilIcon";
import { CheckmarkIcon } from "~/client/icon/CheckmarkIcon";

export interface MaternityLeaveFields {
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
  employerContactName: string;
  employerContactEmail: string;
  hasEmployeeAccepted: boolean;
  hasGovernmentAccepted: boolean; // Vinnumálastofnun
}

export type MaternityLeaveProps = StepComponentProps<MaternityLeaveFields>;

export const maternityLeaveSteps: Step<MaternityLeaveFields>[] = [
  {
    icon: <PersonIcon />,
    sectionName: "Auðkenning",
    name: "auth",
    component: MaternityLeaveAuth,
  },
  {
    icon: <PencilIcon />,
    sectionName: "Upplýsingar",
    name: "dataAgreement",
    component: MaternityLeaveDataAgreement,
  },
  {
    sectionName: "Tímabil",
    icon: <CalendarIcon />,
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
          : [{ startDate, endDate: addDays(startDate, DAYS_PER_MONTH * 4 - 1) }],
      };
    },
  },
  {
    icon: <CheckmarkIcon />,
    sectionName: "Staðfesting",
    name: "confirmation",
    component: MaternityLeaveConfirmation,
  },
  {
    name: "complete",
    component: MaternityLeaveComplete,
  },
];
