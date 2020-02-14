import React, { useState } from "react";
import { MaternityLeaveProps } from "~/client/maternityLeave/maternityLeaveSteps";
import { Button } from "~/client/elements/Button";
import { Title } from "~/client/elements/Title";
import { Text } from "~/client/elements/Text";
import Checkbox from "~/client/elements/Checkbox";
import { CenteredWrapper } from "~/client/components/stepManager/CenteredWrapper";

export const MaternityLeaveDataAgreement: React.FC<MaternityLeaveProps> = props => {
  const [checked, setChecked] = useState(false);

  return (
    <CenteredWrapper>
      <Title marginBottom={16}>Hæ Jóna,</Title>
      <Text marginBottom={16} maxWidth={680}>
        Til þess að geta unnið umsóknina þá þurfum við að kynnast þér betur.
      </Text>
      <Text marginBottom={40} maxWidth={680}>
        Með þínu samþykki sækjum við gögn til Heilsuveru, Ríkisskattstjóra, Þjóðskrá og
        Fjársýslunnar.
      </Text>
      <Checkbox
        label="Ég samþykki að sótt séu gögn til Heilsuveru, Ríkisskattstjóra, Þjóðskrá og Fjársýslunnar"
        checked={checked}
        onChange={() => setChecked(!checked)}
      />
      <Button primary onClick={() => props.nextStep()} disabled={!checked} marginTop={24}>
        Áfram
      </Button>
    </CenteredWrapper>
  );
};
