import React from 'react';
import {StatusBar} from 'react-native';
import {AppProvider} from './contexts/AppProvider';
import AppContent from './route/Route';

function App(): JSX.Element {
  return (
    <>
      {/* iOS 端 Info.plist 需添加 View controller-based status bar appearance 并设置为 NO */}
      <StatusBar animated={true} barStyle="dark-content" hidden={false} />
      <AppProvider>
        <AppContent />
      </AppProvider>
    </>
  );
}

export default App;
