import React, { useState } from "react";
import {
  HStack,
  Box,
  VStack,
  Alert,
  IconButton,
  CloseIcon,
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
  Subtitle,
  overrideColorTheme,
  Layout,
  Icon,
} from "@shiksha/common-lib";
const styles = {
  box: {
    // background: "white",
  },
};

const colors = overrideColorTheme();

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
              style={{
                width: "1.62px",
                height: "35.75px",

                background: "#41C88E",

                order: "0",
                marginLeft: "5px",
              }}
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
      <Box style={styles.box}>
        <Center width={width}>
          <VStack space="" w="300px">
            <Box>
              <Heading
                style={{
                  fontSize: "36px",
                  fontWeight: "300",
                  fontFamily: "Fredoka",
                  color: "#545454",
                  lineHeight: "44px",
                  lineSpacing: "0.03em",
                  margin: "auto",
                }}
              >
                {t("Welcome Vishal!")}
              </Heading>
              {/* <BodyMedium
                    textTransform="inherit"
                    style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    fontFamily: "Fredoka",
                    color: "#545454",
                    lineHeight: "22px",
                    lineSpacing: "0.03em",
                    }}
                >
                    {t("Login using your Mobile Number")}
                </BodyMedium> */}
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
                <div>
                  <CircleIcon size="2" mr="15px" color="#6461D2" />
                  <span
                    style={{
                      fontFamily: "Montserrat",
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "17px",
                      letterSpacing: "-0.01em",
                      textAlign: "left",
                      color: "#6461D2",
                    }}
                  >
                    Learn
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: "14px",
                    fontWeight: "600",
                    lineHeight: "17px",
                    letterSpacing: "-0.01em",
                    textAlign: "left",
                    marginTop: "30px",
                  }}
                >
                  Learn Anytime,Anywhere
                </div>
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
