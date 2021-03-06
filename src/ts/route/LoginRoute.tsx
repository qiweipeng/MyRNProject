import React from 'react';
import {StyleSheet, Image, Text} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {LoginParamList} from './ParamList';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator<LoginParamList>();

export function LoginStack(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center', // 安卓标题居中
        headerBackTitleVisible: false,
        headerStyle: {elevation: 0, shadowOpacity: 0, borderBottomWidth: 0}, // 导航栏底部阴影
        headerTintColor: '#1A1D21', // 导航栏标题颜色
        headerBackImage: () => {
          return (
            <Image
              style={styles.backImage}
              source={require('../assets/images/common/common_arrow_back.png')}
            />
          );
        },
      }}>
      <Stack.Group>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        {/* 普通栈路由 */}
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerBackImage: () => {
            return <Text style={styles.backImage}>关闭</Text>;
          },
        }}>
        {/* modal 形式的路由 */}
      </Stack.Group>
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  backImage: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
});
