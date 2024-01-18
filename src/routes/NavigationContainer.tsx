import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './MainStack';
import {LoginStack} from './LoginStack';
import {useAuth} from '@/contexts/useAuth';

export default function Container() {
  const {
    state: {loading, token},
  } = useAuth();

  // 启动加载界面
  if (loading) {
    return <View style={styles.loading} />;
  }

  return (
    <NavigationContainer>
      {token ? <MainStack /> : <LoginStack />}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
  },
});
