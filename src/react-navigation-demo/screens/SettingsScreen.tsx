import React, {useLayoutEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MainParamList} from '../route/ParamList';

type Props = StackScreenProps<MainParamList, 'Settings'>;

export default function SettingsScreen(props: Props): JSX.Element {
  const {navigation} = props;

  useLayoutEffect(() => {
    navigation.setOptions({title: '设置'});
  }, [navigation]);

  return (
    <SafeAreaView>
      <Text>Settings</Text>
    </SafeAreaView>
  );
}
