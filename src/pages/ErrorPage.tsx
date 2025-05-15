import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  let errorMessage = '发生了未知错误';
  let statusText = '页面错误';
  let status = '500';

  if (error && typeof error === 'object') {
    const errorObj = error as { statusText?: string; message?: string; status?: string };
    statusText = errorObj.statusText || statusText;
    errorMessage = errorObj.message || errorMessage;
    status = errorObj.status || status;
  }

  return (
    <div className="error-page flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
        <h1 className="text-4xl font-bold text-red-500 mb-4">
          {status} {statusText}
        </h1>
        <p className="text-gray-600 mb-6">{errorMessage}</p>
        <p className="text-gray-500 mb-8">抱歉，发生了一个错误。</p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          返回首页
        </a>
      </div>
    </div>
  );
};

export default ErrorPage;
