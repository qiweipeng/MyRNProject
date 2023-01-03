import React, {useLayoutEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {MainTabParamList} from '@/routes/MainParamList';
import {useAuth} from '@/contexts/AuthContext';

type Props = BottomTabScreenProps<MainTabParamList, 'Mine'>;

export default function MineScreen(props: Props): JSX.Element {
  const {navigation} = props;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  const {
    state,
    actions: {logout},
  } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.avatar} />
          <Text style={styles.username}>
            {state.userInfo?.username ?? '未设置用户名'}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logout}
          onPress={() => {
            logout()
              .then(() => {
                console.log('退出登录成功！');
              })
              .catch(() => {
                console.log('因为本地数据清除失败导致退出登录失败！');
              });
          }}>
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    height: 120,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  avatar: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#515154',
    marginHorizontal: 16,
  },
  username: {
    marginHorizontal: 16,
    fontSize: 24,
    fontWeight: '700',
  },
  logout: {
    backgroundColor: '#FCD84D',
    marginVertical: 32,
    marginHorizontal: 32,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
