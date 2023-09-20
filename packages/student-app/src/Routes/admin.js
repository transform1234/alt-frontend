import React from "react";
const HomePage = React.lazy(() => import("admin/HomePage"));
const StudentPage = React.lazy(() => import("admin/StudentPage"));
const TeacherPage = React.lazy(() => import("admin/TeacherPage"));

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
