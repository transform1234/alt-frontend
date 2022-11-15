import Home from "../pages/Home";
import React from "react";

const Studentprogram = React.lazy(() =>
  import("studentprogram/studentprogram")
);
const StudentprogramLessonList = React.lazy(() =>
  import("studentprogram/Lessons")
);
const ComingSoon = React.lazy(() => import("core/ComingSoon"));

export const routes = [
  // studentprogram Routes
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
    moduleName: "comingsoon",
    path: "/comingsoon",
    component: ComingSoon,
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
