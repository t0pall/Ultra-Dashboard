import { Edit, useForm, useSelect } from "@refinedev/antd";
import { HttpError, useTranslate } from "@refinedev/core";
import {
  GetFields,
  GetFieldsFromList,
  GetVariables,
} from "@refinedev/nestjs-query";
import { Form, Input, InputNumber, Select } from "antd";
import { CustomAvatar, SelectOptionWithAvatar } from "@/components";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import { BusinessType, CompanySize, Industry } from "@/graphql/schema.types";
import {
  UpdateCompanyMutation,
  UpdateCompanyMutationVariables,
  UsersSelectQuery,
} from "@/graphql/types";
import { getNameInitials } from "@/utilities";
import { UPDATE_COMPANY_MUTATION } from "./queries";
import { TFunction } from "i18next";

export const CompanyForm = () => {
  const t = useTranslate();
  const { saveButtonProps, formProps, formLoading, queryResult } = useForm<
    GetFields<UpdateCompanyMutation>,
    HttpError,
    GetVariables<UpdateCompanyMutationVariables>
  >({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });
  const { avatarUrl, name } = queryResult?.data?.data || {};

  const { selectProps: selectPropsUsers, queryResult: queryResultUsers } =
    useSelect<GetFieldsFromList<UsersSelectQuery>>({
      resource: "users",
      optionLabel: "name",
      pagination: {
        mode: "off",
      },
      meta: {
        gqlQuery: USERS_SELECT_QUERY,
      },
    });

  return (
    <Edit
      isLoading={formLoading}
      saveButtonProps={saveButtonProps}
      breadcrumb={false}
    >
      <Form {...formProps} layout="vertical">
        <CustomAvatar
          shape="square"
          src={avatarUrl}
          name={getNameInitials(name || "")}
          style={{
            width: 96,
            height: 96,
            marginBottom: "24px",
          }}
        />
        <Form.Item
          label={t("companies.SalesOwner")}
          name="salesOwnerId"
          initialValue={formProps?.initialValues?.salesOwner?.id}
        >
          <Select
            {...selectPropsUsers}
            options={
              queryResultUsers.data?.data?.map(({ id, name, avatarUrl }) => ({
                value: id,
                label: (
                  <SelectOptionWithAvatar
                    name={name}
                    avatarUrl={avatarUrl ?? undefined}
                  />
                ),
              })) ?? []
            }
          />
        </Form.Item>
        <Form.Item label={t("companies.CompanySize")} name="companySize">
          <Select options={companySizeOptions(t)} />
        </Form.Item>
        <Form.Item label={t("companies.TotalRevenue")} name="totalRevenue">
          <InputNumber
            autoFocus
            addonBefore={"$"}
            min={0}
            placeholder="0,00"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
          />
        </Form.Item>
        <Form.Item label={t("companies.Industry")} name="industry">
          <Select options={industryOptions(t)} />
        </Form.Item>
        <Form.Item label={t("companies.BusinessType")} name="businessType">
          <Select options={businessTypeOptions} />
        </Form.Item>
        <Form.Item label={t("companies.Country")} name="country">
          <Input placeholder="Country" />
        </Form.Item>
        <Form.Item label={t("companies.Website")} name="website">
          <Input placeholder="Website" />
        </Form.Item>
      </Form>
    </Edit>
  );
};

const companySizeOptions = (
  t: TFunction,
): {
  label: string;
  value: CompanySize;
}[] => [
  {
    label: t("companies.Enterprise"),
    value: "ENTERPRISE",
  },
  {
    label: t("companies.Large"),
    value: "LARGE",
  },
  {
    label: t("companies.Medium"),
    value: "MEDIUM",
  },
  {
    label: t("companies.Small"),
    value: "SMALL",
  },
];

const industryOptions = (
  t: TFunction,
): {
  label: string;
  value: Industry;
}[] => [
  { label: t("companies.Aerospace"), value: "AEROSPACE" },
  { label: t("companies.Agriculture"), value: "AGRICULTURE" },
  { label: t("companies.Automotive"), value: "AUTOMOTIVE" },
  { label: t("companies.Chemicals"), value: "CHEMICALS" },
  { label: t("companies.Construction"), value: "CONSTRUCTION" },
  { label: t("companies.Defense"), value: "DEFENSE" },
  { label: t("companies.Education"), value: "EDUCATION" },
  { label: t("companies.Energy"), value: "ENERGY" },
  { label: t("companies.FinancialServices"), value: "FINANCIAL_SERVICES" },
  { label: t("companies.FoodAndBeverage"), value: "FOOD_AND_BEVERAGE" },
  { label: t("companies.Government"), value: "GOVERNMENT" },
  { label: t("companies.Healthcare"), value: "HEALTHCARE" },
  { label: t("companies.Hospitality"), value: "HOSPITALITY" },
  {
    label: t("companies.IndustrialManufacturing"),
    value: "INDUSTRIAL_MANUFACTURING",
  },
  { label: t("companies.Insurance"), value: "INSURANCE" },
  { label: t("companies.LifeSciences"), value: "LIFE_SCIENCES" },
  { label: t("companies.Logistics"), value: "LOGISTICS" },
  { label: t("companies.Media"), value: "MEDIA" },
  { label: t("companies.Mining"), value: "MINING" },
  { label: t("companies.Nonprofit"), value: "NONPROFIT" },
  { label: t("companies.Other"), value: "OTHER" },
  { label: t("companies.Pharmaceuticals"), value: "PHARMACEUTICALS" },
  {
    label: t("companies.ProfessionalServices"),
    value: "PROFESSIONAL_SERVICES",
  },
  { label: t("companies.RealEstate"), value: "REAL_ESTATE" },
  { label: t("companies.Retail"), value: "RETAIL" },
  { label: t("companies.Technology"), value: "TECHNOLOGY" },
  { label: t("companies.Telecommunications"), value: "TELECOMMUNICATIONS" },
  { label: t("companies.Transportation"), value: "TRANSPORTATION" },
  { label: t("companies.Utilities"), value: "UTILITIES" },
];

const businessTypeOptions: {
  label: string;
  value: BusinessType;
}[] = [
  {
    label: "B2B",
    value: "B2B",
  },
  {
    label: "B2C",
    value: "B2C",
  },
  {
    label: "B2G",
    value: "B2G",
  },
];
