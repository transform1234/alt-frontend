import React from "react";
import TeacherHome from "../pages/TeacherHome";
import Students from "../pages/Students";
import Report from "pages/Report";
import Groups from "pages/Groups";

const routes = [
  {
    moduleName: "student-app",
    path: "/",
    component: TeacherHome,
  },
  {
    moduleName: "reports",
    path: "/students/:id",
    component: Report,
    props: { isDisabledLink: true },
  },
  {
    moduleName: "student-app",
    path: "/students",
    component: Students,
  },
  {
    moduleName: "student-app",
    path: "/groups",
    component: Groups,
  },
];

export default routes;
