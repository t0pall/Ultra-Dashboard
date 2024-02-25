import type { IResourceItem } from "@refinedev/core";
import i18n from "@/i18n";

import {
  DashboardOutlined,
  ProjectOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { TFunction } from "i18next";

export const resources = (t: TFunction): IResourceItem[] => [
  {
    name: "dashboard",
    list: "/",
    meta: {
      label: t("dashboard.dashboard"),
      icon: <DashboardOutlined />,
    },
  },
  {
    name: "companies",
    list: "/companies",
    show: "/companies/:id",
    create: "/companies/new",
    edit: "/companies/edit/:id",
    meta: {
      label: t("companies.Companies"),
      icon: <ShopOutlined />,
    },
  },
  {
    name: "tasks",
    list: "/tasks",
    create: "/tasks/new",
    edit: "/tasks/edit/:id",
    meta: {
      label: t("tasks.Tasks"),
      icon: <ProjectOutlined />,
    },
  },
];
