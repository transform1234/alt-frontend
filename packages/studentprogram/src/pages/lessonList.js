import React from "react";
import {
  HStack,
  VStack,
  Stack,
  Pressable,
  Box,
  Button,
  Avatar,
} from "native-base";
import {
  Collapsible,
  Layout,
  H2,
  IconByName,
  BodyLarge,
  BodySmall,
  Caption,
  courseRegistryService,
  H1,
  Loading,
  SunbirdPlayer,
  useWindowSize,
  H3,
  RoundedProgressBar,
  NameTag,
  Breadcrumb,
} from "@shiksha/common-lib";
import { useNavigate, useParams } from "react-router-dom";
import manifest from "../manifest.json";
import { useTranslation } from "react-i18next";
import { subjectListRegistryService } from "@shiksha/common-lib";

export default function LessonList({ footerLinks }) {
  const { id, type } = useParams();
  const { t } = useTranslation();
  const [lessons, setLessons] = React.useState({});
  const [lessonLandingPage, setLessonLandingPage] = React.useState(true);
  const [lessonId, setLessonId] = React.useState();
  const [lesson, setLesson] = React.useState();
  const [width, height] = useWindowSize();
  const navigate = useNavigate();
  const [trackData, setTrackData] = React.useState();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(async () => {
    try {
      if (
        [
          "assessment",
          "SelfAssess",
          "QuestionSet",
          "QuestionSetImage",
        ].includes(type)
      ) {
        let resultData = await courseRegistryService.getOne({
          id: id,
          adapter: "diksha",
          coreData: true,
          type: "assessment",
        });

        let instructionData = await courseRegistryService.courseTrackingRead({
          id,
        });
        setLesson({
          ...resultData,
          instructions: instructionData?.instructions
            ? instructionData?.instructions
            : {},
        });
      } else if (["course", "Course"].includes(type)) {
        setLessons(
          await courseRegistryService.getOne({
            id: id,
            adapter: "diksha",
            coreData: "withLesonFilter",
            type: "course",
          })
        );
      }
      setLoading(false);
    } catch (e) {
      console.log({ e });
      setLoading(false);
    }
  }, [lessonId]);

  const handleExitButton = () => {
    setLesson();
    setLessonId();
    if (
      ["assessment", "SelfAssess", "QuestionSet", "QuestionSetImage"].includes(
        type
      )
    ) {
      navigate(-1);
    }
  };

  const handleTrackData = async (
    { score, trackData, attempts, ...props },
    playerType = "quml"
  ) => {
    let data = {};
    const programData = await subjectListRegistryService.getProgramId();
    if (playerType === "quml") {
      const newFormatData = trackData.reduce((oldData, newObj) => {
        const dataExist = oldData.findIndex(
          (e) => e.sectionId === newObj["item"]["sectionId"]
        );
        if (dataExist >= 0) {
          oldData[dataExist]["data"].push(newObj);
        } else {
          oldData = [
            ...oldData,
            {
              sectionId: newObj["item"]["sectionId"],
              sectionName: newObj["sectionName"] ? newObj["sectionName"] : "",
              data: [newObj],
            },
          ];
        }
        return oldData;
      }, []);
      data = {
        courseId: id,
        moduleId: id,
        lessonId: id,
        status: "completed",
        score: score,
        scoreDetails: JSON.stringify(newFormatData),
        program: programData?.programId,
        subject: lesson?.subject?.join(","),
      };
    } else {
      data = {
        courseId: id,
        moduleId: lessonId?.parent,
        lessonId: lessonId?.identifier,
        status: "completed",
        score: score ? score : 0,
        scoreDetails: JSON.stringify(props),
        program: programData?.programId,
        subject: lessons?.subject?.join(","),
      };
    }
    // console.log({ data });
    courseRegistryService.lessontracking(data);
  };

  React.useEffect(async () => {
    if (lessonId) {
      let resultData = await courseRegistryService.getContent({
        id: lessonId?.identifier,
        adapter: "diksha",
      });
      setLesson(resultData);
    }
  }, [lessonId]);

  if (lesson?.trakingData?.length > 0) {
    return (
      <Loading
        _center={{ alignItems: "center", width: "100%" }}
        customComponent={<H1>Great work! You've completed the assessment.</H1>}
      />
    );
  }

  if (lesson) {
    return (
      <Loading
        _center={{ alignItems: "center", width: "100%" }}
        customComponent={
          lessonLandingPage &&
          ![
            "assessment",
            "SelfAssess",
            "QuestionSet",
            "QuestionSetImage",
          ].includes(type) ? (
            <LessonLandingPage
              subject={lessons?.subject?.join(",")}
              data={lesson}
              setLessonLandingPage={setLessonLandingPage}
            />
          ) : trackData &&
            ![
              "assessment",
              "SelfAssess",
              "QuestionSet",
              "QuestionSetImage",
            ].includes(type) ? (
            <LessonResultPage
              type={type}
              setLesson={setLesson}
              setLessonId={setLessonId}
              trackData={trackData}
              subject={lessons?.subject?.join(",")}
              data={lesson}
              setTrackData={setTrackData}
            />
          ) : (
            <VStack {...{ width, height }}>
              <IconByName
                name="CloseCircleLineIcon"
                onPress={() => {
                  setLesson();
                  setLessonId();
                  if (
                    [
                      "assessment",
                      "SelfAssess",
                      "QuestionSet",
                      "QuestionSetImage",
                    ].includes(type)
                  ) {
                    navigate(-1);
                  }
                }}
                position="absolute"
                zIndex="10"
                right="4px"
                top="4px"
                _icon={{ size: 40 }}
                bg="white"
                p="0"
                rounded="full"
              />
              {lesson ? (
                <Box p="5" bg="#024f9d">
                  <H2 color="white">{lesson?.name}</H2>
                  <HStack space={1}>
                    <BodyLarge color="white">
                      {lesson?.subject?.join(", ")}
                    </BodyLarge>
                    <BodyLarge color="white">
                      {lesson?.gradeLevel?.join(", ")}
                    </BodyLarge>
                  </HStack>
                </Box>
              ) : (
                <React.Fragment />
              )}
              <SunbirdPlayer
                handleExitButton={handleExitButton}
                {...lesson}
                userData={{
                  firstName: localStorage.getItem("name"),
                  lastName: "",
                  // lastName: localStorage.getItem("lastName"),
                }}
                setTrackData={(data) => {
                  if (
                    [
                      "assessment",
                      "SelfAssess",
                      "QuestionSet",
                      "QuestionSetImage",
                    ].includes(type)
                  ) {
                    handleTrackData(data);
                  } else if (
                    [
                      "application/pdf",
                      "video/mp4",
                      "video/webm",
                      "video/x-youtube",
                    ].includes(lesson?.mimeType)
                  ) {
                    handleTrackData(data, "pdf-video");
                  } else {
                    if (
                      ["application/vnd.ekstep.ecml-archive"].includes(
                        lesson?.mimeType
                      )
                    ) {
                      if (Array.isArray(data)) {
                        const score = data.reduce(
                          (old, newData) => old + newData?.score,
                          0
                        );
                        handleTrackData({ ...data, score: `${score}` }, "ecml");
                        setTrackData(data);
                      } else {
                        handleTrackData({ ...data, score: `0` }, "ecml");
                      }
                    }
                  }
                }}
                // public_url="http://localhost:5000"
                public_url="https://alt-shiksha.uniteframework.io/"
              />
            </VStack>
          )
        }
      />
    );
  }

  return (
    <Layout
      loading={loading}
      _header={{
        title: lessons?.subject?.join(","),
        subHeadingComponent: (
          <Breadcrumb
            data={[
              { title: t("HOME"), link: "/" },
              { title: t("SUBJECTS"), link: "/studentprogram/subjects" },
              {
                title: lessons?.subject?.join(","),
                link: `/studentprogram/${lessons?.subject?.[0]}`,
              },
              lessons?.name,
            ]}
          />
        ),
      }}
      _appBar={{
        languages: manifest.languages,
        isBackButtonShow: false,
        isLanguageIcon: true,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack space={2} alignItems="center">
            <Avatar
              rounded={0}
              _image={{ rounded: 0 }}
              style={{ borderRadius: 0 }}
              source={require("../assets/images/TSHeader.jpg")}
            />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <Stack space="4" py="4" mb="5">
        {lessons?.children?.length > 0 ? (
          lessons?.children?.map((item, index) => (
            <Collapsible
              key={index}
              defaultCollapse={false}
              _box={{ bg: "transperent", py: 0 }}
              _header={{ bg: "white", rounded: "8" }}
              header={
                <VStack p="4" w="100%" space="4">
                  <HStack alignItems="center" space="4">
                    <VStack space="1">
                      <H2 color="blue.500">Day</H2>
                      <H1 color="selfassesment.warning">
                        {`${index + 1}`.padStart(2, 0)}
                      </H1>
                    </VStack>
                    <VStack space="2">
                      <BodyLarge>{item?.name}</BodyLarge>
                      <Caption>{item?.description}</Caption>
                    </VStack>
                  </HStack>
                </VStack>
              }
              fontSize="2px"
            >
              <VStack padding="4" space="4">
                {item?.children?.map((subItem, subIndex) => (
                  <Pressable
                    bg={"mylearning.white"}
                    key={subIndex}
                    onPress={() => {
                      // if (subItem?.trakingData?.length < 1) {
                      setLessonId({
                        mode: "false",
                        ...subItem,
                      });
                      // }
                    }}
                    rounded={"lg"}
                    shadow={4}
                    position="relative"
                  >
                    <HStack
                      justifyContent={"space-between"}
                      alignItems="center"
                      p="5"
                    >
                      <HStack space={4} alignItems="center">
                        {subItem?.posterImage ? (
                          <Avatar
                            source={{ uri: subItem?.posterImage }}
                            bg="transparent"
                            style={{ borderRadius: 0 }}
                            p="1"
                            shadow={4}
                          />
                        ) : (
                          <React.Fragment />
                        )}
                        <H2>{subItem?.name}</H2>
                      </HStack>
                      {subItem?.trakingData?.length < 1 ? (
                        <H3>
                          {subItem?.mimeType === "application/pdf" ? (
                            <IconByName name="FilePdfLineIcon" isDisabled />
                          ) : ["video/mp4", "video/webm"].includes(
                              subItem?.mimeType
                            ) ? (
                            <IconByName name="PlayFillIcon" isDisabled />
                          ) : [
                              "application/vnd.sunbird.question",
                              "application/vnd.sunbird.questionset",
                            ].includes(subItem?.mimeType) ? (
                            "QUML"
                          ) : ["application/vnd.ekstep.h5p-archive"].includes(
                              subItem?.mimeType
                            ) ? (
                            <IconByName name="PlayFillIcon" isDisabled />
                          ) : ["video/x-youtube"].includes(
                              subItem?.mimeType
                            ) ? (
                            <IconByName name="YoutubeLineIcon" isDisabled />
                          ) : [
                              "application/vnd.ekstep.ecml-archive",
                              "application/vnd.ekstep.html-archive",
                              "application/vnd.ekstep.content-collection",
                            ].includes(subItem?.mimeType) ? (
                            <IconByName name="PlayFillIcon" isDisabled />
                          ) : (
                            ""
                          )}
                        </H3>
                      ) : (
                        <React.Fragment />
                      )}
                    </HStack>
                    {subItem?.trakingData?.length > 0 ? (
                      <Box
                        bg={"selfassesment.cloverGreen"}
                        position="absolute"
                        right="0"
                        minW="60px"
                        minH="40px"
                        roundedLeft="full"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <IconByName
                          isDisabled
                          name={"CheckboxCircleLineIcon"}
                          color="white"
                          size="sm"
                        />
                      </Box>
                    ) : (
                      <React.Fragment />
                    )}
                  </Pressable>
                ))}
              </VStack>
            </Collapsible>
          ))
        ) : (
          <H1 textAlign={"center"} p="5">
            {t("LESSON_NOT_FOUND")}
          </H1>
        )}
      </Stack>
    </Layout>
  );
}

const LessonResultPage = ({
  subject,
  data,
  trackData,
  setLesson,
  setLessonId,
  type,
  setTrackData,
}) => {
  // console.log(data);
  const navigate = useNavigate();
  const score = trackData.reduce((old, newData) => old + newData?.score, 0);
  const average = (score * 100) / data?.totalScore;
  return (
    <VStack space="42px" alignItems="center">
      <VStack alignItems="center" space={"26px"}>
        <H1 color="selfassesment.darkGray5">Your Score for {subject}</H1>
        <Box rounded="full">
          <RoundedProgressBar
            values={[average, 100 - average]}
            colors={["#B6EC78", "#E9E9E9"]}
            title={{
              text: `${score}/${data?.totalScore}`,
              fontSize: "21px",
              _text: {
                style: { transform: "translate(-50%, -50%)" },
                color: "selfassesment.cloverGreen",
              },
            }}
            cutout={"70%"}
            size="107px"
          />
        </Box>
        <Button
          variant="secondary"
          flex={1}
          width="100%"
          minH={"57px"}
          _text={{ fontSize: "18px" }}
        >
          Good !
        </Button>
      </VStack>
      <BodySmall>
        You’re doing great! Start learning and improve your skills.
      </BodySmall>
      <Button
        variant="rounded"
        flex={1}
        width="100%"
        size={"lg"}
        onPress={() => {
          setLesson();
          setLessonId();
          setTrackData();
          if (
            [
              "assessment",
              "SelfAssess",
              "QuestionSet",
              "QuestionSetImage",
            ].includes(type)
          ) {
            navigate(-1);
          }
        }}
      >
        Start Learning
      </Button>
      <Button
        variant="link"
        flex={1}
        width="100%"
        onPress={() => {
          setLesson();
          setLessonId();
          setTrackData();
          if (
            [
              "assessment",
              "SelfAssess",
              "QuestionSet",
              "QuestionSetImage",
            ].includes(type)
          ) {
            navigate(-1);
          }
        }}
      >
        Back to Home
      </Button>
    </VStack>
  );
};
const LessonLandingPage = ({ subject, data, setLessonLandingPage }) => {
  return (
    <VStack space="4" alignItems="center">
      <HStack alignItems="center" space={2}>
        <IconByName
          isDisabled
          p="2"
          _icon={{ size: 25 }}
          color="selfassesment.primary"
          name="FilePaper2LineIcon"
        />
        <H1 color="selfassesment.darkGray5">{subject}</H1>
      </HStack>
      <Box
        bg="selfassesment.landingLight"
        rounded="full"
        p="50px"
        borderWidth={2}
        borderStyle="dashed"
        borderColor={"selfassesment.primary"}
      >
        <IconByName
          isDisabled
          p="2"
          _icon={{ size: 100 }}
          color="selfassesment.landingIcon"
          name="BookLineIcon"
        />
      </Box>
      <HStack alignItems="center" space={2}>
        {data?.totalQuestions ? (
          <HStack alignItems="center">
            <IconByName
              isDisabled
              p="2"
              _icon={{ size: 25 }}
              color="selfassesment.warning"
              name="FileTextLineIcon"
            />
            <BodyLarge>{`${data?.totalQuestions} Questions`}</BodyLarge>
          </HStack>
        ) : (
          <React.Fragment />
        )}

        {data?.totalQuestions ? (
          <HStack alignItems="center">
            <IconByName
              isDisabled
              p="2"
              _icon={{ size: 25 }}
              color="selfassesment.warning"
              name="TimerLineIcon"
            />
            <BodyLarge>{`${data?.totalQuestions} Minutes`}</BodyLarge>
          </HStack>
        ) : (
          <React.Fragment />
        )}
      </HStack>
      <BodySmall>Lets assess your English Skills</BodySmall>
      <Button
        variant="rounded"
        flex={1}
        width="100%"
        rightIcon={
          <IconByName
            isDisabled
            p="2"
            _icon={{ size: 25 }}
            color="selfassesment.white"
            name="ArrowRightLineIcon"
          />
        }
        onPress={(e) => setLessonLandingPage(false)}
      >
        Begin Assessment
      </Button>
    </VStack>
  );
};
