import React, { useState } from "react";
import {
  HStack,
  Button,
  Box,
  VStack,
  Center,
  Image,
  Avatar,
  Divider,
} from "native-base";
import { useTranslation } from "react-i18next";
import manifest from "../manifest";
import { overrideColorTheme, Layout } from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";

const colors = overrideColorTheme();

export default function Flash() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogin = async (val) => {
    if (val === "register") {
      navigate("/signup");
    }
    if (val === "login") {
      navigate("/login");
    }
  };

  return (
    <Layout
      _width={"100%"}
      _appBar={{
        languages: manifest.languages,
        isBackButtonShow: false,
        isHideMenuButton: true,
        imageUrl: "../../src/assets/SubjectBg.png",
        LeftIcon: (
          <HStack width={"65px"}>
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

        rightIcon: <HStack paddingBottom={"25px"}></HStack>,
      }}
      _height="100px"
    >
      <Box>
        <Center>
          <VStack space="50px" w="300px">
            <Image
              mt={"0px"}
              width={"100%"}
              height={"400px"}
              resizeMode="cover"
              source={require("../assets/Flash.png")}
              alt={"Alternate Text "}
            />
          </VStack>
          <VStack>
            <HStack>
              <Button
                mt={"20px"}
                p="3"
                variant={"rounded"}
                onPress={() => handleLogin("login")}
              >
                {t("Login >")}
              </Button>
            </HStack>
          </VStack>
        </Center>
      </Box>
    </Layout>
  );
}
