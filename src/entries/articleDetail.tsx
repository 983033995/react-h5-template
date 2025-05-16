/*
 * @FilePath: /h5-react/src/entries/articleDetail.tsx
 * @Description:
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'antd-mobile/es/global';
import '../index.css';
import '../styles/global.less';
import ArticleDetailPage from '../pages/articleDetail/articleDetailPage';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ArticleDetailPage />
  </StrictMode>,
);
