import React, {useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {useAuth} from '../contexts/AuthContext';

export default function LoginScreen(): JSX.Element {
  const {
    actions: {login},
  } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <StatusBar animated={false} barStyle="light-content" hidden={true} />
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Let's sign you in.</Text>
          <Text style={styles.subtitle}>Welcom back.</Text>
          <Text style={styles.subtitle}>You've been missed!</Text>
          <KeyboardAvoidingView style={styles.middle} behavior="padding">
            <TextInput
              style={styles.textInput}
              keyboardType="default"
              selectionColor="#FCD84D"
              placeholder="Phone, email or username"
              placeholderTextColor={'#999999'}
              onChangeText={setUsername}
              value={username}
            />
            <TextInput
              style={styles.textInput}
              keyboardType="ascii-capable"
              secureTextEntry={true}
              selectionColor="#FCD84D"
              placeholder="Password"
              placeholderTextColor={'#999999'}
              onChangeText={setPassword}
              value={password}
            />
          </KeyboardAvoidingView>
          <View style={styles.register}>
            <Text style={styles.registerTip}>Don't have an account?</Text>
            <Text
              style={styles.registerText}
              onPress={() => {
                console.log('Register!');
              }}>
              Register
            </Text>
          </View>
          <TouchableOpacity
            style={styles.login}
            onPress={() => {
              login('token123', {username: 'qiweipeng'})
                .then(() => {
                  console.log('???????????????');
                })
                .catch(() => {
                  console.log('???????????????????????????????????????????????????');
                });
            }}>
            <Text style={styles.loginText}>Sign In</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  middle: {
    marginTop: 48,
    marginHorizontal: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1F1F1F',
    marginHorizontal: 32,
    marginTop: 48,
    marginBottom: 16,
  },
  subtitle: {
    marginHorizontal: 32,
    fontSize: 32,
    color: '#1F1F1F',
  },
  textInput: {
    height: 60,
    borderRadius: 12,
    borderColor: '#515154',
    borderWidth: 1,
    marginVertical: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    color: '#1F1F1F',
  },
  register: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 48,
  },
  registerTip: {
    color: '#999999',
    fontSize: 16,
  },
  registerText: {
    marginHorizontal: 8,
    color: '#1F1F1F',
    fontSize: 16,
  },
  login: {
    backgroundColor: '#FCD84D',
    marginVertical: 16,
    marginHorizontal: 32,
    height: 60,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
