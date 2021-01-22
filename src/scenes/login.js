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
            let loggedIn = '';
            try {
                loggedIn = await AsyncStorage.getItem('loggedIn') || 'none';
                console.log('loggedIn: ',loggedIn)
                if (loggedIn=='true'){
                    navigation.navigate('App')
                }
            } catch (error) {
              // Error retrieving data
              console.log(error.message);
            }
        }
        getLoggedIn()
    },[])

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
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'red', marginTop: 20, marginBottom: 10 }}>MY POKEDEX</Text>

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


            <Button title="Login" onPress={() => loginValidate()} raised={true} containerStyle={{ width: '70%', marginTop: 20 }} />
        </View>
    );
}

export default LoginScreen;