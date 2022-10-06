import { HStack, VStack, Stack, Button, Avatar } from "native-base";
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

export default function CourseList({ footerLinks }) {
  const [courseList, setCoursesList] = useState([]);
  const coursesList = [];
  const { t } = useTranslation();
  useEffect(async () => {
    const data = await selfAssesmentService.getCoursesRule();
    setCoursesList(data);
  }, []);
  const navigate = useNavigate();

  return (
    <Layout
      _header={{
        title: "Getting Started",
      }}
      _appBar={{
        languages: manifest.languages,
        isBackButtonShow: false,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack>
            <Avatar
              style={{ borderRadius: "0px !important" }}
              size="md"
              source={require("./../assets/images/ssaicon.png")}
            />
            <Avatar
              style={{ borderRadius: "0px !important" }}
              size="md"
              source={require("./../assets/images/tsIcon.png")}
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
      <Stack space="4" p="4" mb="5">
        {courseList?.map((item) => (
          <VStack p="4" bg="white" space="4">
            <HStack justifyContent="space-between">
              <HStack space="4">
                <Avatar
                  bg="transparent"
                  source={{
                    uri: item?.appIcon,
                  }}
                />
                <VStack space="2">
                  <BodyLarge>
                    {item?.name}
                    {/* {item?.name.substring(0, 20)}{" "}
                    {item?.name.length >= 20 && "..."} */}
                  </BodyLarge>
                  <Caption>
                    {item?.description}
                    {/* {item?.description?.substring(0, 20)}{" "}
                    {item?.description?.length >= 20 && "..."} */}
                  </Caption>
                </VStack>
              </HStack>
              <Button
                colorScheme="purple"
                onPress={() =>
                  navigate(`/selfassesment/Lessons/${item?.identifier}`)
                }
                size="sm"
              >
                <IconByName name="ArrowRightSLineIcon" size="sm" />
              </Button>
            </HStack>
            <ProgressBar
              isTextShow
              legendType="separated"
              h="15px"
              _bar={{ rounded: "md", mb: "2" }}
              isLabelCountHide
              data={[{ name: "8/8", color: "green", value: "80" }]}
            ></ProgressBar>
          </VStack>
        ))}
      </Stack>
    </Layout>
  );
}
