import { TimePeriod, MaternityResults, MaternityData } from "~/types";
import { calculate } from "~/server/calculator";
import { startOfMonth, compareDesc, addMonths, addDays, getDaysInMonth, getMonth } from "date-fns";

export const isDayInTimePeriod = (date: Date, timePeriod: TimePeriod): boolean => {
  return (
    compareDesc(timePeriod.startDate!, date) !== -1 && compareDesc(timePeriod.endDate!, date) !== 1
  );
};

export const getMonthTValues = (
  timePeriods: TimePeriod[],
): Array<{ t: number; monthIndex: number }> => {
  const out: Array<{ t: number; monthIndex: number }> = [];

  const firstMonth = startOfMonth(timePeriods[0].startDate!);
  const lastMonth = startOfMonth(timePeriods[timePeriods.length - 1].endDate!);

  let timePeriodIndex = 0;

  for (
    let m = firstMonth;
    compareDesc(m, lastMonth) !== -1 && timePeriodIndex < timePeriods.length;
    m = startOfMonth(addMonths(m, 1))
  ) {
    let d = m;
    let nDays = 0;

    while (d.getMonth() === m.getMonth()) {
      if (isDayInTimePeriod(d, timePeriods[timePeriodIndex])) {
        nDays++;
      } else if (compareDesc(timePeriods[timePeriodIndex].endDate!, d) === 1) {
        if (timePeriodIndex === timePeriods.length - 1) {
          break;
        }

        timePeriodIndex++;
      }

      d = addDays(d, 1);
    }

    out.push({ t: nDays / getDaysInMonth(m), monthIndex: getMonth(m) });
  }

  return out;
};

export function calculatePaymentPlan(
  timePeriods: TimePeriod[],
  maternityData: MaternityData,
): Array<{ result: MaternityResults; monthIndex: number }> {
  return getMonthTValues(timePeriods).map(({ t, monthIndex }) => ({
    result: calculate(maternityData, t),
    monthIndex,
  }));
}
