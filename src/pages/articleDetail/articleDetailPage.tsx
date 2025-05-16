/*
 * @FilePath: /h5-react/src/pages/articleDetail/articleDetailPage.tsx
 * @Description:
 */
import { RouterProvider } from 'react-router-dom';
import '@/App.css';
import router from '@/router/articleDetail';

const ArticleDetailPage = () => {
  return <RouterProvider router={router} />;
};

export default ArticleDetailPage;
