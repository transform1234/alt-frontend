import { Caption, H2, IconByName } from "@shiksha/common-lib";
import { Box, HStack, Icon, Text } from "native-base";
import React from "react";
const style = { transform: "rotate(270deg)" };

export default function NameTag() {
  return (
    <HStack
      alignItems="center"
      bg="green"
      rounded={"full"}
      p="2"
      pl="3"
      pr="5"
      space={2}
      flex="1"
    >
      <IconByName
        borderWidth="1"
        borderColor="white"
        p="1"
        rounded="full"
        isDisabled
        //   style={style}
        name="UserLineIcon"
        _icon={{ size: 25 }}
        color="white"
      />
      <Box>
        <H2 color="white"> Hi Vishal</H2>
        <Caption color="white"> Hi Vishal</Caption>
      </Box>
    </HStack>
  );
}
