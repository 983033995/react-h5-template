/*
 * @FilePath: /galaxy-app-h5/src/services/swr.ts
 * @Description:
 */
import useSWRMutation, { type SWRMutationConfiguration } from 'swr/mutation';
import useSWR, { type Key, type SWRConfiguration } from 'swr';
import http from './http';
import { type AxiosRequestConfig } from 'axios';

export const swrConfig = {
  revalidateIfStale: true,
  // revalidateOnMount: undefined,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: import.meta.env.VITE_APP_ENV !== 'dev',
  // errorRetryCount: 3,
};

export const axiosConfig: AxiosRequestConfig = {};

type GetKeyWithParams<T> = [string, T];
type GetKeyWithParamsAndAxiosConfig<T> = [string, T, AxiosRequestConfig];
type GetKeyWithAxiosConfig = [string, AxiosRequestConfig];
export type MutationKeyWithAxiosConfig = [string, AxiosRequestConfig];

export const HttpPost =
  <Arg, ResData>() =>
  ([url, _axiosConfig]: MutationKeyWithAxiosConfig, { arg }: { arg: Arg }) => {
    return http.post<GaAny, ResData>(url, arg, _axiosConfig);
  };

export const HttpPut =
  <Arg, ResData>() =>
  ([url, _axiosConfig]: MutationKeyWithAxiosConfig, { arg }: { arg: Arg }) => {
    return http.put<GaAny, ResData>(url, arg, _axiosConfig);
  };

export const HttpGet = <ResData>(params: GetKeyWithAxiosConfig) => {
  return http.get<GaAny, ResData>(params[0], { ...params[1] });
};
export const HttpGetWithParams = <Arg, ResData>(params: GetKeyWithParamsAndAxiosConfig<Arg>) => {
  return http.get<GaAny, ResData>(params[0], { params: params[1], ...params[2] });
};

export const HttpDelete =
  <Arg, ResData>() =>
  ([url, _axiosConfig]: MutationKeyWithAxiosConfig, { arg }: { arg: Arg }) => {
    return http.delete<GaAny, ResData>(url, {
      data: arg,
      ..._axiosConfig,
    });
  };

export const useSWRPost = <Arg, ResData = GaAny>(
  key: string,
  _axiosConfig: AxiosRequestConfig = axiosConfig,
  customConfig?: SWRMutationConfiguration<ResData, GaAny, MutationKeyWithAxiosConfig, Arg, ResData>,
) =>
  useSWRMutation<ResData, GaAny, MutationKeyWithAxiosConfig, Arg>(
    [key, _axiosConfig],
    HttpPost<Arg, ResData>(),
    {
      ...swrConfig,
      ...customConfig,
    },
  );

export const useSWRPut = <Arg, ResData = GaAny>(
  key: string,
  _axiosConfig: AxiosRequestConfig = axiosConfig,
  customConfig?: SWRMutationConfiguration<ResData, GaAny, MutationKeyWithAxiosConfig, Arg, ResData>,
) =>
  useSWRMutation<ResData, GaAny, MutationKeyWithAxiosConfig, Arg>(
    [key, _axiosConfig],
    HttpPut<Arg, ResData>(),
    {
      ...swrConfig,
      ...customConfig,
    },
  );

export const useSWRDelete = <Arg, ResData = GaAny>(
  key: string,
  _axiosConfig: AxiosRequestConfig = axiosConfig,
  customConfig?: SWRMutationConfiguration<ResData, GaAny, MutationKeyWithAxiosConfig, Arg, ResData>,
) =>
  useSWRMutation<ResData, GaAny, MutationKeyWithAxiosConfig, Arg>(
    [key, _axiosConfig],
    HttpDelete<Arg, ResData>(),
    {
      ...swrConfig,
      ...customConfig,
    },
  );

export const useSWRGet = <ResData, Arg = GaAny>(
  key: GetKeyWithParams<Arg> | Key,
  _axiosConfig: AxiosRequestConfig = axiosConfig,
  customConfig?: SWRConfiguration,
) => {
  if ((key as GetKeyWithParams<Arg>)?.length === 2) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useSWR<ResData, GaAny, GetKeyWithParamsAndAxiosConfig<Arg>>(
      [...(key as GetKeyWithParams<Arg>), _axiosConfig],
      HttpGetWithParams,
      { ...swrConfig, ...customConfig },
    );
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSWR<ResData, GaAny>([key, _axiosConfig], HttpGet, { ...swrConfig, ...customConfig });
};
