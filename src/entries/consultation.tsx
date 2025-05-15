/*
 * @FilePath: /galaxy-app-h5/src/entries/consultation.tsx
 * @Description:
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'antd-mobile/es/global';
import '../index.css';
import '../styles/global.less';
import ConsultationPage from '../pages/consultation';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConsultationPage />
  </StrictMode>,
);
