import React from "react";
import { Box, Stack, VStack, HStack, Avatar } from "native-base";
import { capture, Layout, Widget, NameTag } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import moment from "moment";

function Home({ footerLinks }) {
  const { t } = useTranslation();

  const widgetData = [
    {
      title: t("QUICK_CHECK"),
      link: "/selfassesment",
      data: [
        {
          link: "/selfassesment/subjects",
          title: "Subjects",
          subTitle: "TBD",
          _box: {
            style: {
              background:
                "linear-gradient(281.03deg, #FC5858 -21.15%, #F8AF5A 100.04%)",
            },
          },
        },
        {
          link: "/commingsoon",
          title: "Score Card",
          subTitle: "TBD",
          _box: {
            style: {
              background:
                "linear-gradient(281.88deg, #D7BEE6 -21.15%, #B143F3 80.4%)",
            },
          },
        },
      ],
    },
    {
      title: t("TODAY_TASK"),
      link: "/selfassesment",
      data: [
        {
          link: "/selfassesment",
          title: "Baseline assessment",
          subTitle: "TBD",
          _box: {
            bg: "widgetColor.800",
          },
          _text: { color: "warmGray.700" },
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
        languages: [],

        isShowNotificationButton: false,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack>
            <Avatar
              style={{ borderRadius: "0px !important" }}
              // size="md"
              source={require("./../assets/images/TSHeader.jpg")}
            />
            {/* <Avatar
              style={{ borderRadius: "0px !important" }}
              size="md"
              source={require("./../assets/images/tsIcon.png")}
            /> */}
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <Box bg="white" rounded={"2xl"} py={6} px={4} mb={5} shadow={3}>
        <Stack>
          <VStack space={6}>
            <Box>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Box>
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
