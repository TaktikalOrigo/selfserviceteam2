import { StepManager } from "~/client/components/stepManager/StepManager";
import { maternityLeaveSteps } from "~/client/maternityLeave/maternityLeaveSteps";

export default () => {
  return (
    <StepManager
      initialFields={{
        ssn: "",
      }}
      layoutComponent={props => <div style={{ padding: 32 }}>{props.children}</div>}
      steps={maternityLeaveSteps}
    />
  );
};
