import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { addDays, addMonths, subDays, differenceInDays, startOfDay, compareAsc } from "date-fns";
import { MaternityLeaveProps } from "~/client/maternityLeave/maternityLeaveSteps";
import { Button } from "~/client/elements/Button";
import { Title } from "~/client/elements/Title";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import inputStyles from "~/client/elements/Input.styles";
import styles from "~/client/maternityLeave/steps/TimePeriods.styles";
import { ErrorMessage } from "~/client/elements/ErrorMessage";
import { Text } from "~/client/elements/Text";
import { CalendarIcon } from "~/client/icon/CalendarIcon";
import { TimePeriod } from "~/types";
import { DAYS_PER_MONTH } from "~/constants";

const s = compileStaticStylesheet(styles);
const inputClassName = compileStaticStylesheet(inputStyles)("input");

const constructUsedMessage = (daysUsedTotal: number): string => {
  const monthsUsed = Math.floor(daysUsedTotal / DAYS_PER_MONTH);
  const weeksUsed = Math.floor((daysUsedTotal - monthsUsed * DAYS_PER_MONTH) / 7);
  const daysUsed = daysUsedTotal - monthsUsed * DAYS_PER_MONTH - weeksUsed * 7;

  const usedStrParts = [
    {
      labelPlural: "mánuði",
      labelSingular: "mánuð",
      value: monthsUsed,
    },
    {
      labelPlural: "vikur",
      labelSingular: "viku",
      value: weeksUsed,
    },
    {
      labelPlural: "daga",
      labelSingular: "dag",
      value: daysUsed,
    },
  ]
    .filter(item => item.value > 0)
    .map(item => `${item.value} ${item.value === 1 ? item.labelSingular : item.labelPlural}`);

  let usedStr = usedStrParts[0] || "0 daga";
  for (let i = 1; i < usedStrParts.length; i += 1) {
    usedStr += `${i === usedStrParts.length - 1 ? " og" : ","} ${usedStrParts[i]}`;
  }
  return usedStr;
};

const getDaysInRange = (period: TimePeriod): number => {
  const hasBothDates = period.startDate && period.endDate;
  return (hasBothDates && differenceInDays(period.endDate!, period.startDate!) + 1) || 0;
};

