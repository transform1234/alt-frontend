const { dependencies } = require("./package.json");

module.exports = {
  name: "admin",
  exposes: {
    "./App": "./src/App",
    "./SampleComponent": "./src/components/SampleComponent",
    "./HomePage": "./src/pages/HomePage",
    "./StudentPage": "./src/pages/StudentPage",
    "./TeacherPage": "./src/pages/TeacherPage",
    "./SchoolPage": "./src/pages/SchoolPage",
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
