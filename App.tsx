import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import { store } from './src/redux/store';
import RootNavigator from './src/navigations/RootNavigator';
import 'react-native-gesture-handler';





export default function App() {
  return (
    <Provider store={store}>
     <RootNavigator/>
    </Provider>
  );
}
