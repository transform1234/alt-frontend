import React from "react";
const HomePage = React.lazy(() => import("admin/src/pages/HomePage"));
const StudentPage = React.lazy(() => import("admin/src/pages/StudentPage"));
const TeacherPage = React.lazy(() => import("admin/src/pages/TeacherPage"));

const routes = [
  {
    moduleName: "student-app",
    path: "/",
    component: HomePage,
  },
  {
    moduleName: "student-app",
    path: "/studentpage",
    component: StudentPage,
  },
  {
    moduleName: "student-app",
    path: "/teacherpage",
    component: TeacherPage,
  },
];

export default routes;
