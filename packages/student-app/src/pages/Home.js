import React from "react";
import { Box, Stack, VStack, HStack, Avatar } from "native-base";
import { capture, Layout, Widget, NameTag } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";

function Home({ footerLinks }) {
  const { t } = useTranslation();

  const widgetData = [
    {
      title: t("QUICK_CHECK"),
      link: "/selfassesment",
      data: [
        {
          link: "/selfassesment",
          title: "Learn",
          subTitle: "Sub title learn",
          _box: {
            style: {
              background:
                "linear-gradient(281.03deg, #6461d2 -21.15%, #8583f7 100.04%)",
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
      }}
      _appBar={{
        languages: manifest.languages,
        isShowNotificationButton: true,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack>
            <Avatar
              style={{ borderRadius: "0px !important" }}
              size="md"
              source={require("./../assets/images/ssaicon.png")}
            />
            <Avatar
              style={{ borderRadius: "0px !important" }}
              size="md"
              source={require("./../assets/images/tsIcon.png")}
            />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <Box bg="white" rounded={"2xl"} py={6} px={4} mb={5} shadow={3}>
        <Stack>
          <VStack space={6}>
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
