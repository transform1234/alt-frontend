import React from "react";
import {
  Box,
  Stack,
  VStack,
  HStack,
  Avatar,
  Progress,
  useTheme,
  Pressable,
} from "native-base";
import {
  IconByName,
  H1,
  subjectListRegistryService,
  selfAssesmentService,
  H3,
  courseRegistryService,
} from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";
export const maxWidth = "750";

const style = {
  gradient: {
    background: "linear-gradient(90deg, #B6EC78 0.16%, #3DCE3A 103.79%)",
  },
};

export default function CoursesScoreCard({ subject, user, isDisabledLink }) {
  const { colors } = useTheme();
  const [trackData, setTrackData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const getTraking = async () => {
      try {
        let data = {};
        if (user) {
          data = await subjectListRegistryService.getProgramId({
            board: user?.board,
            medium: user?.medium,
            grade: user?.grade,
          });
        } else {
          data = await subjectListRegistryService.getProgramId();
        }
        if (data?.programId) {
          const status = await courseRegistryService.courseStatus({
            userId: user?.id,
            programId: data?.programId,
            subject: subject,
          });
          const dataRuls = await selfAssesmentService.getCoursesRule({
            programId: data?.programId,
            subject,
            filter: { userId: user?.id, coreData: "withLesonFilter" },
          });

          if (Array.isArray(dataRuls)) {
            setTrackData(
              dataRuls
                .filter((item) => item.courseType === "course")
                .map((item) => {
                  let children = [];
                  item.children.forEach((item) => {
                    if (Array.isArray(item.children)) {
                      children = [...children, ...item.children];
                    }
                  });
                  const totalScore = children.length;
                  const score = children.filter(
                    (item) => item?.trakingData?.length > 0
                  ).length;
                  const value = Math.round((score * 100) / totalScore);
                  const isComplete = status.find(
                    (subItem) => item.identifier === subItem?.contentId
                  );
                  return {
                    sectionName: item?.name,
                    identifier: item?.identifier,
                    objectType: item?.objectType,
                    contentType: item?.contentType,
                    value: isComplete?.status === "locked" ? 0 : value,
                    status: isComplete?.status,
                  };
                })
            );
          }
          setLoading(false);
        }
      } catch (e) {
        console.log({ e });
        setLoading(false);
      }
    };
    getTraking();
  }, []);

  if (loading) {
    return <React.Fragment />;
  }

  return (
    <Box>
      <Stack space="2" mb="3">
        <VStack
          p="5"
          bg="#fffbfa"
          space="5"
          rounded="20px"
          position="relative"
          //   alignItems={value === 0 ? "center" : ""}
        >
          <HStack space="4" alignItems="center">
            <Avatar bg="white" size="30">
              <IconByName
                name
                color={trackData.length > 0 ? "yellow.500" : "lightGray1"}
              />
            </Avatar>
            <H1
              alignItems="center"
              color={trackData.length > 0 ? "primary" : "lightGray1"}
            >
              {subject}
            </H1>
          </HStack>
          {trackData.length > 0 ? (
            <HStack>
              <Stack w={"100%"}>
                {trackData?.map((val, idx) => {
                  return (
                    <VStack key={idx} space={2}>
                      <Pressable
                        isDisabled={val?.status === "locked" || isDisabledLink}
                        {...([
                          "assessment",
                          "SelfAssess",
                          "QuestionSet",
                          "QuestionSetImage",
                        ].includes(val?.objectType)
                          ? {
                              onPress: () =>
                                navigate(
                                  `/studentprogram/lessons/${val?.identifier}/${val?.objectType}`
                                ),
                            }
                          : {
                              onPress: () =>
                                navigate(
                                  `/studentprogram/lessons/${val?.identifier}/${val?.contentType}`
                                ),
                            })}
                      >
                        <HStack alignItems="center" space="1">
                          <H3
                            color={
                              val?.status === "locked"
                                ? "lightGray1"
                                : isDisabledLink
                                ? "darkGray4"
                                : "primary"
                            }
                          >
                            {val?.sectionName}
                          </H3>
                          {val?.status && !isDisabledLink ? (
                            <IconByName
                              isDisabled
                              name="LinksLineIcon"
                              color={
                                val?.status === "locked"
                                  ? "lightGray1"
                                  : "primary"
                              }
                              _icon={{ size: "16px" }}
                            />
                          ) : (
                            <React.Fragment />
                          )}
                        </HStack>
                      </Pressable>
                      <HStack space={2}>
                        <Box w="85%" mb={"4"}>
                          <VStack space="md">
                            <Progress
                              bg="coolGray.100"
                              _filledTrack={{ style: style.gradient }}
                              size="xl"
                              value={val?.value}
                            />
                          </VStack>
                        </Box>
                        <H3
                          color={val?.status === "locked" ? "lightGray1" : ""}
                        >
                          {val?.value}%
                        </H3>
                      </HStack>
                    </VStack>
                  );
                })}
              </Stack>
            </HStack>
          ) : (
            <React.Fragment />
          )}
        </VStack>
      </Stack>
    </Box>
  );
}
