/*
 * @FilePath: /h5-react/src/components/AppLayout.tsx
 * @Description:
 */
import { type FC } from 'react';
import { TabBar } from 'antd-mobile';
import { AppOutline, UserOutline, UnorderedListOutline } from 'antd-mobile-icons';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import styles from './AppLayout.module.less';

const AppLayout: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const tabs = [
    {
      key: '/',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/list',
      title: '列表',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/mine',
      title: '我的',
      icon: <UserOutline />,
    },
  ];

  const handleTabChange = (key: string) => {
    navigate(key);
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <TabBar activeKey={pathname} onChange={handleTabChange}>
          {tabs.map(item => (
            <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
          ))}
        </TabBar>
      </footer>
    </div>
  );
};

export default AppLayout;
