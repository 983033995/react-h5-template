/*
 * @FilePath: /h5-react/src/pages/articleDetail/index/components/PageHeader.tsx
 * @Description:
 */
import React from 'react';
const PageHeader: React.FC = () => {
  return (
    <div className="px-[16px] py-[10px] flex justify-between">
      <div className="w-[24px] h-[24px] flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="22"
          viewBox="0 0 21 22"
          fill="none"
        >
          <path
            d="M9.5 4.5L3.5 11.0949L9.5 17.5"
            stroke="#121A26"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.5 11.75C18.9142 11.75 19.25 11.4142 19.25 11C19.25 10.5858 18.9142 10.25 18.5 10.25V11.75ZM3.5 11V11.75H18.5V11V10.25H3.5V11Z"
            fill="#121A26"
          />
        </svg>
      </div>
      <div className="w-[24px] h-[24px] flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M19.0808 19.0809H4.91927V4.91939H11.8137V3.42871H4.17393C3.76399 3.42871 3.42859 3.76411 3.42859 4.17405V19.8262C3.42859 20.2362 3.76399 20.5716 4.17393 20.5716H19.8261C20.236 20.5716 20.5714 20.2362 20.5714 19.8262V12.1865H19.0808V19.0809Z"
            fill="#121A26"
          />
          <path
            d="M20.36 6.23213L17.5668 3.42871L16.6012 4.38598L17.9461 5.71931C16.5667 5.65093 14.7391 5.82187 13.3942 6.84751C12.1183 7.83897 11.4286 9.37743 11.4286 11.4287H12.808C12.808 9.82187 13.2907 8.62529 14.2218 7.94153C15.4632 7.01845 17.2564 6.98427 18.4634 7.12102L16.6012 8.93298L17.5668 9.89025L20.3945 7.12102C20.6359 6.91589 20.6359 6.47145 20.36 6.23213Z"
            fill="#121A26"
          />
        </svg>
      </div>
    </div>
  );
};

export default PageHeader;
