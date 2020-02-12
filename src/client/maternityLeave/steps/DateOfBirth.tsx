import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { format, parse, max, isValid } from "date-fns";
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

  const [date, setDate] = useState<Date | null>(() => {
    return expectedDateOfBirth ? parse(expectedDateOfBirth) : null;
  });

  const onDateChange = (newDate: Date) => {
    setDate(newDate);
    props.setFields({ expectedDateOfBirth: format(newDate!, "YYYY/MM/DD") });
  };

  // If the user manually types in the date
  const onTypedDateChange = (value: string) => {
    const newDate = parse(value);
    if (isValid(newDate)) {
      onDateChange(max(newDate, Date.now()));
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
          selected={date}
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
