import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  TouchableOpacity,
  LayoutChangeEvent,
} from 'react-native';

const POPUP_ANIMATION_DURATION = 300;
const POPUP_BACKGROUND_COLOR = '#000000';
const POPUP_BACKGROUND_OPACITY = 0.2;
const POPUP_VERTICAL_OFFSET = 0;

export type PopupOptions = {
  duration?: number;
  backgroundColor?: string;
  backgroundOpacity?: number;
  verticalOffset?: number;
};
export type PopupType = 'top' | 'bottom' | 'alert';

interface Props {
  content: JSX.Element;
  type: PopupType;
  options?: PopupOptions;
  onShown: () => void;
  onPressBackground: () => void;
}
interface State {
  backgroundOpacity: Animated.Value;
  top: Animated.Value;
  bottom: Animated.Value;
  contentOpacity: Animated.Value;
}

class PopupContainer extends Component<Props, State> {
  private contentHeight = 0;

  constructor(props: Props) {
    super(props);
    this.state = {
      backgroundOpacity: new Animated.Value(0),
      top: new Animated.Value(0),
      bottom: new Animated.Value(0),
      contentOpacity: new Animated.Value(0),
    };
  }

  show(): void {
    Animated.parallel([
      Animated.timing(this.state.backgroundOpacity, {
        toValue:
          this.props.options?.backgroundOpacity ?? POPUP_BACKGROUND_OPACITY,
        duration: this.props.options?.duration ?? POPUP_ANIMATION_DURATION,
        useNativeDriver: false,
      }),
      this.props.type === 'top'
        ? Animated.timing(this.state.top, {
            toValue:
              this.props.options?.verticalOffset ?? POPUP_VERTICAL_OFFSET,
            duration: this.props.options?.duration ?? POPUP_ANIMATION_DURATION,
            useNativeDriver: false,
          })
        : this.props.type === 'bottom'
        ? Animated.timing(this.state.bottom, {
            toValue: -(
              this.props.options?.verticalOffset ?? POPUP_VERTICAL_OFFSET
            ),
            duration: this.props.options?.duration ?? POPUP_ANIMATION_DURATION,
            useNativeDriver: false,
          })
        : Animated.timing(this.state.contentOpacity, {
            toValue: 1,
            duration: this.props.options?.duration ?? POPUP_ANIMATION_DURATION,
            useNativeDriver: false,
          }),
    ]).start(finished => {
      if (finished) {
        this.props.onShown && this.props.onShown();
      }
    });
  }

  hide(callback?: () => void): void {
    Animated.parallel([
      Animated.timing(this.state.backgroundOpacity, {
        toValue: 0,
        duration: this.props.options?.duration ?? POPUP_ANIMATION_DURATION,
        useNativeDriver: false,
      }),
      this.props.type === 'top'
        ? Animated.timing(this.state.top, {
            toValue: -this.contentHeight,
            duration: POPUP_ANIMATION_DURATION,
            useNativeDriver: false,
          })
        : this.props.type === 'bottom'
        ? Animated.timing(this.state.bottom, {
            toValue: -this.contentHeight,
            duration: POPUP_ANIMATION_DURATION,
            useNativeDriver: false,
          })
        : Animated.timing(this.state.contentOpacity, {
            toValue: 0,
            duration: POPUP_ANIMATION_DURATION,
            useNativeDriver: false,
          }),
    ]).start(finished => {
      if (finished) {
        callback && callback();
      }
    });
  }

  onLayout(event: LayoutChangeEvent): void {
    const height = event.nativeEvent.layout.height;
    if (height > 0 && this.contentHeight === 0) {
      this.contentHeight = height;
      this.state.top.setValue(-height);
      this.state.bottom.setValue(-height);
      this.show();
    }
  }

  render(): JSX.Element {
    return (
      <View
        style={
          this.props.type === 'alert' ? styles.containerAlert : styles.container
        }>
        <Animated.View
          style={[
            styles.background,
            {
              opacity: this.state.backgroundOpacity,
              backgroundColor:
                this.props.options?.backgroundColor ?? POPUP_BACKGROUND_COLOR,
            },
          ]}>
          <TouchableOpacity
            style={styles.backgroundTouch}
            onPress={() => {
              this.props.onPressBackground && this.props.onPressBackground();
            }}
          />
        </Animated.View>
        <Animated.View
          style={
            this.props.type === 'top'
              ? [styles.content, {top: this.state.top}]
              : this.props.type === 'bottom'
              ? [styles.content, {bottom: this.state.bottom}]
              : [
                  styles.contentAlert,
                  {
                    opacity: this.state.contentOpacity,
                    top:
                      this.props.options?.verticalOffset ??
                      POPUP_VERTICAL_OFFSET,
                  },
                ]
          }
          onLayout={this.onLayout.bind(this)}>
          {this.props.content}
        </Animated.View>
      </View>
    );
  }
}

export default PopupContainer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  containerAlert: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  backgroundTouch: {
    flex: 1,
  },
  content: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  contentAlert: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
