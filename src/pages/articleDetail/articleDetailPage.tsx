/*
 * @FilePath: /h5-react/src/pages/articleDetail/articleDetailPage.tsx
 * @Description:
 */
import '@/App.css';
import router from '@/router/articleDetail';
import { RouterProvider } from 'react-router-dom';

const ArticleDetailPage = () => {
  return <RouterProvider router={router} />;
};

export default ArticleDetailPage;
