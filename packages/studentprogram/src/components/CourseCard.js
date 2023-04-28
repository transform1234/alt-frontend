import { HStack, VStack, Avatar, Pressable, Box } from "native-base";
import { IconByName, BodyLarge, Caption } from "@shiksha/common-lib";
import React from "react";
import { useTranslation } from "react-i18next";

export default function CourseCard({ item, isDisabled, onPress, isDone }) {
  const { name, posterImage } = item;
  const { t } = useTranslation();
  return (
    <Pressable
      isDisabled={isDisabled || (isDone && item?.courseType === "baseline")}
      onPress={onPress}
      position="relative"
    >
      <VStack
        p="4"
        bg={isDisabled ? "#f1f1f1" : "white"}
        space="4"
        roundedLeft="20"
      >
        <HStack space="4" alignItems="center">
          <Avatar
            bg={isDisabled ? "selfassesment.lightGray1" : "yellow.500"}
            size="30"
            {...(posterImage
              ? {
                  source: {
                    uri: posterImage,
                  },
                }
              : {})}
          >
            <IconByName
              name={isDisabled ? "BookOpenLineIcon" : "ListCheckIcon"}
              color="white"
            />
          </Avatar>
          <VStack space="1" flex={1}>
            <BodyLarge>{name}</BodyLarge>
            {isDone ? (
              <Caption>{t("SUCCESS_MESSAGE")}</Caption>
            ) : (
              <React.Fragment />
            )}
          </VStack>
        </HStack>
      </VStack>
      <Box
        bg={
          isDisabled
            ? "selfassesment.lightGray1"
            : isDone
            ? "selfassesment.cloverGreen"
            : "blue.500"
        }
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
          name={isDone ? "CheckboxCircleLineIcon" : "ArrowRightLineIcon"}
          color="white"
          size="sm"
        />
      </Box>
    </Pressable>
  );
}
