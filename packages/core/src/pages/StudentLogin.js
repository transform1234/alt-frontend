import React, { useEffect, useState } from "react";
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
  Image,
} from "native-base";
import { useTranslation } from "react-i18next";

import manifest from "../manifest";
import {
  fetchToken,
  eventBus,
  useWindowSize,
  userRegistryService,
  Heading,
  Subtitle,
  getUserToken,
  overrideColorTheme,
  Layout,
  IconByName,
  getAuthUser,
  H3,
  telemetryFactory,
} from "@shiksha/common-lib";

const colors = overrideColorTheme();

export default function StudentLogin({ swPath }) {
  const [credentials, setCredentials] = useState();
  const [errors, setErrors] = React.useState({});
  const [show, setShow] = React.useState(false);
  const { t } = useTranslation();
  const [width, Height] = useWindowSize();

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

  const userName = localStorage.getItem("name");
  const grade = localStorage.getItem("grade");
  const medium = localStorage.getItem("medium");
  const id = localStorage.getItem("id");
  const board = localStorage.getItem("board");

  useEffect(() => {
    const telemetryImpression = {
      context: {
        env: "log-out",
        cdata: [],
      },
      edata: {
        type: "edit", //Required. Impression type (list, detail, view, edit, workflow, search)

        subtype: "Scroll", //Optional. Additional subtype. "Paginate", "Scroll"

        pageid: "log-out", //Required.  Unique page id

        uid: id,

        studentid: "student-id",

        userName: userName,

        grade: grade,

        medium: medium,

        board: board,
      },
    };

    telemetryFactory.impression(telemetryImpression);

    const telemetryInteract = {
      context: {
        env: "sign-out",
        cdata: [],
      },
      edata: {
        id: "log-out-button",
        type: "CLICK",
        subtype: "",
        pageid: "sign-out",
        uid: id,

        studentid: "student-id",

        userName: userName,

        grade: grade,

        medium: medium,

        board: board,
      },
    };
    telemetryFactory.interact(telemetryInteract);
  }, []);

  const handleLogin = async () => {
    const telemetryImpression = {
      context: {
        env: "log-in",
        cdata: [],
      },
      edata: {
        type: "edit", //Required. Impression type (list, detail, view, edit, workflow, search)

        subtype: "Scroll", //Optional. Additional subtype. "Paginate", "Scroll"

        pageid: "log-in", //Required.  Unique page id

        uid: id,

        studentid: "student-id",

        userName: userName,

        grade: grade,

        medium: medium,

        board: board,
      },
    };
    telemetryFactory.impression(telemetryImpression);

    const telemetryInteract = {
      context: {
        env: "sign-in",
        cdata: [],
      },
      edata: {
        id: "login-button",
        type: "CLICK",
        subtype: "",
        pageid: "sign-in",
        uid: id,

        studentid: "student-id",

        userName: userName,

        grade: grade,

        medium: medium,

        board: board,
      },
    };
    telemetryFactory.interact(telemetryInteract);
    if (validate()) {
      const result = await fetchToken(
        manifest.auth_url,
        credentials?.username,
        credentials?.password
      );

      if (result?.data) {
        console.log("Token Data");

        let token = result.data.access_token;
        let refreshToken = result.data.refresh_token;
        console.log(refreshToken);
        sessionStorage.setItem("refreshToken", refreshToken);
        sessionStorage.setItem("token", token);

        let resultTeacher = {};
        // try {

        // } catch (e) {
        //   localStorage.removeItem("token");
        //   console.log({ e });
        // }

        resultTeacher = await getAuthUser();

        if (resultTeacher?.id) {
          // try {
          //   const fcmToken = await getUserToken(swPath);
          //   let id = localStorage.getItem("id");
          //   await userRegistryService.update({ id, fcmToken });
          //   localStorage.setItem("fcmToken", fcmToken);
          // } catch (e) {
          //   localStorage.setItem("fcmToken", "");
          //   console.log({ e });
          // }
          // eventBus.publish("AUTH", {
          //   eventType: "LOGIN_SUCCESS",
          //   data: {
          //     token: token,
          //   },
          // });
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

  const navigatePage = () => {
    window.location.href = "/";
  };

  return (
    <Layout
      _appBar={{
        languages: manifest.languages,
        isBackButtonShow: false,
        isHideMenuButton: true,
        imageUrl: "../../src/assets/SubjectBg.png",
        LeftIcon: false,

        rightIcon: false,
      }}
      // _height="150px"
    >
      <Box overflow={"hidden"}>
        <Center width={width}>
          <HStack overflow={"hidden"}>
            <Center>
              <img
                width={"200px"}
                src={require("../../src/assets/TSHeader.png")}
              />
            </Center>
          </HStack>
          <VStack overflow={"hidden"} space="" w="300px">
            <Center>
              <Box textAlign="center">
                <H3 style={{ fontSize: "16px" }}>
                  Accelerated Learning via Technology (ALT)
                </H3>
                {/* <H3 style={{ fontSize: "16px", color : "red"  }}>
               Reminder :
                Dear Students,
Thank you for participating in the ALT Version 1 pilot.
We officially closed the pilot on 19th November, 2023. 

                </H3> */}
              </Box>
            </Center>
            <Center>
              <Box>
                <Heading>{t("WELCOME")}</Heading>
              </Box>
            </Center>
            <VStack space={2} pb={"25px"}>
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
              <VStack space="30px" p>
                <FormControl isRequired isInvalid={"username" in errors}>
                  <FormControl.Label
                    _text={{
                      fontSize: "14px",
                      fontWeight: "400",
                      color: "#6461D2",
                    }}
                  >
                    {t("USERNAME")}
                  </FormControl.Label>
                  <Input
                    bg="white"
                    variant="rounded"
                    borderColor={
                      credentials?.["username"] ? "yellow.500" : "#C1C1C1"
                    }
                    // p={"10px"}
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
                  >
                    {t("PASSWORD")}
                  </FormControl.Label>
                  <Input
                    bg="white"
                    variant="rounded"
                    type={show ? "text" : "password"}
                    borderColor={
                      credentials?.["password"] ? "yellow.500" : "#C1C1C1"
                    }
                    p={"10px"}
                    placeholder={t("ENTER_PASSWORD")}
                    onChange={(e) =>
                      setCredentials({
                        ...credentials,
                        password: e.target.value,
                      })
                    }
                    InputRightElement={
                      <IconByName
                        name={show ? "EyeLineIcon" : "EyeOffLineIcon"}
                        _icon={{ size: 15 }}
                        rounded="full"
                        onPress={() => setShow(!show)}
                      />
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

                <Button onPress={handleLogin} variant={"rounded"}>
                  {t("LOGIN")}
                </Button>
                <VStack>
                  <Box textAlign="center">
                    <H3 style={{ fontSize: "16px" }}>
                      Tips for better experience
                    </H3>
                    <H3 textAlign={"justify"}>
                      1. Please use chrome browser for better experience.
                    </H3>
                    <H3 textAlign={"justify"}>
                      2. Incase any issue persists during login then try with
                      incognito mode of your browser to access the platform.
                    </H3>
                  </Box>
                </VStack>
              </VStack>
            </VStack>
          </VStack>
        </Center>
      </Box>
    </Layout>
  );
}
