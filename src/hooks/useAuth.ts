import {useContext, useEffect, useMemo, useRef} from 'react';
import {
  AuthContext,
  AuthState,
  RequiredUserInfo,
  TOKEN_KEY,
  USERINFO_KEY,
} from '@/contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuth = (): {
  state: AuthState;
  actions: {
    login: (token: string, userInfo: RequiredUserInfo) => Promise<void>;
    logout: () => Promise<void>;
    update: (userInfo: RequiredUserInfo) => Promise<void>;
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
      login: async (token: string, userInfo: RequiredUserInfo) => {
        await AsyncStorage.multiSet([
          [TOKEN_KEY, token],
          [USERINFO_KEY, JSON.stringify(userInfo)],
        ]);
        contextRef.current.dispatch({
          type: 'login',
          payload: {
            token: token,
            userInfo: userInfo,
          },
        });
      },
      logout: async () => {
        await AsyncStorage.multiRemove([TOKEN_KEY, USERINFO_KEY]);
        contextRef.current.dispatch({
          type: 'logout',
          payload: undefined,
        });
      },
      update: async (userInfo: RequiredUserInfo) => {
        await AsyncStorage.setItem(USERINFO_KEY, JSON.stringify(userInfo));
        contextRef.current.dispatch({type: 'update', payload: userInfo});
      },
    }),
    [],
  );

  return {state: context.state, actions: authActions};
};

export {useAuth};
