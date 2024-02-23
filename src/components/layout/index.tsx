import { ThemedLayoutV2, ThemedTitleV2 } from '@refinedev/antd';
import { Header } from './header';
import { PropsWithChildren } from 'react';
import { FireFilled } from '@ant-design/icons';

const Layout = ({ children }: PropsWithChildren) => {
  
  return (
    <ThemedLayoutV2
      Header={Header}
      Title={(titleProps) => (
        <ThemedTitleV2
          {...titleProps}
          wrapperStyles={{ display: 'flex', gap: 0 }}
          icon={<FireFilled/>}
          text={'Ultra dashboard'}
        />
      )}
    >
      {children}
    </ThemedLayoutV2>
  );
};

export default Layout;
