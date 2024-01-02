import React from 'react';
import {Image, StyleSheet} from 'react-native';

export default function HeaderBackImage() {
  return (
    <Image
      style={styles.backImage}
      source={require('@/assets/images/common/common_arrow_back.png')}
    />
  );
}

const styles = StyleSheet.create({
  backImage: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
});
