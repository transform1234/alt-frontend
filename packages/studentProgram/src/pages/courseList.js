import { HStack, Stack, Avatar } from "native-base";
import { Layout, selfAssesmentService, NameTag } from "@shiksha/common-lib";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CourseCard from "components/CourseCard";
import manifest from "../../src/manifest.json";

export default function CourseList({ footerLinks }) {
  const [courseList, setCoursesList] = useState([]);
  const navigate = useNavigate();
  useEffect(async () => {
    const data = await selfAssesmentService.getCoursesRule();
    setCoursesList(data);
  }, []);

  return (
    <Layout
      _header={{
        title: "English",
      }}
      _appBar={{
        languages: manifest.languages,
        isShowNotificationButton: false,
        isBackButtonShow: false,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack space={2} alignItems="center">
            <Avatar
              rounded={0}
              _image={{ rounded: 0 }}
              style={{ borderRadius: 0 }}
              source={require("./../assets/images/TSHeader.jpg")}
            />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <Stack space="4" p="4" mb="5">
        {courseList?.map((item, key) => {
          return (
            <CourseCard
              item={item}
              // isDisabled={key === 0 ? false : true}
              {...([
                "assessment",
                "SelfAssess",
                "QuestionSet",
                "QuestionSetImage",
              ].includes(item?.objectType)
                ? item?.trakingData?.length > 0
                  ? {}
                  : {
                      onPress: () =>
                        navigate(
                          `/studentprogram/lessons/${item?.identifier}/${item?.objectType}`
                        ),
                    }
                : {
                    onPress: () =>
                      navigate(
                        `/studentprogram/lessons/${item?.identifier}/${item?.contentType}`
                      ),
                  })}
            />
          );
        })}
      </Stack>
    </Layout>
  );
}
