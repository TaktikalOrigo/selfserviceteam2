/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */

const wp = require("@cypress/webpack-preprocessor");
const webpackOptions = require("./webpack.config");

// @ts-ignore
module.exports = on => {
  const options = {
    webpackOptions,
  };

  on("file:preprocessor", wp(options));
};
