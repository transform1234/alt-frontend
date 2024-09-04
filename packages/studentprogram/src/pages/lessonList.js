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
  const [moduleTracking, setModuleTracking] = React.useState([]);
  const [lessonLandingPage, setLessonLandingPage] = React.useState(true);
  const [lessonId, setLessonId] = React.useState();
  const [lesson, setLesson] = React.useState();
  const [width, height] = useWindowSize();
  const navigate = useNavigate();
  const [trackData, setTrackData] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const updateAllowSkipProperty = (data) => {
    const updatedData = JSON.parse(JSON.stringify(data));
    // Creating a deep copy of JSON data that
    //we are getting from SUNBIRD API

    // Helper function that will recursively update "allowSkip" property from YES TO NO from all places.
    const updateAllowSkipRecursive = (obj) => {
      for (const key in obj) {
        if (obj[key] && typeof obj[key] === "object") {
          updateAllowSkipRecursive(obj[key]); // Recursive call for nested objects
        } else if (key === "allowSkip" && obj[key] === "Yes") {
          obj[key] = "No"; // Update "allowSkip" to "No"
        }
      }
    };

    updateAllowSkipRecursive(updatedData);

    return updatedData;
  };

  const setLessonData = async (id) => {
    id = id.replace(".img", "");
    let resultData = await courseRegistryService.getOne({
      id: id,
      adapter: "diksha",
      coreData: true,
      type: "assessment",
    });

    let instructionData = await courseRegistryService.courseTrackingRead({
      id,
    });
    const newData = {
      ...resultData,
      instructions: instructionData?.instructions
        ? instructionData?.instructions
        : {},
    };

    const updatedAssessmentData = await updateAllowSkipProperty(newData);
    setLesson(updatedAssessmentData);
  };

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
        setLessonData(id);
      } else if (["course", "Course"].includes(type)) {
        const data = await courseRegistryService.moduleTracking({
          userId: localStorage.getItem("id"),
        });
        setModuleTracking(data);
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
    navigate(0);
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
    { score, attempts, ...props },
    playerType = "quml"
  ) => {
    let data = {};
    let trackDataold = localStorage.getItem("trackDATA");
    let trackData = JSON.parse(trackDataold);
    const programData = await subjectListRegistryService.getProgramId();
    let scoreDetails;

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
      scoreDetails = JSON.stringify(newFormatData);
      const timeSpentString = localStorage.getItem("totalDuration");
      const formattedNumber =
        timeSpentString.slice(0, -3) + "." + timeSpentString.slice(-3);
      const timeSpentInt = parseFloat(formattedNumber);
      const inSeconds = Math.ceil(timeSpentInt);
      const trimmedid = id.replace(".img", "");
      data = {
        courseId: trimmedid,
        moduleId: trimmedid,
        lessonId: trimmedid,
        status: "completed",
        contentType: localStorage.getItem("contentType"),
        timeSpent: isNaN(inSeconds) ? 0 : inSeconds,
        score: score,
        scoreDetails: scoreDetails,
        program: programData?.programId,
        subject: lesson?.subject?.join(","),
      };
    } else {
      scoreDetails = JSON.stringify(props);
      const timeSpentString = localStorage.getItem("totalDuration");
      const formattedNumber =
        timeSpentString.slice(0, -3) + "." + timeSpentString.slice(-3);
      const timeSpentInt = parseFloat(formattedNumber);
      const inSeconds = Math.ceil(timeSpentInt);
      const trimmedid = id.replace(".img", "");
      data = {
        courseId: trimmedid,
        moduleId: lessonId?.parent,
        lessonId: lessonId?.identifier,
        status: "completed",
        contentType: localStorage.getItem("contentType"),
        timeSpent: isNaN(inSeconds) ? 0 : inSeconds,
        score: score ? score : 0,
        scoreDetails: scoreDetails,
        program: programData?.programId,
        subject: lessons?.subject?.join(","),
      };
    }
    await courseRegistryService.lessontracking(data);
  };

  React.useEffect(async () => {
    if (lessonId) {
      if (lessonId.mimeType === "application/vnd.sunbird.questionset") {
        setLessonData(lessonId?.identifier);
      } else {
        const resultData = await courseRegistryService.getContent({
          id: lessonId?.identifier,
          adapter: "diksha",
        });
        setLesson(resultData);
      }
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
          ["application/vnd.ekstep.ecml-archive"].includes(lesson?.mimeType) ? (
            <LessonLandingPage
              subject={lessons?.subject?.join(",")}
              data={lesson}
              setLessonLandingPage={setLessonLandingPage}
            />
          ) : trackData &&
            ["application/vnd.ekstep.ecml-archive"].includes(
              lesson?.mimeType
            ) ? (
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
                {...{ width, height: height - 64 }}
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
                    ["application/vnd.sunbird.questionset"].includes(
                      lesson?.mimeType
                    )
                  ) {
                    handleTrackData(
                      data,
                      "application/vnd.sunbird.questionset"
                    );
                  } else if (
                    [
                      "application/pdf",
                      "video/mp4",
                      "video/webm",
                      "video/x-youtube",
                      "application/vnd.ekstep.h5p-archive",
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
                public_url="https://alt.uniteframework.io"
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
          lessons?.children?.map((item, index) => {
            const moduleTrackingData = moduleTracking.find(
              (e) => e.moduleId === item.identifier
            );
            return (
              <Collapsible
                key={index}
                defaultCollapse={false}
                _box={{ bg: "transperent", p: 0, px: 4 }}
                _icon={{
                  ...(moduleTrackingData?.status === "completed" ? {} : {}),
                }}
                _header={{
                  bg:
                    moduleTrackingData?.status === "completed"
                      ? "white"
                      : "white",
                  rounded: "8",
                }}
                header={
                  <VStack p="4" w="100%" space="4">
                    <HStack alignItems="center" space="4">
                      <Avatar
                        bg={
                          moduleTrackingData?.status === "completed"
                            ? "selfassesment.cloverGreen"
                            : "primary"
                        }
                      >
                        <IconByName
                          name={
                            moduleTrackingData?.status === "completed"
                              ? "CheckboxCircleLineIcon"
                              : "ListUnorderedIcon"
                          }
                          color="white"
                          isDisabled
                          _icon={{ size: 35 }}
                        />
                      </Avatar>
                      <VStack space="2">
                        <BodyLarge
                          color={
                            moduleTrackingData?.status === "completed" ? "" : ""
                          }
                        >
                          {item?.name}
                        </BodyLarge>
                        <Caption
                          color={
                            moduleTrackingData?.status === "completed" ? "" : ""
                          }
                        >
                          {item?.description}
                        </Caption>
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
                        setLessonId(subItem);
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
                          ) : subItem?.mimeType === "application/pdf" ? (
                            <IconByName name="FilePdfLineIcon" isDisabled />
                          ) : ["video/mp4", "video/webm"].includes(
                              subItem?.mimeType
                            ) ? (
                            <IconByName name="PlayFillIcon" isDisabled />
                          ) : [
                              "application/vnd.sunbird.question",
                              "application/vnd.sunbird.questionset",
                            ].includes(subItem?.mimeType) ? (
                            <IconByName name="PlayFillIcon" isDisabled />
                          ) : ["application/vnd.ekstep.h5p-archive"].includes(
                              subItem?.mimeType
                            ) ? (
                            <H3>H5P</H3>
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
                          <H2>{subItem?.name}</H2>
                        </HStack>
                        {subItem?.trakingData?.length < 1 ? (
                          <IconByName name="ArrowRightSLineIcon" isDisabled />
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
            );
          })
        ) : (
          <H1 textAlign={"center"} p="5">
            {t("LOADING")}
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
