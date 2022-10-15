import Home from "../pages/Home";
import React from "react";

const Selfassesment = React.lazy(() => import("selfassesment/SelfAssesment"));
const SelfassesmentLessonList = React.lazy(() =>
  import("selfassesment/Lessons")
);
const CommingSoon = React.lazy(() => import("core/CommingSoon"));

export const routes = [
  // selfAssessment Routes
  {
    moduleName: "selfassesment",
    path: "/selfassesment",
    component: Selfassesment,
  },
  {
    moduleName: "selfassesment",
    path: "/selfassesment/lessons/:id/:type",
    component: SelfassesmentLessonList,
  },
  {
    moduleName: "commingsoon",
    path: "/commingsoon",
    component: CommingSoon,
  },
  {
    path: "/selfassesment/subjects",
    component: SelfassesmentSubjectList,
  },
  {
    moduleName: "student-app",
    path: "/",
    component: Home,
  },
];
