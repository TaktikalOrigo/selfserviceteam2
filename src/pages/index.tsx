import React from "react";
import queryString from "querystring";
import Router from "next/router";

import { RequestContext } from "~/types";
import { IS_SERVER } from "~/constants";

export default class Index extends React.Component {
  public static async getInitialProps({ req, res }: RequestContext) {
    const search = IS_SERVER
      ? Object.keys(req.query).length > 0
        ? `?${queryString.stringify(req.query)}`
        : ""
      : window.location.search;

    const redirectPath = `/umsokn${search}`;
    if (typeof window === "undefined") {
      res!.writeHead(302, { Location: redirectPath });
      res!.end();
    } else {
      Router.push(redirectPath);
    }
    return {};
  }

  public render() {
    return <></>;
  }
}
