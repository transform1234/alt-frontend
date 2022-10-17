import { HStack, Stack, Avatar } from "native-base";
import { Layout, IconByName, NameTag } from "@shiksha/common-lib";
import React from "react";
import SubjectCard from "../components/SubjectCard";
import { useNavigate } from "react-router-dom";

export default function SubjectList({ footerLinks }) {
  const navigate = useNavigate();
  const SubjectList = [
    {
      subject: "English",
      status: "Start Learning",
      iconName: "FilePaper2LineIcon",
    },
    {
      subject: "Mathematics",
      status: "Start Assesment",
      iconName: "CodeLineIcon",
    },

    {
      subject: "Science",
      status: "Start Assesment",
      iconName: "FlaskLineIcon",
    },
    {
      subject: "Hindi",
      status: "Start Assesment",
      iconName: "QuillPenLineIcon",
    },
  ];
  return (
    <Layout
      _header={{
        title: "Baseline Assessments",
      }}
      _appBar={{
        languages: [],
        isBackButtonShow: false,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack>
            <Avatar
              style={{ borderRadius: "0px !important" }}
              // size="md"
              source={require("./../assets/images/TSHeader.jpg")}
            />
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
      <Stack space="8" p="8" mb="10">
        {SubjectList?.map((item, index) => (
          <SubjectCard
            onPress={() => navigate(`/selfassesment`)}
            index={index}
            key={index}
            subject={item?.subject}
            status={item?.status}
            iconName={item?.iconName}
          />
        ))}
      </Stack>
    </Layout>
  );
}
