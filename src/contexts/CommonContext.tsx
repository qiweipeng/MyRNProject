import React, {createContext, ReactNode, useEffect, useReducer} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonInfo} from '@/constants';

const COMMONINFO_KEY = 'com.qiweipeng.myrnproject.commoninfo';

type PartialCommonInfo = Partial<CommonInfo>;
type RequiredCommonInfo = Required<CommonInfo>;

type CommonState = {
  loading: boolean;
  info: PartialCommonInfo;
};

type ActionMap = {
  retrieve: PartialCommonInfo; // 应用启动取回本地缓存
  save: PartialCommonInfo; // 保存/清除
};

type Action = {
  [Key in keyof ActionMap]: {
    type: Key;
    payload: ActionMap[Key];
  };
}[keyof ActionMap];

function reducer(state: CommonState, action: Action) {
  switch (action.type) {
    case 'retrieve':
      return {
        ...state,
        loading: false,
        info: action.payload,
      };
    case 'save':
      return {
        ...state,
        loading: false,
        info: action.payload,
      };
  }
}

const initialState = {
  loading: true,
  info: {},
};

const CommonContext = createContext<
  | {
      state: CommonState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

const CommonProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function retrieve() {
      try {
        const value = await AsyncStorage.getItem(COMMONINFO_KEY);
        const parsedValue: PartialCommonInfo = value ? JSON.parse(value) : {};
        dispatch({
          type: 'retrieve',
          payload: parsedValue,
        });
      } catch {
        dispatch({
          type: 'retrieve',
          payload: {},
        });
      }
    }
    retrieve();
  }, []);

  return (
    <CommonContext.Provider value={{state, dispatch}}>
      {children}
    </CommonContext.Provider>
  );
};

export type {CommonState, PartialCommonInfo, RequiredCommonInfo};
export {CommonContext, CommonProvider, COMMONINFO_KEY};
