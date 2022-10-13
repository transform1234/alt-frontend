import React, { useState } from "react";
import {
  HStack,
  Button,
  Box,
  VStack,
  Center,
  Avatar,
  Divider,
  CircleIcon,
  Text,
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import manifest from "../manifest";
import {
  useWindowSize,
  Heading,
  Layout,
  BodyMedium,
} from "@shiksha/common-lib";

export default function OnboardingFill() {
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();
  const navigate = useNavigate();
  const circleArray = [1, 2, 3, 4];

  const handleLogin = () => {
    navigate("/selfassesment");
    window.location.reload();
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
              style={{ borderRadius: "0px" }}
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
              style={{ borderRadius: "0px" }}
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
            <Box alignItems={"center"}>
              <Heading>
                {t("Welcome") + " " + localStorage.getItem("name") + "!"}
              </Heading>
              <BodyMedium textTransform="inherit">
                Class :{" "}
                {localStorage.getItem("class") +
                  " " +
                  localStorage.getItem("section")}
              </BodyMedium>
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
                      uri: require("../../src/assets/Subject2.png"),
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

                  <Text color={"#6461D2"}>{t("IMPROVE")}</Text>
                </HStack>

                <Text fontFamily={"Montserrat"} mt={"30px"}>
                  {t("IMPROVE_SUBTITLE")}
                </Text>
              </Center>
            </VStack>
            <Button p="3" onPress={handleLogin} variant={"rounded"} mt={"20px"}>
              {t("LETS_GO")}
            </Button>
          </VStack>
        </Center>
      </Box>
    </Layout>
  );
}
