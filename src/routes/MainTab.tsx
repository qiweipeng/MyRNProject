import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from './ParamList';
import HomeScreen from '@/screens/HomeScreen';
import MineScreen from '@/screens/MineScreen';

const TAB_BAR_ACTIVE_TINT_COLOR = '#FCD84D'; // 标签栏选中颜色
const TAB_BAR_INACTIVE_TINT_COLOR = '#000000'; // 标签栏未选中颜色
const HEADER_TINT_COLOR = '#1A1D21'; // 导航栏标题颜色

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTab(): JSX.Element {
  return (
    <Tab.Navigator
      screenOptions={{
        headerTitleAlign: 'center', // 安卓标题居中
        tabBarActiveTintColor: TAB_BAR_ACTIVE_TINT_COLOR,
        tabBarInactiveTintColor: TAB_BAR_INACTIVE_TINT_COLOR,
        headerStyle: {elevation: 0, shadowOpacity: 0, borderBottomWidth: 0}, // 导航栏底部阴影
        headerTintColor: HEADER_TINT_COLOR,
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
                  ? {
                      height: size,
                      width: size,
                      tintColor: TAB_BAR_ACTIVE_TINT_COLOR,
                    }
                  : {
                      height: size,
                      width: size,
                      tintColor: TAB_BAR_INACTIVE_TINT_COLOR,
                    }
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
                  ? {
                      height: size,
                      width: size,
                      tintColor: TAB_BAR_ACTIVE_TINT_COLOR,
                    }
                  : {
                      height: size,
                      width: size,
                      tintColor: TAB_BAR_INACTIVE_TINT_COLOR,
                    }
              }
            />
          ),
          title: '我的',
        }}
      />
    </Tab.Navigator>
  );
}
