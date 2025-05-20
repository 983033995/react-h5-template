/*
 * @FilePath: /h5-react/src/utils/commonRouterLoader.ts
 * @Description:
 */
import { setStorageItem } from './storageUtils';

/**
 * 路由参数加载器
 * @param request - 请求对象
 * @param params - 路由参数
 * @returns 加载器结果
 */
const routerParamsLoader = ({ request, params }: { request: Request; params: any }) => {
  const pathParams = params;

  const url = new URL(request.url);
  const searchParams = Object.fromEntries(url.searchParams.entries());
  console.log('searchParams', searchParams, request.url, pathParams);

  setStorageItem('token', searchParams.token || '');
  setStorageItem('navigationH', searchParams.navigationH || '');
  setStorageItem('statusBarH', searchParams.statusBarH || '');

  return {
    pathParams,
    searchParams,
    fullUrl: request.url,
    id: 'root-loader',
  };
};

export { routerParamsLoader };
