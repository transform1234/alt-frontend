import React from "react";

import "./App.css";
import { AppShell } from "@shiksha/common-lib";
import ScoreCard from "pages/Report";

function App() {
  const routes = [
    {
      moduleName: "reports",
      path: "/scorecard",
      component: ScoreCard,
    },
  ];
  const LoginComponent = React.lazy(() => import("core/Login"));
  const skipLogin = !(
    process.env.REACT_APP_OAUTH_PROXY_ENABLED == undefined ||
    JSON.parse(process.env.REACT_APP_OAUTH_PROXY_ENABLED) == false
  );

  return (
    <AppShell
      basename={process.env.PUBLIC_URL}
      routes={routes}
      AuthComponent={LoginComponent}
      skipLogin={skipLogin}
      _authComponent={{ swPath: "/modules/reports" }}
    />
  );
}

export default App;
