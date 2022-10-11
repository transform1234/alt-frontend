import React from "react";

import "./App.css";
import { AppShell, initializeI18n } from "@shiksha/common-lib";
import Home from "pages/Home";

const OnboardingFill = React.lazy(() => import("core/OnboardingFill"));
const StudentLogin = React.lazy(() => import("core/StudentLogin"));
const Flash = React.lazy(() => import("core/Flash"));

const Selfassesment = React.lazy(() => import("selfassesment/SelfAssesment"));
const SelfassesmentLessonList = React.lazy(() =>
  import("selfassesment/Lessons")
);
const SelfassesmentSubjectList = React.lazy(() =>
  import("selfassesment/subjects")
);

function App() {
  initializeI18n(
    ["studentApp"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    // selfAssessment Routes
    {
      moduleName: "selfassesment",
      path: "/selfassesment/subjects",
      component: SelfassesmentSubjectList,
    },
    {
      moduleName: "selfassesment",
      path: "/selfassesment",
      component: Selfassesment,
    },
    {
      moduleName: "selfassesment",
      path: "/selfassesment/lessons/:id/:type",
      component: SelfassesmentLessonList,
    },
    {
      path: "/onboardingimprove",
      component: OnboardingFill,
    },
    {
      moduleName: "student-app",
      path: "/",
      component: Home,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));
  const skipLogin = !(
    process.env.REACT_APP_OAUTH_PROXY_ENABLED == undefined ||
    JSON.parse(process.env.REACT_APP_OAUTH_PROXY_ENABLED) == false
  );

  return (
    <AppShell
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      guestRoutes={[
        {
          path: "/login",
          component: StudentLogin,
        },
        {
          path: "/",
          component: Flash,
        },
        {
          moduleName: "selfassesment",
          path: "/selfassesment",
          component: Selfassesment,
        },
        {
          moduleName: "selfassesment",
          path: "/selfassesment/lessons",
          component: SelfassesmentLessonList,
        },
        {
          moduleName: "selfassesment",
          path: "/selfassesment/subjects",
          component: SelfassesmentSubjectList,
        },
        {
          moduleName: "student-app",
          path: "/student",
          component: Home,
        },
      ]}
      isShowFooterLink={true}
      appName="Teacher App"
      skipLogin={skipLogin}
    />
  );
}

export default App;
