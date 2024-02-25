import { useModalForm, useSelect } from "@refinedev/antd";
import { HttpError, useGo, useTranslate } from "@refinedev/core";
import {
  GetFields,
  GetFieldsFromList,
  GetVariables,
} from "@refinedev/nestjs-query";

import { Form, Input, Modal, Select } from "antd";

import { SelectOptionWithAvatar } from "@/components";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import {
  CreateCompanyMutation,
  CreateCompanyMutationVariables,
  UsersSelectQuery,
} from "@/graphql/types";

import { CREATE_COMPANY_MUTATION } from "./queries";

export const CompanyCreateModal = () => {
  const t = useTranslate();
  const go = useGo();

  const goToListPage = () => {
    go({
      to: { resource: "companies", action: "list" },
      options: {
        keepQuery: true,
      },
      type: "replace",
    });
  };

  const { formProps, modalProps } = useModalForm<
    GetFields<CreateCompanyMutation>,
    HttpError,
    GetVariables<CreateCompanyMutationVariables>
  >({
    action: "create",
    defaultVisible: true,
    resource: "companies",
    redirect: false,
    mutationMode: "pessimistic",
    onMutationSuccess: goToListPage,
    meta: {
      gqlMutation: CREATE_COMPANY_MUTATION,
    },
  });

  const { selectProps, queryResult } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
    optionLabel: "name",
  });

  return (
    <Modal
      {...modalProps}
      mask={true}
      onCancel={goToListPage}
      title={t("companies.AddNewCompany")}
      width={512}
    >
      <Form {...formProps} layout="vertical">
        <Form.Item
          label={t("companies.CompanyName")}
          name="name"
          rules={[{ required: true }]}
        >
          <Input placeholder={t("companies.PleaseEnterCompanyName")} />
        </Form.Item>
        <Form.Item
          label={t("companies.SalesOwner")}
          name="salesOwnerId"
          rules={[{ required: true }]}
        >
          <Select
            placeholder={t("companies.PleaseSalesOwnerUser")}
            {...selectProps}
            options={
              queryResult.data?.data?.map((user) => ({
                value: user.id,
                label: (
                  <SelectOptionWithAvatar
                    name={user.name}
                    avatarUrl={user.avatarUrl ?? undefined}
                  />
                ),
              })) ?? []
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};
