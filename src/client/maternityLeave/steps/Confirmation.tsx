import React, { useState } from "react";
import Router from "next/router";
import {
  MaternityLeaveProps,
  MaternityLeaveFields,
} from "~/client/maternityLeave/maternityLeaveSteps";
import { CenteredWrapper } from "~/client/components/stepManager/CenteredWrapper";
import { Textfield } from "~/client/elements/Textfield";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import styles from "~/client/maternityLeave/steps/Confirmation.styles";
import { MailIcon } from "~/client/icon/MailIcon";
import { PhoneIcon } from "~/client/icon/PhoneIcon";
import { PersonIcon } from "~/client/icon/PersonIcon";
import { Title } from "~/client/elements/Title";
import { Text } from "~/client/elements/Text";
import { Button } from "~/client/elements/Button";
import { isValueValid } from "~/common/util/form/getFieldError";
import Axios from "axios";
import { ApplicationFields } from "~/types";
import { resolveAfter } from "~/client/util/animation/resolveAfter";
import { handleError } from "@taktikal/error";
import { ErrorMessage } from "~/client/elements/ErrorMessage";

const isAllInfoValid = (fields: MaternityLeaveFields): boolean => {
  if (!fields.name || !fields.email) {
    return false;
  }

  if (!isValueValid("phone", fields.phoneNumber)) {
    return false;
  }

  if (!isValueValid("email", fields.email)) {
    return false;
  }

  if (!isValueValid("bankNumber", fields.bankNumber)) {
    return false;
  }

  if (!fields.employerContactName || !isValueValid("email", fields.employerContactEmail)) {
    return false;
  }

  return true;
};

const s = compileStaticStylesheet(styles);

export const MaternityLeaveConfirmation: React.FC<MaternityLeaveProps> = props => {
  const allInfoValid = isAllInfoValid(props.fields);

  const [hasAttemptedToSubmit, setHasAttemptedToSubmit] = useState(false);

  const [pending, setPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async () => {
    if (pending) {
      return;
    }

    if (!allInfoValid) {
      setHasAttemptedToSubmit(true);
      return;
    }

    setPending(true);
    setErrorMessage("");

    try {
      const body: ApplicationFields = {
        applicationTimes: props.fields.timePeriods as any,
        expectedDate: props.fields.expectedDateOfBirth!,
        jobPercentage: props.fields.jobPercentage,
        otherSalary: props.fields.otherSalary,
        pensionOptionalPercentage: props.fields.personalFundContribution,
        pensionPercentage: props.fields.pensionPercentage,
        personalTaxBreakRate: props.fields.personalTaxBreakRate,
        salary: props.fields.salary,
        unionPercentage: props.fields.unionPercentage,
      };
      const { data: application } = await resolveAfter(
        750,
        Axios.post(`/api/person/${props.fields.ssn}/application`, body),
      );
      setPending(false);
      Router.replace(`/umsokn?id=${application.id}`);
      props.nextStep();
    } catch (e) {
      const [err] = handleError(e);
      setErrorMessage(err.message);
      setPending(false);
    }
  };

  return (
    <CenteredWrapper>
      <Title marginBottom={64}>Er allt eins og það á að vera?</Title>
      <div className={s("row")}>
        <Textfield
          label="Nafn"
          readOnly
          value={props.fields.name}
          iconLeft={<PersonIcon />}
          required
        />
        <Textfield label="Kennitala" readOnly value={props.fields.ssn} required />
      </div>
      <div className={s("row")}>
        <Textfield
          label="Netfang"
          type="email"
          value={props.fields.email}
          onChange={e => props.setFields({ email: e.target.value })}
          iconLeft={<MailIcon />}
          showValueError={hasAttemptedToSubmit}
          required
        />
        <Textfield
          label="Símanúmer"
          type="phone"
          value={props.fields.phoneNumber}
          onChange={e => props.setFields({ phoneNumber: e.target.value })}
          iconLeft={<PhoneIcon />}
          placeholder="000 0000"
          showValueError={hasAttemptedToSubmit}
          required
        />
      </div>
      <div className={s("row")}>
        <Textfield
          label="Bankanúmer"
          type="bankNumber"
          value={props.fields.bankNumber}
          onChange={e => props.setFields({ bankNumber: e.target.value })}
          placeholder="0000-00-000000"
          showValueError={hasAttemptedToSubmit}
          required
        />
        <div />
      </div>
      <Text marginBottom={48}>Við þurfum að vita hver tengiliður er hjá vinnuveitanda þínum.</Text>
      <div className={s("row")}>
        <Textfield
          label="Nafn tengiliðs"
          name="employer_contact_name"
          value={props.fields.employerContactName}
          onChange={e => props.setFields({ employerContactName: e.target.value })}
          iconLeft={<PersonIcon />}
          showValueError={hasAttemptedToSubmit}
          required
        />
        <Textfield
          label="Netfang tengiliðs"
          type="email"
          name="employer_contact_email"
          value={props.fields.employerContactEmail}
          onChange={e => props.setFields({ employerContactEmail: e.target.value })}
          iconLeft={<MailIcon />}
          showValueError={hasAttemptedToSubmit}
          required
        />
      </div>
      <Button
        inline
        onClick={() => !pending && props.prevStep()}
        marginRight={16}
        marginBottom={16}
      >
        Til baka
      </Button>
      <Button
        inline
        primary
        onClick={onSubmit}
        loading={pending}
        marginBottom={24}
        data-testid="confirmation__button"
      >
        Staðfesta
      </Button>
      <ErrorMessage message={errorMessage} />
    </CenteredWrapper>
  );
};
