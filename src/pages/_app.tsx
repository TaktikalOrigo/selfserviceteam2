import React from "react";
import Head from "next/head";

export default ({ Component, pageProps }: any) => (
  <>
    <Head>
      <title>Fæðingarorlof</title>
      <link rel="stylesheet" href="/public/css/base.css" />
    </Head>
    <Component {...pageProps} />
  </>
);
