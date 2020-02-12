const path = require("path");

module.exports = {
  typescript: {
    ignoreDevErrors: true,
  },
  webpack: (config, options) => {
    config.resolve.alias["~"] = path.resolve(__dirname, "src");

    return config;
  },
}
