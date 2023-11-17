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
  IconByName,
} from "@shiksha/common-lib";

const colors = overrideColorTheme();

export default function Login({ swPath }) {
  const [credentials, setCredentials] = useState();
  const [errors, setErrors] = React.useState({});
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();
  const navigate = useNavigate();

  const fieldsName = [
    { label: "User Name", attribute: "userName" },
    { label: "Password", attribute: "password" },
  ];

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

  const handleLogin = async () => {
    if (validate()) {
      const fcmToken = await getUserToken(swPath);

      const result = await fetchToken(
        manifest.auth_url,
        credentials?.username,
        credentials?.password
      );
      if (result?.data) {
        let token = result.data.access_token;
        sessionStorage.setItem('token', token);

        const resultTeacher = await userRegistryService.getOne();
        if (resultTeacher?.id) {
          try {
            let { id } = resultTeacher;
            localStorage.setItem("id", id);
            const updateTokenTeacher = await userRegistryService.update({
              id,
              fcmToken,
            });
            localStorage.setItem(
              "fullName",
              resultTeacher.fullName
                ? resultTeacher.fullName
                : `${resultTeacher.firstName} ${resultTeacher.lastName}`
            );
            localStorage.setItem("firstName", resultTeacher.firstName);
            localStorage.setItem("lastName", resultTeacher.lastName);
            localStorage.setItem("schoolId", resultTeacher.schoolId);
            localStorage.setItem("phoneNumber", resultTeacher.phoneNumber);
          } catch (e) {
            localStorage.removeItem("token");
            console.log({ e });
          }
          try {
            const fcmToken = await getUserToken(swPath);
            let id = localStorage.getItem("id");
            await userRegistryService.update({ id, fcmToken });
            localStorage.setItem("fcmToken", fcmToken);
          } catch (e) {
            localStorage.setItem("fcmToken", "");
          }
          eventBus.publish("AUTH", {
            eventType: "LOGIN_SUCCESS",
            data: {
              token: token,
            },
          });
          window.location.href("/onboardingimprove");
          window.location.reload();
        } else {
          localStorage.removeItem("token");
          setErrors({ alert: t("PLEASE_ENTER_VALID_CREDENTIALS") });
        }
      } else {
        localStorage.removeItem("token");
        setErrors({ alert: t("PLEASE_ENTER_VALID_CREDENTIALS") });
      }
    }
  };

  return (
    <Layout
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
              borderRadius={"0px"}
              source={require("../../src/assets/Ellipse.png")}
            />
          </HStack>
        ),

        rightIcon: (
          <HStack paddingBottom={"25px"}>
            <IconByName
              name="CloseCircleFillIcon"
              onPress={() => navigate("/flash")}
            />
          </HStack>
        ),
      }}
      _height="150px"
    >
      <Box>
        <Center width={width}>
          <VStack space="" w="300px">
            <Box style={{ marginLeft: "25px" }}>
            
              <Heading>{t("WELCOME")}</Heading>
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
              <VStack space="30px" p={"20px"}>
                <FormControl isRequired isInvalid={"username" in errors}>
                  <FormControl.Label
                    _text={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#6461D2",
                    }}
                    mb="10px"
                  >
                    {t("USERNAME")}
                  </FormControl.Label>
                  <Input
                    bg="white"
                    variant="rounded"
                    borderColor={
                      credentials?.["username"] ? "orange.500" : "#C1C1C1"
                    }
                    p={"10px"}
                    placeholder={t("ENTER_USERNAME")}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        username: e.target.value,
                      })
                    }
                  />
                  {"username" in errors ? (
                    <FormControl.ErrorMessage
                      _text={{
                        fontSize: "xs",
                        color: colors?.error,
                        fontWeight: 500,
                      }}
                    >
                      {errors.username}
                    </FormControl.ErrorMessage>
                  ) : (
                    <></>
                  )}
                </FormControl>

                <FormControl isRequired isInvalid={"password" in errors}>
                  <FormControl.Label
                    _text={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#6461D2",
                    }}
                    mb="10px"
                  >
                    {t("PASSWORD")}
                  </FormControl.Label>
                  <Input
                    bg="white"
                    variant="rounded"
                    type="password"
                    borderColor={
                      credentials?.["password"] ? "orange.500" : "#C1C1C1"
                    }
                    p={"10px"}
                    placeholder={t("ENTER_PASSWORD")}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                  />
                  {"password" in errors ? (
                    <FormControl.ErrorMessage
                      _text={{
                        fontSize: "xs",
                        color: colors?.error,
                        fontWeight: 500,
                      }}
                    >
                      {errors.username}
                    </FormControl.ErrorMessage>
                  ) : (
                    <></>
                  )}
                </FormControl>
              </VStack>
            </VStack>
            <Button p="3" onPress={handleLogin} variant={"rounded"}>
              {t("LOGIN")}
            </Button>
          </VStack>
        </Center>
      </Box>
    </Layout>
  );
}
