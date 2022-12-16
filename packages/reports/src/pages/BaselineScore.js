import { Stack, VStack } from "native-base";
import React, { useEffect, useState } from "react";
import { subjectListRegistryService } from "@shiksha/common-lib";
import BaselineScoreCard from "../components/BaselineScoreCard";

export default function BaselineScore({ user }) {
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
    <VStack p="2">
      {SubjectListData?.map((item, index) => (
        <BaselineScoreCard key={index} subject={item.subject} user={user} />
      ))}
    </VStack>
  );
}
