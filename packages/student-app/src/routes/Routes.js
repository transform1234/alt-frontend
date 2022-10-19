import Home from "../pages/Home";
import React from "react";

const Selfassesment = React.lazy(() => import("selfassesment/SelfAssesment"));
const SelfassesmentLessonList = React.lazy(() =>
  import("selfassesment/Lessons")
);
const ComingSoon = React.lazy(() => import("core/ComingSoon"));

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
    moduleName: "comingsoon",
    path: "/comingsoon",
    component: ComingSoon,
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
