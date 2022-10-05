import React, { useState } from "react";
import {
  HStack,
  Button,
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
  overrideColorTheme,
  Layout,
} from "@shiksha/common-lib";
const styles = {
  box: {
    // background: "white",
  },
};

const colors = overrideColorTheme();

export default function OnboardingFill({ swPath }) {
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
                    Improve
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
                  Improve On The Go.
                </div>
              </Center>
            </VStack>
            <Button
              style={{
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "8px 28px",
                gap: "10px",
                width: "317px",
                height: "45px",
                // background: "#6461D2",
                border: "1px solid #C1C1C1",
                borderRadius: "20px",
                marginTop: "35px",
              }}
              backgroundColor={"#6461D2"}
              p="3"
              _text={{ color: colors?.white }}
              onPress={handleLogin}
            >
              {t("Lets Go! ->")}
            </Button>
          </VStack>
          <HStack mt="30px">
            {/* {circleArray.map((item) => {
              return item == 3 ? (
                <Box
                  bg={"#6461D2"}
                  width="90px"
                  borderRadius={"40px"}
                  height={"20px"}
                />
              ) : (
                <CircleIcon color={"#FFB902"} size={"25"} key={item} />
              );
            })} */}
          </HStack>
        </Center>
      </Box>
    </Layout>
  );
}
