import React from "react";

import { MaternityLeaveProps } from "~/client/maternityLeave/maternityLeaveSteps";
import { CenteredWrapper } from "~/client/components/stepManager/CenteredWrapper";
import { Button } from "~/client/elements/Button";
import Router from "next/router";
import { MaternityLeaveOverview } from "~/client/maternityLeave/steps/Overview";

export const MaternityLeaveApplicationOverview: React.FC<MaternityLeaveProps> = props => {
  return (
    <CenteredWrapper>
      <MaternityLeaveOverview {...props} />
      <Button
        onClick={() => {
          Router.replace("/umsokn");
          props.goToStep("existingApplications");
        }}
      >
        Til baka
      </Button>
    </CenteredWrapper>
  );
};
