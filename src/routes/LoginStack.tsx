import React from 'react';
import {TransitionPresets, createStackNavigator} from '@react-navigation/stack';
import HeaderBackImage from './components/HeaderBackImage';
import {
  HEADER_TINT_COLOR,
  HEADER_TITLE_FONT_SIZE,
  HEADER_TITLE_FONT_WEIGHT,
} from '@/constants';
import {LoginParamList} from './LoginParamList';
import LoginScreen from '@/screens/login/login/LoginScreen';

const Stack = createStackNavigator<LoginParamList>();

export function LoginStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center', // 安卓标题居中
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        headerTintColor: HEADER_TINT_COLOR,
        headerTitleStyle: {
          fontSize: HEADER_TITLE_FONT_SIZE,
          fontWeight: HEADER_TITLE_FONT_WEIGHT,
        },
        headerBackImage: HeaderBackImage,
      }}>
      <Stack.Group
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        {/* 普通栈路由 */}
      </Stack.Group>
    </Stack.Navigator>
  );
}
