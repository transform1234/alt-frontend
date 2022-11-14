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
} from "@shiksha/common-lib";
export const maxWidth = "750";

const style = {
  gradient: {
    background: "linear-gradient(90deg, #B6EC78 0.16%, #3DCE3A 103.79%)",
  },
};

export default function SubjectScoreCard({ subject }) {
  const { colors } = useTheme();
  const [trackData, setTrackData] = React.useState([]);
  const [score, setScore] = React.useState(0);
  const [totalScore, setTotalScore] = React.useState(0);

  React.useEffect(() => {
    const getTraking = async () => {
      const data = await subjectListRegistryService.getProgramId();
      if (data?.programId) {
        const dataRuls = await selfAssesmentService.getCoursesRule({
          programId: data?.programId,
          subject,
        });
        setTotalScore(dataRuls?.[0]?.maxScore);
        setScore(
          dataRuls?.[0]?.trakingData?.[0]?.score
            ? dataRuls[0].trakingData[0].score
            : 0
        );
        setTrackData(
          dataRuls?.[0]?.trakingData?.[0]
            ? JSON.parse(dataRuls[0].trakingData[0].scoreDetails)
            : []
        );
      }
    };
    getTraking();
  }, []);

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
              <IconByName name color="yellow.500" />
            </Avatar>
            <H1 alignItems="center" color="primary">
              {subject}
            </H1>
          </HStack>
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
                  (old, newData) => old + (newData?.score ? newData?.score : 0),
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

          {/* {window.innerWidth < maxWidth && (
            <Center>
              <Box rounded="full">
                <RoundedProgressBar
                  values={[10, 100 - 10]}
                  colors={[
                    colors.successBarColor,
                    colors.circleProgressBarcolor,
                  ]}
                  title={{
                    text: "8/10",
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
            </Center>
          )}
          {window.innerWidth >= maxWidth && (
            <Center w="100%">
              <Box w="100%" maxW="600">
                <Progress
                  bg={colors.circleProgressBarcolor}
                  _filledTrack={{
                    bg: "lime.500",
                  }}
                  size="xl"
                  value={10}
                  mx="4"
                />
              </Box>
              0/0
            </Center>
          )} */}
        </VStack>
      </Stack>
    </Box>
  );
}
