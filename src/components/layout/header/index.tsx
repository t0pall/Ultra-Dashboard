import React from "react";
import { Layout, Space, theme } from "antd";
import { CurrentUser } from "../current-user";
import { LangSwitch } from "../lang-switch";

const { useToken } = theme;

export const Header = () => {
  const { token } = useToken();

  const headerStyles: React.CSSProperties = {
    backgroundColor: token.colorBgElevated,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "0px 24px",
    height: "64px",
    position: "sticky",
    top: 0,
    zIndex: 999,
  };

  return (
    <Layout.Header style={headerStyles}>
      <Space align="center" size="middle">
        <LangSwitch />
        <CurrentUser />
      </Space>
    </Layout.Header>
  );
};
