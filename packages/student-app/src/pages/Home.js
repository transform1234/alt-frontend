import React from "react";
import { Box, Stack, VStack, HStack, Avatar, Image } from "native-base";
import {
  capture,
  Layout,
  Widget,
  NameTag,
  convertFirstLetterCapital,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import manifest from "../../src/manifest.json";
import moment from "moment";

function Home({ footerLinks }) {
  const { t } = useTranslation();
  let medium = localStorage.getItem("medium");
  const section = localStorage.getItem("class");
  const Medium = medium ? convertFirstLetterCapital(medium) : "English";

  const widgetData = [
    {
      title: t("QUICK_CHECK"),
      link: "/studentprogram",
      data: [
        {
          link: "/studentprogram/subjects",
          title: t("SUBJECTS"),
          subTitle: t("SUBJECT_NAME"),
          _box: {
            style: {
              background:
                "linear-gradient(281.03deg, #FC5858 -21.15%, #F8AF5A 100.04%)",
            },
          },
        },
        {
          link: "/scorecard",
          title: t("SCORE_CARD"),
          subTitle: t("COMING_SOON"),
          _box: {
            style: {
              background:
                "linear-gradient(102.88deg, #D7BEE6 -5.88%, #B143F3 116.6%)",
            },
          },
        },
      ],
    },
    {
      title: t("TODAY_TASK"),
      link: "/studentprogram",
      data: [
        {
          link: "/studentprogram",
          title: t("BASELINE_ASSIGNMENT"),
          subTitle: `${t("ENGLISH")}, ${t("CLASS")} ${section}, ${Medium} ${t(
            "MEDIUM"
          )}`,
          _box: {
            style: {
              background:
                "linear-gradient(100.88deg, #90c7ef -21.15%, #145788 80.4%)",
            },
          },
        },
      ],
    },
  ];

  React.useEffect(() => {
    capture("PAGE");
  }, []);

  return (
    <Layout
      _header={{
        title: t("HOME"),
        subHeading: moment().format("hh:mm A"),
      }}
      _appBar={{
        languages: manifest.languages,

        isShowNotificationButton: false,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack>
            <Avatar
              rounded={0}
              _image={{ rounded: 0 }}
              style={{ borderRadius: 0 }}
              source={require("./../assets/images/TSHeader.jpg")}
            />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <Box bg="white" rounded={"2xl"} py={6} px={4} mb={5} shadow={3}>
        <Stack>
          <VStack space={6}>
            <Box display={"inline"}>{t("SUBTITLE_HOME")}</Box>
            {widgetData.map((item, index) => {
              return <Widget {...item} key={index} />;
            })}
          </VStack>
        </Stack>
      </Box>
    </Layout>
  );
}
export default Home;
