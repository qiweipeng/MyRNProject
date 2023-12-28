import React, {createContext, ReactNode, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'com.qiweipeng.myrnproject.token';
const USERINFO_KEY = 'com.qiweipeng.myrnproject.userinfo';

type UserInfo = {
  username: string;
};

type RequiredUserInfo = Required<UserInfo>;

type AuthState = {
  loading: boolean;
  token?: string; // token
  userInfo?: RequiredUserInfo; // 用户信息
};

type ActionMap = {
  retrieve: {token: string; userInfo: RequiredUserInfo} | undefined; // 应用启动取回本地缓存
  login: {token: string; userInfo: RequiredUserInfo}; // 登录
  logout: undefined; // 退出登录
  update: RequiredUserInfo; // 更新用户信息
};

type Action = {
  [Key in keyof ActionMap]: {
    type: Key;
    payload: ActionMap[Key];
  };
}[keyof ActionMap];

function reducer(state: AuthState, action: Action) {
  switch (action.type) {
    case 'retrieve':
      return {
        ...state,
        loading: false,
        token: action.payload?.token,
        userInfo: action.payload?.userInfo,
      };
    case 'login':
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        userInfo: action.payload.userInfo,
      };
    case 'logout':
      return {
        ...state,
        loading: false,
        token: undefined,
        userInfo: undefined,
      };
    case 'update':
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
  }
}

const initialState = {
  loading: true,
  token: undefined,
  userInfo: undefined,
};

const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

const AuthProvider = ({children}: {children: ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function retrieve() {
      try {
        const values = await AsyncStorage.multiGet([TOKEN_KEY, USERINFO_KEY]);
        if (values[0][1] && values[1][1]) {
          const tokenValue = values[0][1];
          const userInfoValue = JSON.parse(values[1][1]);
          dispatch({
            type: 'retrieve',
            payload: {
              token: tokenValue,
              userInfo: userInfoValue,
            },
          });
        } else {
          dispatch({
            type: 'retrieve',
            payload: undefined,
          });
        }
      } catch {
        dispatch({
          type: 'retrieve',
          payload: undefined,
        });
      }
    }
    retrieve();
  }, []);

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};

export type {AuthState, RequiredUserInfo};
export {AuthContext, AuthProvider, TOKEN_KEY, USERINFO_KEY};
