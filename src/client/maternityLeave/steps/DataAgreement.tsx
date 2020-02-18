import React, { useState } from "react";
import { MaternityLeaveProps } from "~/client/maternityLeave/maternityLeaveSteps";
import { Button } from "~/client/elements/Button";
import { Title } from "~/client/elements/Title";
import { Text } from "~/client/elements/Text";
import Checkbox from "~/client/elements/Checkbox";
import { CenteredWrapper } from "~/client/components/stepManager/CenteredWrapper";
import Axios from "axios";
import { ApplicationData } from "~/types";
import { handleError } from "@taktikal/error";
import { ErrorMessage } from "~/client/elements/ErrorMessage";
import { resolveAfter } from "~/client/util/animation/resolveAfter";

export const MaternityLeaveDataAgreement: React.FC<MaternityLeaveProps> = props => {
  const [checked, setChecked] = useState(false);
  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async () => {
    if (pending) {
      return;
    }

    setPending(true);
    setErrorMessage("");

    try {
      const { data, status } = await resolveAfter(
        750,
        Axios.get<ApplicationData>(`/api/person/${props.fields.ssn}/applicationData`, {
          validateStatus: status => status === 200 || status === 404,
        }),
      );

      if (status === 404) {
        setErrorMessage("Tókst ekki að sækja gögn");
        setPending(false);
        return {};
      }

      const {
        salary,
        otherSalary,
        jobPercentage,
        pensionPercentage,
        pensionOptionalPercentage,
        unionPercentage,
        personalTaxBreakRate,
      } = data;

      props.setFields({
        jobPercentage,
        otherSalary,
        personalFundContribution: pensionOptionalPercentage as 0 | 2 | 4,
        pensionPercentage,
        salary,
        unionPercentage,
        personalTaxBreakRate,
      });
      setPending(false);
      props.nextStep();
    } catch (e) {
      const [err] = handleError(e);
      setErrorMessage(err.message);
      setPending(false);
    }
  };

  return (
    <CenteredWrapper>
      <Title marginBottom={16}>Hæ {(props.fields.name || "").split(" ")[0]},</Title>
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
      <Button
        primary
        onClick={onSubmit}
        disabled={!checked}
        loading={pending}
        marginTop={24}
        marginBottom={24}
      >
        Áfram
      </Button>
      <ErrorMessage message={errorMessage} />
    </CenteredWrapper>
  );
};
