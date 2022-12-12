import React from "react";
import {
  Box,
  Stack,
  VStack,
  HStack,
  Avatar,
  Progress,
  useTheme,
} from "native-base";
import {
  IconByName,
  H1,
  subjectListRegistryService,
  selfAssesmentService,
  userRegistryService,
  H3,
  ProgressBar,
} from "@shiksha/common-lib";
export const maxWidth = "750";

const style = {
  gradient: {
    background: "linear-gradient(90deg, #B6EC78 0.16%, #3DCE3A 103.79%)",
  },
};

export default function CoursesScoreCard({ subject, userId }) {
  const { colors } = useTheme();
  const [trackData, setTrackData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const getTraking = async () => {
      try {
        let data = {};
        if (userId) {
          const user = await userRegistryService.getOne({ id: userId });
          console.log({ user });
          data = await subjectListRegistryService.getProgramId({
            board: user?.board,
            medium: user?.medium,
            grade: user?.grade,
          });
        } else {
          data = await subjectListRegistryService.getProgramId();
        }
        if (data?.programId) {
          const dataRuls = await selfAssesmentService.getCoursesRule({
            programId: data?.programId,
            subject,
            filter: { userId, coreData: "withLesonFilter" },
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
                  return {
                    sectionName: item?.name,
                    value,
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
                      <H3>{val?.sectionName}</H3>
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
                        <H3>{val?.value}%</H3>
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
