import React from "react";
import { HStack, VStack, Stack, Pressable, Box, Button } from "native-base";
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
} from "@shiksha/common-lib";
import { useNavigate, useParams } from "react-router-dom";
import manifest from "../manifest.json";

const demoData = [
  {
    index: 1,
    pass: "No",
    score: 1,
    duration: 2,
  },
  {
    index: 2,
    pass: "Yes",
    score: 0,
    duration: 3,
  },
];

export default function LessonList({ footerLinks }) {
  const { id, type } = useParams();
  const [lessons, setLessons] = React.useState({});
  const [lessonLandingPage, setLessonLandingPage] = React.useState(true);
  const [lessonId, setLessonId] = React.useState();
  const [lesson, setLesson] = React.useState();
  const [width, height] = useWindowSize();
  const navigate = useNavigate();
  const [trackData, setTrackData] = React.useState();

  React.useEffect(async () => {
    if (["assessment", "SelfAssess", "QuestionSet"].includes(type)) {
      let resultData = await courseRegistryService.getOne({
        id: id,
        adapter: "diksha",
        coreData: true,
        type: "assessment",
      });
      setLesson(resultData);
    } else if (["course", "Course"].includes(type)) {
      setLessons(
        await courseRegistryService.getOne({
          id: id,
          adapter: "diksha",
          coreData: true,
          type: "course",
        })
      );
    }
  }, []);

  React.useEffect(async () => {
    if (lessonId) {
      let resultData = await courseRegistryService.getContent({
        id: lessonId?.identifier,
        adapter: "diksha",
      });
      setLesson(resultData);
    }
  }, [lessonId]);

  if (lesson) {
    return (
      <Loading
        _center={{ alignItems: "center", width: "100%" }}
        customComponent={
          lessonLandingPage &&
          !["assessment", "SelfAssess", "QuestionSet"].includes(type) ? (
            <LessonLandingPage
              subject={"English"}
              data={lesson}
              setLessonLandingPage={setLessonLandingPage}
            />
          ) : trackData &&
            !["assessment", "SelfAssess", "QuestionSet"].includes(type) ? (
            <LessonResultPage
              type={type}
              setLesson={setLesson}
              trackData={trackData}
              subject={"English"}
              data={lesson}
            />
          ) : (
            <VStack {...{ width, height }}>
              <IconByName
                name="CloseCircleLineIcon"
                onPress={() => {
                  setLesson();
                  if (
                    ["assessment", "SelfAssess", "QuestionSet"].includes(type)
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
              <SunbirdPlayer
                {...lesson}
                setTrackData={setTrackData}
                public_url="http://localhost:5000"
                // public_url="https://alt-shiksha.uniteframework.io/"
              />
            </VStack>
          )
        }
      />
    );
  }

  return (
    <Layout
      _appBar={{
        languages: [],
        isBackButtonShow: false,
        isShowNotificationButton: true,
        LeftIcon: <HStack>English</HStack>,
      }}
      _footer={footerLinks}
    >
      <Stack space="4" py="4" mb="5">
        {lessons?.children?.map((item, index) => (
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
                    <Caption> course 1</Caption>
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
                    setLessonId({
                      mode: "false",
                      ...subItem,
                    });
                  }}
                  p="5"
                  rounded={"lg"}
                  shadow={4}
                >
                  <HStack justifyContent={"space-between"} alignItems="center">
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
                    <H3>
                      {subItem?.mimeType === "application/pdf"
                        ? "PDF"
                        : subItem?.mimeType === "video/mp4"
                        ? "Video"
                        : [
                            "application/vnd.sunbird.question",
                            "application/vnd.sunbird.questionset",
                          ].includes(subItem?.mimeType)
                        ? "QUML"
                        : [
                            "application/vnd.ekstep.ecml-archive",
                            "application/vnd.ekstep.html-archive",
                          ].includes(subItem?.mimeType)
                        ? "Content"
                        : ""}
                    </H3>
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </Collapsible>
        ))}
      </Stack>
    </Layout>
  );
}

const LessonResultPage = ({ subject, data, trackData, setLesson, type }) => {
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
        You’re doing great! Start learning and improve your skills.{" "}
      </BodySmall>
      <Button
        variant="rounded"
        flex={1}
        width="100%"
        size={"lg"}
        onPress={() => {
          setLesson();
          if (["assessment", "SelfAssess", "QuestionSet"].includes(type)) {
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
          if (["assessment", "SelfAssess", "QuestionSet"].includes(type)) {
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
