import { DollarOutlined } from '@ant-design/icons';
import { Area, AreaConfig } from '@ant-design/plots';
import { useList } from '@refinedev/core';
import { GetFieldsFromList } from '@refinedev/nestjs-query';
import { Card } from 'antd';
import { Text } from 'components/text';
import { DASHBOARD_DEALS_CHART_QUERY } from 'graphql/queries';
import { DashboardDealsChartQuery } from 'graphql/types';
import { useMemo } from 'react';
import { mapDealsData } from 'utilities/helpers';

export const DealsChart = () => {
  const { data, isLoading } = useList<
    GetFieldsFromList<DashboardDealsChartQuery>
  >({
    resource: 'dealStages',
    filters: [{ field: 'title', operator: 'in', value: ['WON', 'LOST'] }],
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY,
    },
  });

  const dealData = useMemo(() => {
    return mapDealsData(data?.data);
  }, [data?.data]);

  console.log(data?.data, mapDealsData(data?.data));

  const config: AreaConfig = {
    data: dealData,
    xField: 'timeText',
    yField: 'value',
    isStack: false,
    seriesField: 'state',
    animation: true,
    startOnZero: false,
    smooth: true,
    legend: {
      offsetY: -6,
    },
    yAxis: {
      tickCount: 4,
      label: {
        formatter: (v: string) => {
          return `₽ ${Number(v) / 1000}тыс.`;
        },
      },
    },
    tooltip: {
      formatter: (data) => {
        return {
          name: data.state,
          value: `${Number(data.value).toLocaleString()}₽`,
        };
      },
    },
  };

  return (
    <Card
      style={{ height: '100%' }}
      styles={{
        header: { padding: '8px 16px' },
        body: { padding: '24px 24px 0 24px' },
      }}
      title={
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <DollarOutlined />
          <Text size="sm" style={{ marginLeft: '0.5rem' }}>
            Deals
          </Text>
        </div>
      }
    >
      <Area {...config} height={325} />
    </Card>
  );
};
