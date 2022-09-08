import {useEffect} from 'react';
import qs from 'qs';
import * as yup from 'yup';
import {
  useValidatedAxios,
  AxiosRequestConfig,
  AxiosResponse,
  ValidationError,
  Options,
  AxiosInterceptorManager,
  isCancel,
  isAxiosError,
  useUpdateRef,
} from '@qiweipeng/use-axios';

class ReqError<D, R> extends Error {
  type: 'ValidationError' | 'AxiosError' | 'Cancel' | 'OtherError';
  reason?: string;
  response?: R;
  config?: AxiosRequestConfig<D>;
  constructor(
    message: string,
    type: 'ValidationError' | 'AxiosError' | 'Cancel' | 'OtherError',
    stack?: string,
    reason?: string,
    response?: R,
    config?: AxiosRequestConfig<D>,
  ) {
    super();
    this.name = 'ReqError';
    this.message = message;
    this.type = type;
    this.stack = stack;
    this.reason = reason;
    this.response = response;
    this.config = config;
  }
}

const useRequest = <T = unknown, D = Record<string, unknown> | FormData, R = T>(
  url: string,
  method: 'GET' | 'POSTJSON' | 'POSTFORM' | 'PUT' | 'UPLOAD',
  params?: D,
  validationSchema?: yup.BaseSchema,
  options?: Options,
  config?: AxiosRequestConfig<D>,
): {
  response?: R;
  error?: ReqError<D, unknown>;
  loading: boolean;
  fetchData: (config?: AxiosRequestConfig<D>) => void;
  fetchDataAsync: (config?: AxiosRequestConfig<D>) => Promise<R>;
  cancel: () => void;
  requestInterceptors: AxiosInterceptorManager<AxiosRequestConfig<D>>;
  responseInterceptors: AxiosInterceptorManager<AxiosResponse<T, D>>;
} => {
  const {
    response,
    error,
    loading,
    fetchData,
    fetchDataAsync,
    cancel,
    requestInterceptors,
    responseInterceptors,
  } = useValidatedAxios<T, D, R>(config ?? {}, options, validationSchema);

  const urlRef = useUpdateRef(url);
  const methodRef = useUpdateRef(method);
  const paramsRef = useUpdateRef(params);
  useEffect(() => {
    const requestInterceptor = requestInterceptors.use<AxiosRequestConfig>(
      c => {
        const u = c.url ?? urlRef.current;
        const headers = {
          timeout: 30000,
          withCredentials: true,
          ...c.headers,
        };
        switch (methodRef.current) {
          case 'GET': {
            return {
              ...c,
              url: u,
              method: 'get',
              params: {...paramsRef.current, ...c.params},
              headers: headers,
            };
          }
          case 'POSTJSON': {
            return {
              ...c,
              url: u,
              method: 'post',
              data: {...paramsRef.current, ...c.data},
              headers: headers,
            };
          }
          case 'POSTFORM': {
            return {
              ...c,
              url: u,
              method: 'post',
              data: qs.stringify({...paramsRef.current, ...c.data}),
              headers: {
                ...headers,
                'Content-Type':
                  'application/x-www-form-urlencoded; charset=UTF-8',
              },
            };
          }
          case 'PUT': {
            return {
              ...c,
              url: u,
              method: 'put',
              data: {...paramsRef.current, ...c.data},
              headers: headers,
            };
          }
          case 'UPLOAD': {
            return {
              ...c,
              url: u,
              method: 'post',
              data: c.data ?? paramsRef.current,
              headers: {
                ...headers,
                'Content-Type': 'multipart/form-data',
              },
            };
          }
        }
      },
    );
    return () => {
      requestInterceptors.eject(requestInterceptor);
    };
  }, [methodRef, paramsRef, requestInterceptors, urlRef]);

  useEffect(() => {
    const responseInterceptor = responseInterceptors.use<T>(
      r => {
        return r.data;
      },
      e => {
        if (isCancel(e)) {
          return Promise.reject(new ReqError('网络请求已取消', 'Cancel'));
        }
        if (isAxiosError(e)) {
          return Promise.reject(
            new ReqError(
              '网络请求失败',
              'AxiosError',
              e.stack,
              e.message,
              e.response?.data,
              e.config,
            ),
          );
        }
        if (e instanceof ValidationError) {
          return Promise.reject(
            new ReqError(
              '数据格式校验错误',
              'ValidationError',
              e.stack,
              e.message,
              e.response.data,
              e.response.config,
            ),
          );
        }
        return Promise.reject(
          new ReqError(
            '网络请求失败',
            'OtherError',
            e.stack,
            e.message,
            e?.response?.data,
            e?.config,
          ),
        );
      },
    );
    return () => {
      responseInterceptors.eject(responseInterceptor);
    };
  }, [responseInterceptors]);

  return {
    response: response as unknown as R,
    error: error as ReqError<D, unknown>,
    loading,
    fetchData,
    fetchDataAsync: fetchDataAsync as unknown as (
      config?: AxiosRequestConfig<D> | undefined,
    ) => Promise<R>,
    cancel,
    requestInterceptors,
    responseInterceptors: responseInterceptors as AxiosInterceptorManager<
      AxiosResponse<T, D>
    >,
  };
};

export {useRequest};
