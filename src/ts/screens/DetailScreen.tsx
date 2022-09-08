import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {useNews} from './api';
import {isCancel} from '@qiweipeng/use-axios';

export default function DetailScreen(): JSX.Element {
  const [type, setType] = useState<'sport' | 'politics'>('sport');
  const {response, error, loading, fetchData} = useNews({type: type});

  useEffect(() => {
    fetchData();
  }, [fetchData, type]);

  if (loading === true) {
    return (
      <SafeAreaView style={styles.loading}>
        <Text>Loading</Text>
      </SafeAreaView>
    );
  }

  if (error && !isCancel(error)) {
    return (
      <SafeAreaView>
        <Text>{error?.message}</Text>
      </SafeAreaView>
    );
  }

  if (!response) {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            fetchData();
          }}>
          <Text>点击开始</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.touch}
        onPress={() => {
          setType('politics');
        }}>
        <Text>Click</Text>
      </TouchableOpacity>
      <Text>{JSON.stringify(response.data.list)}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    backgroundColor: '#AAAAAA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  touch: {
    height: 60,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    marginVertical: 16,
    borderRadius: 20,
  },
});
