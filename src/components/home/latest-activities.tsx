import { UnorderedListOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { Card, List, Space } from 'antd';
import { Text } from '../text';
import { useList, useTranslate } from '@refinedev/core';
import { LatestActivitiesSkeleton } from 'components/skeleton/latest-activities';
import {
  DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
  DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
} from 'graphql/queries';
import { Audit, Deal } from 'graphql/schema.types';
import CustomAvatar from 'components/custom-avatar';

export const LatestActivities = () => {
  const t = useTranslate();
  const {
    data: audits,
    isLoading: isLoadingAudits,
    isError,
    error,
  } = useList<Audit>({
    resource: 'audits',
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
    },
  });

  const dealIds = audits?.data?.map((audit) => audit?.targetId);

  const { data: deals, isLoading: isLoadingDeals } = useList<Deal>({
    resource: 'deals',
    queryOptions: { enabled: !!dealIds?.length },
    pagination: {
      mode: 'off',
    },
    filters: [{ field: 'id', operator: 'in', value: dealIds }],
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
    },
  });

  if (isError) {
    console.log(error);
    return null;
  }

  const isLoading = isLoadingAudits || isLoadingDeals;

  return (
    <Card
      style={{}}
      styles={{ header: { padding: '16px' }, body: { padding: '0 1rem' } }}
      title={
        <div style={{ display: 'felx', alignItems: 'center', gap: '8px' }}>
          <UnorderedListOutlined />
          <Text size="sm" style={{ marginLeft: '0.5rem' }}>
            {t('dashboard.LatestActivities')}
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, i) => ({ id: i }))}
          renderItem={(_, index) => <LatestActivitiesSkeleton key={index} />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={audits?.data}
          renderItem={(item) => {
            const deal =
              deals?.data.find((deal) => Number(deal.id) === item.targetId) ||
              undefined;

            return (
              <List.Item>
                <List.Item.Meta
                  title={dayjs(deal?.createdAt).format('MM.DD.YYYY HH:mm')}
                  avatar={
                    <CustomAvatar
                      shape="square"
                      size={48}
                      src={deal?.company.avatarUrl}
                      name={deal?.company.name}
                    />
                  }
                  description={
                    <Space size={4}>
                      <Text strong>{item.user?.name}</Text>
                      <Text>
                        {item.action === 'CREATE' ? t('dashboard.Created') : t('dashboard.Moved')}
                      </Text>
                      <Text strong>{deal?.title}</Text>
                      <Text>{t('dashboard.Deal')}</Text>
                      <Text>{item.action === 'CREATE' ? t('dashboard.In') : t('dashboard.To')}</Text>
                      <Text strong>{deal?.stage?.title}</Text>
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </Card>
  );
};
