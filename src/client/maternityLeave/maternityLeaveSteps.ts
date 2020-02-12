import { Step, StepComponentProps } from "~/client/components/stepManager/StepManager";
import { MaternityLeaveAuth } from "~/client/maternityLeave/steps/Auth";

interface MaternityLeaveFields {
  ssn: string;
}

export type MaternityLeaveProps = StepComponentProps<MaternityLeaveFields>;

export const maternityLeaveSteps: Step<MaternityLeaveFields>[] = [
  {
    name: "auth",
    component: MaternityLeaveAuth,
  },
  {
    name: "auth",
    component: MaternityLeaveAuth,
  },
  {
    name: "auth",
    component: MaternityLeaveAuth,
  },
  {
    name: "auth",
    component: MaternityLeaveAuth,
  },
  {
    name: "auth",
    component: MaternityLeaveAuth,
  },
];
