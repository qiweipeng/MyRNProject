import React, {useLayoutEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CompositeScreenProps} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainParamList, MainTabParamList} from '@/routes/MainParamList';
import {useAuth} from '@/hooks/useAuth';

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Mine'>,
  StackScreenProps<MainParamList, 'MainTab'>
>;

export default function HomeScreen(props: Props) {
  const {navigation} = props;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: '我的',
      headerShown: false,
    });
  }, [navigation]);

  const {
    actions: {logout},
  } = useAuth();

  // 没有导航栏时，iOS 通过 SafeAreaView 避开状态栏，安卓通过 <View style={{height: StatusBar.currentHeight}} /> 避开状态栏
  return (
    <SafeAreaView style={styles.container}>
      <View style={{height: StatusBar.currentHeight}} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          logout().catch(() => {
            return;
          });
        }}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: '#6D267F',
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
