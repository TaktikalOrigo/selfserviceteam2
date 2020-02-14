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
import { CenteredWrapper } from "~/client/components/stepManager/CenteredWrapper";
import { CalendarIcon } from "~/client/icon/CalendarIcon";

const s = compileStaticStylesheet(styles);
const inputClassName = compileStaticStylesheet(inputStyles)("input");

export const MaternityLeaveDateOfBirth: React.FC<MaternityLeaveProps> = props => {
  const { expectedDateOfBirth } = props.fields;

  const onDateChange = (date: Date) => {
    props.setFields({ expectedDateOfBirth: date });
  };

  return (
    <CenteredWrapper>
      <Title marginBottom={16}>Þín bíður fallegt hlutverk.</Title>
      <Text marginBottom={48}>Hvenær er settur fæðingardagur barnsins þíns?</Text>
      <div className={s("label")}>
        <div className={s("label__title")}>Settur fæðingardagur</div>
        <div className={s("datePicker__container")}>
          <i className={s("datePicker__icon")}>
            <CalendarIcon />
          </i>
          <DatePicker
            dateFormat="d. MMMM, yyyy"
            minDate={new Date()}
            selected={expectedDateOfBirth}
            onChange={onDateChange}
            className={inputClassName}
            locale={icelandicLocale}
          />
        </div>
      </div>
      <Button primary disabled={!expectedDateOfBirth} onClick={() => props.nextStep()}>
        Áfram
      </Button>
    </CenteredWrapper>
  );
};
