import React, { useEffect, useState } from "react";
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
  Collapsible,
  Layout,
  SubMenu,
  Tab,
  classRegistryService,
  H2,
  IconByName,
  ProgressBar,
  BodyLarge,
  Caption,
  selfAssesmentService,
  H1,
} from "@shiksha/common-lib";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";
// import { courses } from "./../assets/mocCourses";
import NameTag from "components/NameTag";
export default function LessonList({ footerLinks }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const [lessonListData, setlessonList] = useState([]);

  useEffect(async () => {
    const data = await selfAssesmentService.getLessons(id);
    setlessonList(data);
  }, []);
  // useEffect(() => {
  //   async function fetchMyAPI() {
  //     let response = await selfAssesmentService.getLessons();
  //     console.log("heree", response);
  //     // response = await response.json();
  //     // console.log("heree", response);
  //     setlessonList(response);
  //   }

  //   fetchMyAPI();
  // }, []);
  return (
    <Layout
      _appBar={{
        languages: manifest.languages,
        isBackButtonShow: true,
        // titleComponent: <NameTag />,
        LeftIcon: <HStack>English</HStack>,

        rightIcon: (
          <HStack>
            <IconByName name="Notification2LineIcon" />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <Stack space="4" py="4" mb="5">
        {lessonListData?.children?.map((item, index) => (
          <Collapsible
            key={index}
            defaultCollapse={false}
            _box={{ bg: "transperent", rounded: "lg", py: 0 }}
            _header={{ bg: "white" }}
            header={
              <VStack p="4" w="100%" space="4">
                {/* <HStack justifyContent="space-between"> */}
                <HStack alignItems="center" space="4">
                  <VStack space="1">
                    <H2 color="blue.500">Day</H2>
                    <H1 color="selfassesment.warning">
                      {`${index + 1}`.padStart(2, 0)}
                    </H1>
                  </VStack>
                  <VStack space="2">
                    <BodyLarge>
                      {item?.name}
                      {/* {item?.name.substring(0, 20)}{" "}
                      {item?.name.length >= 20 && "..."} */}
                    </BodyLarge>

                    <Caption> course 1</Caption>
                  </VStack>
                </HStack>
                {/* </HStack> */}
              </VStack>
            }
            fontSize="2px"
          >
            <VStack padding="4" space="4">
              {item.children.map((element, index) => (
                <Box
                  key={index}
                  padding="5"
                  rounded="lg"
                  shadow="4"
                  bg="selfassesment.white"
                >
                  <Text>{element.name}</Text>
                </Box>
              ))}
            </VStack>
          </Collapsible>
        ))}
      </Stack>
    </Layout>
  );
}
