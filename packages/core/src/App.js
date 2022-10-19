import React from "react";
import "./App.css";
import Login from "pages/Login";
import Signup from "pages/Signup";
import MobileNumberScreen from "pages/MobileNumberScreen";
import OTP from "pages/OTP";
import Onboarding from "pages/Onboarding";
import OnboardingFill from "pages/OnboardingFill";
import ComingSoon from "pages/ComingSoon";
import StudentLogin from "pages/StudentLogin";
import Flash from "pages/Flash";
import { extendTheme, NativeBaseProvider } from "native-base";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DEFAULT_THEME, initializeI18n } from "@shiksha/common-lib";

initializeI18n(["translation", "core"]);

const theme = extendTheme(DEFAULT_THEME);

function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<StudentLogin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/mobilenumberscreen" element={<MobileNumberScreen />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/comingsoon/:title" element={<ComingSoon />} />

          <Route path="/onboardingimprove" element={<OnboardingFill />} />
        </Routes>
      </Router>
    </NativeBaseProvider>
  );
}

export default App;
