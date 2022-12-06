import React from "react";
import { Box, Stack, VStack, HStack, Avatar, Image } from "native-base";
import { capture, H3, H1, Menu } from "@shiksha/common-lib";
import { useTranslation } from "react-i18next";
import manifest from "../../src/manifest.json";
import Layout from "../components/Layout";
import moment from "moment";

const menuBoxProp = {
  boxMinW: "150px",
};

const dashboard = [
  {
    id: 1,
    title: "Dashboard",
    icon: "DashboardLineIcon",
    ...menuBoxProp,
  },
  {
    id: 2,
    title: "Teaching & Learning",
    icon: "FileEditLineIcon",
    _text: { maxW: "85px" },
    ...menuBoxProp,
  },
  {
    id: 3,
    title: "Add Content",
    icon: "FileCopyLineIcon",
    ...menuBoxProp,
  },
  {
    id: 4,
    title: "Training",
    icon: "FileUserLineIcon",
    ...menuBoxProp,
  },
  {
    id: 5,
    title: "Reporting",
    icon: "DashboardLineIcon",
    _pressable: { flex: "0 0 50%" },
    ...menuBoxProp,
  },
];

function Home({ footerLinks }) {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    capture("PAGE");
  }, []);

  return (
    <Layout
      loading={loading}
      _header={{
        title: t("HOME"),
        subHeading: moment().format("hh:mm A"),
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
      <Box p="5" bg={"red.50"}>
        <Menu
          gridCount="2"
          type="vertical"
          _icon={{
            color: "primary",
            bg: "primaryLight",
            p: 2,
            rounded: "full",
            _icon: { size: "32" },
          }}
          _box={{ space: 4 }}
          _hstack={{ justifyContent: "unset" }}
          _vstack={{ space: 4 }}
          _pressable={{ p: 5, rounded: "9px", bg: "white", flex: "50%" }}
          _text={{
            color: "#333",
            fontWeight: 600,
            fontSize: "16px",
            maxW: "auto",
          }}
          items={dashboard}
        />
      </Box>
    </Layout>
  );
}
export default Home;
