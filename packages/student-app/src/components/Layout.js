import { Layout, NameTag } from "@shiksha/common-lib";
import { Avatar, HStack } from "native-base";
import React from "react";

export default function App({ children, ...props }) {
  return (
    <Layout
      {...props}
      _appBar={{
        // color: "#fff",
        // _box: { pt: 5 },
        isLanguageIcon: true,
        // _menuButton: { px: 0, pr: "3" },
        // _languageMenu: { px: 0, pr: "3" },
        // ...props._appBar,
        titleComponent: <NameTag />,
        LeftIcon: (
          <HStack space={2} alignItems="center">
            <Avatar
              rounded={0}
              _image={{ rounded: 0 }}
              style={{ borderRadius: 0 }}
              source={require("../assets/images/TSHeader.jpg")}
            />
          </HStack>
        ),
      }}
    >
      {children}
    </Layout>
  );
}
