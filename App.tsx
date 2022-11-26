import React from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';

const App: () => JSX.Element = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Hello World!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
