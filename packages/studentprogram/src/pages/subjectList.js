import { HStack, Stack, Avatar } from "native-base";
import {
  Layout,
  Breadcrumb,
  NameTag,
  subjectListRegistryService,
  H1,
} from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";

import React from "react";
import SubjectCard from "../components/SubjectCard";
import { useNavigate } from "react-router-dom";
import manifest from "../manifest.json";
export default function SubjectList({ footerLinks }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [SubjectList, setSubjectListData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
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
      <Stack space="8" p="8" mb="10">
        {SubjectList.length > 0 ? (
          SubjectList?.map((item, index) => (
            <SubjectCard
              onPress={() => navigate(`/studentprogram/${item.subject}`)}
              isDisabled={index}
              key={index}
              subject={item?.subject}
              status={"Start Learning"}
              iconName={
                item.subject == "English"
                  ? "FilePaper2LineIcon"
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
