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


function MypokemonScreen({ navigation }) {
    const logOut = async userId => {
        try {
            navigation.goback()
        } catch (error) {
            // Error retrieving data
            console.log(error.message);
        }
    };
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        </View>
    );
}

export default MypokemonScreen;