import React, { useEffect } from "react";
import styles from "./HomePage.module.css";
import { H2, Heading, BodyLarge, Widget } from "@shiksha/common-lib";
import { Layout, NameTag } from "@shiksha/common-lib";
import { Box, Stack, VStack, HStack, Avatar, Image, Button } from "native-base";
import { useTranslation } from "react-i18next";
import moment from "moment";
import manifest from "../../src/manifest.json";
import "ag-grid-community/styles/ag-grid.css";


function HomePage() {
  const [loading, setLoading] = React.useState(false);
  const { t } = useTranslation();

  const widgetData = [
    {
      //   title: t("Student"),
      link: "/",
      data: [
        {
          //   title: t("FUN_ACTIVITY"),
          link: "/schoolpage",
          title: <H2>Manage School</H2>,
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
      //   title: t("QUICK_CHECK"),
      link: "/",
      data: [
        {
          //   title: t("FUN_ACTIVITY"),
          link: "/teacherpage",
          title: <H2>Manage Teacher</H2>,

          _box: {
            style: {
              background:
                "linear-gradient(281.03deg, #FC5858 -21.15%, #F8AF5A 100.04%)",
            },
          },
        },
      ],
    },

    {
      //   title: t("Student"),
      link: "/",
      data: [
        {
          link: "/studentpage",

          title: <H2>Manage Student</H2>,

          _box: {
            style: {
              background:
                "linear-gradient(100.88deg, #90c7ef -21.15%, #145788 80.4%)",
            },
          },
        },
      ],
    },
    {
      //   title: t("FUN_ACTIVITY"),
      // link: "/",
      // data: [
      //   {
      //     link: "/fun-activity",
      //     title: <H2>Group Add</H2>,
      //     _box: {
      //       style: {
      //         background:
      //           "linear-gradient(100.88deg, rgb(211 212 215) -21.15%, rgb(149 149 149) 80.4%)",
      //       },
      //     },
      //   },
      // ],
    },
  ];

  return (
    <div className={styles.mainDiv}>
      <Layout
        loading={loading}
        _header={{
          title: t("ADMIN PANEL"),
          subHeading: moment().format("hh:mm:ss A"),
        }}
        _appBar={{
          languages: manifest.languages,
          isLanguageIcon: true,
          isShowNotificationButton: false,
          titleComponent: <NameTag />,
          _text_logo: <HStack></HStack>,

          LeftIcon: (
            <HStack>
              <img
                width={"100px"}
                src={require("./../assets/images/TSHeader.png")}
              />
            </HStack>
          ),
        }}
        _footer={{
          menues: [
            {
              title: "HOME",
              icon: "Home4LineIcon",
              route: "/",
            },
            {
              title: "STUDENT",
              icon: "TeamLineIcon",
              route: "/studentpage",
            },
            {
              title: "SCHOOL",
              icon: "GovernmentLineIcon",
              route: "/schoolpage",
            },

            {
              title: "TEACHER",
              icon: "UserLineIcon",
              route: "/teacherpage",
            },
          ],
        }}
      >
        <Box bg="white" rounded={"2x1"} py={6} px={4} mb={5} shadow={3}>
          <Stack>
            <VStack space={6}>
              <Box display={"inline"}>
                Welcome to the Admin Panel. Please choose one of the following
                entities to manage records. Within each entity, you have the
                capability to perform various operations.
              </Box>
              <div className={styles.gridContainer}>
                {widgetData.map((item, index) => {
                  return (
                    <div className={styles.gridItem} key={index}>
                      <Widget {...item} />
                    </div>
                  );
                })}
              </div>
            </VStack>
          </Stack>
        </Box>
      </Layout>
    </div>
  );
}

export default HomePage;
