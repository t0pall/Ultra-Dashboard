import { Space, Tag, Typography } from "antd";
import dayjs from "dayjs";

import { Text } from "@/components";
import { Task } from "@/graphql/schema.types";
import { getDateColor } from "@/utilities";
import { useTranslate } from "@refinedev/core";

type Props = {
  dueData?: Task["dueDate"];
};

export const DueDateHeader = ({ dueData }: Props) => {
  const t = useTranslate();
  if (dueData) {
    const color = getDateColor({
      date: dueData,
      defaultColor: "processing",
    });
    const getTagText = () => {
      switch (color) {
        case "error":
          return t("tasks.Overdue");
        case "warning":
          return t("tasks.DueSoon");
        default:
          return t("tasks.Processing");
      }
    };

    return (
      <Space size={[0, 8]}>
        <Tag color={color}>{getTagText()}</Tag>
        <Text>{dayjs(dueData).format("MM.DD.YYYY - HH:mm")}</Text>
      </Space>
    );
  }

  return <Typography.Link>{t("tasks.AddDueDate")}</Typography.Link>;
};
