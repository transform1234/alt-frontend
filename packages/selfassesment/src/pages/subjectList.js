import {
  HStack,
  Text,
  VStack,
  Stack,
  Box,
  Button,
  Actionsheet,
  Pressable,
  ScrollView,
  Avatar,
} from "native-base";
import {
  Layout,
  SubMenu,
  Tab,
  classRegistryService,
  H2,
  H1,
  IconByName,
  ProgressBar,
  BodyLarge,
  selfAssesmentService,
  Caption,
  NameTag,
} from "@shiksha/common-lib";

import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { courses } from "../assets/mocCourses";
import manifest from "../manifest.json";

export default function SubjectList({ footerLinks }) {
  const navigate = useNavigate();
  const SubjectList = [
    {
      subject: "Mathematics",
      icon: "data:image/png;base64,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",
      status: "Start Learning",
      name: "Mathematics",
    },
    {
      subject: "English",
      icon: "data:image/png;base64,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",
      status: "Start Assesment",
      name: "English",
    },
    {
      subject: "Science",
      icon: "data:image/png;base64,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",
      status: "Start Assesment",
      name: "Science",
    },
    {
      subject: "Hindi",
      icon: "data:image/png;base64,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",
      status: "Start Assesment",
      name: "Hindi",
    },
  ];
  return (
    <Layout
      _header={{
        title: "Getting Started",
      }}
      _appBar={{
        languages: [],
        isBackButtonShow: false,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack>
            <Avatar
              style={{ borderRadius: "0px !important" }}
              size="md"
              source={require("../assets/images/ssaicon.png")}
            />
            <Avatar
              style={{ borderRadius: "0px !important" }}
              size="md"
              source={require("../assets/images/tsIcon.png")}
            />
          </HStack>
        ),
        rightIcon: (
          <HStack>
            <IconByName name="Notification2LineIcon" />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <Stack space="10" p="10" mb="20">
        {SubjectList?.map((item, index) => (
          //  return (
          <Pressable
            onPress={() => navigate(`${item?.name}/courses`)}
            position="relative"
          >
            <VStack
              alignItems="center"
              p="10"
              bg={index ? "#fffbfa" : "#e5fcf5"}
              space="10"
              borderColor={index ? "#fff" : "success"}
              borderWidth="1"
              rounded="20px"
              position="relative"
            >
              <HStack space="10" alignItems="center">
                <Avatar
                  bg="transparent"
                  style={{ borderRadius: "0px !important" }}
                  size="lg"
                  source={{
                    uri: item?.icon,
                  }}
                />

                <Text alignItems="center" fontSize="24px" bold>
                  {item?.subject}
                </Text>
              </HStack>

              <Button
                colorScheme="purple"
                rounded="full"
                position="absolute"
                bottom="-25"
                minW="30%"
              >
                <H2 color="white"> {item?.status}</H2>
              </Button>
            </VStack>
          </Pressable>
          // );
        ))}
      </Stack>
    </Layout>
  );
}
