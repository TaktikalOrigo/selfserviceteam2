import React from "react";
import DatePicker from "react-datepicker";
import { parse, max, isValid, startOfDay } from "date-fns";
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

  // If the user manually types in the date
  const onTypedDateChange = (value: string) => {
    const date = parse(value);
    if (isValid(date)) {
      onDateChange(max(date, startOfDay(Date.now())));
    }
  };

  return (
    <>
      <Title marginBottom={16}>Fæðingardagur</Title>
      <Text marginBottom={32}>Hver er áætlaður fæðingardagur barnins þíns?</Text>
      <label className={s("label")}>
        <div className={s("label__title")}>Áætlaður fæðingardagur</div>
        <DatePicker
          dateFormat="dd/MM/yyyy"
          minDate={new Date()}
          selected={expectedDateOfBirth}
          onChange={onDateChange}
          onChangeRaw={e => onTypedDateChange(e.target.value)}
          className={inputClassName}
        />
      </label>
      <Button
        primary
        disabled={!expectedDateOfBirth || !isValid(parse(expectedDateOfBirth))}
        onClick={() => props.nextStep()}
      >
        Áfram
      </Button>
    </>
  );
};
