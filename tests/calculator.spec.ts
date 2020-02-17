import { MaternityData } from "~/types";
import { calculate } from "~/server/calculator";

describe("Payment values", () => {
  it("calculate total payment for salary in range and 100% work", () => {
    // Arrange
    const request: MaternityData = {
      otherSalary: 50000,
      salary: 574000,
      personalTaxBreakRate: 50,
      pensionOptionalPercentage: 4,
      jobPercentage: 100,
      unionPercentage: 2.55,
      pensionPercentage: 4,
    };

    // Act
    const actual = calculate(request);

    // Assert
    expect(actual.total).toEqual(499200);
    expect(actual.pension).toEqual(19968);
    expect(actual.pentionOptional).toEqual(19968);
    expect(actual.union).toEqual(12729);
    expect(actual.totalTax).toEqual(163557);
    expect(actual.userPersonalTaxBreaks).toEqual(27314);
  });

  it("calculate total payment for salary in range and 100% work and 100% taxbreak", () => {
    // Arrange
    const request: MaternityData = {
      otherSalary: 50000,
      salary: 574000,
      personalTaxBreakRate: 100,
      pensionOptionalPercentage: 4,
      jobPercentage: 100,
      unionPercentage: 2.55,
      pensionPercentage: 4,
    };

    // Act
    const actual = calculate(request);

    // Assert
    expect(actual.total).toEqual(499200);
    expect(actual.pension).toEqual(19968);
    expect(actual.pentionOptional).toEqual(19968);
    expect(actual.union).toEqual(12729);
    expect(actual.totalTax).toEqual(163557);
    expect(actual.userPersonalTaxBreaks).toEqual(54628);
  });

  it("calculate total payment for salary in range 100% work 4% lif and no vidbotar lif", () => {
    // Arrange
    const request: MaternityData = {
      otherSalary: 50000,
      salary: 574000,
      personalTaxBreakRate: 50,
      pensionOptionalPercentage: 0,
      jobPercentage: 100,
      unionPercentage: 2.55,
      pensionPercentage: 4,
    };

    // Act
    const actual = calculate(request);

    // Assert
    expect(actual.total).toEqual(499200);
    expect(actual.pension).toEqual(19968);
    expect(actual.pentionOptional).toEqual(0);
    expect(actual.union).toEqual(12729);
    expect(actual.totalTax).toEqual(170983);
    expect(actual.userPersonalTaxBreaks).toEqual(27314);
  });

  it("calculate total payment for low salary in and 100% work", () => {
    // Arrange
    const request: MaternityData = {
      otherSalary: 50000,
      salary: 150000,
      personalTaxBreakRate: 50,
      pensionOptionalPercentage: 0,
      jobPercentage: 100,
      unionPercentage: 2.55,
      pensionPercentage: 4,
    };

    // Act
    const actual = calculate(request);

    // Assert
    expect(actual.total).toEqual(184119);
  });

  it("calculate total payment for low salary in and 50% work", () => {
    // Arrange
    const request: MaternityData = {
      otherSalary: 50000,
      salary: 100000,
      personalTaxBreakRate: 50,
      pensionOptionalPercentage: 0,
      jobPercentage: 49,
      unionPercentage: 2.55,
      pensionPercentage: 4,
    };

    // Act
    const actual = calculate(request);

    // Assert
    expect(actual.total).toEqual(132850);
  });

  it("calculate total payment for high salary", () => {
    // Arrange
    const request: MaternityData = {
      otherSalary: 50000,
      salary: 1500000,
      personalTaxBreakRate: 50,
      pensionOptionalPercentage: 0,
      jobPercentage: 49,
      unionPercentage: 2.55,
      pensionPercentage: 4,
    };

    // Act
    const actual = calculate(request);

    // Assert
    expect(actual.total).toEqual(600000);
  });
});
