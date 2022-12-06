import { Tab } from "@shiksha/common-lib";
import { useTheme } from "native-base";
import BaselineScore from "pages/BaselineScore";
import ComingSoon from "pages/ComingSoon";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ScoreCard({ userId }) {
  const { t } = useTranslation();
  const { colors } = useTheme();

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
        { title: t("BASELINE"), component: <BaselineScore userId={userId} /> },
        {
          title: t("COURSES"),
          component: <ComingSoon _box={{ py: "5" }} />,
        },
        {
          title: t("ENDLINE"),
          component: <ComingSoon _box={{ py: "5" }} />,
        },
      ]}
    />
  );
}
