import { HStack, VStack, Pressable, Button, Box } from "native-base";
import { IconByName, H1, BodyLarge } from "@shiksha/common-lib";
import React from "react";

export default function SubjectCard({
  subject,
  iconName,
  status,
  index,
  onPress,
}) {
  return (
    <Pressable
      onPress={onPress}
      position="relative"
      isDisabled={index === 0 ? false : true}
    >
      <VStack
        alignItems="center"
        p="5"
        bg={index ? "#fffbfa" : "#e5fcf5"}
        space="5"
        borderColor={index === 0 ? "success" : ""}
        borderWidth="1"
        rounded="20px"
        position="relative"
      >
        <HStack space="10" alignItems="center">
          <IconByName
            isDisabled
            name={iconName}
            color={index === 0 ? "#41C88E" : "#C1C1C1"}
            size="lg"
          />

          <H1 alignItems="center" color={index !== 0 ? "#C1C1C1" : ""}>
            {subject}
          </H1>
        </HStack>

        <Box
          bg={index === 0 ? "blue.700" : "#C1C1C1"}
          rounded="full"
          position="absolute"
          bottom="-20"
          minW="15%"
          py="10px"
          px="20px"
        >
          <BodyLarge color="white"> {status}</BodyLarge>
        </Box>
      </VStack>
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
    </Pressable>
  );
}
