import React from "react";

const StudentLogin = React.lazy(() => import("core/StudentLogin"));

export const GuestRoutes = [
  {
    moduleName: "StudentLogin",
    path: "/",
    component: StudentLogin,
  },
];
