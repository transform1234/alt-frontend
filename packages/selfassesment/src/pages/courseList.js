import {
  HStack,
  Text,
  VStack,
  Stack,
  Box,
  Button,
  Actionsheet,
  Pressable,
  ScrollView,
  Avatar,
} from "native-base";
import {
  Layout,
  SubMenu,
  Tab,
  classRegistryService,
  H2,
  H1,
  IconByName,
  ProgressBar,
  BodyLarge,
  Caption,
} from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { courses } from "../assets/mocCourses";
import manifest from "../manifest.json";
import NameTag from "components/NameTag";
export default function CourseList({ footerLinks }) {
  const { t } = useTranslation();
  const courseList = courses.content;
  const navigate = useNavigate();

  return (
    <Layout
      _header={{
        title: "Welcome Shradha",
      }}
      _appBar={{
        languages: manifest.languages,
        isBackButtonShow: false,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack>
            <IconByName name="Notification2LineIcon" />
            <IconByName name="Notification2LineIcon" />
          </HStack>
        ),
        rightIcon: (
          <HStack>
            <IconByName name="Notification2LineIcon" />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <Stack space="4" p="4" mb="5">
        {courses?.content.map((item) => (
          <VStack p="4" bg="white" space="4">
            <HStack justifyContent="space-between">
              <HStack space="4">
                <Avatar bg="selfassesment.avatar">
                  <IconByName />
                </Avatar>
                <VStack space="2">
                  <BodyLarge>
                    {" "}
                    {item?.name.substring(0, 20)}{" "}
                    {item?.name.length >= 20 && "..."}
                  </BodyLarge>
                  <Caption> course 1</Caption>
                </VStack>
              </HStack>
              <Button
                colorScheme="purple"
                onPress={() => navigate("/selfassesment/Lessons")}
              >
                {" "}
                next
              </Button>
            </HStack>
            <ProgressBar
              isTextShow
              legendType="separated"
              h="15px"
              _bar={{ rounded: "md", mb: "2" }}
              isLabelCountHide
              data={[{ name: "test1", color: "green", value: "100" }]}
            />
          </VStack>
        ))}
      </Stack>
    </Layout>
  );
}
