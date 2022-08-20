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
  loadingDelay?: number; // default is 0
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
  const optionsRef = useRef(options);
  useEffect(() => {
    configRef.current = config;
  }, [config]);
  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  const fetchDataAsync = useCallback(
    async (c?: AxiosRequestConfig<D>) => {
      const timeout = setTimeout(() => {
        dispatch({type: 'start'});
      }, optionsRef.current?.loadingDelay ?? 0);
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
        clearTimeout(timeout);
        dispatch({type: 'resolve', response: r});
        return r;
      } catch (e) {
        clearTimeout(timeout);
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
    if (optionsRef.current?.manual === false) {
      fetchData();
    }
  }, [fetchData]);

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
