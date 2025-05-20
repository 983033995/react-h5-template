/*
 * @FilePath: /h5-react/src/components/nprogress.tsx
 * @Description: 进度条
 */
import { useNavigation, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '@/styles/nprogress.less';

// 配置 NProgress
NProgress.configure({
  showSpinner: false,
  minimum: 0.1,
  speed: 200,
  easing: 'ease',
  trickle: true,
  trickleSpeed: 200,
});

const ProgressLayout = () => {
  const navigation = useNavigation();
  const location = useLocation();

  // 初始化进度条
  useEffect(() => {
    console.log('初始化进度条');
    // 初始化时先结束一次，确保状态正确
    NProgress.done();

    return () => {
      NProgress.done();
    };
  }, []);

  // 处理路由加载状态
  useEffect(() => {
    console.log('路由状态变化:', navigation.state);

    if (navigation.state === 'loading') {
      console.log('开始加载 - 显示进度条');
      NProgress.start();
    } else if (navigation.state === 'idle') {
      console.log('加载完成 - 隐藏进度条');
      NProgress.done();
    }
  }, [navigation.state]);

  // 使用 location 监听路由变化，手动触发进度条
  useEffect(() => {
    console.log('路由变化:', location.pathname);
    // 路由变化时启动进度条
    NProgress.start();

    NProgress.done();
  }, [location.pathname]);

  return <Outlet />;
};

export default ProgressLayout;
