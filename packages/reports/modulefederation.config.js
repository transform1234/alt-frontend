const { dependencies } = require("./package.json");
module.exports = {
  name: "reports",
  exposes: {
    "./Report": "./src/pages/Report",
    "./ScoreCard": "./src/components/ScoreCard",
  },
  remotes: {
    core: `core@[window.appModules.core.url]/moduleEntry.js`,
  },
  filename: "moduleEntry.js",
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
  },
};
