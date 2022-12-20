import Home from "pages/Home";
import React from "react";
const Studentprogram = React.lazy(() => import("studentprogram/courseList"));
const StudentprogramLessonList = React.lazy(() =>
  import("studentprogram/Lessons")
);
const StudentprogramSubjectList = React.lazy(() =>
  import("studentprogram/subjectList")
);
const ComingSoon = React.lazy(() => import("core/ComingSoon"));
const Report = React.lazy(() => import("reports/Report"));

const routes = [
  {
    moduleName: "studentprogram",
    path: "/studentprogram/:subjectname",
    component: Studentprogram,
  },
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
    moduleName: "reports",
    path: "/scorecard",
    component: Report,
    props: { isDisabledLink: false },
  },
  {
    moduleName: "student-app",
    path: "/comingsoon/:title",
    component: ComingSoon,
  },
  {
    moduleName: "studentprogram",
    path: "/studentprogram/subjects",
    component: StudentprogramSubjectList,
  },

  {
    moduleName: "student-app",
    path: "/Settings",
    component: ComingSoon,
  },
  {
    moduleName: "student-app",
    path: "/certificate",
    component: ComingSoon,
  },
  {
    moduleName: "student-app",
    path: "/",
    component: Home,
  },
];
export default routes;
