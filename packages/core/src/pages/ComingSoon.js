import React from "react";
import { Box, Stack, VStack, HStack, Avatar, Center } from "native-base";
import {
  capture,
  Layout,
  NameTag,
  Heading,
  useWindowSize,
  IconByName,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import { useParams, useLocation } from "react-router-dom";

function CommingSoon({ footerLinks }) {
  const [width, Height] = useWindowSize();
  const params = useParams();
  let location = useLocation();
  const { t } = useTranslation();

  React.useEffect(() => {
    capture("PAGE");
  }, []);

  return (
    <Layout
      _header={{
        title:
          params["title"] == "ScoreCard"
            ? "Score Card"
            : location.pathname.split("/")[1],
      }}
      _appBar={{
        languages: [],
        isShowNotificationButton: false,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack>
            <Avatar
              rounded={0}
              _image={{ rounded: 0 }}
              style={{ borderRadius: 0 }}
              source={require("../../src/assets/TSHeader.jpg")}
            />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <Box>
        <Center width={width}>
          <VStack space="">
            <Box>
              <Heading>{t("Coming Soon")}</Heading>
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
    </Layout>
  );
}
export default CommingSoon;
