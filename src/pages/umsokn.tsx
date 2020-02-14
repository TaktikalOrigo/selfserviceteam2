import React from "react";
import { StepManager } from "~/client/components/stepManager/StepManager";
import { maternityLeaveSteps } from "~/client/maternityLeave/maternityLeaveSteps";
import { MaternityLeaveLayout } from "~/client/maternityLeave/MaternityLeaveLayout";

export default () => {
  return (
    <StepManager
      initialFields={{
        ssn: "",
        name: "",
        email: "",
        phoneNumber: "",
        bankNumber: "",
        expectedDateOfBirth: null,
        union: "",
        pensionFund: "",
        personalFundContribution: 0,
        personalTaxCreditUsagePercent: 100,
        monthsOfLeaveAvailable: 0,
        timePeriods: [],
        employerContactEmail: "",
        employerContactName: "",
        hasEmployeeAccepted: false,
        hasGovernmentAccepted: false,
      }}
      layoutComponent={MaternityLeaveLayout}
      steps={maternityLeaveSteps}
    />
  );
};
