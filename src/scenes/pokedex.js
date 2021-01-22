import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { SearchBar } from 'react-native-elements';
import { getCardColor } from '../utils'
import images from '../assets/images'
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    tile: {
        marginTop: screenWidth * 0.01,
        marginBottom: screenWidth * 0.01,
        width: '45%',
        height: 140,
        borderRadius: 20,
        flexDirection: 'column'
    },
    name: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20,
        color: 'white',
        fontWeight: 'bold'
    },
    type: {
        fontSize: 15,
        marginTop: 3,
        marginLeft: 10,
        color: 'white',
        fontWeight: 'bold',
        backgroundColor: 'rgba(255,255,255,0.5)',
        textAlign: 'center',
        borderRadius: 10,
        padding: 2
    }
});


function PokedexScreen({ navigation }) {

    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [searchText, setSearchText] = useState('');

    const renderItem = ({ item, index }) => (
        <TouchableOpacity style={[styles.tile, { backgroundColor: getCardColor(item.types[0].name), marginRight: index % 2 == 0 ? '1%' : '4%', marginLeft: index % 2 == 0 ? '4%' : '1%' }]} onPress={() => navigation.navigate('Details', { item: item, allData: allData, id: index + 1 })}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={{ width: 40, flexDirection: 'column', position: 'absolute', top: 15, right: 5, alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}><Text style={{ flex: 1, color: 'grey', fontWeight: 'bold' }}>#{item.id < 10 ? `00${item.id}` : item.id < 100 ? `0${item.id}` : `${item.id}`}</Text></View>
            </View>

            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignContent: 'flex-start' }}>
                <View style={{ flex: 2, justifyContent: 'center', alignContent: 'center' }}>
                    <Text style={styles.type}>{item.types[0].name}</Text>
                    {item.types.length > 1 ? <Text style={styles.type}>{item.types[1].name}</Text> : null}
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignContent: 'center' }}>
                    <Image source={images.pokeball} resizeMode='contain' style={{ position: 'absolute', height: 100, width: 100, tintColor: 'white', opacity: 0.2, top: 10, marginLeft: 10, zIndex: 1 }}></Image>
                    <Image source={{ uri: item.imgUrl }} style={{ width: '100%', height: '100%', zIndex: 2 }} resizeMode='contain'></Image>
                </View>
            </View>
        </TouchableOpacity>
    );

    useEffect(() => {
        const getCachedData = async () => {

            try {
                let pokeData = await AsyncStorage.getItem('pokeData') || 'none';
                console.log('pokeData: ', pokeData)
                if (pokeData && pokeData != 'none') {
                    //set redux state if needed
                    let pokeDataLoaded = JSON.parse(pokeData);
                    console.log('pokeDataLoaded: ', pokeDataLoaded)
                    setData(pokeDataLoaded.data)
                    setAllData(pokeDataLoaded.data)
                }
            } catch (error) {
                // Error retrieving data
                console.log(error.message);
            }
        }
        getCachedData()
    }, [])

    function updateSearch(searchT) {
        setSearchText(searchT)
        if (searchT == ''){
            setData(allData)
        }
        else {
            let filteredData =  allData.filter(function(pokemon) {
                return pokemon.name.includes(searchT) || pokemon.idText.includes(searchT);
            });
            setData(filteredData)
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={updateSearch}
                value={searchText}
                lightTheme
                round
                containerStyle={{width:'100%',backgroundColor:'white'}}
                // inputContainerStyle={{backgroundColor:'white',borderColor:'grey'}}
            />
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.name}
                numColumns={2}
                style={{ width: '100%', backgroundColor: 'white' }}
            />
        </View>
    );
}

export default PokedexScreen;