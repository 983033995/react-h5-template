/*
 * @FilePath: /h5-react/src/router/articleDetail.tsx
 * @Description:
 */
import { createHashRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import ArticleDetailPage from '../pages/articleDetail/index/index';
import MinePage from '../pages/index/MinePage';
import ProgressLayout from '../components/Nprogress';
import { routerParamsLoader } from '../utils/commonRouterLoader';

const router = createHashRouter([
  {
    path: '/',
    element: <ProgressLayout />,
    errorElement: <ErrorPage />,
    loader: routerParamsLoader,
    id: 'root-loader',
    children: [
      {
        index: true,
        element: <ArticleDetailPage />,
      },
      {
        path: 'video',
        element: <MinePage />,
      },
    ],
  },
]);

export default router;
