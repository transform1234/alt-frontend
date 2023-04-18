import React from "react";
import { Box, HStack, Avatar,Text } from "native-base";
import {
  Breadcrumb,
  Layout,
  NameTag,
  H3,
  userRegistryService,
} from "@shiksha/common-lib";
import manifest from "../../src/manifest.json";
import { useTranslation } from "react-i18next";
import ScoreCard from "components/ScoreCard";

function Report({ footerLinks }) {
  const { t } = useTranslation();
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    const getData = async () => {
      setUser(await userRegistryService.getOne());
    };
    getData();
  }, []);

  return (
    <Layout
      _header={{
        title: t("SCORE_CARD"),
        subHeadingComponent: (
          <Breadcrumb
            data={[{ title: t("HOME"), link: "/" }, t("SCORE_CARD")]}
          />
        ),
      }}
      _appBar={{
        languages: manifest.languages,
        isLanguageIcon: true,

        isShowNotificationButton: false,
        titleComponent: <NameTag />,
        _text_logo :(<HStack>
          <Box mt={"10px"} mb={"10px"} >
          <H3>Accelerated Learning via Technology (ALT)</H3>
          </Box>
        </HStack>),
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
      <Box px="5" mb="4">
        <ScoreCard user={user} />
      </Box>
    </Layout>
  );
}
export default Report;
