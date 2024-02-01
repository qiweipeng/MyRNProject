/**
 * @format
 */

import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

LogBox.ignoreLogs([
  // React Navigation 导致的警告
  'Sending `onAnimatedValueUpdate` with no listeners registered.',
]);

AppRegistry.registerComponent(appName, () => App);
