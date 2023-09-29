import { HStack, Stack, Avatar } from "native-base";
import {
  Layout,
  selfAssesmentService,
  NameTag,
  H1,
  Breadcrumb,
  courseRegistryService,
  subjectListRegistryService,
  capitalizeFirstLetter,
} from "@shiksha/common-lib";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CourseCard from "components/CourseCard";
import manifest from "../manifest.json";
import { useTranslation } from "react-i18next";

export default function CourseList({ footerLinks }) {
  const { t } = useTranslation();
  const [courseList, setCoursesList] = useState([]);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const navigate = useNavigate();
  let { subjectname } = useParams();
  subjectname = capitalizeFirstLetter(subjectname);

  useEffect(async () => {
    try {
      const resultData = await subjectListRegistryService.getProgramId();
      const result = await courseRegistryService.courseStatus({
        programId: resultData?.programId,
        subject: subjectname,
      });
      console.log("INSIDE COURSE LIST 1");
      console.log(result);
      setStatus(result);
      const data = await selfAssesmentService.getCoursesRule({
        programId: resultData?.programId,
        subject: subjectname,
      });
      console.log("INSIDE COURSE LIST");
      console.log(status);
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
        title:
          subjectname === "English"
            ? t("ENGLISH")
            : subjectname === "Mathematics"
            ? t("MATHEMATICS")
            : subjectname === "Science"
            ? t("SCIENCE")
            : subjectname === "Odiya"
            ? t("ODIYA")
            : "",
        subHeadingComponent: (
          <Breadcrumb
            data={[
              { title: t("HOME"), link: "/" },
              { title: t("SUBJECTS"), link: "/studentprogram/subjects" },
              subjectname === "English"
                ? t("ENGLISH")
                : subjectname === "Mathematics"
                ? t("MATHEMATICS")
                : subjectname === "Science"
                ? t("SCIENCE")
                : subjectname === "Odiya"
                ? t("ODIYA")
                : "",
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
            <img
              width={"100px"}
              src={require("./../assets/images/TSHeader.png")}
            />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <Stack space="4" p="4" mb="5">
        {courseList.length > 0 ? (
          courseList?.map((item, key) => {
            const isComplete = status.find(
              (subItem) => item.identifier === subItem?.contentId
            );
            return (
              <CourseCard
                key={key}
                item={item}
                isDisabled={isComplete?.status === "locked"}
                isDone={isComplete?.status === "completed"}
                {...([
                  "assessment",
                  "SelfAssess",
                  "QuestionSet",
                  "QuestionSetImage",
                ].includes(item?.objectType)
                  ? {
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
