import {useEffect, useMemo, useCallback, useReducer, Reducer} from 'react';
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  Cancel,
} from 'axios';

type State<T, D, R = AxiosResponse<T, D>> = {
  response?: R;
  error?: AxiosError<unknown, D> | Error | Cancel;
  loading: boolean;
};

type Action<T, D, R = AxiosResponse<T, D>> = {
  type: 'start' | 'resolve' | 'reject' | 'reset';
  response?: R;
  error?: AxiosError<unknown, D> | Error | Cancel;
};

function reducer<T, D, R>(state: State<T, D, R>, action: Action<T, D, R>) {
  switch (action.type) {
    case 'start':
      return {
        ...state,
        loading: true,
      };
    case 'resolve':
      return {
        response: action.response,
        error: undefined,
        loading: false,
      };
    case 'reject':
      return {
        response: undefined,
        error: action.error,
        loading: false,
      };
    case 'reset':
      return {
        response: undefined,
        error: undefined,
        loading: false,
      };
  }
}

const initialState = {
  response: undefined,
  error: undefined,
  loading: false,
};

const useAxios = <T = unknown, D = unknown, R = AxiosResponse<T, D>>(
  config: AxiosRequestConfig<D>,
): {
  response?: R;
  error?: AxiosError<unknown, D> | Error | Cancel;
  loading: boolean;
  fetchData: (config?: AxiosRequestConfig<D>) => void;
  fetchDataAsync: (config?: AxiosRequestConfig<D>) => Promise<R>;
} => {
  const [state, dispatch] = useReducer<
    Reducer<State<T, D, R>, Action<T, D, R>>
  >(reducer, initialState);

  const source = useMemo(() => axios.CancelToken.source(), []);
  const instance = useMemo(
    () => axios.create({cancelToken: source.token}),
    [source],
  );

  useEffect(() => {
    return () => {
      dispatch({type: 'reset'});
      source.cancel('Operation canceled as the component has been unmounted.');
    };
  }, [source]);

  useEffect(() => {
    const requestInterceptor = instance.interceptors.request.use<
      AxiosRequestConfig<D>
    >(c => {
      return {...config, ...c};
    });
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
    };
  }, [config, instance.interceptors.request]);

  useEffect(() => {
    const responseInterceptor = instance.interceptors.response.use(r => {
      return r;
    });
    return () => {
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, [instance.interceptors.response]);

  const fetchDataAsync = useCallback(
    async (c?: AxiosRequestConfig<D>) => {
      dispatch({type: 'start'});
      try {
        const r = await instance.request<T, R, D>({...c});
        dispatch({type: 'resolve', response: r});
        return r;
      } catch (e) {
        dispatch({
          type: 'reject',
          error: e as AxiosError<unknown, D> | Error | Cancel,
        });
        return Promise.reject(e);
      }
    },
    [instance],
  );
  const fetchData = useCallback(
    (c?: AxiosRequestConfig) => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      fetchDataAsync(c).catch(() => {});
    },
    [fetchDataAsync],
  );

  return {
    response: state.response,
    error: state.error,
    loading: state.loading,
    fetchData,
    fetchDataAsync,
  };
};

const isCancel = axios.isCancel;
const isAxiosError = axios.isAxiosError;

export type {AxiosRequestConfig, AxiosResponse, AxiosError, Cancel};
export {useAxios, isCancel, isAxiosError};
