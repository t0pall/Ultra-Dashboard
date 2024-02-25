import { Space, Typography } from "antd";

import { UserTag } from "@/components";
import { Task } from "@/graphql/schema.types";
import { useTranslate } from "@refinedev/core";

type Props = {
  users?: Task["users"];
};

export const UsersHeader = ({ users = [] }: Props) => {
  const t = useTranslate();
  if (users.length > 0) {
    return (
      <Space size={[0, 8]} wrap>
        {users.map((user) => (
          <UserTag key={user.id} user={user} />
        ))}
      </Space>
    );
  }

  return <Typography.Link>{t("tasks.AssignToUsers")}</Typography.Link>;
};
