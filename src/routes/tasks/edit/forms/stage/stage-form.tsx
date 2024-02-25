import { useForm, useSelect } from "@refinedev/antd";
import { HttpError, useTranslate } from "@refinedev/core";
import {
  GetFields,
  GetFieldsFromList,
  GetVariables,
} from "@refinedev/nestjs-query";

import { FlagOutlined } from "@ant-design/icons";
import { Checkbox, Form, Select, Space } from "antd";

import { AccordionHeaderSkeleton } from "@/components";
import { TASK_STAGES_SELECT_QUERY } from "@/graphql/queries";
import {
  TaskStagesSelectQuery,
  UpdateTaskMutation,
  UpdateTaskMutationVariables,
} from "@/graphql/types";

import { UPDATE_TASK_MUTATION } from "../../queries";

type Props = {
  isLoading?: boolean;
};

export const StageForm = ({ isLoading }: Props) => {
  const t = useTranslate();
  const { formProps } = useForm<
    GetFields<UpdateTaskMutation>,
    HttpError,
    Pick<GetVariables<UpdateTaskMutationVariables>, "stageId" | "completed">
  >({
    queryOptions: {
      enabled: false,
    },
    autoSave: {
      enabled: true,
      debounce: 0,
    },
    meta: {
      gqlMutation: UPDATE_TASK_MUTATION,
    },
  });

  const { selectProps } = useSelect<GetFieldsFromList<TaskStagesSelectQuery>>({
    resource: "taskStages",
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"],
      },
    ],
    sorters: [
      {
        field: "createdAt",
        order: "asc",
      },
    ],
    meta: {
      gqlQuery: TASK_STAGES_SELECT_QUERY,
    },
  });

  const selectPropsWithTranslation = {
    ...selectProps,
    options: selectProps.options?.map((option) => ({
      ...option,
      label: t(`tasks.${option.label}`),
    })),
  };


  if (isLoading) {
    return <AccordionHeaderSkeleton />;
  }

  return (
    <div style={{ padding: "12px 24px", borderBottom: "1px solid #d9d9d9" }}>
      <Form
        layout="inline"
        style={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
        {...formProps}
      >
        <Space size={5}>
          <FlagOutlined />
          <Form.Item
            noStyle
            name={["stageId"]}
            initialValue={formProps?.initialValues?.stage?.id}
          >
            <Select
              {...selectPropsWithTranslation}
              popupMatchSelectWidth={false}
              options={selectPropsWithTranslation.options?.concat([
                {
                  label: t("tasks.UNASSIGNED"),
                  value: null,
                },
              ])}
              variant="borderless"
              showSearch={false}
              placeholder="Select a stage"
              onSearch={undefined}
              size="small"
            />
          </Form.Item>
        </Space>
        <Form.Item noStyle name="completed" valuePropName="checked">
          <Checkbox>{t("tasks.MarkAsComplete")}</Checkbox>
        </Form.Item>
      </Form>
    </div>
  );
};
