import React from 'react';
import {StatusBar} from 'react-native';
import 'react-native-gesture-handler'; // https://reactnavigation.org/docs/stack-navigator#installation
import {AppProvider} from '@/contexts/AppProvider';
import NavigationContainer from '@/routes/NavigationContainer';

export default function App() {
  return (
    <>
      <StatusBar animated={true} barStyle="dark-content" hidden={false} />
      <AppProvider>
        <NavigationContainer />
      </AppProvider>
    </>
  );
}
