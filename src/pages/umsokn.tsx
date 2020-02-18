import React from "react";
import Axios from "axios";
import { handleError } from "@taktikal/error";
import { StepManager } from "~/client/components/stepManager/StepManager";
import {
  maternityLeaveSteps,
  MaternityLeaveFields,
} from "~/client/maternityLeave/maternityLeaveSteps";
import { MaternityLeaveLayout } from "~/client/maternityLeave/MaternityLeaveLayout";
import { RequestContext, PersonFields } from "~/types";
import { getPublicEnv } from "~/common/util/env";
import { Header } from "~/client/components/header/Header";

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
        <Header isLoggedIn={!!this.state.name} name={this.state.name} ssn={this.state.ssn} />
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
