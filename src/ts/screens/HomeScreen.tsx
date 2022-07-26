import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainParamList, MainTabParamList} from '../route/ParamList';

type Props = CompositeScreenProps<
  StackScreenProps<MainParamList, 'MainTab'>,
  BottomTabScreenProps<MainTabParamList, 'Home'>
>;

export default function HomeScreen(props: Props): JSX.Element {
  const {navigation} = props;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => {
          navigation.navigate('Detail');
        }}>
        <Text style={styles.touchText}>Click Me!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touch: {
    height: 60,
    marginVertical: 32,
    marginHorizontal: 32,
    borderRadius: 20,
    backgroundColor: '#543FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
