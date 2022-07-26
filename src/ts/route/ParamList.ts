import {NavigatorScreenParams} from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Mine: undefined;
};

export type MainParamList = {
  MainTab: NavigatorScreenParams<MainTabParamList>;
  Detail: undefined;
};

export type LoginParamList = {
  Login: undefined;
};
