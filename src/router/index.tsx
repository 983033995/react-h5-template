/*
 * @FilePath: /h5-react/src/router/index.tsx
 * @Description:
 */
import { createBrowserRouter, Navigate } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import HomePage from '../pages/index/HomePage';
import ListPage from '../pages/index/ListPage';
import MinePage from '../pages/index/MinePage';
import ErrorPage from '../pages/ErrorPage';
import ProgressLayout from '../components/Nprogress';

// 可选：首页数据加载器
const homeLoader = async () => {
  // 这里可以添加数据获取逻辑，例如：
  // const response = await fetch('/api/home');
  // const data = await response.json();
  // return data;
  return { message: '首页数据' };
};

// 可选：列表页数据加载器
const listLoader = async () => {
  try {
    // const response = await fetch('/api/list');
    // const data = await response.json();
    // return data;
    return { items: [] };
  } catch (error) {
    console.error(error);
    throw new Response('获取列表数据失败', { status: 500 });
  }
};

// 可选：处理列表页表单提交
const listAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const searchTerm = formData.get('searchTerm');

  // 这里可以添加表单处理逻辑，例如：
  // const response = await fetch('/api/list/search', {
  //   method: 'POST',
  //   body: JSON.stringify({ searchTerm }),
  //   headers: { 'Content-Type': 'application/json' }
  // });
  // return await response.json();

  return { searchResults: [], searchTerm };
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProgressLayout />,
        children: [
          {
            index: true,
            element: <HomePage />,
            loader: homeLoader,
          },
          {
            path: 'list',
            element: <ListPage />,
            loader: listLoader,
            action: listAction,
          },
          {
            path: 'mine',
            element: <MinePage />,
          },
          {
            path: '*',
            element: <Navigate to="/" replace />,
          },
        ],
      },
    ],
  },
]);

export default router;
