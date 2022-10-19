import React from "react";
import "./App.css";
import { AppShell, initializeI18n } from "@shiksha/common-lib";
import Home from "pages/Home";

const StudentLogin = React.lazy(() => import("core/StudentLogin"));

const Selfassesment = React.lazy(() => import("selfassesment/SelfAssesment"));
const SelfassesmentLessonList = React.lazy(() =>
  import("selfassesment/Lessons")
);

const SelfassesmentSubjectList = React.lazy(() =>
  import("selfassesment/subjectList")
);

const ComingSoon = React.lazy(() => import("core/ComingSoon"));
const Dashboard = React.lazy(() => import("core/ComingSoon"));
const Certificate = React.lazy(() => import("core/ComingSoon"));

function App() {
  initializeI18n(
    ["studentApp"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    // selfAssessment Routes
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
      moduleName: "student-app",
      path: "/comingsoon/:title",
      component: ComingSoon,
    },
    {
      moduleName: "selfassesment",
      path: "/selfassesment/subjects",
      component: SelfassesmentSubjectList,
    },

    {
      moduleName: "student-app",
      path: "/Settings",
      component: Dashboard,
    },
    {
      moduleName: "student-app",
      path: "/Certificate",
      component: Certificate,
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
          path: "/",
          component: StudentLogin,
        },
      ]}
      isShowFooterLink={true}
      appName="Teacher App"
      skipLogin={skipLogin}
    />
  );
}

export default App;
