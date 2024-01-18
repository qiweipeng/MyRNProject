import {useCallback, useEffect, useRef, useState} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {useAppState} from '@react-native-community/hooks';

const identifierMap: {[key: string]: Date} = {};

function useCountdown(
  seconds = 60,
  identifier?: string,
): {
  count: number | null;
  start: () => void;
  stop: () => void;
  reset: () => void;
} {
  const [target, setTarget] = useState<Date | null>(null);
  const [count, setCount] = useState<number | null>(null);

  const start = useCallback(() => {
    if (identifier) {
      DeviceEventEmitter.emit('com.qiweipeng.use-countdown.start', {
        identifier: identifier,
      });
    } else {
      setTarget(add(new Date(), seconds));
    }
  }, [identifier, seconds]);

  const stop = useCallback(() => {
    if (identifier) {
      DeviceEventEmitter.emit('com.qiweipeng.use-countdown.stop', {
        identifier: identifier,
      });
    } else {
      setTarget(null);
      setCount(0);
    }
  }, [identifier]);

  const reset = useCallback(() => {
    if (identifier) {
      DeviceEventEmitter.emit('com.qiweipeng.use-countdown.reset', {
        identifier: identifier,
      });
    } else {
      setTarget(null);
      setCount(null);
    }
  }, [identifier]);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      'com.qiweipeng.use-countdown.start',
      (params: {identifier: string}) => {
        if (params.identifier === identifier) {
          setTarget(add(new Date(), seconds));
        }
      },
    );

    return () => {
      listener.remove();
    };
  }, [identifier, seconds]);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      'com.qiweipeng.use-countdown.stop',
      (params: {identifier: string}) => {
        if (params.identifier === identifier) {
          setTarget(null);
          setCount(0);
        }
      },
    );

    return () => {
      listener.remove();
    };
  }, [identifier]);

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener(
      'com.qiweipeng.use-countdown.reset',
      (params: {identifier: string}) => {
        if (params.identifier === identifier) {
          setTarget(null);
          setCount(null);
        }
      },
    );

    return () => {
      listener.remove();
    };
  }, [identifier]);

  useEffect(() => {
    if (target === null) {
      if (identifier && identifierMap[identifier]) {
        const currentTarget = identifierMap[identifier];
        if (diff(new Date(), currentTarget) > 0) {
          setTarget(currentTarget);
        }
        delete identifierMap[identifier];
      }
    } else {
      if (identifier) {
        identifierMap[identifier] = target;
      }
    }
  }, [identifier, target]);

  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const appState = useAppState();

  useEffect(() => {
    if (target === null || appState !== 'active') {
      return;
    }

    setCount(diff(new Date(), target));
    timer.current = setInterval(() => {
      setCount(diff(new Date(), target));
    }, 1000);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, [target, appState]);

  useEffect(() => {
    if (count === 0) {
      stop();
    }
  }, [count, stop]);

  return {
    count,
    start,
    stop,
    reset,
  };
}

function add(date: Date, seconds: number) {
  return new Date(date.getTime() + seconds * 1000);
}

function diff(now: Date, target: Date) {
  return Math.max(
    Math.trunc((target.getTime() - now.getTime()) / 1000 + 0.5),
    0,
  );
}

export {useCountdown};
