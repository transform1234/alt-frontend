import React from "react";
import { Box, HStack, Avatar } from "native-base";
import {
  Breadcrumb,
  Layout,
  NameTag,
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
        LeftIcon: (
          <HStack>
            <Avatar
              rounded={0}
              _image={{ rounded: 0 }}
              style={{ borderRadius: 0 }}
              source={require("../../src/assets/images/TSHeader.jpg")}
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
