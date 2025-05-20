// @ts-nocheck: 忽略类型错误 系统工具生成
import http from '@/services/http';
import { useSWRGet } from '@/services/swr';
import type { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import type { SWRConfiguration } from 'swr';
import type {
  getInfoflowArticleDetailQuery,
  getInfoflowArticleDetailRes,
  getInfoflowArticleInfoQuery,
  getInfoflowArticleInfoRes,
} from './interface';
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;

/**
 * @description /文章详情（对H5）
 * @url GET /infoflow/article/detail
 * @host https://app.apifox.com/link/project/3903128/apis/api-161371301
 */
export const getInfoflowArticleDetail = async (
  params: Expand<getInfoflowArticleDetailQuery>,
  axiosConfig?: AxiosRequestConfig,
): Promise<Expand<getInfoflowArticleDetailRes>> => {
  return http.get(`/infoflow/article/detail?${qs.stringify(params)}`, {
    ...axiosConfig,
    projectId: 3903128,
  });
};

/**
 * 自定义函数：usegetInfoflowArticleDetail
 * @description /文章详情（对H5）
 * @url GET /infoflow/article/detail
 * @host https://app.apifox.com/link/project/3903128/apis/api-161371301
 */

export const useGetInfoflowArticleDetail = (
  params: Expand<getInfoflowArticleDetailQuery>,
  axiosConfig: Expand<AxiosRequestConfig> = {},
  swrConfig: Expand<SWRConfiguration> = {},
) => {
  return useSWRGet<Expand<getInfoflowArticleDetailRes>, Expand<getInfoflowArticleDetailQuery>>(
    [`/infoflow/article/detail`, params],
    { ...axiosConfig, projectId: 3903128 },
    swrConfig,
  );
};

/**
 * @description /文章基本信息APP使用
 * @url GET /infoflow/article/info
 * @host https://app.apifox.com/link/project/3903128/apis/api-163513426
 */
export const getInfoflowArticleInfo = async (
  params: Expand<getInfoflowArticleInfoQuery>,
  axiosConfig?: AxiosRequestConfig,
): Promise<Expand<getInfoflowArticleInfoRes>> => {
  return http.get(`/infoflow/article/info?${qs.stringify(params)}`, {
    ...axiosConfig,
    projectId: 3903128,
  });
};

/**
 * 自定义函数：usegetInfoflowArticleInfo
 * @description /文章基本信息APP使用
 * @url GET /infoflow/article/info
 * @host https://app.apifox.com/link/project/3903128/apis/api-163513426
 */

export const useGetInfoflowArticleInfo = (
  params: Expand<getInfoflowArticleInfoQuery>,
  axiosConfig: Expand<AxiosRequestConfig> = {},
  swrConfig: Expand<SWRConfiguration> = {},
) => {
  return useSWRGet<Expand<getInfoflowArticleInfoRes>, Expand<getInfoflowArticleInfoQuery>>(
    [`/infoflow/article/info`, params],
    { ...axiosConfig, projectId: 3903128 },
    swrConfig,
  );
};
