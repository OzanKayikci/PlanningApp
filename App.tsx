import 'react-native-gesture-handler';
import {Text ,TextProps} from 'react-native';
import {registerRootComponent} from 'expo'
import App from './src/App';

// @ts-ignore
Text.defaultProps = Text.defaultProps || {};
// @ts-ignore

Text.defaultProps.allowFontScaling = false;
registerRootComponent(App)