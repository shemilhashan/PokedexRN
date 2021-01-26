import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, Dimensions, } from 'react-native';
import CachedImage from './cacheimage';
import { getCardColor } from '../utils';
import images from '../assets/images';
import { SharedElement } from 'react-navigation-shared-element';
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    tile: {
        marginTop: screenWidth * 0.01,
        marginBottom: screenWidth * 0.01,
        width: '45%',
        height: 140,
        borderRadius: 20,
        flexDirection: 'column',
    },
    name: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 20,
        color: 'white',
        fontWeight: 'bold',
        fontFamily:'DMSans-Bold'
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
        padding: 2,
        fontFamily:'DMSans-Bold'
    },
});
function PokedexCard(props) {
    const { showMyPokemon, item, allData, evoData, speciesData, index, navigation } = props
    return (
        <TouchableOpacity style={[styles.tile, { backgroundColor: getCardColor(item.types[0].name), marginRight: index % 2 === 0 ? '1%' : '4%', marginLeft: index % 2 === 0 ? '4%' : '1%', },]}
            onPress={async () => {
                if (!showMyPokemon) {
                    if (evoData.length > 0 && speciesData.length > 0) {
                        var liked = []
                        let likedDataAsync =
                            (await AsyncStorage.getItem('likedData')) || 'none';
                        if (likedDataAsync && likedDataAsync !== 'none') {
                            let likedDataLoaded = JSON.parse(likedDataAsync);
                            liked = likedDataLoaded.data
                            console.log('liked: ', liked)
                        }
                        navigation.navigate('DetailsAlt', {
                            item: item,
                            allData: allData,
                            id: item.id,
                            evoData: evoData,
                            speciesData: speciesData,
                            likedData: liked,
                        });
                    }
                }
            }}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={{ width: 40, flexDirection: 'column', position: 'absolute', top: 15, right: 5, alignContent: 'center', alignItems: 'center', justifyContent: 'center', opacity: 0.4, }}>
                    <Text style={{ flex: 1, color: 'grey', fontWeight: 'bold', }}>
                        #{item.id < 10 ? `00${item.id}` : item.id < 100 ? `0${item.id}` : `${item.id}`}
                    </Text>
                </View>
            </View>

            <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'center', alignContent: 'flex-start', }}>
                <View style={{ flex: 2, justifyContent: 'center', alignContent: 'center', }}>
                    <Text style={styles.type}>{item.types[0].name}</Text>
                    {item.types.length > 1 ? (
                        <Text style={styles.type}>{item.types[1].name}</Text>
                    ) : null}
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignContent: 'center', }}>
                    <Image source={images.pokeball} resizeMode="contain" style={{ position: 'absolute', height: 100, width: 100, tintColor: 'white', opacity: 0.2, top: 10, marginLeft: 10, zIndex: 1, }}
                    />
                    <SharedElement id={`item.${index+1}.photo`} style={{zIndex:2}}>
                        <CachedImage
                            uri={item.imgUrl}
                            style={{ width: '100%', height: '100%', zIndex: 2, }}
                            resizeMode="contain"
                        />
                    </SharedElement>
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default PokedexCard;


