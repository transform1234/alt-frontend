import React from "react";
import "./App.css";
import {
  AppShell,
  getAuthUser,
  initializeI18n,
  telemetryFactory,
} from "@shiksha/common-lib";
import studentRoutes from "./Routes/students";
import teacherRoutes from "./Routes/teachers";
import adminRoutes from "./Routes/admin";
const StudentLogin = React.lazy(() => import("core/StudentLogin"));
import { teachers, students } from "./config/footerLinks";
import ReactGA from "react-ga";

function App() {
  const [routes, setRoutes] = React.useState([]);
  const [footerLinks, setFooterLinks] = React.useState([]);
  const [theme, setTheme] = React.useState("alt");

  let isGAInitialized = false;

  ReactGA.initialize("G-Z4XM1F8HWP");

  isGAInitialized = true;

  if (isGAInitialized) {
    console.log("Google Analytics is initialized.");
  } else {
    console.log("Google Analytics is not initialized.");
  }

  initializeI18n(
    ["studentApp"],
    `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`
  );

  React.useEffect(() => {
    const getData = async () => {
      const user = await getAuthUser();
      if (user?.role === "teacher") {
        setTheme("teacheralt");
        setRoutes(teacherRoutes);
        setFooterLinks(teachers);
      }
      if (user?.role === "systemAdmin") {
        setTheme("adminalt");
        setRoutes(adminRoutes);
      } else {
        setRoutes(studentRoutes);
        setFooterLinks(students);
      }
    };
    getData();
    telemetryFactory.init(); //TODO: Enable this when all the telemetry endpoints are set
  }, []);

  const skipLogin = !(
    process.env.REACT_APP_OAUTH_PROXY_ENABLED == undefined ||
    JSON.parse(process.env.REACT_APP_OAUTH_PROXY_ENABLED) == false
  );

  return (
    <AppShell
      AuthComponent={StudentLogin}
      themeName={theme}
      footerLinks={footerLinks}
      basename={process.env.PUBLIC_URL}
      routes={routes}
      guestRoutes={[
        {
          path: "/",
          component: StudentLogin,
        },
      ]}
      isShowFooterLink={true}
      appName="Teacher App"
      skipLogin={skipLogin}
    />
  );
}

export default App;
