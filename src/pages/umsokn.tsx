import { StepManager } from "~/client/components/stepManager/StepManager";
import { maternityLeaveSteps } from "~/client/maternityLeave/maternityLeaveSteps";

export default () => {
  return (
    <StepManager
      initialFields={{
        ssn: "",
        name: "",
        email: "",
        phoneNumber: "",
        bankNumber: "",
        expectedDateOfBirth: "",
        union: "",
        pensionFund: "",
        personalFundContribution: 0,
        personalTaxCreditUsagePercent: 100,
        monthsOfLeaveAvailable: 0,
        timePeriods: [],
        hasEmployeeAccepted: false,
        hasGovernmentAccepted: false,
      }}
      layoutComponent={props => <div style={{ padding: 32 }}>{props.children}</div>}
      steps={maternityLeaveSteps}
    />
  );
};
