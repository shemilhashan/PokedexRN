import React, { useState, useEffect } from 'react';
import { View, Image, Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import images from '../assets/images';

import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';

// import ReactNativeBiometrics from 'react-native-biometrics'

// eslint-disable-next-line no-extend-native
String.prototype.capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const saveLogin = async () => {
    try {
      await AsyncStorage.setItem('loggedIn', 'true');
      await AsyncStorage.setItem('userEmail', email);
      setEmail('');
      setPassword('');
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };

  useEffect(() => {
    const getLoggedIn = async () => {
      try {
        let pokeDataAsync = (await AsyncStorage.getItem('pokeData')) || 'none';
        // console.log('pokeData: ', pokeData)
        if (pokeDataAsync && pokeDataAsync !== 'none') {
          //set redux state if needed
          // let pokeDataLoaded = JSON.parse(pokeData);
          // console.log('pokeDataLoaded: ', pokeDataLoaded)
        } else {
          fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
            .then((response) => {
              // console.log(response.json())
              response.json().then(async (result) => {
                let dataArr = [];
                for (let i = 0; i < result.results.length; i++) {
                  let urlFetch = result.results[i].url;
                  let pokeData = await fetch(urlFetch);
                  let pokeDataJson = await pokeData.json();

                  let abilities = [];
                  for (
                    let abI = 0;
                    abI < pokeDataJson.abilities.length;
                    abI++
                  ) {
                    let ab = pokeDataJson.abilities[abI];
                    abilities.push(ab.ability.name.capitalize());
                  }

                  let stats = [];
                  for (let stI = 0; stI < pokeDataJson.stats.length; stI++) {
                    let st = pokeDataJson.stats[stI];
                    stats.push({
                      name: st.stat.name.capitalize(),
                      value: st.base_stat,
                    });
                  }

                  let types = [];
                  for (let tpI = 0; tpI < pokeDataJson.types.length; tpI++) {
                    let tp = pokeDataJson.types[tpI];
                    types.push({
                      name: tp.type.name.capitalize(),
                      slot: tp.slot,
                    });
                  }
                  dataArr.push({
                    id: i + 1,
                    name: result.results[i].name.capitalize(),
                    abilities: abilities,
                    stats: stats,
                    types: types,
                    base_experience: pokeDataJson.base_experience,
                    height: pokeDataJson.height,
                    weight: pokeDataJson.weight,
                    imgUrl:
                      pokeDataJson.sprites.other['official-artwork']
                        .front_default,
                    id: i + 1,
                    idText: (i + 1).toString(),
                  });
                }
                try {
                  const pokeData = await JSON.stringify({ data: dataArr });
                  await AsyncStorage.setItem('pokeData', pokeData);
                } catch (error) {
                  // Error retrieving data
                  console.log(error.message);
                }
              });
            })
            .catch((error) => {
              console.log('Error', error);
            });
        }
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }

      // ReactNativeBiometrics.isSensorAvailable()
      //   .then((resultObject) => {
      //     const { available, biometryType } = resultObject

      //     if (available && biometryType === ReactNativeBiometrics.TouchID) {
      //       createAlertBio('Bio','TouchID')
      //       console.log('TouchID is supported')
      //     } else if (available && biometryType === ReactNativeBiometrics.FaceID) {
      //       createAlertBio('Bio','FaceID')
      //       console.log('FaceID is supported')
      //     } else if (available && biometryType === ReactNativeBiometrics.Biometrics) {
      //       createAlertBio('Bio','Biometrics')
      //       console.log('Biometrics is supported')
      //     } else {
      //       createAlertBio('No Bio','Failed')
      //       console.log('Biometrics not supported')
      //     }
      //   })

      let loggedIn = '';
      try {
        loggedIn = (await AsyncStorage.getItem('loggedIn')) || 'none';
        if (loggedIn === 'true') {
          navigation.navigate('App');
        }
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    };
    const evolutions = async () => {
      try {
        let evoDataAsync = (await AsyncStorage.getItem('evoData')) || 'none';
        // console.log('evoDataAsync: ', evoDataAsync)
        if (evoDataAsync && evoDataAsync !== 'none') {
          //set redux state if needed
          // let evoDataAsyncLoaded = JSON.parse(evoDataAsync);
          // console.log('evoDataAsyncLoaded: ', evoDataAsyncLoaded)
        } else {
          let evoChains = [];
          for (let i = 1; i < 79; i++) {
            let evoChainUrl = `https://pokeapi.co/api/v2/evolution-chain/${i}`;
            let pokeEvolution = await fetch(evoChainUrl);
            let pokeEvolutionJson = await pokeEvolution.json();

            let evoData = [];
            if (pokeEvolutionJson.chain.evolves_to.length > 0) {
              let firstStartArr = pokeEvolutionJson.chain.species.url.split(
                '/',
              );
              let firstStart = firstStartArr[firstStartArr.length - 2];
              let firstEndArr = pokeEvolutionJson.chain.evolves_to[0].species.url.split(
                '/',
              );
              let firstEnd = firstEndArr[firstEndArr.length - 2];
              let evo1 = {
                // eslint-disable-next-line radix
                start: parseInt(firstStart),
                startName: pokeEvolutionJson.chain.species.name.capitalize(),
                endName: pokeEvolutionJson.chain.evolves_to[0].species.name.capitalize(),
                levels:
                  pokeEvolutionJson.chain.evolves_to[0].evolution_details[0]
                    .min_level,
                // eslint-disable-next-line radix
                end: parseInt(firstEnd),
              };
              evoData.push(evo1);
              if (
                pokeEvolutionJson.chain.evolves_to[0] &&
                pokeEvolutionJson.chain.evolves_to[0].evolves_to.length > 0
              ) {
                let second = pokeEvolutionJson.chain.evolves_to[0];
                let secondStartArr = second.species.url.split('/');
                let secondStart = secondStartArr[secondStartArr.length - 2];
                let secondEndArr = second.evolves_to[0].species.url.split('/');
                let secondEnd = secondEndArr[secondEndArr.length - 2];
                let evo2 = {
                  // eslint-disable-next-line radix
                  start: parseInt(secondStart),
                  startName: second.species.name.capitalize(),
                  endName: second.evolves_to[0].species.name.capitalize(),
                  levels: second.evolves_to[0].evolution_details[0].min_level,
                  // eslint-disable-next-line radix
                  end: parseInt(secondEnd),
                };
                evoData.push(evo2);
              }
            }

            evoChains.push(evoData);
          }

          try {
            const evoPokeData = await JSON.stringify({ data: evoChains });
            await AsyncStorage.setItem('evoData', evoPokeData);
          } catch (error) {
            // Error retrieving data
            console.log(error.message);
          }
        }
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    };
    const species = async () => {
      try {
        let speciesDataAsync =
          (await AsyncStorage.getItem('speciesData')) || 'none';
        // console.log('speciesDataAsync: ', speciesDataAsync)
        if (speciesDataAsync && speciesDataAsync !== 'none') {
          //set redux state if needed
          // let speciesDataAsyncLoaded = JSON.parse(speciesDataAsync);
          // console.log('speciesDataAsyncLoaded: ', speciesDataAsyncLoaded)
        } else {
          let speciesArr = [];
          for (let i = 0; i < 151; i++) {
            let pokeSpecies = await fetch(
              `https://pokeapi.co/api/v2/pokemon-species/${i + 1}/`,
            );
            let pokeSpeciesJson = await pokeSpecies.json();
            let evoChainUrl = pokeSpeciesJson.evolution_chain.url;
            let evoArr = evoChainUrl.split('/');
            // eslint-disable-next-line radix
            let evoID = parseInt(evoArr[evoArr.length - 2]) - 1;
            let filteredAboutText = pokeSpeciesJson.flavor_text_entries.filter(
              function (flavorTextObj) {
                return flavorTextObj.language.name === 'en';
              },
            );
            var aboutText = filteredAboutText[0].flavor_text;
            aboutText = aboutText.replace(/(\r\n|\n|\r)/gm, ' ');
            speciesArr.push({
              aboutText: aboutText,
              base_happiness: pokeSpeciesJson.base_happiness,
              capture_rate: pokeSpeciesJson.capture_rate,
              generation: pokeSpeciesJson.generation.name,
              growth_rate: pokeSpeciesJson.growth_rate.name,
              habitat: pokeSpeciesJson.habitat.name,
              has_gender_differences: pokeSpeciesJson.has_gender_differences,
              gender_rate: pokeSpeciesJson.gender_rate,
              evoID: evoID,
              egg_groups: pokeSpeciesJson.egg_groups,
            });
          }

          try {
            const speciesData = await JSON.stringify({ data: speciesArr });
            await AsyncStorage.setItem('speciesData', speciesData);
          } catch (error) {
            // Error retrieving data
            console.log(error.message);
          }
        }
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    };
    getLoggedIn();
    evolutions();
    species();
  });

  // const createAlertBio = (title,text) =>
  //   Alert.alert(
  //     title,
  //     text,
  //     [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
  //     { cancelable: false },
  //   );

  const createAlert = () =>
    Alert.alert(
      'Failed',
      'Please try again with correct credentials.',
      [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      { cancelable: false },
    );

  function loginValidate() {
    if (email === 'shem@s.com' && password === 'Ddf1') {
      saveLogin();
      navigation.navigate('App');
    } else {
      createAlert();
    }
  }

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={images.poke_app_icon}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: 100,
          height: 100,
        }}
      />
      <Image
        source={images.pokedextext}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ width: 300, height: 100, tintColor: '#da1b1b' }}
      />
      {/* <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'red', marginTop: 20, marginBottom: 10 }}>MY POKEDEX</Text> */}

      <Input
        placeholder="Email"
        leftIcon={{ type: 'materialIcons', name: 'email' }}
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyle={{ width: '80%', marginTop: 100 }}
        onChangeText={(text) => setEmail(text)}
        value={email}
      />

      <Input
        placeholder="Password"
        secureTextEntry={true}
        leftIcon={{ type: 'materialIcons', name: 'lock' }}
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyle={{ width: '80%' }}
        onChangeText={(text) => setPassword(text)}
        value={password}
      />

      <Button
        title="Login"
        onPress={() => loginValidate()}
        raised={true}
        // eslint-disable-next-line react-native/no-inline-styles
        containerStyle={{ width: '70%', marginTop: 20 }}
        // eslint-disable-next-line react-native/no-inline-styles
        buttonStyle={{ backgroundColor: '#da1b1b' }}
      />
    </View>
  );
}

export default LoginScreen;
