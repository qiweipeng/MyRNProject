import React, {
  createContext,
  ReactNode,
  useReducer,
  useEffect,
  useContext,
  useMemo,
  useRef,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserInfo = {
  username: string;
};

type AuthState = {
  loading: boolean;
  token?: string;
  userInfo?: UserInfo;
};

type AuthAction = {
  type: 'retrieveToken' | 'login' | 'logout';
  token?: string;
  userInfo?: UserInfo;
};

function reducer(state: AuthState, action: AuthAction) {
  switch (action.type) {
    case 'retrieveToken':
      return {
        ...state,
        loading: false,
        token: action.token,
        userInfo: action.userInfo,
      };
    case 'login':
      return {
        ...state,
        loading: false,
        token: action.token,
        userInfo: action.userInfo,
      };
    case 'logout':
      return {
        ...state,
        loading: false,
        token: undefined,
        userInfo: undefined,
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
      dispatch: React.Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

const AuthProvider = ({children}: {children: ReactNode}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    async function retrieveToken() {
      try {
        const values = await AsyncStorage.multiGet(['token', 'userInfo']);
        if (values[0][1] && values[1][1]) {
          const tokenValue = values[0][1];
          const userInfoValue = JSON.parse(values[1][1]);
          dispatch({
            type: 'retrieveToken',
            token: tokenValue,
            userInfo: userInfoValue,
          });
        } else {
          dispatch({
            type: 'retrieveToken',
            token: undefined,
            userInfo: undefined,
          });
        }
      } catch {
        dispatch({
          type: 'retrieveToken',
          token: undefined,
          userInfo: undefined,
        });
      }
    }
    retrieveToken();
  }, []);

  return (
    <AuthContext.Provider value={{state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): {
  state: AuthState;
  actions: {
    login: (token: string, userInfo: UserInfo) => Promise<void>;
    logout: () => Promise<void>;
  };
} => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used in AuthProvider!');
  }

  const contextRef = useRef(context);
  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  const authActions = useMemo(
    () => ({
      login: async (token: string, userInfo: UserInfo) => {
        await AsyncStorage.multiSet([
          ['token', token],
          ['userInfo', JSON.stringify(userInfo)],
        ]);
        contextRef.current.dispatch({
          type: 'login',
          token: token,
          userInfo: userInfo,
        });
      },
      logout: async () => {
        await AsyncStorage.multiRemove(['token', 'userInfo']);
        contextRef.current.dispatch({
          type: 'logout',
          token: undefined,
          userInfo: undefined,
        });
      },
    }),
    [],
  );

  return {state: context.state, actions: authActions};
};

export {AuthProvider, useAuth};
