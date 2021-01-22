import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    Alert,

} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'
import images from '../assets/images'

import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const saveLogin = async () => {
        try {
            await AsyncStorage.setItem('loggedIn', 'true');
            await AsyncStorage.setItem('userEmail', email);
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    };

    useEffect(() => {
        const getLoggedIn = async () => {

            try {
                let pokeData = await AsyncStorage.getItem('pokeData') || 'none';
                console.log('pokeData: ', pokeData)
                if (pokeData && pokeData != 'none') {
                    //set redux state if needed
                    let pokeDataLoaded = JSON.parse(pokeData);
                    console.log('pokeDataLoaded: ',pokeDataLoaded)
                }
                else {
                    fetch('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0')
                    .then((response) => {
                        // console.log(response.json())
                        response.json().then(async (result) => {
                            let dataArr = []
                            for (let i = 0; i < result.results.length; i++) {
                                let urlFetch = result.results[i].url
                                let pokeData = await fetch(urlFetch)
                                let pokeDataJson = await pokeData.json()
    
                                let abilities =[]
                                for (let abI=0;abI<pokeDataJson.abilities.length;abI++){
                                    let ab = pokeDataJson.abilities[abI]
                                    abilities.push(ab.ability.name.capitalize())
                                }
    
                                let stats =[]
                                for (let stI=0;stI<pokeDataJson.stats.length;stI++){
                                    let st = pokeDataJson.stats[stI]
                                    stats.push({name:st.stat.name.capitalize(),value:st.base_stat})
                                }
    
                                let types =[]
                                for (let tpI=0;tpI<pokeDataJson.types.length;tpI++){
                                    let tp = pokeDataJson.types[tpI]
                                    types.push({name:tp.type.name.capitalize(),slot:tp.slot})
                                }
    
                                dataArr.push({name:result.results[i].name.capitalize(),abilities:abilities,stats:stats,types:types,base_experience:pokeDataJson.base_experience,
                                    height:pokeDataJson.height,weight:pokeDataJson.weight,imgUrl:pokeDataJson.sprites.other['official-artwork'].front_default,id:(i+1),idText:(i+1).toString()
                                })
                            }
                            try {
                                const pokeData = await JSON.stringify({data:dataArr})
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

            let loggedIn = '';
            try {
                loggedIn = await AsyncStorage.getItem('loggedIn') || 'none';
                if (loggedIn == 'true') {
                    navigation.navigate('App')
                }
            } catch (error) {
                // Error retrieving data
                console.log(error.message);
            }
        }
        getLoggedIn()
    }, [])

    const createAlert = () =>
        Alert.alert(
            "Failed",
            "Please try again with correct credentials.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );

    function loginValidate() {
        if (email == 'shem@s.com' && password == 'Ddf1') {
            saveLogin()
            setEmail('')
            setPassword('')
            navigation.navigate('App')
        }
        else {
            createAlert()
        }
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

            <Image source={images.poke_app_icon} style={{ width: 100, height: 100 }}></Image>
            <Image source={images.pokedextext} style={{ width: 300, height: 100,tintColor:'#da1b1b' }}></Image>
            {/* <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'red', marginTop: 20, marginBottom: 10 }}>MY POKEDEX</Text> */}

            <Input
                placeholder="Email"
                leftIcon={{ type: 'materialIcons', name: 'email' }}
                containerStyle={{ width: '80%', marginTop: 100 }}
                onChangeText={text => setEmail(text)}
                value={email}
            />

            <Input
                placeholder="Password"
                secureTextEntry={true}
                leftIcon={{ type: 'materialIcons', name: 'lock' }}
                containerStyle={{ width: '80%' }}
                onChangeText={text => setPassword(text)}
                value={password}
            />


            <Button title="Login" onPress={() => loginValidate()} raised={true} containerStyle={{ width: '70%', marginTop: 20 }} buttonStyle={{backgroundColor:'#da1b1b'}}/>
        </View>
    );
}

export default LoginScreen;