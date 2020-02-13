import React from "react";
import DatePicker from "react-datepicker";
import icelandicLocale from "date-fns/locale/is";
import { MaternityLeaveProps } from "~/client/maternityLeave/maternityLeaveSteps";
import { Button } from "~/client/elements/Button";
import { Title } from "~/client/elements/Title";
import { Text } from "~/client/elements/Text";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import inputStyles from "~/client/elements/Input.styles";
import styles from "~/client/maternityLeave/steps/DateOfBirth.styles";

const s = compileStaticStylesheet(styles);
const inputClassName = compileStaticStylesheet(inputStyles)("input");

export const MaternityLeaveDateOfBirth: React.FC<MaternityLeaveProps> = props => {
  const { expectedDateOfBirth } = props.fields;

  const onDateChange = (date: Date) => {
    props.setFields({ expectedDateOfBirth: date });
  };

  return (
    <>
      <Title marginBottom={16}>Fæðingardagur</Title>
      <Text marginBottom={32}>Hver er áætlaður fæðingardagur barnins þíns?</Text>
      <label className={s("label")}>
        <div className={s("label__title")}>Áætlaður fæðingardagur</div>
        <DatePicker
          dateFormat="d. MMMM, yyyy"
          minDate={new Date()}
          selected={expectedDateOfBirth}
          onChange={onDateChange}
          className={inputClassName}
          locale={icelandicLocale}
        />
      </label>
      <Button primary disabled={!expectedDateOfBirth} onClick={() => props.nextStep()}>
        Áfram
      </Button>
    </>
  );
};
