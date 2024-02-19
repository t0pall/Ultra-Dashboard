import { useGetLocale, useSetLocale } from '@refinedev/core';
import { Button } from 'antd';
import { useEffect } from 'react';

export const LangSwitch = () => {
  const setLocale = useSetLocale();
  const getLocale = useGetLocale();
  const BROWSER_LOCALE = navigator.language.split('-')[0];
  const LOCALSTORAGE_LOCALE = localStorage.getItem('i18nextLng');
  useEffect(() => {
    setLocale(LOCALSTORAGE_LOCALE || BROWSER_LOCALE);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Button
      style={{
        display: 'flex',
        alignItems: 'center',
        fontSize: 20,
        justifyContent: 'center',
        height: '3rem',
        width: '3rem',
        position: 'fixed',
        bottom: '1vh',
        right: '1vh',
        zIndex: 9999,
      }}
      onClick={() => setLocale(getLocale() === 'en' ? 'ru' : 'en')}
    >
      {getLocale()}
    </Button>
  );
};
