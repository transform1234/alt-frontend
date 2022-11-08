import { HStack, Stack, Avatar } from "native-base";
import {
  Layout,
  IconByName,
  NameTag,
  subjectListRegistryService,
} from "@shiksha/common-lib";
import React from "react";
import SubjectCard from "../components/SubjectCard";
import { useNavigate } from "react-router-dom";

export default function SubjectList({ footerLinks }) {
  const navigate = useNavigate();
  const [SubjectList, setSubjectListData] = React.useState([]);
  React.useEffect(() => {
    const subjects = async () => {
      const data = await subjectListRegistryService.getSubjectList();
      setSubjectListData(data.data);
    };
    subjects();
  }, []);
  // const SubjectList = [
  //   {
  //     subject: "English",
  //     status: "Start Learning",
  //     iconName: "FilePaper2LineIcon",
  //   },
  //   {
  //     subject: "Mathematics",
  //     status: "Start Assesment",
  //     iconName: "CodeLineIcon",
  //   },

  //   {
  //     subject: "Science",
  //     status: "Start Assesment",
  //     iconName: "FlaskLineIcon",
  //   },
  //   {
  //     subject: "Hindi",
  //     status: "Start Assesment",
  //     iconName: "QuillPenLineIcon",
  //   },
  // ];
  return (
    <Layout
      _header={{
        title: "Subjects",
      }}
      _appBar={{
        languages: [],
        isShowNotificationButton: false,
        isBackButtonShow: false,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack>
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
      <Stack space="8" p="8" mb="10">
        {SubjectList?.map((item, index) => (
          <SubjectCard
            onPress={() => navigate(`/studentprogram/${item.subject}`)}
            index={index}
            key={index}
            subject={item?.subject}
            status={
              item.subject == "English" ? "Start Learning" : "Start Assesment"
            }
            iconName={
              item.subject == "English" ? "FilePaper2LineIcon" : "CodeLineIcon"
            }
          />
        ))}
      </Stack>
    </Layout>
  );
}
