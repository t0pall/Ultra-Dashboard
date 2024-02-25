import React from "react";
import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import { Header } from "./header";
import { FireFilled } from "@ant-design/icons";

export const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <ThemedLayoutV2
        Header={Header}
        Title={(titleProps) => (
          <ThemedTitleV2
            {...titleProps}
            wrapperStyles={{ display: "flex", gap: 0 }}
            icon={<FireFilled />}
            text="Ultra dashboard"
          />
        )}
      >
        {children}
      </ThemedLayoutV2>
    </>
  );
};
