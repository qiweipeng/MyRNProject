import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  visible: boolean;
};

export default function PopupContainer(props: Props): JSX.Element {
  if (props.visible === false) {
    return <View />;
  }
  return (
    <View style={styles.container}>
      <Text>Hello!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    bottom: 50,
    right: 0,
    height: 200,
    backgroundColor: 'cyan',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
