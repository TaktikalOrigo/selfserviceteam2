import React, { useState } from "react";
import { MaternityLeaveProps } from "~/client/maternityLeave/maternityLeaveSteps";
import { Button } from "~/client/elements/Button";
import { Title } from "~/client/elements/Title";
import { Text } from "~/client/elements/Text";
import Checkbox from "~/client/elements/Checkbox";

export const MaternityLeaveDataAgreement: React.FC<MaternityLeaveProps> = props => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Title marginBottom={16}>
        Hæ Jóna, til þess að geta unnið umsóknina þá þurfum við að kynnast þér betur.
      </Title>
      <Text marginBottom={32}>
        Með þínu samþykki sækjum við gögn til Heilsuveru, Ríkisskattstjóra, Þjóðskrá og
        Fjársýslunnar.
      </Text>
      <Text>
        <a href="#">Nánar</a> um gögnin sem við sækjum.
      </Text>
      <Checkbox label="Ég samþykki" checked={checked} onChange={() => setChecked(!checked)} />
      <Button primary onClick={() => props.nextStep()} disabled={!checked}>
        Áfram
      </Button>
    </>
  );
};
