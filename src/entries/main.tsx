/*
 * @FilePath: /h5-react/src/entries/main.tsx
 * @Description:
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'antd-mobile/es/global';
import '../index.css';
import '../styles/global.less';
import 'virtual:iconfont';
import App from '../App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
