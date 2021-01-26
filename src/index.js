/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';

import SplashScreen from 'react-native-splash-screen';

import Navigator from './navigation'


function App() {
  useEffect(()=>{
    SplashScreen.hide()
  })
  return (
    <Navigator>
    </Navigator>
  );
}

export default App;
