import React from 'react';
import {StyleSheet, Image, Text} from 'react-native';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainParamList, MainTabParamList} from './ParamList';
import HomeScreen from '../screens/HomeScreen';
import MineScreen from '../screens/MineScreen';

const Stack = createStackNavigator<MainParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTab(): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center', // 安卓标题居中
        tabBarActiveTintColor: '#FCD84D', // Tab Bar 选中文字颜色
        tabBarInactiveTintColor: '#000000', // Tab Bar 未选中文字颜色
        headerStyle: {elevation: 0, shadowOpacity: 0, borderBottomWidth: 0}, // 导航栏底部阴影
        headerTintColor: '#1A1D21', // 导航栏标题颜色
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, size}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/common/tab_home_s.png')
                  : require('../assets/images/common/tab_home.png')
              }
              style={
                focused
                  ? // eslint-disable-next-line react-native/no-inline-styles
                    {height: size, width: size, tintColor: '#FCD84D'}
                  : // eslint-disable-next-line react-native/no-inline-styles
                    {height: size, width: size, tintColor: '#000000'}
              }
            />
          ),
          title: '首页',
        }}
      />
      <Tab.Screen
        name="Mine"
        component={MineScreen}
        options={{
          tabBarIcon: ({focused, size}) => (
            <Image
              source={
                focused
                  ? require('../assets/images/common/tab_mine_s.png')
                  : require('../assets/images/common/tab_mine.png')
              }
              style={
                focused
                  ? // eslint-disable-next-line react-native/no-inline-styles
                    {height: size, width: size, tintColor: '#FCD84D'}
                  : // eslint-disable-next-line react-native/no-inline-styles
                    {height: size, width: size, tintColor: '#000000'}
              }
            />
          ),
          title: '我的',
        }}
      />
    </Tab.Navigator>
  );
}

export function MainStack(): JSX.Element {
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
