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
  Select,
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import manifest from "../manifest";
import {
  useWindowSize,
  BodyMedium,
  Heading,
  Subtitle,
  overrideColorTheme,
  Layout,
  Icon,
  IconByName,
} from "@shiksha/common-lib";

const colors = overrideColorTheme();

export default function Login({ swPath }) {
  const [credentials, setCredentials] = useState();
  const [errors, setErrors] = React.useState({});
  const { t } = useTranslation();
  const navigate = useNavigate();

  const fieldsName = [
    { label: "Mobile Number", attribute: "mobileNumber" },
    { label: "Name", attribute: "name" },
    { label: "Date of Birth", attribute: "dateOfBirth" },
    { label: "Email ID", attribute: "emailId" },
    { label: "State", attribute: "state" },
    { label: "District", attribute: "district" },
    { label: "Block", attribute: "block" },
    { label: "School", attribute: "school" },
    { label: "UDISE", attribute: "udise" },
    { label: "Class", attribute: "class" },
  ];

  const validate = () => {
    let arr = {};
    if (
      typeof credentials?.mobileNumber === "undefined" ||
      credentials?.mobileNumber === ""
    ) {
      arr = { ...arr, mobileNumber: t("MOBILE_NUMBER_IS_REQUIRED") };
    }

    if (typeof credentials?.name === "undefined" || credentials?.name === "") {
      arr = { ...arr, name: t("NAME_IS_REQUIRED") };
    }

    if (
      typeof credentials?.dateOfBirth === "undefined" ||
      credentials?.dateOfBirth === ""
    ) {
      arr = { ...arr, dateOfBirth: t("DATE_OF_BIRTH_IS_REQUIRED") };
    }
    if (
      typeof credentials?.emailId === "undefined" ||
      credentials?.emailId === ""
    ) {
      arr = { ...arr, emailId: t("EMAIL_ID_IS_REQUIRED") };
    }
    if (
      typeof credentials?.state === "undefined" ||
      credentials?.state === ""
    ) {
      arr = { ...arr, state: t("STATE_IS_REQUIRED") };
    }
    if (
      typeof credentials?.district === "undefined" ||
      credentials?.district === ""
    ) {
      arr = { ...arr, district: t("DISTRICT_IS_REQUIRED") };
    }
    if (
      typeof credentials?.block === "undefined" ||
      credentials?.block === ""
    ) {
      arr = { ...arr, block: t("BLOCK_IS_REQUIRED") };
    }
    if (
      typeof credentials?.school === "undefined" ||
      credentials?.school === ""
    ) {
      arr = { ...arr, school: t("SCHOOL_IS_REQUIRED") };
    }
    if (
      typeof credentials?.udise === "undefined" ||
      credentials?.udise === ""
    ) {
      arr = { ...arr, udise: t("UDISE_IS_REQUIRED") };
    }
    if (
      typeof credentials?.class === "undefined" ||
      credentials?.class === ""
    ) {
      arr = { ...arr, class: t("CLASS_IS_REQUIRED") };
    }
    setErrors(arr);

    return !(
      arr.mobileNumber &&
      arr.name &&
      arr.dateOfBirth &&
      arr.emailId &&
      arr.state &&
      arr.district &&
      arr.block &&
      arr.school &&
      arr.udise &&
      arr.class
    );
  };

  const handleLogin = () => {
    if (validate()) {
      navigate("/mobilenumberscreen");
    }
  };
  const setCredentialForText = (e, item) => {
    let arr = {};
    let data;
    if (item === "mobileNumber") {
      if (isNaN(Number(e.target.value))) {
        arr = { ...arr, mobileNumber: t("Phone Number is invalid") };
        setErrors(arr);
      } else {
        arr = {};
        setErrors(arr);
        data = {
          ...credentials,
          [item]: e.target.value,
        };
        setCredentials(data);
      }
    } else {
      arr = {};

      if (item === "state") {
        data = {
          ...credentials,
          [item]: e,
        };
      } else {
        data = {
          ...credentials,
          [item]: e.target.value,
        };
      }
      console.log(data);
      setCredentials(data);
      setErrors(arr);
    }
  };

  return (
    <Layout
      _appBar={{
        languages: manifest.languages,
        isBackButtonShow: false,
        isHideMenuButton: true,
        LeftIcon: (
          <HStack width={"65px"}>
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

        rightIcon: (
          <HStack paddingBottom={"25px"}>
            <IconByName name="CloseCircleFillIcon" />
          </HStack>
        ),
      }}
    >
      <Box>
        <Center width={"100%"}>
          <VStack space="">
            <Box ml={"25px"}>
              <Heading>{t("Welcome!")}</Heading>
              <BodyMedium textTransform="inherit">{t("Sign Up")}</BodyMedium>
            </Box>
            <VStack space={2} pt={"25px"} pb={"10px"}>
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
                        onPress={() => setErrors({})}
                      />
                    </HStack>
                  </VStack>
                </Alert>
              ) : (
                <></>
              )}
              <VStack space="30px" p={"20px"} overflowY={"auto"}>
                {fieldsName?.map((item, index) => (
                  <FormControl
                    isRequired
                    isInvalid={item?.attribute in errors}
                    key={index}
                    name={item?.attribute}
                  >
                    <FormControl.Label
                      _text={{
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#6461D2",
                      }}
                      mb="10px"
                    >
                      {t(item?.label)}
                    </FormControl.Label>
                    {item?.attribute === "state" ? (
                      <Select
                        accessibilityLabel={item.placeholder}
                        placeholder={"Select"}
                        variant="rounded"
                        key={item?.attribute}
                        name={item?.attribute}
                        borderColor={
                          credentials?.[item?.attribute]
                            ? "orange.500"
                            : "#C1C1C1"
                        }
                        onValueChange={(e) =>
                          setCredentialForText(e, item?.attribute)
                        }
                      >
                        <Select.Item
                          key={item?.attribute}
                          label={"Maharashtra"}
                          value={"Maharashtra"}
                        />
                      </Select>
                    ) : (
                      <Input
                        key={item?.attribute}
                        name={item?.attribute}
                        bg="white"
                        variant="rounded"
                        borderColor={
                          credentials?.[item?.attribute]
                            ? "orange.500"
                            : "#C1C1C1"
                        }
                        p={"10px"}
                        maxLength={
                          item?.attribute === "mobileNumber" ? 10 : 125
                        }
                        placeholder={t("ENTER") + " " + t(item?.label)}
                        onChange={(e) =>
                          setCredentialForText(e, item?.attribute)
                        }
                        InputRightElement={
                          item?.attribute == "dateOfBirth" ? (
                            <IconByName
                              name="CalendarEventLineIcon"
                              color={"#6461D2"}
                              _icon={{ size: "15" }}
                              alignItems="center"
                              padding="10px"
                              isDisabled
                            />
                          ) : null
                        }
                      />
                    )}

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
              </VStack>
            </VStack>
            <Button variant={"rounded"} p="3" onPress={handleLogin}>
              {t("Get OTP >")}
            </Button>
          </VStack>
        </Center>
      </Box>
    </Layout>
  );
}
