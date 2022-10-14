import {
  HStack,
  VStack,
  Stack,
  Button,
  Avatar,
  Pressable,
  Box,
} from "native-base";
import {
  Layout,
  IconByName,
  ProgressBar,
  BodyLarge,
  studentProgramService,
  Caption,
  NameTag,
} from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import { useParams } from "react-router-dom";

export default function CourseList({ footerLinks }) {
  const [courseList, setCoursesList] = useState([]);
  const coursesList = [];
  const { subjectName } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(async () => {
    const data = await studentProgramService.getCoursesRule();
    setCoursesList(data);
  }, []);

  return (
    <Layout
      _header={{
        title: "Get Started",
      }}
      _appBar={{
        languages: [],
        isShowNotificationButton: false,
        isBackButtonShow: false,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack space={2} alignItems="center">
            <Avatar
              style={{ borderRadius: "0px !important" }}
              size="md"
              source={require("../assets/images/ssaicon.png")}
              w="37px"
              h="21px"
            />
            <Avatar
              style={{ borderRadius: "0px !important" }}
              size="md"
              source={require("../assets/images/tsIcon.png")}
              w="20px"
              h="20px"
            />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <Stack space="4" p="4" mb="5">
        {courseList?.map((item) => {
          return item?.name === "QuestionSet 1" ? (
            <Pressable
              onPress={() => {
                console.log(item);
                navigate(
                  `/${subjectName}/courses/${item?.identifier}/lessons/${item?.contentType}`
                );
              }}
              position="relative"
            >
              <VStack p="4" bg="white" space="4" roundedLeft="20">
                <HStack space="4">
                  <Avatar
                    bg="yellow.500"
                    size="30"
                    {...(item?.appIcon
                      ? {
                          source: {
                            uri: item?.appIcon,
                          },
                        }
                      : {})}
                  >
                    <IconByName name="UserLineIcon" isDisabled color="white" />
                  </Avatar>
                  <VStack space="2" flex={1}>
                    <BodyLarge>{item?.name}</BodyLarge>
                    {/* <Caption>{item?.description}</Caption> */}
                  </VStack>
                </HStack>

                <ProgressBar
                  // isTextRight={
                  //   <BodyLarge color="success">Not started</BodyLarge>
                  // }
                  h="15px"
                  _bar={{
                    overflow: "visible",
                    space: "2",
                    alignItems: "center",
                  }}
                  data={[{ name: "0/8", color: "#EAA95A", value: "0" }]}
                  isLabelCountHide
                />
              </VStack>
              <Box
                bg="blue.700"
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
                  name="ArrowRightLineIcon"
                  color="white"
                  size="sm"
                />
              </Box>
            </Pressable>
          ) : (
            <Pressable
              disabled={true}
              onPress={() =>
                navigate(
                  `/studentprogram/lessons/${item?.identifier}/${item?.contentType}`
                )
              }
              position="relative"
            >
              <VStack p="4" bg="#f1f1f1" space="4" roundedLeft="20">
                <HStack space="4">
                  <Avatar
                    bg="grey.500"
                    size="30"
                    {...(item?.appIcon
                      ? {
                          source: {
                            uri: item?.appIcon,
                          },
                        }
                      : {})}
                  >
                    <IconByName name="UserLineIcon" isDisabled color="white" />
                  </Avatar>
                  <VStack space="2" flex={1}>
                    <BodyLarge>{item?.name}</BodyLarge>
                    {/* <Caption>{item?.description}</Caption> */}
                  </VStack>
                </HStack>

                <ProgressBar
                  isTextRight={<BodyLarge color="success"></BodyLarge>}
                  h="15px"
                  _bar={{
                    overflow: "visible",
                    space: "2",
                    alignItems: "center",
                  }}
                  data={[{ name: "8/8", color: "green", value: "0" }]}
                  isLabelCountHide
                />
              </VStack>
              <Box
                bg="#f1f1f1"
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
                  name="ArrowRightLineIcon"
                  color="white"
                  size="sm"
                />
              </Box>
            </Pressable>
          );
        })}
      </Stack>
    </Layout>
  );
}
