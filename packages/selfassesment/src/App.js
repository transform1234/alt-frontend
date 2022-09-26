import React from "react";

import "./App.css";
import { AppShell } from "@shiksha/common-lib";
import courseList from "pages/courseList";
import LessonList from "pages/lessonList";

function App() {
  const routes = [
    {
      moduleName: "selfassesment",
      path: "/",
      component: courseList,
    },
    // {
    //   moduleName: "selfassesment",
    //   path: "*",
    //   component: courseList,
    // },
    {
      moduleName: "selfassesment",
      path: "/lessons",
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
      _authComponent={{ swPath: "/modules/worksheet" }}
    />
  );
}

export default App;
