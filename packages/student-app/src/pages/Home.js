import React, { useEffect } from "react";
import { Box, Stack, VStack, HStack, Avatar, Image } from "native-base";
import {
  capture,
  Layout,
  Widget,
  NameTag,
  H3,
  subjectListRegistryService,
  selfAssesmentService,
  courseRegistryService,
  telemetryFactory,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import manifest from "../../src/manifest.json";
import moment from "moment";

function Home({ footerLinks }) {
  const { t } = useTranslation();
  const [subjects, setSubjects] = React.useState([]);
  const [courses, setCourses] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const userName = localStorage.getItem("name");
  const grade = localStorage.getItem("grade");
  const medium = localStorage.getItem("medium");
  const id = localStorage.getItem("id");
  const board = localStorage.getItem("board");

  useEffect(() => {
    const telemetryImpression = {
      context: {
        env: "home",
        cdata: [],
      },
      edata: {
        type: "view", //Required. Impression type (list, detail, view, edit, workflow, search)

        subtype: "Scroll", //Optional. Additional subtype. "Paginate", "Scroll"

        pageid: "home", //Required.  Unique page id

        uid: id,

        studentid: "student-id",

        userName: userName,

        grade: grade,

        medium: medium,

        board: board,
      },
    };
    telemetryFactory.impression(telemetryImpression);
  });

  const getData = () => {
    const resultDate =
      courses && Array.isArray(courses)
        ? courses?.map((course) => {
            return {
              link: `/studentprogram/${
                course?.subject ? course?.subject?.[0].toLowerCase() : ""
              }`,
              title: course?.name,
              subTitle: `${
                course?.subject ? course?.subject?.join(", ") + "," : ""
              } ${
                course?.gradeLevel
                  ? course?.gradeLevel?.join(", ") + ","
                  : course?.se_gradeLevel
                  ? course?.se_gradeLevel?.join(", ") + ","
                  : ""
              } ${t("MEDIUM")} ${
                course?.medium
                  ? course?.medium?.join(", ")
                  : course?.se_mediums
                  ? course?.se_mediums?.join(", ")
                  : ""
              }`,
              _box: {
                style: {
                  background:
                    "linear-gradient(100.88deg, #90c7ef -21.15%, #145788 80.4%)",
                },
              },
            };
          })
        : [
            {
              subTitle: `No data, Start consuming course to see current phases`,
              _box: {
                style: {
                  background:
                    "linear-gradient(100.88deg, rgb(211 212 215) -21.15%, rgb(149 149 149) 80.4%)",
                },
              },
            },
          ];
    return resultDate;
  };

  const widgetData = [
    {
      title: t("FUN_ACTIVITY"),
      link: "/",
      data: [
        {
          link: "/fun-activity",

          title: t("FUN_ACTIVITY"),

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
      title: t("QUICK_CHECK"),
      link: "/studentprogram",
      data: [
        {
          link: "/studentprogram/subjects",
          title: t("SUBJECTS"),
          subTitle: subjects.join(", "),
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
      title: t("ONGOING"),
      link: "/studentprogram",
      data: getData(),
    },
  ];

  React.useEffect(() => {
    capture("PAGE");
    const subjects = async () => {
      try {
        const pro = await subjectListRegistryService.getProgramId();
        const data = await subjectListRegistryService.getSubjectList();
        setSubjects(data?.map((item) => item.subject));
        const courseData = await subjectListRegistryService.getOngoingCourses({
          programId: pro?.programId,
        });
        const ids = courseData.map((o) => o.name);
        let filteredData = courseData.filter(
          ({ name }, index) => !ids.includes(name, index + 1)
        );
        setCourses(filteredData);
        setLoading(false);
      } catch (e) {
        console.log({ e });
        setLoading(false);
      }
    };
    subjects();
  }, []);

  return (
    <Layout
      loading={loading}
      _header={{
        title: t("HOME"),
        subHeading: moment().format("hh:mm A"),
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
