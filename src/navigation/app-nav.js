import * as React from 'react';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import HomeScreen from '../scenes/home';
import DetailsScreen from '../scenes/details';
import AccountScreen from '../scenes/account';
import MypokemonScreen from '../scenes/mypokemon';
import PokedexScreen from '../scenes/pokedex';
import DetailAltScreen from '../scenes/detailsalt';

const Stack = createSharedElementStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="DetailsAlt"
        component={DetailAltScreen}
        options={()=>({
          headerShown: false,
          gestureEnabled: false,
          transitionSpec: {
            open : { animation:'timing', config: { duration:0 } },
            close : { animation:'timing', config: { duration:0 } },
          },
          cardStyleInterpolator:({current : { progress }}) => {
            return {
              cardStyle: {
                opacity: progress,
              }
            }
          }
        })}
      />
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="Mypokemon" component={MypokemonScreen} />
      <Stack.Screen name="Pokedex" component={PokedexScreen} />
    </Stack.Navigator>
  );
}
