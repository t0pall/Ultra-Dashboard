import { useSetLocale } from "@refinedev/core";
import { Button, theme } from "antd";

export const LangSwitch = () => {
  const setLocale = useSetLocale();
  const browserLocale = navigator.language;
  const storageLocale = localStorage.getItem("i18nextLng");
  const locale = storageLocale ? storageLocale : browserLocale;

  const changeLocale = () => {
    setLocale(locale === "ru" ? "en" : "ru");
  };

  return (
    <Button
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={changeLocale}
      shape="circle"
    >
      {locale}
    </Button>
  );
};
