import { Layout, NameTag,H3 } from "@shiksha/common-lib";
import { Avatar, HStack,Box } from "native-base";
import React from "react";

import manifest from "../../src/manifest.json";

export default function App({ children, ...props }) {
  return (
    <Layout
      {...props}
      _appBar={{
        
          languages:manifest.languages,
        
        // color: "#fff",
        // _box: { pt: 5 },
        languages:manifest.languages,
        isLanguageIcon: true,
        // _menuButton: { px: 0, pr: "3" },
        // _languageMenu: { px: 0, pr: "3" },
        // ...props._appBar,
        titleComponent: <NameTag />,
        _text_logo :(<HStack>
          <Box mt={"10px"} mb={"10px"} >
          <H3>Accelerated Learning via Technology (ALT)</H3>
          </Box>
        </HStack>),
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
