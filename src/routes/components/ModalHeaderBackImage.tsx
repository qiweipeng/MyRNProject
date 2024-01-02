import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function ModalHeaderBackImage() {
  return <Text style={styles.backImage}>关闭</Text>;
}

const styles = StyleSheet.create({
  backImage: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
});
