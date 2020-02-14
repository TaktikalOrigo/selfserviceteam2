import React from "react";
import Head from "next/head";

import "~/config/configClient";

export default ({ Component, pageProps }: any) => (
  <>
    <Head>
      <title>Fæðingarorlof</title>
      <link rel="stylesheet" href="/public/css/base.css" />
      <link rel="stylesheet" href="/public/css/datepicker.css" />
      <link
        href="https://fonts.googleapis.com/css?family=IBM+Plex+Sans:400,400i,500,500i,600,600i&display=swap"
        rel="stylesheet"
      ></link>
    </Head>
    <Component {...pageProps} />
  </>
);
