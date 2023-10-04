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
import { useEffect } from "react";
import getNewAccessToken from "api's/getNewAccessToken";

function App() {
  const [routes, setRoutes] = React.useState([]);
  const [footerLinks, setFooterLinks] = React.useState([]);
  const [theme, setTheme] = React.useState("alt");

  let isGAInitialized = false;

  ReactGA.initialize("G-NV600D4RP8");

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
      } else if (user?.role === "systemAdmin") {
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

  useEffect(() => {
    // Call checkTokenValidity to start checking immediately after the component is mounted
    checkTokenValidity();
  }, []);

  function checkTokenValidity() {
    console.log("INSIDE checkTokenValidity");
    const refreshToken = localStorage.getItem("refreshToken");
    console.log("INSIDE tokenCheckInterval2 ");
    console.log(refreshToken);
    if (Object.keys(refreshToken).length) {
      const interval = 30 * 60 * 1000; // 30 minutes
      // const interval = 2 * 1000; // 2 seconds

      const tokenCheckInterval = setInterval(async () => {
        console.log("INSIDE tokenCheckInterval");
        try {
          const response = await fetch(
            "https://alt.uniteframework.io/auth/realms/hasura-app/protocol/openid-connect/token/introspect",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `client_id=hasura-app&token=${refreshToken}&client_secret=ixoAI89JICldF5xF9Y8cgDGJrbOu6SGw`,
            }
          );
          console.log("REFRESH check");
          console.log(response.ok);

          if (response.ok == false) {
            const result = await getNewAccessToken();
            const newAccessToken = result.access_token;
            const newrefreshToken = result.refresh_token;
            localStorage.setItem("token", newAccessToken);
            localStorage.setItem("token", newrefreshToken);
          } else {
            return;
          }
        } catch (error) {
          console.error("Error checking token:", error);
        }
      }, interval);
    }
  }

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
