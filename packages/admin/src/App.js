import React from "react";

import "./App.css";
import { AppShell } from "@shiksha/common-lib";
import StudentPage from "pages/StudentPage";
import HomePage from "pages/HomePage";
import TeacherPage from "pages/TeacherPage";
import SchoolPage from "pages/SchoolPage";
function App() {
  const routes = [
    {
      moduleName: "admin",
      path: "/",
      component: HomePage,
    },
    {
      moduleName: "admin",
      path: "/studentpage",
      component: StudentPage,
    },
    {
      moduleName: "admin",
      path: "/teacherpage",
      component: TeacherPage,
    },
    {
      moduleName: "admin",
      path: "/schoolpage",
      component: SchoolPage,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));

  return (
    <AppShell
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      _authComponent={{ swPath: "/modules/admin" }}
    />
  );
}

export default App;
