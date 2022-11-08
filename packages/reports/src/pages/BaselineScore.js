import { Stack, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { subjectListRegistryService } from "@shiksha/common-lib";
import SubjectScoreListCard from "../components/subjectScoreListCard";

const subjectList = [
  {
    subject: "English",
    value: 50,
    icon: "FilePaper2LineIcon",
    score: "8/10",
    level: ["Level1", "Level2", "Level3"],
  },
  {
    subject: "Science",
    value: 0,
    icon: "FlaskLineIcon",
    score: "-/10",
    level: ["Level1", "Level2", "Level3"],
  },
  {
    subject: "Maths",
    value: 10,
    icon: "CodeLineIcon",
    score: "2/10",
    level: ["Level1", "Level2", "Level3"],
  },
  {
    subject: "Hindi",
    value: 0,
    icon: "QuillPenLineIcon",
    score: "-/10",
    level: ["Level1", "Level2", "Level3"],
  },
];

export default function BaselineScore() {
  const [SubjectListData, setSubjectListData] = React.useState([]);
  const [programID, setProgramID] = React.useState([]);

  useEffect(() => {
    const programId = async () => {
      const data = await subjectListRegistryService.getProgramId();
      setProgramID(data.data);
    };
    programId();
    const subjects = async () => {
      const data = await subjectListRegistryService.getSubjectList(programID);
      setSubjectListData(data.data);
    };
    subjects();
  }, []);

  return (
    <VStack p="2">
      {/* {subjectList?.map((item, index) => (
        <SubjectScoreListCard
          index={index}
          key={index}
          subject={item?.subject}
          value={item?.value}
          icon={item?.icon}
          scoreval={item?.score}
          level={item.level}
        />
      ))} */}

      {SubjectListData?.map((item, index) => (
        <SubjectScoreListCard
          index={index}
          key={index}
          subject={item.subject}
          value={item.subject == "English" ? 65 : 20}
          icon={
            item.subject == "English" ? "FilePaper2LineIcon" : "CodeLineIcon"
          }
          scoreval={item.subject == "English" ? "8/10" : "2/10"}
          level={["Level1", "Level2", "Level3"]}
        />
      ))}
    </VStack>
  );
}
