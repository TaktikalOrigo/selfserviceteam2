import React, { useState } from "react";
import Axios from "axios";
import { handleError } from "@taktikal/error";
import { MaternityLeaveProps } from "~/client/maternityLeave/maternityLeaveSteps";
import { Textfield } from "~/client/elements/Textfield";
import { Button } from "~/client/elements/Button";
import { Title } from "~/client/elements/Title";
import { Text } from "~/client/elements/Text";
import { isValueValid } from "~/common/util/form/getFieldError";
import { ErrorMessage } from "~/client/elements/ErrorMessage";
import { TestPersonData } from "~/types";
import { digits } from "~/common/util/form/digits";
import { CenteredWrapper } from "~/client/components/stepManager/CenteredWrapper";

export const MaternityLeaveAuth: React.FC<MaternityLeaveProps> = props => {
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (pending || !isValueValid("ssn", props.fields.ssn)) {
      return;
    }

    setPending(true);

    try {
      const { data, status } = await Axios.get<TestPersonData>(
        `/api/testPerson/${digits(props.fields.ssn)}`,
        {
          validateStatus: status => status === 200 || status === 404,
        },
      );

      if (status === 404) {
        setErrorMessage("Tókst ekki að sækja persónuupplýsingar fyrir þessa kennitölu");
        setPending(false);
        return;
      }

      /**
       * @todo
       *
       * We will have to fetch more data here to populate the state.
       */
      props.setFields({
        name: data.name,
      });

      props.nextStep();
      setPending(false);
    } catch (e) {
      const [err] = handleError(e);
      setErrorMessage(err.message);
      setPending(false);
    }
  };

  return (
    <CenteredWrapper>
      <form onSubmit={onSubmit}>
        <Title marginBottom={32}>Sækja um fæðingarorlof eða styrk</Title>
        <Text marginBottom={16} maxWidth={750}>
          Foreldri skal sækja um greiðslur úr Fæðingarorlofssjóði sex vikum fyrir áætlaðan
          fæðingardag barns.
        </Text>
        <Text marginBottom={48} maxWidth={750}>
          Ef þú ert þegar búin/n að sækja um ferðu beint inná mínar síður.
        </Text>
        <Textfield
          label="Kennitala"
          type="ssn"
          value={props.fields.ssn}
          onChange={e => !pending && props.setFields({ ssn: e.target.value })}
          placeholder="000000 0000"
          marginBottom={48}
          maxWidth={240}
        />
        <Button
          primary
          type="submit"
          disabled={!isValueValid("ssn", props.fields.ssn)}
          loading={pending}
        >
          Áfram
        </Button>
        <ErrorMessage message={errorMessage} />
      </form>
    </CenteredWrapper>
  );
};
