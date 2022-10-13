import React from "react";

import "./App.css";
import { AppShell, initializeI18n } from "@shiksha/common-lib";
import Home from "pages/Home";

const OnboardingFill = React.lazy(() => import("core/OnboardingFill"));
const StudentLogin = React.lazy(() => import("core/StudentLogin"));
const Flash = React.lazy(() => import("core/Flash"));

const Studentprogram = React.lazy(() =>
  import("studentprogram/StudentProgram")
);
const StudentprogramLessonList = React.lazy(() =>
  import("studentprogram/Lessons")
);

const StudentprogramSubjectList = React.lazy(() =>
  import("studentprogram/subjectList")
);
const CommingSoon = React.lazy(() => import("core/CommingSoon"));

function App() {
  initializeI18n(
    ["studentApp"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );
  const routes = [
    // selfAssessment Routes
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
      moduleName: "commingsoon",
      path: "/commingsoon",
      component: CommingSoon,
    },
    {
      path: "/studentprogram/subjects",
      component: StudentprogramSubjectList,
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

        {
          moduleName: "studentprogram",
          path: "/studentprogram",
          component: Studentprogram,
        },
        {
          moduleName: "studentprogram",
          path: "/studentprogram/lessons",
          component: StudentprogramLessonList,
        },
        {
          moduleName: "subjectList",
          path: "/studentprogram/subjects",
          component: StudentprogramSubjectList,
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
