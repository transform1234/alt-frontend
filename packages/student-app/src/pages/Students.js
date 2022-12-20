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
  Breadcrumb,
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
  const [classObject, setClassObject] = React.useState({});

  const navigate = useNavigate();

  React.useEffect(() => {
    const getData = async () => {
      const result = await studentRegistryService.getByTeacher();
      if (result?.data) {
        setClassObject(result?.class);
        setStudents(result?.data);
      }
    };
    getData();
  }, []);

  return (
    <Layout
      loading={loading}
      _header={{
        headingComponent: (
          <VStack>
            <H1>{t("STUDENTS")}</H1>
            <Caption>{`${
              !classObject?.name?.toLowerCase().includes("class")
                ? t("CLASS")
                : ""
            } ${classObject?.name} ${localStorage.getItem(
              "section"
            )} ${localStorage.getItem("medium")}`}</Caption>
          </VStack>
        ),
        subHeadingComponent: (
          <Breadcrumb
            data={[{ title: t("HOME"), link: "/" }, { title: t("STUDENTS") }]}
          />
        ),
      }}
      _appBar={{
        languages: manifest.languages,
      }}
      _footer={footerLinks}
    >
      <Stack space="4" p="5" pt="0" mb="5">
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
                      <Caption>{item?.email}</Caption>
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
