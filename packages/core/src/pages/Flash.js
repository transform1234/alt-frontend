import React, { useState } from "react";
import {
  HStack,
  Button,
  Box,
  FormControl,
  Input,
  VStack,
  Alert,
  IconButton,
  CloseIcon,
  Center,
  Image,
  AspectRatio,
  Avatar,
  Divider,
} from "native-base";
import { useTranslation } from "react-i18next";
import manifest from "../manifest";
import {
  fetchToken,
  eventBus,
  useWindowSize,
  userRegistryService,
  BodyMedium,
  Heading,
  Subtitle,
  getUserToken,
  overrideColorTheme,
  Layout,
} from "@shiksha/common-lib";
import Img from "../assets/Flash.png";
import { useNavigate } from "react-router-dom";

const styles = {
  box: {
    // background:
    //   "linear-gradient(135deg, #e2f2fc -10%, #faf6f3 35%, #faf6f3 60%,#faf6f3 70%, #e2f2fc 110%)",
  },
};

const colors = overrideColorTheme();

export default function Flash({ swPath }) {
  const [credentials, setCredentials] = useState();
  const [errors, setErrors] = React.useState({});
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();
  const navigate = useNavigate();

  const validate = () => {
    let arr = {};
    if (
      typeof credentials?.username === "undefined" ||
      credentials?.username === ""
    ) {
      arr = { ...arr, username: t("USERNAME_IS_REQUIRED") };
    }

    if (
      typeof credentials?.password === "undefined" ||
      credentials?.password === ""
    ) {
      arr = { ...arr, password: t("PASSWORD_IS_REQUIRED") };
    }

    setErrors(arr);
    if (arr.username || arr.password) {
      return false;
    }
    return true;
  };

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
      style={{ width: "100%" }}
      _appBar={{
        languages: manifest.languages,
        isBackButtonShow: false,
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

        rightIcon: (
          <HStack paddingBottom={"25px"}>
            {/* <CloseIcon
              size="10px"
              style={{
                borderRadius: "50px",
                padding: "5px",
                border: "1px solid black",
              }}
            /> */}
          </HStack>
        ),
      }}
      _height="100px"
      _width="100%"
    >
      <Box style={styles.box}>
        <Center
          _text={{
            color: colors?.white,
            fontWeight: "bold",
          }}
          // height={Height}
        >
          {/* width={width} */}
          <Center width={"100%"}>
            <VStack space="50px" w="300px">
              <Image
                // size={"2xl"}
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
                {/* <Button
                  style={{
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "8px 28px",
                    gap: "10px",
                    // width: "317px",
                    marginLeft: "20px",
                    marginRight: "20px",
                    height: "45px",
                    border: "1px solid #C1C1C1",
                    borderRadius: "20px",
                    marginTop: "50px",
                  }}
                  backgroundColor={"white"}
                  p="3"
                  _text={{ color: "#6461D2" }}
                  onPress={() => handleLogin("register")}
                >
                  {t("Register >")}
                </Button> */}
                <Button
                  style={{
                    boxSizing: "border-box",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "8px 28px",
                    gap: "10px",
                    // width: "317px",
                    marginLeft: "20px",
                    marginRight: "20px",
                    height: "45px",
                    border: "1px solid #C1C1C1",
                    borderRadius: "20px",
                    marginTop: "50px",
                  }}
                  backgroundColor={"#6461D2"}
                  p="3"
                  _text={{ color: colors?.white }}
                  onPress={() => handleLogin("login")}
                >
                  {t("Login >")}
                </Button>
              </HStack>
            </VStack>
          </Center>
        </Center>
      </Box>
    </Layout>
  );
}
