/*
 * @FilePath: /h5-react/src/services/axiosInterceptors/request.ts
 * @Description: axios请求拦截器
 */
import type { InternalAxiosRequestConfig } from 'axios';

type Middleware = (
  config: InternalAxiosRequestConfig,
) => Promise<InternalAxiosRequestConfig> | InternalAxiosRequestConfig;

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  projectId?: number;
  baseUrlType?: string;
}

const resetBaseUrlMiddleware: Middleware = (config: InternalAxiosRequestConfig) => {
  const extendedConfig = config as ExtendedAxiosRequestConfig;
  const projectIdMap: Record<string, string> = {
    '3903128': import.meta.env.VITE_APP_GO_API,
  };
  // 根据projectId设置baseURL
  if (extendedConfig.projectId && projectIdMap[String(extendedConfig.projectId)]) {
    config.baseURL = projectIdMap[String(extendedConfig.projectId)];
  }
  /**
   * 如果不是按项目纬度设置baseURL，则根据url设置baseURL
   * 配置前端需要代理转发的地址列表，并设置对应的请求头
   */
  const whiteList: { rule: string[]; rewrite: string; setConfig?: () => void }[] = [
    // 公共服务
    {
      rule: ['/ocr/'],
      rewrite: import.meta.env.VITE_PUBLIC_SERVICE,
      setConfig: () => {
        // const url = window.location.href
        // const urlParams = new URLSearchParams(new URL(url).search)
        // const token = urlParams.get('token') || ''
        // config.headers['Wmp-Token'] = token
      },
    },
  ];
  const isWhite = whiteList.find(item => item.rule.some(rule => config.url?.startsWith(rule)));
  if (isWhite) {
    config.baseURL = isWhite.rewrite;
    if (isWhite.setConfig && typeof isWhite.setConfig === 'function') {
      isWhite.setConfig();
    }
  }
  return config;
};

/**
 * 组合中间件
 * @param middlewares 中间件数组
 * @returns 组合后的中间件
 */
const composeMiddlewares = (middlewares: Middleware[]) => {
  const total = middlewares.length;
  return (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const dispatch = async (i: number): Promise<InternalAxiosRequestConfig> => {
      if (i === total) return config;

      const fn = middlewares[i];
      config = await fn(config);

      return dispatch(i + 1);
    };

    return dispatch(0);
  };
};

export default composeMiddlewares([resetBaseUrlMiddleware]);
