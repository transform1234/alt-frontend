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
  Avatar,
  Divider,
  MaterialIcons,
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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
  Icon,
  IconByName,
  calender,
} from "@shiksha/common-lib";
const styles = {
  box: {
    // background: "white",
  },
};

const colors = overrideColorTheme();

export default function OTP({ swPath }) {
  const [credentials, setCredentials] = useState();
  const [errors, setErrors] = React.useState({});
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();
  const navigate = useNavigate();

  const fieldsName = [
    { label: "OTP One", attribute: "otp_one" },
    { label: "OTP Two", attribute: "otp_two" },
    { label: "OTP Three", attribute: "otp_three" },
    { label: "OTP Four", attribute: "otp_four" },
  ];

  const validate = () => {
    let arr = {};
    if (
      typeof credentials?.mobileNumber === "undefined" ||
      credentials?.mobileNumber === ""
    ) {
      arr = { ...arr, mobileNumber: t("MOBILE_NUMBER_IS_REQUIRED") };
    }

    setErrors(arr);

    if (arr.mobileNumber) {
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    // if (validate()) {
    navigate("/onboarding");
    // }
  };
  const setCredentialForText = (e, item) => {
    const data = {
      ...credentials,
      [item]: e.target.value,
    };
    setCredentials(data);

    // validate();
  };

  return (
    <Layout
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
            <CloseIcon
              size="10px"
              style={{
                borderRadius: "50px",
                padding: "5px",
                border: "1px solid black",
              }}
            />
          </HStack>
        ),
      }}
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
                }}
              >
                {t("Welcome!")}
              </Heading>
              <BodyMedium
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
              </BodyMedium>
            </Box>
            <VStack space={2} pt={"25px"} pb={"25px"}>
              {"alert" in errors ? (
                <Alert w="100%" status={"error"}>
                  <VStack space={2} flexShrink={1} w="100%">
                    <HStack
                      flexShrink={1}
                      space={2}
                      justifyContent="space-between"
                    >
                      <HStack space={2} flexShrink={1}>
                        <Alert.Icon mt="1" />
                        <Subtitle color={colors?.gray}>{errors.alert}</Subtitle>
                      </HStack>
                      <IconButton
                        variant="unstyled"
                        icon={<CloseIcon size="3" color={colors?.gray} />}
                        onPress={(e) => setErrors({})}
                      />
                    </HStack>
                  </VStack>
                </Alert>
              ) : (
                <></>
              )}
              <HStack space="30px" p={"20px"}>
                {fieldsName?.map((item, index) => (
                  <FormControl
                    isRequired
                    isInvalid={item?.attribute in errors}
                    key={index}
                    name={item?.attribute}
                    width={"15%"}
                  >
                    {/* <FormControl.Label
                      _text={{
                        fontSize: "14px",
                        fontWeight: "600",
                        fontFamily: "Fredoka",
                        color: "#6461D2",
                        lineHeight: "19px",
                        lineSpacing: "0.025em",
                      }}
                      mb="10px"
                    >
                      {t(item?.label)}
                    </FormControl.Label> */}
                    <Input
                      // height="35px"
                      key={item?.attribute}
                      name={item?.attribute}
                      bg="white"
                      variant="rounded"
                      borderColor={
                        credentials?.[item?.attribute]
                          ? "orange.500"
                          : "#C1C1C1"
                      }
                      pr={"10px"}
                      pl={"15px"}
                      pt={"10px"}
                      pb={"10px"}
                      width={"40px"}
                      placeholder={"0"}
                      onChange={(e) => setCredentialForText(e, item?.attribute)}
                    />
                    {item?.attribute in errors ? (
                      <FormControl.ErrorMessage
                        key={index}
                        _text={{
                          fontSize: "xs",
                          color: colors?.error,
                          fontWeight: 500,
                        }}
                      >
                        {errors[item?.attribute]}
                      </FormControl.ErrorMessage>
                    ) : (
                      <></>
                    )}
                  </FormControl>
                ))}
              </HStack>
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
              }}
              backgroundColor={
                credentials &&
                Object.keys(credentials).length === fieldsName.length
                  ? "#6461D2"
                  : "#C1C1C1"
              }
              p="3"
              _text={{ color: colors?.white }}
              onPress={handleLogin}
            >
              {t("Submit OTP")}
            </Button>
          </VStack>
        </Center>
      </Box>
    </Layout>
  );
}
