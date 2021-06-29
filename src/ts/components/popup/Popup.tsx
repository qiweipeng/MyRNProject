import React, {Component} from 'react';
import PopupContainer, {PopupType, PopupOptions} from './PopupContainer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Props {}
interface State {
  element?: JSX.Element;
  type: PopupType;
  hideOnPress: boolean;
  options: PopupOptions;
  onShown?: () => void;
}

class Popup extends Component<Props, State> {
  private static _ref: Popup | null = null;

  public static setRef(ref: Popup | null): void {
    Popup._ref = ref;
  }

  public static show(
    element: JSX.Element,
    type: PopupType = 'bottom',
    hideOnPress = true,
    options: PopupOptions = {},
    onShown?: () => void,
  ): void {
    if (Popup._ref) {
      Popup._ref.show(element, type, hideOnPress, options, onShown);
    }
  }

  public static hide(callback?: () => void): void {
    if (Popup._ref) {
      Popup._ref.hide(callback);
    }
  }

  private containerRef: React.RefObject<PopupContainer>;

  constructor(props: Props) {
    super(props);
    this.containerRef = React.createRef();
    this.state = {
      element: undefined,
      type: 'bottom',
      hideOnPress: true,
      options: {},
    };
  }

  private show(
    element: JSX.Element,
    type: PopupType,
    hideOnPress: boolean,
    options: PopupOptions,
    onShown?: () => void,
  ): void {
    if (this.state.element) {
      this.hide(() => {
        this.show(element, type, hideOnPress, options);
      });
      return;
    }
    this.setState({
      element: element,
      type: type,
      hideOnPress: hideOnPress,
      options: options,
      onShown: onShown,
    });
  }

  private hide(callback?: () => void): void {
    if (!this.state.element) {
      return;
    }
    this.containerRef.current?.hide(() => {
      this.setState({element: undefined}, () => {
        callback && callback();
      });
    });
  }

  render(): JSX.Element {
    return (
      <>
        {this.state.element ? (
          <PopupContainer
            ref={this.containerRef}
            content={this.state.element}
            type={this.state.type}
            options={this.state.options}
            onShown={() => {
              this.state.onShown && this.state.onShown();
            }}
            onPressBackground={() => {
              this.state.hideOnPress && this.hide();
            }}
          />
        ) : null}
      </>
    );
  }
}

export default Popup;
