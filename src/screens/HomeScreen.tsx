import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

export default function HomeScreen(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
