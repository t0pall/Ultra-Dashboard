import { Col, Row } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Home = () => {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLocale = () => {
    setCurrentLanguage(currentLanguage === 'ru' ? 'en' : 'ru');
    i18n.changeLanguage(currentLanguage === 'ru' ? 'en' : 'ru');
  };

  return (
    <div>
      <Row gutter={[32, 32]} style={{ marginTop: '32px' }}>
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: '460px',
          }}
        >
          CalendarUpcomingEvents
        </Col>
        <Col
          xs={24}
          sm={24}
          xl={8}
          style={{
            height: '460px',
          }}
        >
          DashboardDealsChart
        </Col>
      </Row>
    </div>
  );
};
