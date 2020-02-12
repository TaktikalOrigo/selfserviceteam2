import React from "react";
import Head from "next/head";

import "~/config/configClient";

export default ({ Component, pageProps }: any) => (
  <>
    <Head>
      <title>Fæðingarorlof</title>
      <link rel="stylesheet" href="/public/css/base.css" />
      <link rel="stylesheet" href="/public/css/datepicker.css" />
    </Head>
    <Component {...pageProps} />
  </>
);
