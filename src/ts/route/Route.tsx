import React from 'react';
import {StyleSheet, View} from 'react-native';
// React Navigation 要求引入 react-native-gesture-handler
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './MainRoute';
import {LoginStack} from './LoginRoute';
import {useAuth} from '../contexts/AuthContext';

export default function AppContent(): JSX.Element {
  const {state} = useAuth();

  if (state.isLoading) {
    return <View style={styles.loading} />;
  }

  return (
    <NavigationContainer>
      {state.token ? <MainStack /> : <LoginStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
  },
});
