import {useCallback, useEffect, useState} from 'react';

const useQuickClicks = (times = 10, onFinish?: () => void) => {
  if (times <= 0) {
    throw new Error('useQuickClicks - times must be greater than zero!');
  }

  const [clicks, setClicks] = useState<number[]>(new Array(times).fill(0));

  useEffect(() => {
    if (clicks[0] !== 0 && clicks[0] - clicks[clicks.length - 1] < 3000) {
      setClicks(new Array(times).fill(0));
      onFinish && onFinish();
    }
  }, [clicks, onFinish, times]);

  const click = useCallback(() => {
    setClicks(c => {
      c.copyWithin(1, 0);
      c[0] = new Date().getTime();
      return [...c];
    });
  }, []);

  return {
    click,
  };
};

export {useQuickClicks};
