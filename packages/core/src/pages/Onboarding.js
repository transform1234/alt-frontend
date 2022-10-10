import React, { useState } from "react";
import {
  HStack,
  Box,
  VStack,
  Center,
  Avatar,
  Divider,
  CircleIcon,
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import manifest from "../manifest";
import {
  useWindowSize,
  Heading,
  overrideColorTheme,
  Layout,
} from "@shiksha/common-lib";

export default function Onboarding({ swPath }) {
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();
  const navigate = useNavigate();
  const circleArray = [1, 2, 3, 4];

  const handleLogin = () => {
    navigate("/otp");
  };

  return (
    <Layout
      _appBar={{
        languages: manifest.languages,
        isBackButtonShow: false,
        isHideMenuButton: true,
        imageUrl: "../../src/assets/SubjectBg.png",
        CenterIcon: true,
        LeftIcon: (
          <HStack width={"65px"} mt={"35px"}>
            <Avatar
              size="37"
              width={"100%"}
              rounded="md"
              borderRadius={"0px"}
              source={require("../../src/assets/image2.png")}
            />
            <Divider
              width={"1.62px"}
              height={"35.75px"}
              bg={"#41C88E"}
              order={"0"}
              ml={"5px"}
            />
            <Avatar
              bg=""
              size="37"
              rounded="md"
              borderRadius={"0px"}
              source={require("../../src/assets/Ellipse.png")}
            />
          </HStack>
        ),
      }}
      _height="130px"
    >
      <Box>
        <Center width={width}>
          <VStack space="" w="300px">
            <Box>
              <Heading>{t("Welcome Vishal!")}</Heading>
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
                  <Avatar
                    borderRadius={"0px"}
                    bg=""
                    source={{
                      uri: require("../../src/assets/Subject1.png"),
                    }}
                    size="2xl"
                  />
                </div>
              </Center>
            </VStack>
            <VStack>
              <Center>
                <HStack space={"2"}>
                  <CircleIcon
                    size="3"
                    color="#6461D2"
                    style={{ marginTop: "5px" }}
                  />

                  <Text color={"#6461D2"}>Learn</Text>
                </HStack>

                <Text fontFamily={"Montserrat"} mt={"30px"}>
                  Learn Anytime,Anywhere
                </Text>
              </Center>
            </VStack>
          </VStack>
          <HStack mt="100px">
            {circleArray.map((item) => {
              return item == 2 ? (
                <Box
                  bg={"#6461D2"}
                  width="90px"
                  borderRadius={"40px"}
                  height={"20px"}
                />
              ) : (
                <CircleIcon color={"#FFB902"} size={"25"} key={item} />
              );
            })}
          </HStack>
        </Center>
      </Box>
    </Layout>
  );
}
