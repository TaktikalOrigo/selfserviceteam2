import React from "react";

import { MaternityLeaveProps } from "~/client/maternityLeave/maternityLeaveSteps";
import { Title } from "~/client/elements/Title";
import { Text } from "~/client/elements/Text";
import { CenteredWrapper } from "~/client/components/stepManager/CenteredWrapper";

export const MaternityLeaveComplete: React.FC<MaternityLeaveProps> = () => {
  return (
    <CenteredWrapper>
      <Title marginBottom={32}>Takk fyrir umsóknina</Title>
      <Text>Við höfum móttekið umsóknina og hún fer nú í vinnslu hjá okkur.</Text>
    </CenteredWrapper>
  );
};
