/**
 * @format
 */

import {AppRegistry} from 'react-native';
// import App from './src/js/App';
import App from './src/ts/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
