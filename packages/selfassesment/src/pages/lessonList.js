import React, { useEffect, useState } from "react";
import { HStack, VStack, Stack, Pressable } from "native-base";
import {
  Collapsible,
  Layout,
  H2,
  IconByName,
  BodyLarge,
  Caption,
  courseRegistryService,
  H1,
  Loading,
  SunbirdPlayer,
  useWindowSize,
  H3,
} from "@shiksha/common-lib";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";

export default function LessonList({ footerLinks }) {
  const { t } = useTranslation();
  const { id, type } = useParams();
  const [lessons, setLessons] = useState({});
  const [lessonId, setLessonId] = useState();
  const [lesson, setLesson] = useState();
  const [width, height] = useWindowSize();

  useEffect(async () => {
    if (["assessment", "SelfAssess"].includes(type)) {
      setLessons({
        children: [
          {
            children: [
              await courseRegistryService.getContent({
                id: id,
                adapter: "diksha",
              }),
            ],
          },
        ],
      });
    } else if (["course", "Course"].includes(type)) {
      setLessons(
        await courseRegistryService.getOne({
          id: id,
          adapter: "diksha",
          coreData: true,
        })
      );
    }
  }, []);

  console.log({ lessons, lesson });

  React.useEffect(async () => {
    if (lessonId) {
      let resultData = await courseRegistryService.getContent({
        id: lessonId?.identifier,
        adapter: "diksha",
      });
      setLesson(resultData);
    }
  }, [lessonId]);

  if (lesson) {
    return (
      <Loading
        _center={{ alignItems: "center", width: "100%" }}
        customComponent={
          <VStack {...{ width, height }}>
            <IconByName
              name="CloseCircleLineIcon"
              onPress={() => {
                setLesson();
              }}
              position="absolute"
              zIndex="10"
              right="4px"
              top="4px"
              _icon={{ size: 40 }}
              bg="white"
              p="0"
              rounded="full"
            />
            <SunbirdPlayer {...lesson} />
          </VStack>
        }
      />
    );
  }

  return (
    <Layout
      _appBar={{
        languages: [],
        isBackButtonShow: false,
        isShowNotificationButton: true,
        LeftIcon: <HStack>English</HStack>,
      }}
      _footer={footerLinks}
    >
      <Stack space="4" py="4" mb="5">
        {lessons?.children?.map((item, index) => (
          <Collapsible
            key={index}
            defaultCollapse={false}
            _box={{ bg: "transperent", py: 0 }}
            _header={{ bg: "white", rounded: "8" }}
            header={
              <VStack p="4" w="100%" space="4">
                <HStack alignItems="center" space="4">
                  <VStack space="1">
                    <H2 color="blue.500">Day</H2>
                    <H1 color="selfassesment.warning">
                      {`${index + 1}`.padStart(2, 0)}
                    </H1>
                  </VStack>
                  <VStack space="2">
                    <BodyLarge>{item?.name}</BodyLarge>
                    <Caption> course 1</Caption>
                  </VStack>
                </HStack>
              </VStack>
            }
            fontSize="2px"
          >
            <VStack padding="4" space="4">
              {item?.children?.map((subItem, subIndex) => (
                <Pressable
                  bg={"mylearning.white"}
                  key={subIndex}
                  onPress={() => {
                    setLessonId({
                      mode: "false",
                      ...subItem,
                    });
                  }}
                  p="5"
                  rounded={"lg"}
                  shadow={4}
                >
                  <HStack justifyContent={"space-between"} alignItems="center">
                    <HStack space={4} alignItems="center">
                      {subItem?.posterImage ? (
                        <Avatar
                          source={{ uri: subItem?.posterImage }}
                          bg="transparent"
                          style={{ borderRadius: 0 }}
                          p="1"
                          shadow={4}
                        />
                      ) : (
                        <React.Fragment />
                      )}
                      <H2>{subItem?.name}</H2>
                    </HStack>
                    <H3>
                      {subItem?.mimeType === "application/pdf"
                        ? "PDF"
                        : subItem?.mimeType === "video/mp4"
                        ? "Video"
                        : [
                            "application/vnd.sunbird.question",
                            "application/vnd.sunbird.questionset",
                          ].includes(subItem?.mimeType)
                        ? "QUML"
                        : [
                            "application/vnd.ekstep.ecml-archive",
                            "application/vnd.ekstep.html-archive",
                          ].includes(subItem?.mimeType)
                        ? "Content"
                        : ""}
                    </H3>
                  </HStack>
                </Pressable>
              ))}
            </VStack>
          </Collapsible>
        ))}
      </Stack>
    </Layout>
  );
}
