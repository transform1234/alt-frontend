const { dependencies } = require("./package.json");

module.exports = {
  name: "selfassesment",
  exposes: {
    // "./selfAssesment": "./src/components/selfAssesment",
    "./App": "./src/App",
    "./SelfAssesment": "./src/pages/courseList",
    "./Lessons": "./src/pages/lessonList",
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
