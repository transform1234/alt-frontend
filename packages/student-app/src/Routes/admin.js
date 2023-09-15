import React from "react";
const HomePage = React.lazy(() => import("admin/src/pages/HomePage"));
const StudentPage = React.lazy(() => import("admin/src/pages/StudentPage"));
const TeacherPage = React.lazy(() => import("admin/src/pages/TeacherPage"));

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
];

export default routes;
