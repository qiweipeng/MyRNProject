import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import PopupContainer from './PopupContainer';

type Popup = {
  show: () => void;
  hide: () => void;
};

type PopupObj = {
  current: Popup | null;
};

let refs: PopupObj[] = [];

const PopupRoot = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const show = useCallback(() => {
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    setVisible(false);
  }, []);

  useImperativeHandle(
    ref,
    useCallback(
      () => ({
        show,
        hide,
      }),
      [hide, show],
    ),
  );

  return <PopupContainer visible={visible} />;
});

export function Popup(): JSX.Element {
  const popupRef = useRef<Popup | null>(null);
  const setRef = useCallback((ref: Popup | null) => {
    if (ref) {
      popupRef.current = ref;
      refs.push({
        current: ref,
      });
    } else {
      refs = refs.filter(r => r.current !== popupRef.current);
    }
  }, []);

  return <PopupRoot ref={setRef} />;
}

function getRef() {
  const reversePriority = [...refs].reverse();
  const activeRef = reversePriority.find(ref => ref?.current !== null);
  if (!activeRef) {
    return null;
  }
  return activeRef.current;
}

Popup.show = () => {
  getRef()?.show();
};

Popup.hide = () => {
  getRef()?.hide();
};
