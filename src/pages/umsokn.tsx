import React from "react";
import { StepManager } from "~/client/components/stepManager/StepManager";
import { maternityLeaveSteps } from "~/client/maternityLeave/maternityLeaveSteps";
import { MaternityLeaveLayout } from "~/client/maternityLeave/MaternityLeaveLayout";
import { IslandWebsiteLogo } from "~/client/icon/IslandWebsiteLogo";
import { cssVariables } from "~/cssVariables";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";

const s = compileStaticStylesheet(({ css }) => ({
  header: css`
    height: ${cssVariables.headerHeight};
  `,

  header__content: css`
    height: ${cssVariables.headerHeight};
    margin: 0 auto;
    padding: 0 32px;
    display: flex;
    align-items: center;
  `,

  logo: css`
    svg {
      height: 24px;
      width: 148px;
    }
  `,
}));

export default () => {
  return (
    <>
      <header className={s("header")}>
        <div className={s("header__content")}>
          <a href="https://island.is" className={s("logo")}>
            <IslandWebsiteLogo />
          </a>
        </div>
      </header>
      <StepManager
        initialFields={{
          ssn: "",
          name: "",
          email: "",
          phoneNumber: "",
          bankNumber: "",
          expectedDateOfBirth: null,
          union: "",
          pensionFund: "",
          personalFundContribution: 0,
          personalTaxCreditUsagePercent: 100,
          monthsOfLeaveAvailable: 0,
          timePeriods: [],
          employerContactEmail: "",
          employerContactName: "",
          hasEmployeeAccepted: false,
          hasGovernmentAccepted: false,
        }}
        layoutComponent={MaternityLeaveLayout}
        steps={maternityLeaveSteps}
      />
    </>
  );
};
