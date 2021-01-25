// import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import AppNavigator from './app-nav';
import AuthNavigator from './auth-nav';

const Stack = createStackNavigator();

function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="App"
          component={AppNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigator;
