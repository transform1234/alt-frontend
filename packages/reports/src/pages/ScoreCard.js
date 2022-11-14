import React from "react";
import { Box, HStack, Avatar } from "native-base";
import { capture, Layout, NameTag, Tab } from "@shiksha/common-lib";
import manifest from "../../src/manifest.json";
import { useTranslation } from "react-i18next";

const BaselineScore = React.lazy(() => import("./BaselineScore"));
const ComingSoon = React.lazy(() => import("./ComingSoon"));
function ScoreCard({ footerLinks }) {
  const { t } = useTranslation();
  React.useEffect(() => {
    capture("PAGE");
  }, []);

  return (
    <Layout
      _header={{
        title: t("SCORE_CARD"),
      }}
      _appBar={{
        languages: manifest.languages,
        isLanguageIcon: true,

        isShowNotificationButton: false,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack>
            <Avatar
              rounded={0}
              _image={{ rounded: 0 }}
              style={{ borderRadius: 0 }}
              source={require("../../src/assets/images/TSHeader.jpg")}
            />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <Box bg="#f1f1f1" p="5" mb="4" roundedBottom={"xl"} shadow={2}>
        <Tab
          _box={{
            display: "flex",
            overflowX: "auto",
            p: "2",
          }}
          routes={[
            { title: t("BASELINE"), component: <BaselineScore /> },
            { title: t("COURSES"), component: <ComingSoon /> },
            { title: t("ENDLINE"), component: <ComingSoon /> },
          ]}
        />
      </Box>
    </Layout>
  );
}
export default ScoreCard;
