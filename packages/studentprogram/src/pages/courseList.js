import { HStack, Stack, Avatar } from "native-base";
import {
  Layout,
  selfAssesmentService,
  NameTag,
  H1,
  Breadcrumb,
} from "@shiksha/common-lib";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CourseCard from "components/CourseCard";
import manifest from "../manifest.json";
import { useTranslation } from "react-i18next";

export default function CourseList({ footerLinks }) {
  const { t } = useTranslation();

  const [courseList, setCoursesList] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  let { subjectname } = useParams();
  subjectname = subjectname ? subjectname : "English";
  useEffect(async () => {
    try {
      const data = await selfAssesmentService.getCoursesRule({
        subject: subjectname,
      });
      setCoursesList(data);
      setLoading(false);
    } catch (e) {
      console.log({ e });
      setLoading(false);
    }
  }, []);

  return (
    <Layout
      loading={loading}
      _header={{
        title: subjectname,
        subHeadingComponent: (
          <Breadcrumb
            data={[
              { title: t("HOME"), link: "/" },
              { title: t("SUBJECTS"), link: "/studentprogram/subjects" },
              subjectname,
            ]}
          />
        ),
      }}
      _appBar={{
        languages: manifest.languages,
        isLanguageIcon: true,

        isShowNotificationButton: false,
        isBackButtonShow: false,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack space={2} alignItems="center">
            <Avatar
              rounded={0}
              _image={{ rounded: 0 }}
              style={{ borderRadius: 0 }}
              source={require("../assets/images/TSHeader.jpg")}
            />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <Stack space="4" p="4" mb="5">
        {courseList.length > 0 ? (
          courseList?.map((item, key) => {
            return (
              <CourseCard
                key={key}
                item={item}
                isDisabled={
                  key === 0 ? false : courseList[0]?.trakingData?.length < 1
                }
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
          })
        ) : (
          <H1 textAlign={"center"} p="5">
            {t("PROGRAM_NOT_FOUND")}
          </H1>
        )}
      </Stack>
    </Layout>
  );
}
