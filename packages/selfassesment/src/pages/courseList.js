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
  selfAssesmentService,
  Caption,
  NameTag,
} from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
import CommonCourseList from "components/CommonCourseList";

export default function CourseList({ footerLinks }) {
  const [courseList, setCoursesList] = useState([]);
  const coursesList = [];
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(async () => {
    const data = await selfAssesmentService.getCoursesRule();
    setCoursesList(data);
  }, []);
  console.log("hello");
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
              // style={{ borderRadius: "0px !important" }}
              size="md"
              source={require("./../assets/images/Transform Schools _PFA.png")}
              // w="37px"
              // h="21px"
            />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <Stack space="4" p="4" mb="5">
        {courseList?.map((item, key) => {
          return (
            <CommonCourseList
              identifier={item?.identifier}
              contentType={item?.contentType}
              appIcon={item?.appIcon}
              name={item?.name}
              isDisabled={key === 0 ? false : true}
            />
          );
        })}
      </Stack>
    </Layout>
  );
}
