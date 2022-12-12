import React from "react";
import { Box, Stack, VStack } from "native-base";
import { Widget } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import manifest from "../../src/manifest.json";
import Layout from "../components/Layout";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const menuBoxProp = {
  boxMinW: "150px",
};

function Home({ footerLinks }) {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(true);
  const [dashboard, setDashboard] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    setDashboard([
      {
        title: t("QUICK_CHECK"),
        data: [
          {
            link: "/students",
            title: t("Dashboard"),
            _box: {
              style: {
                background:
                  "linear-gradient(100.88deg, #90c7ef -21.15%, #145788 80.4%)",
              },
            },
          },
        ],
      },
    ]);
    setLoading(false);
  }, []);

  return (
    <Layout
      loading={loading}
      _header={{
        title: t("HOME"),
        subHeading: moment().format("hh:mm A"),
        // customeComponent: (
        //   <HStack p="5" space={5} alignItems="center">
        //     <Box
        //       bg="#FFF"
        //       rounded="24px"
        //       width="75px"
        //       height="50px"
        //       alignItems={"center"}
        //     >
        //       <Avatar
        //         backgroundSize="contain"
        //         rounded={0}
        //         _image={{ rounded: 0 }}
        //         style={{ borderRadius: 0 }}
        //         source={require("./../assets/images/ssaicon.png")}
        //       />
        //     </Box>
        //     <Avatar source={require("./../assets/images/tsIcon.png")} />
        //     <Box>
        //       <H3 color="white">{t("WELCOME")}</H3>
        //       <H1 color="white">{localStorage.getItem("name")}</H1>
        //     </Box>
        //   </HStack>
        // ),
      }}
      _appBar={{
        languages: manifest.languages,
      }}
      _footer={footerLinks}
    >
      <Box bg="white" rounded={"2xl"} py={6} px={4} mb={5} shadow={3}>
        <Stack>
          <VStack space={6}>
            <Box display={"inline"}>{t("SUBTITLE_HOME")}</Box>
            {dashboard.map((item, index) => {
              return <Widget {...item} key={index} />;
            })}
          </VStack>
        </Stack>
      </Box>
    </Layout>
  );
}
export default Home;
