import React from "react";
import { MaternityLeaveProps } from "~/client/maternityLeave/maternityLeaveSteps";
import { Textfield } from "~/client/elements/Textfield";
import { Button } from "~/client/elements/Button";

export const MaternityLeaveAuth: React.FC<MaternityLeaveProps> = props => {
  return (
    <>
      <Textfield
        label="Kennitala"
        type="ssn"
        value={props.fields.ssn}
        onChange={e => props.setFields({ ssn: e.target.value })}
      />
      <Button primary onClick={() => props.nextStep()}>
        Áfram
      </Button>
    </>
  );
};
