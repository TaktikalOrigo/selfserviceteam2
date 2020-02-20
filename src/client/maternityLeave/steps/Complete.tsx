import React from "react";

import { MaternityLeaveProps } from "~/client/maternityLeave/maternityLeaveSteps";
import { CenteredWrapper } from "~/client/components/stepManager/CenteredWrapper";
import { MaternityLeaveOverview } from "~/client/maternityLeave/steps/Overview";

export const MaternityLeaveComplete: React.FC<MaternityLeaveProps> = props => {
  return (
    <CenteredWrapper>
      <MaternityLeaveOverview {...props} />
    </CenteredWrapper>
  );
};
