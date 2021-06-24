import React from 'react';
import {StatusBar} from 'react-native';
// React Navigation 要求引入 react-native-gesture-handler
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {MainStack} from './route/MainRoute';

function App(): JSX.Element {
  return (
    <>
      {/* iOS 端 Info.plist 需添加 View controller-based status bar appearance 并设置为 NO */}
      <StatusBar animated={true} barStyle="dark-content" hidden={false} />
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
    </>
  );
}

export default App;
