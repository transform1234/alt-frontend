import React from "react";
import {
  Box,
  Stack,
  VStack,
  HStack,
  Avatar,
  Center,
  Progress,
} from "native-base";
import {
  capture,
  Layout,
  NameTag,
  Heading,
  useWindowSize,
  IconByName,
  H1,
  H4,
  ProgressBar,
  Tab,
  RoundedProgressBar,
  overrideColorTheme,
} from "@shiksha/common-lib";
import colorTheme from "../colorTheme";

import { useTranslation } from "react-i18next";
import { useParams, useLocation } from "react-router-dom";
const colors = overrideColorTheme(colorTheme);
export const maxWidth = "750";

console.log(window.innerWidth, maxWidth);

export default function subjectScoreListCard({
  subject,
  value,
  icon,
  scoreval,
  level,
}) {
  console.log(subject, value, icon, scoreval);
  return (
    <Box>
      <Stack space="2" p="4" mb="3">
        <VStack
          backgroundColor={""}
          p="5"
          bg="#fffbfa"
          space="5"
          rounded="20px"
          position="relative"
          //   alignItems={value === 0 ? "center" : ""}
        >
          <HStack space="4" alignItems="center">
            <Avatar bg="white" size="30">
              <IconByName name={icon} color="yellow.500" />
            </Avatar>
            <H1 alignItems="center" color="primary">
              {subject}
            </H1>
          </HStack>

          {value !== 0 && (
            <HStack>
              <Box rounded="full">
                <RoundedProgressBar
                  values={[value, 100 - value]}
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

              <Stack w={"70%"}>
                {value != 0 &&
                  level?.map((val, idx) => {
                    return (
                      <HStack ml={"8"}>
                        {val}
                        <Box w="70%" mb={"4"}>
                          <VStack space="md">
                            <Progress
                              bg="coolGray.100"
                              _filledTrack={{
                                bg: "lime.500",
                              }}
                              size="xl"
                              value={value}
                              mx="4"
                            />
                          </VStack>
                        </Box>
                        4/5
                      </HStack>
                    );
                  })}
              </Stack>
            </HStack>
          )}
          {window.innerWidth < maxWidth && value === 0 && (
            <Center>
              <Box rounded="full">
                <RoundedProgressBar
                  values={[value, 100 - value]}
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

          {window.innerWidth >= maxWidth && value === 0 && (
            <Center w="100%">
              <Box w="100%" maxW="600">
                <Progress
                  bg={colors.circleProgressBarcolor}
                  _filledTrack={{
                    bg: "lime.500",
                  }}
                  size="xl"
                  value={value}
                  mx="4"
                />
              </Box>
              0/0
            </Center>
          )}
        </VStack>
      </Stack>
    </Box>
  );
}
