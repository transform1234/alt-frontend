import { Tab, telemetryFactory } from "@shiksha/common-lib";
import { useTheme } from "native-base";
import BaselineScore from "../pages/BaselineScore";
import CoursesScore from "../pages/CoursesScore";
import EndlineScore from "../pages/EndlineScore";
import React from "react";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function ScoreCard({ user, isDisabledLink }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  useEffect(() => {
    const telemetryImpression = {
      context: {
        env: "score-card",
        cdata: [],
      },
      edata: {
        type: "list", //Required. Impression type (list, detail, view, edit, workflow, search)

        subtype: "Scroll", //Optional. Additional subtype. "Paginate", "Scroll"

        pageid: "score-card", //Required.  Unique page id

        uid: "user-id",

        studentid: "student-id",
      },
    };
    telemetryFactory.impression(telemetryImpression);
  }, []);

  return (
    <Tab
      _item={{
        active: { bg: "primary", roundedTop: "20px" },
      }}
      _text={{
        color: "primary",
        active: { color: "white" },
      }}
      _itemBox={{
        style: { boxShadow: `inset 0px -1px 0px ${colors?.primary}` },
      }}
      routes={[
        { title: t("BASELINE"), component: <BaselineScore user={user} /> },
        {
          title: t("COURSES"),
          component: (
            <CoursesScore user={user} _coursesScoreCard={{ isDisabledLink }} />
          ),
        },
        {
          title: t("ENDLINE"),
          component: <EndlineScore user={user} />,
        },
      ]}
    />
  );
}
