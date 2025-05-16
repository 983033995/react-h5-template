/*
 * @FilePath: /h5-react/src/router/articleDetail.tsx
 * @Description:
 */
import { createHashRouter } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import ArticleDetailPage from '../pages/articleDetail/index/index';
import MinePage from '../pages/index/MinePage';

const router = createHashRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <ArticleDetailPage />,
  },
  {
    path: 'video',
    element: <MinePage />,
  },
]);

export default router;
