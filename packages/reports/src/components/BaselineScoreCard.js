import React from "react";
import {
  Box,
  Stack,
  VStack,
  HStack,
  Avatar,
  Center,
  Progress,
  useTheme,
} from "native-base";
import {
  IconByName,
  H1,
  RoundedProgressBar,
  subjectListRegistryService,
  selfAssesmentService,
  userRegistryService,
} from "@shiksha/common-lib";
export const maxWidth = "750";

const style = {
  gradient: {
    background: "linear-gradient(90deg, #B6EC78 0.16%, #3DCE3A 103.79%)",
  },
};

export default function BaselineScoreCard({ subject, user }) {
  const { colors } = useTheme();
  const [trackData, setTrackData] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [totalScore, setTotalScore] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

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
          const dataRuls = await selfAssesmentService.getCoursesRule({
            programId: data?.programId,
            subject,
            filter: { userId: user?.id },
          });

          if (Array.isArray(dataRuls)) {
            const data = dataRuls.find(
              (item) => item.courseType === "baseline"
            );

            if (data) {
              setTotalScore(data?.maxScore);
              setScore(
                data?.trakingData?.[0]?.score ? data.trakingData[0].score : 0
              );
              setTrackData(
                data?.trakingData?.[0]
                  ? JSON.parse(data.trakingData[0].scoreDetails)
                  : []
              );
            }
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
      <Stack space="2" p="4" mb="3">
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
              <Box rounded="full">
                <RoundedProgressBar
                  values={[score, totalScore - score]}
                  colors={[
                    colors?.reports?.primaryGreen,
                    colors?.reports?.barGray,
                  ]}
                  title={{
                    text: `${score} / ${totalScore}`,
                    fontSize: "21px",
                    _text: {
                      style: { transform: "translate(-50%, -50%)" },
                      color: "selfassesment.cloverGreen",
                    },
                  }}
                  cutout={"70%"}
                  size="125px"
                />
              </Box>

              <Stack w={"70%"}>
                {trackData?.map((val, idx) => {
                  const totalScore = val?.data?.reduce(
                    (old, newData) =>
                      old +
                      (newData?.item?.maxscore ? newData?.item?.maxscore : 0),
                    0
                  );
                  const score = val?.data?.reduce(
                    (old, newData) =>
                      old + (newData?.score ? newData?.score : 0),
                    0
                  );
                  const value = (score * 100) / totalScore;
                  return (
                    <HStack ml={"8"} key={idx}>
                      {val?.sectionName}
                      <Box w="70%" mb={"4"}>
                        <VStack space="md">
                          <Progress
                            bg="coolGray.100"
                            _filledTrack={{ style: style.gradient }}
                            size="xl"
                            value={value}
                            mx="4"
                          />
                        </VStack>
                      </Box>
                      {score}/{totalScore}
                    </HStack>
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
