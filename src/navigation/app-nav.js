import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from '../scenes/home';
import DetailsScreen from '../scenes/details';
import AccountScreen from '../scenes/account';
import MypokemonScreen from '../scenes/mypokemon';
import PokedexScreen from '../scenes/pokedex';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Account" component={AccountScreen}/>
      <Stack.Screen name="Mypokemon" component={MypokemonScreen} />
      <Stack.Screen name="Pokedex" component={PokedexScreen}/>
    </Stack.Navigator>
  );
}