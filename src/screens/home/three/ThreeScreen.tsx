import React, {useLayoutEffect} from 'react';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {MainParamList} from '@/routes/MainParamList';

type Props = StackScreenProps<MainParamList, 'Three'>;

export default function ThreeScreen(props: Props) {
  const {navigation} = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '',
    });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable
        style={[StyleSheet.absoluteFill, styles.background]}
        onPress={() => {
          navigation.pop();
        }}
      />
      <View style={styles.content}>
        <Text>Three</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    backgroundColor: 'rgba(21, 20, 35, 0.2)',
  },
  content: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    maxHeight: '90%',
    aspectRatio: 0.75,
  },
});
