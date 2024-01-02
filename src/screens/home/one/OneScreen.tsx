import React, {useLayoutEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MainParamList} from '@/routes/MainParamList';

type Props = StackScreenProps<MainParamList, 'One'>;

export default function OneScreen(props: Props) {
  const {navigation} = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'One',
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>One</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
