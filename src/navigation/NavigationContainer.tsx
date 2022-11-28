import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './MainStack';
import {LoginStack} from './LoginStack';
import {useAuth} from '../contexts/AuthContext';

export default function Container(): JSX.Element {
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
