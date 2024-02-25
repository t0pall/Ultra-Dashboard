import { MarkdownField } from "@refinedev/antd";

import { Typography } from "antd";

import { Task } from "@/graphql/schema.types";
import { useTranslate } from "@refinedev/core";

type Props = {
  description?: Task["description"];
};

export const DescriptionHeader = ({ description }: Props) => {
  const t = useTranslate();
  if (description) {
    return (
      <Typography.Paragraph ellipsis={{ rows: 8 }}>
        <MarkdownField value={description} />
      </Typography.Paragraph>
    );
  }

  return <Typography.Link>{t("tasks.AddTaskDescription")}</Typography.Link>;
};
