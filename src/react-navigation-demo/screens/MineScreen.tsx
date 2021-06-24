import React from 'react';
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MainParamList} from '../route/ParamList';

type Props = StackScreenProps<MainParamList, 'MainTab'>;

export default function MineScreen(props: Props): JSX.Element {
  const {navigation} = props;

  return (
    <SafeAreaView>
      <Text>Mine</Text>
      <Text
        style={styles.button}
        onPress={() => {
          navigation.navigate('Settings');
        }}>
        Enter Settings
      </Text>
      <Text
        style={styles.button}
        onPress={() => {
          navigation.navigate('About');
        }}>
        Enter About
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    color: 'blue',
    height: 50,
    alignSelf: 'center',
  },
});
