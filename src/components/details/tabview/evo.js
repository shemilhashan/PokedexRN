import React from 'react';
import { View, Text, StyleSheet,Dimensions,Image } from 'react-native';
import images from '../../../assets/images';
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
    scene: {
        flex: 1,
    }
});
function Evo(props) {
    const { allData, speciesData, currentId,evoData } = props
    const imgCommon =
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
    let evoArr = evoData[speciesData[currentId - 1].evoID];
    let firstEvo = evoArr.length > 0 ? evoArr[0] : false;
    let secondEvo = evoArr.length > 1 ? evoArr[1] : false;
    let currentData = allData[currentId - 1];

    return (
        <View style={[styles.scene, { backgroundColor: 'white', flexDirection: 'column', },]}>
            <Text style={{ paddingLeft: 20, marginTop: 20, marginBottom: 0, color: 'black', fontWeight: 'bold', fontSize: 17, }}>
                Evolution Chain
        </Text>
            {!firstEvo ? (
                <View style={{ width: screenWidth, height: 150, justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center', }}>
                    <Image
                        source={images.pokeball}
                        resizeMode="contain"
                        style={{ position: 'absolute', height: 100, width: 100, tintColor: 'grey', opacity: 0.2, top: 10, marginLeft: 10, zIndex: 1, }}
                    />
                    <Image
                        source={{ uri: `${imgCommon}${currentId}.png` }}
                        style={{ width: 100, height: 100,zIndex:2 }}
                        resizeMode="contain"
                    />
                    <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                        {currentData.name}
                    </Text>
                </View>
            ) : (
                    <View style={{ width: screenWidth, height: 300, flexDirection: 'column', }}>
                        <View style={{ flexDirection: 'row', height: 150, justifyContent: 'center', }}>
                            <View style={{ width: screenWidth * 0.3, height: 150, justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center', }}>
                                <Image
                                    source={images.pokeball}
                                    resizeMode="contain"
                                    style={{
                                        position: 'absolute', height: 100, width: 100, tintColor: 'grey', opacity: 0.2, top: 10, marginLeft: 10, zIndex: 1,
                                    }}
                                />
                                <Image
                                    source={{ uri: `${imgCommon}${firstEvo.start}.png` }}
                                    style={{
                                        width: 100, height: 100,zIndex:2
                                    }}
                                    resizeMode="contain"
                                />
                                <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                                    {firstEvo.startName}
                                </Text>
                            </View>
                            <View style={{ width: screenWidth * 0.3, height: 150, justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center', }}>
                                <Image
                                    source={images.frontarrow}
                                    style={{ width: 50, height: 25, }}
                                    resizeMode="contain"
                                />
                                <Text style={{ fontSize: 15, fontWeight: 'bold', }}>
                                    Lvl. {firstEvo.levels}
                                </Text>
                            </View>
                            <View style={{ width: screenWidth * 0.3, height: 150, justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center', }}>
                                <Image
                                    source={images.pokeball}
                                    resizeMode="contain"
                                    style={{ position: 'absolute', height: 100, width: 100, tintColor: 'grey', opacity: 0.2, top: 10, marginLeft: 10, zIndex: 1, }}
                                />
                                <Image
                                    source={{ uri: `${imgCommon}${firstEvo.end}.png` }}
                                    style={{ width: 100, height: 100,zIndex:2 }}
                                    resizeMode="contain"
                                />
                                <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                                    {firstEvo.endName}
                                </Text>
                            </View>
                        </View>
                        {secondEvo ? (
                            <View style={{ flexDirection: 'row', height: 150, justifyContent: 'center', }}>
                                <View style={{ width: screenWidth * 0.3, height: 150, justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center', }}>
                                    <Image
                                        source={images.pokeball}
                                        resizeMode="contain"
                                        style={{ position: 'absolute', height: 100, width: 100, tintColor: 'grey', opacity: 0.2, top: 10, marginLeft: 10, zIndex: 1, }}
                                    />
                                    <Image
                                        source={{ uri: `${imgCommon}${secondEvo.start}.png` }}
                                        style={{ width: 100, height: 100,zIndex:2 }}
                                        resizeMode="contain"
                                    />
                                    <Text style={{ fontWeight: 'bold', fontSize: 15, }}>
                                        {secondEvo.startName}
                                    </Text>
                                </View>
                                <View style={{ width: screenWidth * 0.3, height: 150, justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center', }}>
                                    <Image
                                        source={images.frontarrow}
                                        style={{ width: 50, height: 25, }}
                                        resizeMode="contain"
                                    />
                                    <Text style={{ fontSize: 15, fontWeight: 'bold', }}>
                                        Lvl. {secondEvo.levels}
                                    </Text>
                                </View>
                                <View style={{ width: screenWidth * 0.3, height: 150, justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center', }}>
                                    <Image
                                        source={images.pokeball}
                                        resizeMode="contain"
                                        style={{ position: 'absolute', height: 100, width: 100, tintColor: 'grey', opacity: 0.2, top: 10, marginLeft: 10, zIndex: 1, }}
                                    />
                                    <Image
                                        source={{ uri: `${imgCommon}${secondEvo.end}.png` }}
                                        style={{ width: 100, height: 100,zIndex:2 }}
                                        resizeMode="contain"
                                    />
                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                                        {secondEvo.endName}
                                    </Text>
                                </View>
                            </View>
                        ) : null}
                    </View>
                )}
        </View>
    );
}

export default Evo;


