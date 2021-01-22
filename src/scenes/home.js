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
import * as Colors from '../styles/colors'

const styles = StyleSheet.create({
    tile: {
        marginTop: 10,
        marginBottom: 10,
        width: '80%',
        height: 100,
        borderRadius: 20,
        marginRight: '10%',
        marginLeft: '10%',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 1, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        backgroundColor: '#fff',
        elevation: 2, // Android
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    name: {
        position: 'absolute',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20,
        color: 'white',
        fontWeight: 'bold',
        zIndex: 10
    }
});

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1)
}


function HomeScreen({ navigation }) {

    const data = [
        { name: 'Pokedex', color: Colors.cardPokedex, fnToPress: () => { navigation.navigate('Pokedex') } },
        { name: 'My Pokemon', color: Colors.cardMy, fnToPress: () => { navigation.navigate('Mypokemon') } },
        { name: 'Account', color: Colors.cardAccount, fnToPress: () => { navigation.navigate('Account') } },
        { name: 'Logout', color: Colors.cardLogout, fnToPress: () => { logOut() } },
    ]

    const renderItem = ({ item, index }) => (
        <TouchableOpacity style={[styles.tile,{ backgroundColor:item.color }]} onPress={() => item.fnToPress()}>
            <Text style={styles.name}>{item.name.capitalize()}</Text>
        </TouchableOpacity>
        // <View style={[styles.tile, { backgroundColor: item.color, width: '100%', marginLeft: 0 }]}>
        //     <Button title={''} onPress={() => item.fnToPress()} raised={true} buttonStyle={[styles.tile, { backgroundColor: item.color }]} />
        //     <Text style={styles.name}>{item.name.capitalize()}</Text>
        // </View>
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
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'white' }}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.name}
                style={{ width: '100%', backgroundColor: 'white', alignSelf:'center', marginTop:40 }}
            />
        </View>
    );
}

export default HomeScreen;