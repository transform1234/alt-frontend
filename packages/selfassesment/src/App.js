import React from "react";

import "./App.css";
import { AppShell } from "@shiksha/common-lib";
import courseList from "pages/courseList";
import { hotjar } from "react-hotjar";
import LessonList from "pages/lessonList";

function App() {
  const routes = [
    {
      moduleName: "selfassesment",
      path: "/selfassesment",
      component: courseList,
    },
    {
      moduleName: "selfassesment",
      path: "/selfassesment/lessons/:id",
      component: LessonList,
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
      skipLogin={skipLogin}
      _authComponent={{ swPath: "/modules/selfassessment" }}
    />
  );
}

export default App;
