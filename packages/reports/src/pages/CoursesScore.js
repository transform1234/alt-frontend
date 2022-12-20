import { VStack } from "native-base";
import React, { useEffect } from "react";
import { subjectListRegistryService } from "@shiksha/common-lib";
import CoursesScoreCard from "../components/CoursesScoreCard";

export default function CoursesScore({ user, _coursesScoreCard }) {
  const [SubjectListData, setSubjectListData] = React.useState([]);
  const [programID, setProgramID] = React.useState([]);

  useEffect(() => {
    const programId = async () => {
      const data = await subjectListRegistryService.getProgramId();
      setProgramID(data?.programId);
    };
    programId();
    const subjects = async () => {
      const data = await subjectListRegistryService.getSubjectList(programID);
      setSubjectListData(data);
    };
    subjects();
  }, []);

  return (
    <VStack py="5">
      {SubjectListData?.map((item, index) => (
        <CoursesScoreCard
          key={index}
          {..._coursesScoreCard}
          subject={item.subject}
          user={user}
        />
      ))}
    </VStack>
  );
}
