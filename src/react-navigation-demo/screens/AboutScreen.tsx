import React, {useLayoutEffect} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MainParamList} from '../route/ParamList';

type Props = StackScreenProps<MainParamList, 'About'>;

export default function AboutScreen(props: Props): JSX.Element {
  const {navigation} = props;

  useLayoutEffect(() => {
    navigation.setOptions({title: '关于'});
  }, [navigation]);

  return (
    <SafeAreaView>
      <Text>About</Text>
    </SafeAreaView>
  );
}
