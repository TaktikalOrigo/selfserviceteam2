import React from "react";
import Axios from "axios";
import { handleError } from "@taktikal/error";
import { StepManager } from "~/client/components/stepManager/StepManager";
import {
  maternityLeaveSteps,
  MaternityLeaveFields,
} from "~/client/maternityLeave/maternityLeaveSteps";
import { MaternityLeaveLayout } from "~/client/maternityLeave/MaternityLeaveLayout";
import { IslandWebsiteLogo } from "~/client/icon/IslandWebsiteLogo";
import { cssVariables } from "~/cssVariables";
import { compileStaticStylesheet } from "~/client/util/compileStaticStylesheet";
import { RequestContext, PersonFields } from "~/types";
import { getPublicEnv } from "~/common/util/env";

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
    justify-content: space-between;
  `,

  logo: css`
    svg {
      height: 24px;
      width: 148px;
    }
  `,

  nameAndSsnContainer: css`
    text-align: right;
  `,

  name: css`
    font-family: ${cssVariables.bodyFont};
    font-size: 18px;
    font-weight: 600;
    color: ${cssVariables.colorBlack};
    line-height: 1;
    margin-bottom: 8px;
  `,

  ssn: css`
    font-family: ${cssVariables.bodyFont};
    font-size: 12px;
    color: ${cssVariables.colorBlack};
    line-height: 1;
  `,
}));

interface State {
  name: string;
  ssn: string;
}

export default class Umsokn extends React.Component<{}, State> {
  public readonly state: State = {
    name: "",
    ssn: "",
  };

  public static async getInitialProps({
    req,
  }: RequestContext): Promise<Partial<MaternityLeaveFields>> {
    const ssnCookieSearch = "ssn=";
    const ssnCookieIndex = (req.headers.cookie || "").indexOf(ssnCookieSearch);

    if (ssnCookieIndex === -1) {
      return {};
    }

    try {
      const ssn = req.headers.cookie!.substr(ssnCookieSearch.length + ssnCookieIndex, 12);

      const { data, status } = await Axios.get<PersonFields>(
        `${getPublicEnv("SITE_URL")}/api/person/${ssn}`,
        {
          validateStatus: status => status === 200 || status === 404,
        },
      );

      if (status === 404) {
        return {};
      }

      return {
        name: data.name,
        ssn: data.ssn,
        applications: data.applications,
      };
    } catch (e) {
      handleError(e);
    }

    return {};
  }

  constructor(props: Partial<MaternityLeaveFields>) {
    super(props);

    if (props.name && props.ssn) {
      this.state.name = props.name;
      this.state.ssn = props.ssn;
    }
  }

  public render() {
    return (
      <>
        <header className={s("header")}>
          <div className={s("header__content")}>
            <a href="https://island.is" className={s("logo")}>
              <IslandWebsiteLogo />
            </a>
            {this.state.name && (
              <div className={s("nameAndSsnContainer")}>
                <div className={s("name")}>{this.state.name}</div>
                <div className={s("ssn")}>{this.state.ssn}</div>
              </div>
            )}
          </div>
        </header>
        <StepManager
          initialFields={{
            applications: [],
            applicationIndex: -1,

            ssn: "",
            name: "",
            email: "",
            phoneNumber: "",
            bankNumber: "",

            estimationResult: null!,

            jobPercentage: 100,
            otherSalary: 0,
            pensionPercentage: 0,
            personalTaxBreakRate: 100,
            salary: 0,
            unionPercentage: 2.55,

            expectedDateOfBirth: null,
            personalFundContribution: 0,
            monthsOfLeaveAvailable: 0,
            timePeriods: [],
            employerContactEmail: "",
            employerContactName: "",
            hasEmployeeAccepted: false,
            hasGovernmentAccepted: false,
            ...this.props,
          }}
          layoutComponent={MaternityLeaveLayout}
          steps={maternityLeaveSteps}
          onStateChange={state => this.setState({ name: state.name, ssn: state.ssn })}
        />
      </>
    );
  }
}
