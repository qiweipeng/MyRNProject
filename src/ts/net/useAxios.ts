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

  const source = useMemo(() => axios.CancelToken.source(), []);
  const instance = useMemo(
    () => axios.create({cancelToken: source.token}),
    [source],
  );

  const configRef = useRef(config);
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  const fetchDataAsync = useCallback(
    async (c?: AxiosRequestConfig<D>) => {
      dispatch({type: 'start'});
      try {
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
    (c?: AxiosRequestConfig) => {
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
