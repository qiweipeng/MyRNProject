import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import TabBarIcon from './components/TabBarIcon';
import {
  HEADER_TINT_COLOR,
  HEADER_TITLE_FONT_SIZE,
  HEADER_TITLE_FONT_WEIGHT,
  TAB_BAR_ACTIVE_TINT_COLOR,
  TAB_BAR_INACTIVE_TINT_COLOR,
} from '@/constants';
import {useAuth} from '@/hooks/useAuth';
import {MainTabParamList} from './MainParamList';
import HomeScreen from '@/screens/home/home/HomeScreen';
import MineScreen from '@/screens/mine/mine/MineScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTab() {
  const {
    state: {userInfo},
  } = useAuth();

  if (userInfo === undefined) {
    return null;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        lazy: false, // 关闭标签懒加载
        headerTitleAlign: 'center', // 安卓标题居中
        tabBarActiveTintColor: TAB_BAR_ACTIVE_TINT_COLOR,
        tabBarInactiveTintColor: TAB_BAR_INACTIVE_TINT_COLOR,
        headerShadowVisible: false,
        headerTintColor: HEADER_TINT_COLOR,
        headerTitleStyle: {
          fontSize: HEADER_TITLE_FONT_SIZE,
          fontWeight: HEADER_TITLE_FONT_WEIGHT,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: HomeTabBarIcon,
        }}
      />
      <Tab.Screen
        name="Mine"
        component={MineScreen}
        options={{
          tabBarIcon: MineTabBarIcon,
        }}
      />
    </Tab.Navigator>
  );
}

// 首页
function HomeTabBarIcon(props: {focused: boolean; size: number}) {
  return (
    <TabBarIcon
      focused={props.focused}
      size={props.size}
      activeImage={require('@/assets/images/common/tab_home_s.png')}
      inactiveImage={require('@/assets/images/common/tab_home.png')}
      activeTintColor={TAB_BAR_ACTIVE_TINT_COLOR}
      inactiveTintColor={TAB_BAR_INACTIVE_TINT_COLOR}
    />
  );
}

// 我的
function MineTabBarIcon(props: {focused: boolean; size: number}) {
  return (
    <TabBarIcon
      focused={props.focused}
      size={props.size}
      activeImage={require('@/assets/images/common/tab_mine_s.png')}
      inactiveImage={require('@/assets/images/common/tab_mine.png')}
      activeTintColor={TAB_BAR_ACTIVE_TINT_COLOR}
      inactiveTintColor={TAB_BAR_INACTIVE_TINT_COLOR}
    />
  );
}
