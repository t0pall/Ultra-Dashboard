import { useParams } from "react-router-dom";

import { FilterDropdown, useTable } from "@refinedev/antd";
import { GetFieldsFromList } from "@refinedev/nestjs-query";

import {
  MailOutlined,
  PhoneOutlined,
  SearchOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button, Card, Input, Select, Space, Table } from "antd";

import { ContactStatusTag, CustomAvatar, Text } from "@/components";
import { Contact } from "@/graphql/schema.types";
import { CompanyContactsTableQuery } from "@/graphql/types";

import { COMPANY_CONTACTS_TABLE_QUERY } from "./queries";
import { useTranslate } from "@refinedev/core";
import { TFunction } from "i18next";

export const CompanyContactsTable = () => {
  const t = useTranslate();
  const params = useParams();

  const { tableProps } = useTable<GetFieldsFromList<CompanyContactsTableQuery>>(
    {
      resource: "contacts",
      syncWithLocation: false,
      sorters: {
        initial: [
          {
            field: "createdAt",
            order: "desc",
          },
        ],
      },
      filters: {
        initial: [
          {
            field: "jobTitle",
            value: "",
            operator: "contains",
          },
          {
            field: "name",
            value: "",
            operator: "contains",
          },
          {
            field: "status",
            value: undefined,
            operator: "in",
          },
        ],
        permanent: [
          {
            field: "company.id",
            operator: "eq",
            value: params?.id as string,
          },
        ],
      },
      meta: {
        gqlQuery: COMPANY_CONTACTS_TABLE_QUERY,
      },
    },
  );

  return (
    <Card
      styles={{
        header: { borderBottom: "1px solid #D9D9D9", marginBottom: "1px" },
        body: { padding: 0 },
      }}
      title={
        <Space size="middle">
          <TeamOutlined />
          <Text>{t("companies.Contacts")}</Text>
        </Space>
      }
      extra={
        <>
          <Text className="tertiary">{t("companies.TotalContacts")}</Text>
          <Text strong>
            {tableProps?.pagination !== false && tableProps.pagination?.total}
          </Text>
        </>
      }
    >
      <Table
        {...tableProps}
        rowKey="id"
        pagination={{
          ...tableProps.pagination,
          showSizeChanger: false,
        }}
      >
        <Table.Column<Contact>
          title={t("companies.Name")}
          dataIndex="name"
          render={(_, record) => {
            return (
              <Space>
                <CustomAvatar name={record.name} src={record.avatarUrl} />
                <Text
                  style={{
                    whiteSpace: "nowrap",
                  }}
                >
                  {record.name}
                </Text>
              </Space>
            );
          }}
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder={t("companies.SearchName")} />
            </FilterDropdown>
          )}
        />
        <Table.Column
          title={t("companies.Title")}
          dataIndex="jobTitle"
          filterIcon={<SearchOutlined />}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Input placeholder={t("companies.SearchTitle")} />
            </FilterDropdown>
          )}
        />
        <Table.Column<Contact>
          title={t("companies.Stage")}
          dataIndex="status"
          render={(_, record) => {
            return <ContactStatusTag status={record.status} />;
          }}
          filterDropdown={(props) => (
            <FilterDropdown {...props}>
              <Select
                style={{ width: "200px" }}
                mode="multiple"
                placeholder={t("companies.SelectStage")}
                options={statusOptions(t)}
              ></Select>
            </FilterDropdown>
          )}
        />
        <Table.Column<Contact>
          dataIndex="id"
          width={112}
          render={(value, record) => {
            return (
              <Space>
                <Button
                  size="small"
                  href={`mailto:${record.email}`}
                  icon={<MailOutlined />}
                />
                <Button
                  size="small"
                  href={`tel:${record.phone}`}
                  icon={<PhoneOutlined />}
                />
              </Space>
            );
          }}
        />
      </Table>
    </Card>
  );
};

const statusOptions = (
  t: TFunction,
): {
  label: string;
  value: Contact["status"];
}[] => [
  {
    label: t("companies.New"),
    value: "NEW",
  },
  {
    label: t("companies.Qualified"),
    value: "QUALIFIED",
  },
  {
    label: t("companies.Unqualified"),
    value: "UNQUALIFIED",
  },
  {
    label: t("companies.Won"),
    value: "WON",
  },
  {
    label: t("companies.Negotiation"),
    value: "NEGOTIATION",
  },
  {
    label: t("companies.Lost"),
    value: "LOST",
  },
  {
    label: t("companies.Interested"),
    value: "INTERESTED",
  },
  {
    label: t("companies.Contacted"),
    value: "CONTACTED",
  },
  {
    label: t("companies.Churned"),
    value: "CHURNED",
  },
];
