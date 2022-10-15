import { HStack, VStack, Stack, Avatar, Pressable, Box } from "native-base";
import { IconByName, ProgressBar, BodyLarge } from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useTranslation } from "react-i18next";
import manifest from "../manifest.json";

export default function CommonCourseList({
  identifier,
  contentType,
  appIcon,
  name,
  isDisabled,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Pressable
      isDisabled={isDisabled}
      onPress={() =>
        navigate(`/selfassesment/lessons/${identifier}/${contentType}`)
      }
      position="relative"
    >
      <VStack
        p="4"
        bg={isDisabled ? "#f1f1f1" : "white"}
        space="4"
        roundedLeft="20"
      >
        <HStack space="4">
          <Avatar
            bg={isDisabled ? "#C1C1C1" : "yellow.500"}
            size="30"
            {...(appIcon?.appIcon
              ? {
                  source: {
                    uri: appIcon,
                  },
                }
              : {})}
          >
            <IconByName
              name={isDisabled ? "BookOpenLineIcon" : "ListCheckIcon"}
              color="white"
            />
          </Avatar>
          <VStack space="2" flex={1}>
            <BodyLarge>{name}</BodyLarge>
          </VStack>
        </HStack>

        {/* <ProgressBar
          h="15px"
          _bar={{
            overflow: "visible",
            space: "2",
            alignItems: "center",
          }}
          data={[{ name: "0/8", color: "#EAA95A", value: "0" }]}
          isLabelCountHide
        /> */}
      </VStack>
      <Box
        bg={isDisabled ? "#C1C1C1" : "blue.700"}
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
}
