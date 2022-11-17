import React from "react";
import { Box, HStack, Avatar, useTheme } from "native-base";
import { Breadcrumb, capture, Layout, NameTag, Tab } from "@shiksha/common-lib";
import manifest from "../../src/manifest.json";
import { useTranslation } from "react-i18next";

const BaselineScore = React.lazy(() => import("./BaselineScore"));
const ComingSoon = React.lazy(() => import("./ComingSoon"));
function ScoreCard({ footerLinks }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  React.useEffect(() => {
    capture("PAGE");
  }, []);

  return (
    <Layout
      _header={{
        title: t("SCORE_CARD"),
        subHeadingComponent: (
          <Breadcrumb
            data={[{ title: t("HOME"), link: "/" }, t("SCORE_CARD")]}
          />
        ),
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
      <Box px="5" mb="4">
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
            { title: t("BASELINE"), component: <BaselineScore /> },
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
      </Box>
    </Layout>
  );
}
export default ScoreCard;
