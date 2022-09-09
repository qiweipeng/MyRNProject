import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Popup from '../utils/popup';

export default function HelloScreen(): JSX.Element {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => {
          Popup.hide();
        }}>
        <Text>Bottom Sheet</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => {
          Popup.show();
        }}>
        <Text>Bottom Sheet 2</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BD6161',
  },
  touch: {
    width: 140,
    height: 50,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 200,
  },
});
