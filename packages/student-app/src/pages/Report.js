import React from "react";
import { Box, VStack } from "native-base";
import {
  Breadcrumb,
  Caption,
  H1,
  userRegistryService,
} from "@shiksha/common-lib";
import manifest from "../../src/manifest.json";
import { useTranslation } from "react-i18next";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
const ScoreCard = React.lazy(() => import("reports/ScoreCard"));

function Report({ footerLinks, isDisabledLink }) {
  const { t } = useTranslation();
  const { id } = useParams();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const getData = async () => {
      setUser(await userRegistryService.getOne({ id }));
    };
    getData();
  }, [id]);

  return (
    <Layout
      _header={{
        subHeadingComponent: (
          <Breadcrumb
            data={[
              { title: t("HOME"), link: "/" },
              { title: t("STUDENTS"), link: "/students" },
              { title: t("REPORT") },
            ]}
          />
        ),

        headingComponent: (
          <VStack>
            <H1>{user?.name}</H1>
            <Caption>{t("REPORT")}</Caption>
          </VStack>
        ),
      }}
      _appBar={{
        languages: manifest.languages,
      }}
      _footer={footerLinks}
    >
      <Box p="5" mb="4">
        <ScoreCard user={user} isDisabledLink={isDisabledLink} />
      </Box>
    </Layout>
  );
}
export default Report;
