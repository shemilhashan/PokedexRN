import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { Button } from 'react-native-elements';
import images from '../assets/images'

const styles = StyleSheet.create({
    tile: { 
        marginTop: 10, 
        marginBottom: 10, 
        width: '41%', 
        height: 100,
        borderRadius:20
    },
    name:{
        fontSize:20,
        marginTop:10,
        marginLeft:20,
        color:'white',
        fontWeight:'bold'
    }
});


function PokedexScreen({ navigation }) {

    const [data, setData] = useState({ results: [] });

    const renderItem = ({ item, index }) => (
        <TouchableOpacity style={[styles.tile,{backgroundColor:'#33A532',marginRight: index % 2 == 0 ? '3%' : '6%', marginLeft: index % 2 == 0 ? '6%' : '3%', }]} onPress={() => navigation.navigate('Details', { item: item, allData: data.results, id: index + 1 })}>
            <Text style={styles.name}>{item.name.capitalize()}</Text>
            <Image source={images.poke_app_icon} style={{ width: 50, height: 50 }}></Image>
        </TouchableOpacity>
    );

    const logOut = async userId => {
        try {
            await AsyncStorage.setItem('loggedIn', 'none');
            await AsyncStorage.setItem('userEmail', '');
            navigation.navigate('Auth')
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
            .then((response) => {
                // console.log(response.json())
                response.json().then(setData);
            })
            .catch((error) => {
                console.log('Error', error);
            });
    }, []);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <FlatList
                data={data.results}
                renderItem={renderItem}
                keyExtractor={item => item.name}
                numColumns={2}
                style={{ width: '100%' }}
            />
        </View>
    );
}

export default PokedexScreen;