import React from "react";
import { Box, HStack, Avatar } from "native-base";
import { H1, H3 } from "@shiksha/common-lib";
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
        customeComponent: (
          <HStack p="5" space={5} alignItems="center">
            <Box
              bg="#FFF"
              rounded="24px"
              width="75px"
              height="50px"
              alignItems={"center"}
            >
              <Avatar
                backgroundSize="contain"
                rounded={0}
                _image={{ rounded: 0 }}
                style={{ borderRadius: 0 }}
                source={require("./../assets/images/ssaicon.png")}
              />
            </Box>
            <Avatar source={require("./../assets/images/tsIcon.png")} />
            <Box>
              <H3 color="white">{t("WELCOME")}</H3>
              <H1 color="white">{localStorage.getItem("name")}</H1>
            </Box>
          </HStack>
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
