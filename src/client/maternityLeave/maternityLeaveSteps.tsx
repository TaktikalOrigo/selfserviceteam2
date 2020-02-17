import { addDays, startOfDay } from "date-fns";
import { Step, StepComponentProps } from "~/client/components/stepManager/StepManager";
import { MaternityLeaveAuth } from "~/client/maternityLeave/steps/Auth";
import { MaternityLeaveInfo } from "~/client/maternityLeave/steps/Info";
import { MaternityLeaveDateOfBirth } from "~/client/maternityLeave/steps/DateOfBirth";
import { MaternityLeaveTimePeriods } from "~/client/maternityLeave/steps/TimePeriods";
import {
  TimePeriod,
  ApplicationFields,
  ApplicationData,
  MaternityResults,
  ExpectedBirthDate,
} from "~/types";
import { DAYS_PER_MONTH, MONTHS_OF_MATERNITY_LEAVE_PER_PARENT } from "~/constants";
import { MaternityLeaveConfirmation } from "~/client/maternityLeave/steps/Confirmation";
import { MaternityLeaveComplete } from "~/client/maternityLeave/steps/Complete";
import { CalendarIcon } from "~/client/icon/CalendarIcon";
import { PersonIcon } from "~/client/icon/PersonIcon";
import { PencilIcon } from "~/client/icon/PencilIcon";
import { CheckmarkIcon } from "~/client/icon/CheckmarkIcon";
import Axios from "axios";
import { calculate } from "~/server/calculator";

export interface MaternityLeaveFields {
  name: string;
  ssn: string;
  email: string;
  phoneNumber: string;
  bankNumber: string;
  expectedDateOfBirth: Date | null;

  estimationResult: MaternityResults;

  jobPercentage: number;

  // Income
  salary: number;
  otherSalary: number;
  personalTaxBreakRate: number;

  // Union
  unionPercentage: number;

  // Pension
  pensionPercentage: number;

  // Personal fund (séreignarsparnaður)
  personalFundContribution: number;
  monthsOfLeaveAvailable: number;

  timePeriods: TimePeriod[];

  employerContactName: string;
  employerContactEmail: string;

  hasEmployeeAccepted: boolean;
  hasGovernmentAccepted: boolean; // Vinnumálastofnun

  applications: ApplicationFields[];
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
    beforeEnter: async state => {
      const { data, status } = await Axios.get<ApplicationData>(
        `/api/person/${state.ssn}/applicationData`,
        {
          validateStatus: status => status === 200 || status === 404,
        },
      );

      if (status === 404) {
        return {};
      }

      const {
        salary,
        otherSalary,
        jobPercentage,
        pensionPercentage,
        pensionOptionalPercentage,
        unionPercentage,
        personalTaxBreakRate,
      } = data;

      return {
        jobPercentage,
        otherSalary,
        personalFundContribution: pensionOptionalPercentage as 0 | 2 | 4,
        pensionPercentage,
        salary,
        unionPercentage,
        personalTaxBreakRate,
      };
    },
    icon: <PencilIcon />,
    sectionName: "Upplýsingar",
    name: "info",
    component: MaternityLeaveInfo,
  },
  {
    sectionName: "Tímabil",
    icon: <CalendarIcon />,
    name: "dateOfBirth",
    component: MaternityLeaveDateOfBirth,
    beforeEnter: async state => {
      const { data, status } = await Axios.get<ExpectedBirthDate>(
        `/api/person/${state.ssn}/expectedBirthDate`,
        {
          validateStatus: status => status === 200 || status === 404,
        },
      );

      if (status === 404) {
        return {};
      }

      return { expectedDateOfBirth: new Date(data.expectedBirthDate) };
    },
  },
  {
    name: "timePeriods",
    component: MaternityLeaveTimePeriods,
    beforeEnter: async state => {
      const startDate = state.expectedDateOfBirth || startOfDay(new Date());

      const {
        jobPercentage,
        otherSalary,
        personalFundContribution,
        pensionPercentage,
        personalTaxBreakRate,
        unionPercentage,
        salary,
      } = state;

      const estimationResult = calculate({
        jobPercentage,
        otherSalary,
        pensionOptionalPercentage: personalFundContribution,
        pensionPercentage,
        personalTaxBreakRate,
        unionPercentage,
        salary,
      });

      return {
        estimationResult,
        timePeriods: state.timePeriods.length
          ? state.timePeriods
          : [
              {
                startDate,
                endDate: addDays(
                  startDate,
                  DAYS_PER_MONTH * MONTHS_OF_MATERNITY_LEAVE_PER_PARENT - 1,
                ),
              },
            ],
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
