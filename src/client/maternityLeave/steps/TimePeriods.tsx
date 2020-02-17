import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import icelandicLocale from "date-fns/locale/is";
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
import {
  DAYS_PER_MONTH,
  MONTHS_OF_MATERNITY_LEAVE_PER_PARENT,
  MONTHS_OF_SHARED_MATERNITY_LEAVE,
} from "~/constants";
import { CenteredWrapper } from "~/client/components/stepManager/CenteredWrapper";
import formatCurrency from "~/client/util/formatCurrency";

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

    if (!timePeriods[index + 1].startDate) {
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
  const usageIsEmpty = daysUsed === 0;

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
      usageIsEmpty ||
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

  const barT = Math.min(
    1,
    daysUsed /
      ((MONTHS_OF_MATERNITY_LEAVE_PER_PARENT * 2 + MONTHS_OF_SHARED_MATERNITY_LEAVE) *
        DAYS_PER_MONTH),
  );

  return (
    <CenteredWrapper>
      <Title marginBottom={16}>
        Áætlaður réttur þinn er {formatCurrency(props.fields.estimationResult.total)} á mánuði
      </Title>
      <Text marginBottom={40}>
        Miðað við 80% af stærsta tekjuþættinum frá viðkomandi fyrirtæki.
      </Text>

      <Title marginBottom={16} heading={2}>
        Vilt þú breyta eða skipta upp tímabilinu?
      </Title>
      <Text maxWidth={820} marginBottom={64}>
        Hér getur þú ákvarðað hversu langt orlof þú tekur, skipt orlofinu eða dreift því á
        mismunandi tíma. Ef engu er breytt reiknast það samfellt og miðast við fæðingardag barns.
      </Text>
      <div className={s("barContainer")}>
        <div
          className={s("bar__filled", { error: usageIsAboveMaximum || usageIsEmpty })}
          style={{ width: `${barT * 100}%` }}
        />
        <div className={s("bar__wrapper")}>
          <div className={s("bar__separator")} />
          <div className={s("bar__label")}>Þinn réttur</div>
          <div className={s("bar__months")}>{MONTHS_OF_MATERNITY_LEAVE_PER_PARENT} mánuðir</div>
        </div>
        <div className={s("bar__wrapper")}>
          <div className={s("bar__separator")} />
          <div className={s("bar__label")}>Sameiginlegur réttur</div>
          <div className={s("bar__months")}>{MONTHS_OF_SHARED_MATERNITY_LEAVE} mánuðir</div>
        </div>
        <div className={s("bar__wrapper")}>
          <div className={s("bar__label")}>Réttur maka</div>
          <div className={s("bar__months")}>{MONTHS_OF_MATERNITY_LEAVE_PER_PARENT} mánuðir</div>
        </div>
      </div>
      {timePeriods.map((period, i) => {
        const hasBothDates = period.startDate && period.endDate;
        const daysInRange = getDaysInRange(period);
        return (
          <div
            key={i}
            className={s("timePeriod", { last: i === timePeriods.length - 1 + 10 })}
            style={{ zIndex: 10 + timePeriods.length - i }}
          >
            <div className={s("timePeriod__upper")}>
              <div className={s("timePeriod__section")}>
                {i === 0 && <div className={s("timePeriod__label")}>Frá</div>}
                <div className={s("datePicker__container")}>
                  <i className={s("datePicker__icon")}>
                    <CalendarIcon />
                  </i>
                  <DatePicker
                    dateFormat="d. MMMM, yyyy"
                    minDate={getMinStartDateForPeriodAtIndex(i)}
                    selected={period.startDate}
                    selectsStart
                    startDate={period.startDate}
                    endDate={period.endDate}
                    onChange={date => date && setStartDateAtIndex(date, i)}
                    className={inputClassName}
                    locale={icelandicLocale}
                    popperPlacement="bottom-start"
                    popperModifiers={{
                      flip: { behavior: ["bottom"] },
                      preventOverflow: { enabled: false },
                      hide: { enabled: false },
                    }}
                  />
                </div>
              </div>
              <div className={s("timePeriod__section")}>
                {i === 0 && <div className={s("timePeriod__label")}>Til</div>}
                <div className={s("datePicker__container")}>
                  <i className={s("datePicker__icon")}>
                    <CalendarIcon />
                  </i>
                  <DatePicker
                    readOnly={!period.startDate}
                    dateFormat="d. MMMM, yyyy"
                    selectsEnd
                    selected={period.endDate}
                    startDate={period.startDate}
                    endDate={period.endDate}
                    minDate={period.startDate}
                    maxDate={getMaxEndDateForPeriodAtIndex(i)}
                    onChange={date => date && setEndDateAtIndex(date, i)}
                    className={inputClassName}
                    locale={icelandicLocale}
                    popperPlacement="bottom-start"
                    popperModifiers={{
                      flip: { behavior: ["bottom"] },
                      preventOverflow: { enabled: false },
                      hide: { enabled: false },
                    }}
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
        disabled={isAnyTimePeriodIncomplete}
      >
        Bæta við tímabili
      </button>
      <Text marginBottom={40}>
        Þú hefur valið <strong>{usedMessage}</strong> af <strong>{monthsAvailable}</strong> mánuðum.
        mögulegum
      </Text>
      <Button
        disabled={usageIsAboveMaximum || isAnyTimePeriodIncomplete || usageIsEmpty}
        primary
        onClick={onSubmit}
      >
        Áfram
      </Button>
      {usageIsAboveMaximum && <ErrorMessage message="Nýttur tími er yfir hámarki" />}
      {showTotalMustBeMonthError && !daysUsedAreInMonths && (
        <ErrorMessage message="Valinn tími verður að vera í heilum mánuðum" />
      )}
      {timePeriodsExtendBeyondAcceptableRange && (
        <ErrorMessage message="Tímabil má ekki vera meira en 24 mánuðum eftir áætlaðann fæðingardag" />
      )}
    </CenteredWrapper>
  );
};
