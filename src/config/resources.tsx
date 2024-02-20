import {
  DashboardOutlined,
  ProjectOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { IResourceItem } from '@refinedev/core';
import { TFunction } from 'i18next';

export const resources: (t: TFunction) => IResourceItem[] = (t) => {
  return [
    {
      name: 'Dashboard',
      list: '/',
      meta: {
        label: t('dashboard.Dashboard'),
        icon: <DashboardOutlined />,
      },
    },
    {
      name: 'companies',
      list: '/companies',
      show: '/companies/:id',
      create: '/companies/new',
      edit: '/companies/edit/:id',
      meta: {
        label: t('companies.Companies'),
        icon: <ShopOutlined />,
      },
    },
    {
      name: 'tasks',
      list: '/tasks',
      create: '/tasks/new',
      edit: '/tasks/edit/:id',
      meta: {
        label: t('tasks.Tasks'),
        icon: <ProjectOutlined />,
      },
    },
  ];
};
