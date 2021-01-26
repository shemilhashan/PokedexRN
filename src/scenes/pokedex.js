import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Image
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { SearchBar } from 'react-native-elements';

import PokedexCard from '../components/pokedexcard';
import images from '../assets/images'

function PokedexScreen({ navigation, route }) {
  const { showMyPokemon } = route.params
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [evoData, setEvoData] = useState([]);
  const [speciesData, setSpeciesData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const renderItem = ({ item, index }) => (
    <PokedexCard showMyPokemon={showMyPokemon} item={item} allData={allData} evoData={evoData} speciesData={speciesData} index={index} navigation={navigation}></PokedexCard>
  );
  useEffect(() => {
    const getCachedData = async () => {
      try {
        let pokeData = (await AsyncStorage.getItem('pokeData')) || 'none';
        // console.log('pokeData: ', pokeData)
        if (pokeData && pokeData !== 'none') {
          //set redux state if needed
          let pokeDataLoaded = JSON.parse(pokeData);
          let pokeDataSave = pokeDataLoaded.data

          if (showMyPokemon) {
            navigation.setOptions({ 
              title: 'My Pokemon',
              headerStyle: {
                backgroundColor: 'white',
                elevation:0
              },
              headerTintColor: 'black',
              headerTitleStyle: {
              }, 
              headerBackImage:()=> {return <Image source={images.backarrow} style={{width:40,height:20,tintColor:'black'}} resizeMode='contain'></Image>}
            })
            let likedDataAsync =
              (await AsyncStorage.getItem('likedData')) || 'none';
            if (likedDataAsync && likedDataAsync !== 'none') {
              let likedDataLoaded = JSON.parse(likedDataAsync);
              let likedDataSaved = likedDataLoaded.data
              let newData = []
              for (let i = 1; i < 152; i++) {
                if (likedDataSaved.includes(i)) {
                  newData.push(pokeDataSave[i - 1])
                }
              }
              setData(newData);
              setAllData(newData);
            }
          }
          else {
            navigation.setOptions({ 
              title: 'Pokedex',
              headerStyle: {
                backgroundColor: 'white',
                elevation:0
              },
              headerTintColor: 'black',
              headerTitleStyle: {
              }, 
              headerBackImage:()=> {return <Image source={images.backarrow} style={{width:40,height:20,tintColor:'black'}} resizeMode='contain'></Image>}
            })
            setData(pokeDataSave);
            setAllData(pokeDataSave);
          }
        }

        let evoDataAsync = (await AsyncStorage.getItem('evoData')) || 'none';
        // console.log('evoData: ', evoData)
        if (evoDataAsync && evoDataAsync !== 'none') {
          //set redux state if needed
          let evoDataLoaded = JSON.parse(evoDataAsync);
          // console.log('evoDataLoaded: ', evoDataLoaded)
          setEvoData(evoDataLoaded.data);
        }

        let speciesDataAsync =
          (await AsyncStorage.getItem('speciesData')) || 'none';
        // console.log('speciesData: ', speciesData)
        if (speciesDataAsync && speciesDataAsync !== 'none') {
          //set redux state if needed
          let speciesDataLoaded = JSON.parse(speciesDataAsync);
          // console.log('speciesDataLoaded: ', speciesDataLoaded)
          setSpeciesData(speciesDataLoaded.data);
        }
      } catch (error) {
        // Error retrieving data
        console.log(error.message);
      }
    };
    getCachedData();
  }, []);

  function updateSearch(searchT) {
    setSearchText(searchT);
    if (searchT === '') {
      setData(allData);
    } else {
      let filteredData = allData.filter(function (pokemon) {
        return (
          pokemon.name.includes(searchT) || pokemon.idText.includes(searchT)
        );
      });
      setData(filteredData);
    }
  }

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
      <SearchBar
        placeholder={showMyPokemon ? "Search My Pokemons" : "Search Pokemons"}
        onChangeText={updateSearch}
        value={searchText}
        lightTheme
        round
        containerStyle={{ width: '100%', backgroundColor: 'white', borderBottomWidth: 0, borderTopWidth: 0, elevation: 0, }}
        inputContainerStyle={{ backgroundColor: '#f7f7f7', borderColor: 'grey', borderWidth: 0, borderBottomWidth: 0, }}
        leftIconContainerStyle={{ paddingLeft: 8, marginRight: 0, }}
        searchIcon={{ name: 'search', size: 24, color: '#494949' }}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        numColumns={2}
        style={{ width: '100%', backgroundColor: 'white', }}
      />
    </View>
  );
}

export default PokedexScreen;