export const MaternityLeaveTimePeriods: React.FC<MaternityLeaveProps> = props => {
  const { timePeriods } = props.fields;

  const [showTotalMustBeMonthError, setShowTotalMustBeMonthErrorMessage] = useState(false);

  // 3 months for each parent, 3 months shared between them. If the other parent
  // has taken from the shared time then that will reduce the available months.
  const monthsAvailable = 6;
  const daysAvailable = DAYS_PER_MONTH * monthsAvailable;

  const daysUsed = timePeriods.reduce((acc, period) => {
    return acc + (getDaysInRange(period) || 0);
  }, 0);

  const setStartDateAtIndex = (date: Date, index: number) => {
    props.setFields({
      timePeriods: timePeriods.map((period, i) =>
        i === index ? { ...period, startDate: date } : period,
      ),
    });
  };

  const setEndDateAtIndex = (date: Date, index: number) => {
    props.setFields({
      timePeriods: timePeriods.map((period, i) =>
        i === index ? { ...period, endDate: date } : period,
      ),
    });
  };

  const getMinStartDateForPeriodAtIndex = (index: number): Date => {
    if (index === 0) {
      return props.fields.expectedDateOfBirth!;
    }

    return addDays(timePeriods[index - 1].endDate!, 1);
  };

  const getMaxEndDateForPeriodAtIndex = (index: number): Date | undefined => {
    if (index === timePeriods.length - 1) {
      return undefined;
    }

    return subDays(timePeriods[index + 1].startDate!, 1);
  };

  const addNewTimePeriod = () => {
    props.setFields({ timePeriods: [...timePeriods, { startDate: null, endDate: null }] });
  };

  const removeTimePeriodAtIndex = (index: number) => {
    props.setFields({ timePeriods: timePeriods.filter((_, i) => i !== index) });
  };

  const daysUsedAreInMonths = daysUsed % DAYS_PER_MONTH === 0;
  const usageIsAboveMaximum = daysUsed > daysAvailable;
  const usageIsBelowMinimum = daysUsed < DAYS_PER_MONTH * 3;

  const acceptableDateEnd = addMonths(props.fields.expectedDateOfBirth!, 24);
  let timePeriodsExtendBeyondAcceptableRange = false;

  for (let i = timePeriods.length - 1; i >= 0; i -= 1) {
    const date = timePeriods[i].endDate || timePeriods[i].startDate;

    if (!date) {
      continue;
    }

    if (compareAsc(startOfDay(date), startOfDay(acceptableDateEnd)) === 1) {
      timePeriodsExtendBeyondAcceptableRange = true;
      break;
    }
  }

  const isAnyTimePeriodIncomplete = !timePeriods.reduce(
    (acc, item) => acc && !!(item.startDate && item.endDate),
    true,
  );

  const onSubmit = () => {
    if (!daysUsedAreInMonths) {
      setShowTotalMustBeMonthErrorMessage(true);
    }

    if (
      !daysUsedAreInMonths ||
      usageIsAboveMaximum ||
      timePeriodsExtendBeyondAcceptableRange ||
      usageIsBelowMinimum ||
      isAnyTimePeriodIncomplete
    ) {
      return;
    }

    props.nextStep();
  };

  useEffect(() => {
    if (daysUsedAreInMonths) {
      setShowTotalMustBeMonthErrorMessage(false);
    }
  }, [daysUsedAreInMonths]);

  const usedMessage = constructUsedMessage(daysUsed);

  return (
    <>
      <Title marginBottom={8}>Áætlaður réttur þinn er</Title>
      <Title marginBottom={40} heading={2}>
        {/* This value will be dynamic */}
        500.000 kr.
      </Title>
      <Title marginBottom={16} heading={3}>
        Viltu breyta eða skipta upp tímabilinu?
      </Title>
      <Text maxWidth={720} marginBottom={40}>
        Hér getur þú skipt orlofinu eða dreift því á mismunandi tíma. Annars reiknast það samfellt
        og miðast við fæðingardag barns. Ath! Lágmarksval eru tvær vikur.
      </Text>
      {timePeriods.map((period, i) => {
        const hasBothDates = period.startDate && period.endDate;
        const daysInRange = getDaysInRange(period);
        return (
          <div className={s("timePeriod")} key={i}>
            <div className={s("timePeriod__upper")}>
              <div className={s("timePeriod__section")}>
                <div>Start:</div>
                <div className={s("datePicker__container")}>
                  <i className={s("datePicker__icon")}>
                    <CalendarIcon />
                  </i>
                  <DatePicker
                    dateFormat="dd/MM/yyyy"
                    minDate={getMinStartDateForPeriodAtIndex(i)}
                    selected={period.startDate}
                    selectsStart
                    startDate={period.startDate}
                    endDate={period.endDate}
                    onChange={date => date && setStartDateAtIndex(date, i)}
                    className={inputClassName}
                  />
                </div>
              </div>
              <div className={s("timePeriod__section")}>
                <div>End:</div>
                <div className={s("datePicker__container")}>
                  <i className={s("datePicker__icon")}>
                    <CalendarIcon />
                  </i>
                  <DatePicker
                    readOnly={!period.startDate}
                    dateFormat="dd/MM/yyyy"
                    selectsEnd
                    selected={period.endDate}
                    startDate={period.startDate}
                    endDate={period.endDate}
                    minDate={period.startDate}
                    maxDate={getMaxEndDateForPeriodAtIndex(i)}
                    onChange={date => date && setEndDateAtIndex(date, i)}
                    className={inputClassName}
                  />
                </div>
              </div>
              <button onClick={() => removeTimePeriodAtIndex(i)} className={s("removeTimePeriod")}>
                Eyða tímabili
              </button>
            </div>
            {hasBothDates && daysInRange < 14 && (
              <ErrorMessage
                message={`Tímabil verða að vera 14 dagar að lágmarki. Gefið tímabil er ${daysInRange} dagar.`}
              />
            )}
          </div>
        );
      })}
      <button
        onClick={addNewTimePeriod || timePeriodsExtendBeyondAcceptableRange}
        className={s("addTimePeriod")}
      >
        Bæta við tímabili
      </button>
      <Text>
        Þú hefur valið <strong>{usedMessage}</strong> af <strong>{monthsAvailable}</strong> mánuðum
        mögulegum
      </Text>
      <Button
        disabled={usageIsAboveMaximum || isAnyTimePeriodIncomplete || usageIsBelowMinimum}
        primary
        onClick={onSubmit}
      >
        Áfram
      </Button>
      {usageIsAboveMaximum && <ErrorMessage message="Nýttur tími er yfir hámarki" />}
      {showTotalMustBeMonthError && !daysUsedAreInMonths && (
        <ErrorMessage message="Notaður tími verður að vera í heilum mánuðum" />
      )}
      {timePeriodsExtendBeyondAcceptableRange && (
        <ErrorMessage message="Tímabil má ekki vera meira en 24 mánuðum eftir áætlaðann fæðingardag" />
      )}
    </>
  );
};
