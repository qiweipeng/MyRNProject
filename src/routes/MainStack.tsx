import React from 'react';
import {StyleSheet, Image, Text} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {MainParamList} from './MainParamList';
import MainTab from './MainTab';

const HEADER_TINT_COLOR = '#1A1D21'; // 导航栏标题颜色

const Stack = createStackNavigator<MainParamList>();

export function MainStack(): JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center', // 安卓标题居中
        headerBackTitleVisible: false,
        headerStyle: {elevation: 0, shadowOpacity: 0, borderBottomWidth: 0}, // 导航栏底部阴影
        headerTintColor: HEADER_TINT_COLOR,
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
          name="MainTab"
          component={MainTab}
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
