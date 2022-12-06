import React from "react";
import {
  Box,
  Stack,
  VStack,
  HStack,
  Avatar,
  Image,
  Pressable,
} from "native-base";
import {
  capture,
  H3,
  H1,
  Menu,
  H2,
  BodyLarge,
  Caption,
  IconByName,
  studentRegistryService,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import manifest from "../../src/manifest.json";
import Layout from "../components/Layout";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const menuBoxProp = {
  boxMinW: "150px",
};

// const students = [
//   {
//     id: "1",
//     name: "sagar",
//     email: "sagar@gmail.com",
//     birthDate: "2011-10-16",
//     state: "Maharashtra",
//     district: "Pune",
//     section: "C",
//     school: "Transform",
//     board: "Haryana",
//     medium: "English",
//     grade: "9",
//   },
//   {
//     id: "2",
//     name: "richa",
//     email: "richa@gmail.com",
//     birthDate: "2011-10-16",
//     state: "Maharashtra",
//     district: "Pune",
//     section: "C",
//     school: "Transform",
//     board: "Haryana",
//     medium: "English",
//     grade: "9",
//   },
// ];

function Students({ footerLinks }) {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);
  const [students, setStudents] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    const getData = async () => {
      const result = await studentRegistryService.getByTeacher();
      setStudents(result);
    };
    getData();
  }, []);
  console.log(students);
  return (
    <Layout
      loading={loading}
      _header={{
        title: t("STUDENTS"),
        subHeading: moment().format("hh:mm A"),
        customeComponent: (
          <HStack p="5" space={5} alignItems="center">
            <Box
              bg="#FFF"
              rounded="24px"
              width="75px"
              height="50px"
              alignItems={"center"}
            >
              <Avatar
                backgroundSize="contain"
                rounded={0}
                _image={{ rounded: 0 }}
                style={{ borderRadius: 0 }}
                source={require("./../assets/images/ssaicon.png")}
              />
            </Box>
            <Avatar source={require("./../assets/images/tsIcon.png")} />
            <Box>
              <H3 color="white">{t("WELCOME")}</H3>
              <H1 color="white">{localStorage.getItem("name")}</H1>
            </Box>
          </HStack>
        ),
      }}
      _appBar={{
        languages: manifest.languages,
      }}
      _footer={footerLinks}
    >
      <Stack space="4" p="5" mb="5">
        {students.length > 0 ? (
          students.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => navigate(`/students/${item?.id}`)}
            >
              <VStack p="4" w="100%" space="4" bg="white" rounded="lg">
                <HStack alignItems="center" justifyContent={"space-between"}>
                  <HStack alignItems="center" space="4">
                    <IconByName name="UserLineIcon" isDisabled pr="2" />
                    <VStack space="2">
                      <BodyLarge>{item?.name}</BodyLarge>
                      <Caption>{item?.board}</Caption>
                    </VStack>
                  </HStack>
                  <IconByName name="ArrowRightSLineIcon" isDisabled />
                </HStack>
              </VStack>
            </Pressable>
          ))
        ) : (
          <H1 textAlign={"center"} p="5">
            {t("STUDENT_NOT_FOUND")}
          </H1>
        )}
      </Stack>
    </Layout>
  );
}
export default Students;
