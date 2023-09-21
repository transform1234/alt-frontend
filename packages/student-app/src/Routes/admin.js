import React from "react";
const HomePage = React.lazy(() => import("admin/HomePage"));
const StudentPage = React.lazy(() => import("admin/StudentPage"));
const TeacherPage = React.lazy(() => import("admin/TeacherPage"));
const SchoolPage = React.lazy(() => import("admin/SchoolPage"));

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

export default routes;
