import React from "react";

import { MaternityLeaveProps } from "~/client/maternityLeave/maternityLeaveSteps";
import { Title } from "~/client/elements/Title";
import { Text } from "~/client/elements/Text";
import { CenteredWrapper } from "~/client/components/stepManager/CenteredWrapper";
import { Button } from "~/client/elements/Button";

export const MaternityLeaveApplicationOverview: React.FC<MaternityLeaveProps> = props => {
  const application = props.fields.applications[props.fields.applicationIndex];

  return (
    <CenteredWrapper>
      <Title marginBottom={32}>Umsókn</Title>
      <Text>{application.createdAt}</Text>
      <Button onClick={() => props.goToStep("existingApplications")}>Til baka</Button>
    </CenteredWrapper>
  );
};
