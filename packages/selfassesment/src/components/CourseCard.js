import { HStack, VStack, Avatar, Pressable, Box } from "native-base";
import {
  IconByName,
  ProgressBar,
  BodyLarge,
  Caption,
} from "@shiksha/common-lib";
import React from "react";

export default function CourseCard({ item, isDisabled, onPress }) {
  const { trakingData, name, appIcon } = item;
  return (
    <Pressable isDisabled={isDisabled} onPress={onPress} position="relative">
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
          <VStack space="1" flex={1}>
            <BodyLarge>{name}</BodyLarge>
            {trakingData?.length > 0 ? (
              <Caption>Great work! You've completed the assessment.</Caption>
            ) : (
              <React.Fragment />
            )}
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
        bg={
          isDisabled
            ? "selfassesment.lightGray1"
            : trakingData?.length > 0
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
          name={
            trakingData?.length > 0
              ? "CheckboxCircleLineIcon"
              : "ArrowRightLineIcon"
          }
          color="white"
          size="sm"
        />
      </Box>
    </Pressable>
  );
}
