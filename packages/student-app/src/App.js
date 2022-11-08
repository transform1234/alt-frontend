import React from "react";
import "./App.css";
import { AppShell, initializeI18n } from "@shiksha/common-lib";
import Home from "pages/Home";

const StudentLogin = React.lazy(() => import("core/StudentLogin"));

const Studentprogram = React.lazy(() => import("studentprogram/courseList"));
const StudentprogramLessonList = React.lazy(() =>
  import("studentprogram/Lessons")
);

const StudentprogramSubjectList = React.lazy(() =>
  import("studentprogram/subjectList")
);

const ComingSoon = React.lazy(() => import("core/ComingSoon"));
const ScorecardReport = React.lazy(() => import("reports/ScoreCard"));

const Dashboard = React.lazy(() => import("core/ComingSoon"));
const Certificate = React.lazy(() => import("core/ComingSoon"));

function App() {
  initializeI18n(
    ["studentApp"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    // studentprogram Routes
    {
      moduleName: "studentprogram",
      path: "/studentprogram/:subjectname",
      component: Studentprogram,
    },
    {
      moduleName: "studentprogram",
      path: "/studentprogram",
      component: Studentprogram,
    },
    {
      moduleName: "studentprogram",
      path: "/studentprogram/lessons/:id/:type",
      component: StudentprogramLessonList,
    },
    {
      moduleName: "reports",
      path: "/scorecard",
      component: ScorecardReport,
    },
    {
      moduleName: "student-app",
      path: "/comingsoon/:title",
      component: ComingSoon,
    },
    {
      moduleName: "studentprogram",
      path: "/studentprogram/subjects",
      component: StudentprogramSubjectList,
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
