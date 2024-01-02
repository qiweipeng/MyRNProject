import React, {useLayoutEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainParamList, MainTabParamList} from '@/routes/MainParamList';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  StackScreenProps<MainParamList, 'MainTab'>
>;

export default function HomeScreen(props: Props) {
  const {navigation} = props;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '首页',
    });
  }, [navigation]);

  // 如果是 ScrollView 或 FlatList，增加如下属性，然后内部根据情况添加 SafeAreaView
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="scrollableAxes"
      scrollIndicatorInsets={{right: 1}}
      style={styles.container}>
      <SafeAreaView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('One');
          }}>
          <Text style={styles.buttonText}>Click One</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Two');
          }}>
          <Text style={styles.buttonText}>Click Two</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate('Three');
          }}>
          <Text style={styles.buttonText}>Click Three</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#279365',
    marginVertical: 16,
    marginHorizontal: 32,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
