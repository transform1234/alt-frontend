import React from "react";
import { Box, VStack, HStack, Center } from "native-base";

import { Heading, IconByName, useWindowSize } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";

export default function ComingSoon({ _box }) {
  const [width, Height] = useWindowSize();
  const { t } = useTranslation();

  return (
    <Box {..._box}>
      <Center width={width}>
        <VStack space="">
          <Box>
            <Heading>{t("COMING_SOON")}</Heading>
          </Box>
          <VStack space={2} pt={"25px"} pb={"25px"}>
            <Center>
              <div
                style={{
                  padding: "35px",
                  border: "2px dashed #6461D2",
                  borderRadius: "100px",
                }}
              >
                <IconByName
                  name="ToolsFillIcon"
                  isDisabled={true}
                  _icon={{
                    size: 70,
                  }}
                  rounded="full"
                />
              </div>
            </Center>
          </VStack>
          <VStack>
            <Center>
              <HStack space={"2"}></HStack>
            </Center>
          </VStack>
        </VStack>
      </Center>
    </Box>
  );
}
