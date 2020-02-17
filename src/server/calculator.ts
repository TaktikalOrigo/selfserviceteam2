import { MaternityData, MaternityResults } from "~/types";

/*
Af tekjum 0 – 336.916 kr. 	  	35,04%
Af tekjum 336.917 - 945.873 kr.   	  	37,19% 
*/

const over50min = 184119;
const under50min = 132850;
const maxPayment = 600000;
// personu afslattur
const personalExemption = 54628;
const taxLowerRangePercentage = 35.04;
const taxLowerRangeUpToNumber = 336916;
const taxMiddleRangePercentage = 37.19;

export function calculate(data: MaternityData): MaternityResults {
  const paymentBeforeSub = getPaymentBeforeSub(data);
  const totalTax = getTotalTax(data, paymentBeforeSub);
  const personalTaxBreaks = getRatio(personalExemption, data.personalTaxBreakRate);

  return {
    total: paymentBeforeSub,
    pension: Math.floor(paymentBeforeSub * (data.pensionPercentage * 0.01)),
    pentionOptional: getRatio(paymentBeforeSub, data.pensionOptionalPercentage),
    taxToPay: totalTax - personalTaxBreaks,
    totalTax: totalTax,
    union: getRatio(paymentBeforeSub, data.unionPercentage),
    userPersonalTaxBreaks: personalTaxBreaks,
  };
}

function getRatio(amount: number, percentage: number): number {
  return Math.floor(amount * (percentage * 0.01));
}

function getTotalTax(data: MaternityData, paymentBeforeSub: number): number {
  // if there is lif we need to subtract it from the base
  const subtractPensionAmount = getRatio(paymentBeforeSub, data.pensionPercentage);
  const subtractPensionOptionalAmount = getRatio(paymentBeforeSub, data.pensionOptionalPercentage);
  const taxableSalary = paymentBeforeSub - subtractPensionAmount - subtractPensionOptionalAmount;

  if (taxableSalary < taxLowerRangeUpToNumber) {
    return getRatio(taxableSalary, taxLowerRangePercentage);
  }

  const taxOfFirstPart = taxLowerRangeUpToNumber * (taxLowerRangePercentage * 0.01);
  const rest = taxableSalary - taxLowerRangeUpToNumber;
  const taxOfRest = rest * (taxMiddleRangePercentage * 0.01);

  return Math.round(taxOfFirstPart + taxOfRest);
}

function getPaymentBeforeSub(data: MaternityData): number {
  const tekjur = data.salary + data.otherSalary;
  let tekjur80 = tekjur * 0.8;

  if (tekjur80 > maxPayment) {
    tekjur80 = maxPayment;
  }

  if (data.jobPercentage > 50 && tekjur80 < over50min) {
    tekjur80 = over50min;
  }

  if (data.jobPercentage < 50 && tekjur80 < under50min) {
    tekjur80 = under50min;
  }

  return Math.trunc(tekjur80);
}
