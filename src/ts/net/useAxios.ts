import {
  useEffect,
  useMemo,
  useCallback,
  useRef,
  useReducer,
  Reducer,
} from 'react';
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

type Options = {
  manual?: boolean; // default is true
};

const useAxios = <T = unknown, D = unknown, R = AxiosResponse<T, D>>(
  config: AxiosRequestConfig<D>,
  options?: Options,
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

  const source = useMemo(() => axios.CancelToken.source(), []); // 网络请求可取消
  const instance = useMemo(
    () => axios.create({cancelToken: source.token}),
    [source],
  ); // 创建实例，保证每个网络请求互补影响

  // 使用 useRef 保存 config 参数，可使 config 的变更不会触发副作用而导致再次请求；同时，如果 config 变更后再次请求，也能使用到变更后的 config 参数
  const configRef = useRef(config);
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const fetchDataAsync = useCallback(
    async (c?: AxiosRequestConfig<D>) => {
      dispatch({type: 'start'});
      try {
        // config 的覆盖规则
        // 1. 调用时的 config 增量覆盖初始 config
        // 2. 对于 params 和 data，调用时按字段增量覆盖初始的设置
        //    比如初始参数为 {name: 'Jack'}，调用时如果写 {age: 18}，则最终为 {name: 'Jack', age: 18}
        //    比如初始参数为 {name: 'Jack'}，调用时如果写 {name: 'Rose', age: 18}，则最终为 {name: 'Rose', age: 18}
        const r = await instance.request<T, R, D>({
          ...configRef.current,
          ...c,
          params: {...configRef.current.params, ...c?.params},
          data:
            c?.data !== undefined
              ? {...configRef.current.data, ...c.data}
              : configRef.current.data,
        });
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
    (c?: AxiosRequestConfig<D>) => {
      fetchDataAsync(c).catch(() => {
        return;
      });
    },
    [fetchDataAsync],
  );

  useEffect(() => {
    if (options?.manual === false) {
      fetchData();
    }
  }, [fetchData, options?.manual]);

  useEffect(() => {
    return () => {
      dispatch({type: 'reset'});
      source.cancel('Operation canceled as the component has been unmounted.');
    };
  }, [source]);

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
