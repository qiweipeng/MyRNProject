import React, {useLayoutEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MainParamList} from '@/routes/MainParamList';

type Props = StackScreenProps<MainParamList, 'Two'>;

export default function TwoScreen(props: Props) {
  const {navigation} = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Two</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
