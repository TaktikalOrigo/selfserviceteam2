import { StepManager } from "~/client/components/stepManager/StepManager";
import { maternityLeaveSteps } from "~/client/maternityLeave/maternityLeaveSteps";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";

const s = compileStaticStylesheet(({ css }) => ({
  container: css`
    padding: 32px;
    min-height: 100vh;
  `,
}));

const Layout: React.FC = props => {
  return <div className={s("container")}>{props.children}</div>;
};

export default () => {
  return (
    <StepManager
      initialFields={{
        ssn: "",
        name: "",
        email: "",
        phoneNumber: "",
        bankNumber: "",
        expectedDateOfBirth: "",
        union: "",
        pensionFund: "",
        personalFundContribution: 0,
        personalTaxCreditUsagePercent: 100,
        monthsOfLeaveAvailable: 0,
        timePeriods: [],
        hasEmployeeAccepted: false,
        hasGovernmentAccepted: false,
      }}
      layoutComponent={Layout}
      steps={maternityLeaveSteps}
    />
  );
};
