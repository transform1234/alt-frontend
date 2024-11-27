const cracoModuleFederation = require("craco-module-federation");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");
const path = require("path");

module.exports = {
  devServer: {
    port: 4001,
  },
  webpack: {
    plugins: [new ExternalTemplateRemotesPlugin()],
    configure: (webpackConfig) => {
      const timestamp = new Date().getTime();
      webpackConfig.output = {
        ...webpackConfig.output,
        filename: `static/js/[name].[hash]-${timestamp}.js`,
        chunkFilename: `static/js/[name].[hash]-${timestamp}.chunk.js`,
        path: path.resolve(__dirname, "build"),
      };
      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: cracoModuleFederation,
    },
  ],
};
