import React from 'react';
import {
  CardStyleInterpolators,
  TransitionPresets,
  createStackNavigator,
} from '@react-navigation/stack';
import HeaderBackImage from './components/HeaderBackImage';
import ModalHeaderBackImage from './components/ModalHeaderBackImage';
import {
  HEADER_TINT_COLOR,
  HEADER_TITLE_FONT_SIZE,
  HEADER_TITLE_FONT_WEIGHT,
} from '@/constants';
import {MainParamList} from './MainParamList';
import MainTab from './MainTab';
import OneScreen from '@/screens/home/one/OneScreen';
import TwoScreen from '@/screens/home/two/TwoScreen';
import ThreeScreen from '@/screens/home/three/ThreeScreen';

const Stack = createStackNavigator<MainParamList>();

export function MainStack() {
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
          name="MainTab"
          component={MainTab}
          options={{headerShown: false}}
        />
        <Stack.Screen name="One" component={OneScreen} />
        {/* 普通栈路由 */}
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'modal',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          headerBackImage: ModalHeaderBackImage,
        }}>
        <Stack.Screen name="Two" component={TwoScreen} />
        {/* modal 形式的路由 */}
      </Stack.Group>
      <Stack.Group
        screenOptions={{
          presentation: 'transparentModal',
          headerShown: false,
        }}>
        <Stack.Screen name="Three" component={ThreeScreen} />
        {/* 对话框形式的路由 */}
      </Stack.Group>
    </Stack.Navigator>
  );
}
