import React from "react";
import "./App.css";
import { initializeI18n, AppShell } from "@shiksha/common-lib";

import { routes } from "./Routes";

//TODO: separate out the theme related code from App
initializeI18n(["translation", "core", "attendance"]);

function App() {
  const LoginComponent = React.lazy(() => import("core/Login"));
  const Signup = React.lazy(() => import("core/Signup"));
  const MobileNumberScreen = React.lazy(() =>
    import("core/MobileNumberScreen")
  );
  const Flash = React.lazy(() => import("core/Flash"));
  const OTP = React.lazy(() => import("core/OTP"));
  const Onboarding = React.lazy(() => import("core/Onboarding"));
  const OnboardingFill = React.lazy(() => import("core/OnboardingFill"));
  const StudentLogin = React.lazy(() => import("core/StudentLogin"));
  const skipLogin = !(
    process.env.REACT_APP_OAUTH_PROXY_ENABLED == undefined ||
    JSON.parse(process.env.REACT_APP_OAUTH_PROXY_ENABLED) == false
  );

  return (
    <AppShell
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={Onboarding}
      guestRoutes={[
        {
          path: "/signup",
          component: Signup,
        },
        {
          path: "/mobilenumberscreen",
          component: MobileNumberScreen,
        },
        {
          path: "/otp",
          component: OTP,
        },
        {
          path: "/onboarding",
          component: Onboarding,
        },
        {
          path: "/onboardingimprove",
          component: OnboardingFill,
        },
        {
          path: "/login",
          component: StudentLogin,
        },
        {
          path: "/",
          component: Flash,
        },
      ]}
      isShowFooterLink={true}
      appName="Teacher App"
      skipLogin={skipLogin}
    />
  );
}
export default App;
