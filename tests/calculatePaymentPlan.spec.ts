import { isDayInTimePeriod, getMonthTValues } from "~/client/maternityLeave/calculatePaymentPlan";

describe("isDayInTimePeriod", () => {
  it("works", () => {
    const timePeriod = { startDate: new Date("2020-01-05"), endDate: new Date("2020-01-10") };
    expect(isDayInTimePeriod(new Date("2020-01-04"), timePeriod)).toEqual(false);
    expect(isDayInTimePeriod(new Date("2020-01-05"), timePeriod)).toEqual(true);
    expect(isDayInTimePeriod(new Date("2020-01-07"), timePeriod)).toEqual(true);
    expect(isDayInTimePeriod(new Date("2020-01-10"), timePeriod)).toEqual(true);
    expect(isDayInTimePeriod(new Date("2020-01-11"), timePeriod)).toEqual(false);
  });
});

describe("getMonthTValues", () => {
  it("counts days correctly for a single month", () => {
    const timePeriod = { startDate: new Date("2020-01-05"), endDate: new Date("2020-01-10") };
    const tVals = getMonthTValues([timePeriod]);
    expect(tVals).toEqual([{ t: 6 / 31, monthIndex: 0 }]);
  });

  it("creates empty months between time periods correctly", () => {
    const timePeriods = [
      { startDate: new Date("2020-01-05"), endDate: new Date("2020-01-10") },
      { startDate: new Date("2020-04-1"), endDate: new Date("2020-04-14") },
    ];
    const tVals = getMonthTValues(timePeriods);
    expect(tVals).toEqual([
      { t: 6 / 31, monthIndex: 0 },
      { t: 0, monthIndex: 1 },
      { t: 0, monthIndex: 2 },
      { t: 14 / 30, monthIndex: 3 },
    ]);
  });

  it("handles time periods overlapping multiple months", () => {
    const timePeriods = [
      { startDate: new Date("2020-01-05"), endDate: new Date("2020-01-10") },
      { startDate: new Date("2020-04-15"), endDate: new Date("2020-05-15") },
    ];
    const tVals = getMonthTValues(timePeriods);
    expect(tVals).toEqual([
      { t: 6 / 31, monthIndex: 0 },
      { t: 0, monthIndex: 1 },
      { t: 0, monthIndex: 2 },
      { t: 16 / 30, monthIndex: 3 },
      { t: 15 / 31, monthIndex: 4 },
    ]);
  });

  it("handles multiple time periods in a single month", () => {
    const timePeriods = [
      { startDate: new Date("2020-01-01"), endDate: new Date("2020-01-10") },
      { startDate: new Date("2020-01-20"), endDate: new Date("2020-01-31") },
    ];
    const tVals = getMonthTValues(timePeriods);
    expect(tVals).toEqual([{ t: 22 / 31, monthIndex: 0 }]);
  });

  it("handles common date oddities like leap days", () => {
    const timePeriods = [
      { startDate: new Date("2020-01-01"), endDate: new Date("2020-01-10") },
      { startDate: new Date("2020-01-20"), endDate: new Date("2020-02-10") },
    ];
    const tVals = getMonthTValues(timePeriods);
    expect(tVals).toEqual([
      { t: 22 / 31, monthIndex: 0 },
      { t: 10 / 29, monthIndex: 1 }, // Feb 2020 has 29 days
    ]);
  });
});
