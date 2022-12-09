import { HStack, VStack, Pressable, Button, Box } from "native-base";
import { IconByName, H1, BodyLarge } from "@shiksha/common-lib";
import React from "react";

export default function SubjectCard({
  subject,
  iconName,
  status,
  onPress,
  isDisabled,
}) {
  return (
    <VStack
      alignItems="center"
      p="5"
      bg={isDisabled ? "lightGray6" : "successLight"}
      space="5"
      borderColor={isDisabled ? "lightGray2" : "success"}
      borderWidth="1"
      rounded="20px"
      position="relative"
      zIndex={1}
    >
      <HStack space="4" alignItems="center">
        <IconByName
          isDisabled
          name={iconName}
          color={isDisabled ? "lightGray2" : "success"}
          size="lg"
        />
        <H1 alignItems="center" color={isDisabled ? "lightGray2" : ""}>
          {subject}
        </H1>
      </HStack>
      <Pressable
        onPress={onPress}
        isDisabled={isDisabled ? true : false}
        bg={isDisabled ? "lightGray2" : "blue.700"}
        rounded="full"
        position="absolute"
        bottom="-20"
        minW="15%"
        zIndex={2}
        py="10px"
        px="20px"
        alignItems={"center"}
      >
        <BodyLarge color="white"> {status}</BodyLarge>
      </Pressable>

      {/* {index !== 0 && (
              <Box
                bg={"red.400"}
                position="absolute"
                right="0"
                roundedTopRight={"full"}
              >
                <Text fontSize={"12px"} color={"white"} pl={"2"} pr={"2"}>
                  Pending
                </Text>
              </Box>
            )} */}
    </VStack>
  );
}
