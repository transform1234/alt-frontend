import { Layout } from "@shiksha/common-lib";
import React from "react";

export default function App({ children, ...props }) {
  return (
    <Layout
      {...props}
      _appBar={{
        color: "#fff",
        _box: { pt: 5 },
        isLanguageIcon: true,
        _menuButton: { px: 0, pr: "3" },
        _languageMenu: { px: 0, pr: "3" },
        ...props._appBar,
      }}
    >
      {children}
    </Layout>
  );
}
