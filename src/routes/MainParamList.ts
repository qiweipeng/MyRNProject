import {NavigatorScreenParams} from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Mine: undefined;
};

export type MainParamList = {
  MainTab: NavigatorScreenParams<MainTabParamList>;
  One: undefined;
  Two: undefined;
  Three: undefined;
};
