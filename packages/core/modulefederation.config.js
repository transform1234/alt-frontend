const { dependencies } = require("./package.json");

module.exports = {
  name: "core",
  exposes: {
    "./App": "./src/App",
    "./AppShell": "./src/components/AppShell",
    "./Login": "./src/pages/Login",
    "./Signup": "./src/pages/Signup",
    "./MobileNumberScreen": "./src/pages/MobileNumberScreen",
    "./OTP": "./src/pages/OTP",
    "./Onboarding": "./src/pages/Onboarding",
    "./OnboardingFill": "./src/pages/OnboardingFill",
    "./StudentLogin": "./src/pages/StudentLogin",
    "./Flash": "./src/pages/Flash",
    "./ComingSoon": "./src/pages/ComingSoon",
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
