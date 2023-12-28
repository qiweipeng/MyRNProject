import {useContext, useEffect, useMemo, useRef} from 'react';
import {
  COMMONINFO_KEY,
  CommonContext,
  CommonState,
  PartialInfo,
} from '@/contexts/CommonContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useCommon = (): {
  state: CommonState;
  actions: {
    save: <T extends keyof PartialInfo>(
      key: T,
      value: PartialInfo[T],
    ) => Promise<void>;
  };
} => {
  const context = useContext(CommonContext);
  if (!context) {
    throw new Error('useCommon must be used in CommonProvider!');
  }

  const contextRef = useRef(context);
  useEffect(() => {
    contextRef.current = context;
  }, [context]);

  const authActions = useMemo(
    () => ({
      save: async <T extends keyof PartialInfo>(
        key: T,
        value: PartialInfo[T],
      ) => {
        const commonValue = await AsyncStorage.getItem(COMMONINFO_KEY);
        const parsedValue: PartialInfo = commonValue
          ? JSON.parse(commonValue)
          : {};
        const mergedValue = {
          ...parsedValue,
          [key]: value,
        };
        await AsyncStorage.setItem(
          COMMONINFO_KEY,
          JSON.stringify({
            ...parsedValue,
            [key]: value,
          }),
        );
        contextRef.current.dispatch({
          type: 'save',
          payload: mergedValue,
        });
      },
    }),
    [],
  );

  return {state: context.state, actions: authActions};
};

export {useCommon};
