import React from "react";
import { Box, HStack, Avatar } from "native-base";
import { Breadcrumb, H1, H3 } from "@shiksha/common-lib";
import manifest from "../../src/manifest.json";
import { useTranslation } from "react-i18next";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
const ScoreCard = React.lazy(() => import("reports/ScoreCard"));

function Report({ footerLinks }) {
  const { t } = useTranslation();
  const { id } = useParams();

  return (
    <Layout
      _header={{
        title: t("REPORT"),
        subHeadingComponent: (
          <Breadcrumb
            data={[
              { title: t("HOME"), link: "/" },
              { title: t("STUDENTS"), link: "/students" },
              { title: t("REPORT") },
            ]}
          />
        ),
      }}
      _appBar={{
        languages: manifest.languages,
      }}
      _footer={footerLinks}
    >
      <Box p="5" mb="4">
        <ScoreCard userId={id} />
      </Box>
    </Layout>
  );
}
export default Report;
