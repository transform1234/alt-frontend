import { HStack, Stack, Avatar } from "native-base";
import {
  Layout,
  Breadcrumb,
  NameTag,
  subjectListRegistryService,
  H1,
  telemetryFactory,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";

import React from "react";
import SubjectCard from "../components/SubjectCard";
import { useNavigate } from "react-router-dom";
import manifest from "../manifest.json";
import subjectIcons from "util/subjectIcons";
export default function SubjectList({ footerLinks }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [SubjectList, setSubjectListData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const userName = localStorage.getItem("name");
    const grade = localStorage.getItem("grade");
    const medium = localStorage.getItem("medium");
    const id = localStorage.getItem("id");
    const board = localStorage.getItem("board");

    const telemetryImpression = {
      context: {
        env: "Subjects",
        cdata: [],
      },
      edata: {
        type: "list", //Required. Impression type (list, detail, view, edit, workflow, search)

        subtype: "Scroll", //Optional. Additional subtype. "Paginate", "Scroll"

        pageid: "subjects", //Required.  Unique page id

        uid: id,

        studentid: "student-id",

        userName: userName,

        grade: grade,

        medium: medium,

        board: board,
      },
    };
    telemetryFactory.impression(telemetryImpression);
    const subjects = async () => {
      try {
        const data = await subjectListRegistryService.getSubjectList();
        setSubjectListData(data);
        setLoading(false);
      } catch (e) {
        console.log({ e });
        setLoading(false);
      }
    };
    subjects();
  }, []);

  const getRules = (rules) => {
    try {
      const data = JSON.parse(rules);
      return !data?.prog;
    } catch (e) {}
    return true;
  };

  return (
    <Layout
      loading={loading}
      _header={{
        title: t("SUBJECTS"),
        subHeadingComponent: (
          <Breadcrumb data={[{ title: t("HOME"), link: "/" }, t("SUBJECTS")]} />
        ),
      }}
      _appBar={{
        languages: manifest.languages,
        isLanguageIcon: true,

        isShowNotificationButton: false,
        isBackButtonShow: false,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack>
            <img
              width={"100px"}
              src={require("./../assets/images/TSHeader.png")}
            />
          </HStack>
        ),
      }}
      _footer={footerLinks}
    >
      <Stack space="8" p="8" mb="10">
        {SubjectList.length > 0 ? (
          SubjectList?.map((item, index) => (
            <SubjectCard
              onPress={() =>
                navigate(`/studentprogram/${item?.subject.toLowerCase()}`)
              }
              isDisabled={getRules(item?.rules)}
              key={index}
              subject={item?.subject}
              status={"Start Learning"}
              iconName={
                subjectIcons?.[item?.subject.toLowerCase()]
                  ? subjectIcons[item?.subject.toLowerCase()]
                  : "CodeLineIcon"
              }
            />
          ))
        ) : (
          <H1 textAlign={"center"} p="5">
            {t("SUBJECT_NOT_FOUND")}
          </H1>
        )}
      </Stack>
    </Layout>
  );
}
