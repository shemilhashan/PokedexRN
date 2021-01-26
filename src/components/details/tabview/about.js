import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import images from '../../../assets/images';
const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    tile: {
        marginTop: 20,
        marginBottom: 10,
        width: '90%',
        height: 100,
        borderRadius: 20,
        marginRight: '5%',
        marginLeft: '5%',
        shadowColor: 'rgba(0,0,0, .4)', // IOS
        shadowOffset: { height: 0, width: 1 }, // IOS
        shadowOpacity: 1, // IOS
        shadowRadius: 1, //IOS
        elevation: 4, // Android,
        overflow: 'hidden',
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
    },
});
function About(props) {
    function getHeightConversions(height) {
        let ft = Math.floor(height / 3).toFixed(0);
        let inches = (((height * 10) % 30) / 2.5).toFixed(2);
        return `${ft}' ${inches}" (${height * 10} cm)`;
    }
    function getWeightConversions(weight) {
        let kg = (weight * 0.45).toFixed(2);
        return `${weight} lbs (${kg} kg)`;
    }

    function getEggTypes(eggArr) {
        var eggStr = '';
        for (let i = 0; i < eggArr.length - 1; i++) {
            eggStr = eggStr + eggArr[i].name.capitalize() + ', ';
        }
        eggStr = eggStr + eggArr[eggArr.length - 1].name.capitalize();
        return eggStr;
    }

    function getMale(ratio) {
        return ((ratio * 100) / (ratio + 1)).toFixed(2);
    }
    function getFemale(ratio) {
        return (100 / (ratio + 1)).toFixed(2);
    }
    const { allData, speciesData, currentId } = props
    return (
        <View style={[styles.scene, { backgroundColor: 'white', }]}>
            <Text style={{ fontSize: 15, paddingLeft: 20, paddingRight: 20, marginTop: 30, fontWeight: '600', lineHeight: 30, }}>
                {speciesData[currentId - 1].aboutText.replace('\n', ' ')}
            </Text>
            <View style={styles.tile}>
                <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 20, }}>
                    <View style={{ flex: 1, }} />
                    <View style={{ flex: 2, justifyContent: 'center', }}>
                        <Text style={{ textAlign: 'left', color: 'grey', }}>
                            Height
            </Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center', }}>
                        <Text style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 15, }}>
                            {getHeightConversions(allData[currentId - 1].height)}
                        </Text>
                    </View>
                    <View style={{ flex: 1, }} />
                </View>
                <View style={{ flex: 1, flexDirection: 'column', }}>
                    <View style={{ flex: 1, }} />
                    <View style={{ flex: 2, justifyContent: 'center', }}>
                        <Text style={{ textAlign: 'left', color: 'grey', }}>
                            Weight
            </Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center', }}>
                        <Text style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 15, }}>
                            {getWeightConversions(allData[currentId - 1].weight)}
                        </Text>
                    </View>
                    <View style={{ flex: 1, }} />
                </View>
            </View>
            <View style={{ paddingLeft: 20, marginTop: 20, }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 15, }}>
                    Breeding
        </Text>
                <View style={{ flexDirection: 'row', marginBottom: 20, }}>
                    <Text style={{ color: 'grey', marginRight: 20, fontSize: 15, width: 70, }}>
                        Gender
          </Text>
                    <View style={{ flexDirection: 'row', flex: 1, }}>
                        <View style={{ flexDirection: 'row', width: 100, justifyContent: 'flex-start', }}>
                            <Image
                                source={images.male}
                                style={{ width: 20, height: 20, marginRight: 5 }}
                                resizeMode="contain"
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                                {getMale(speciesData[currentId - 1].gender_rate)}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: 100, justifyContent: 'flex-start', }}>
                            <Image
                                source={images.female}
                                style={{ width: 20, height: 20, marginRight: 5 }}
                                resizeMode="contain"
                            />
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                                {getFemale(speciesData[currentId - 1].gender_rate)}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', }}>
                    <Text style={{ color: 'grey', marginRight: 20, fontSize: 15, width: 70, }}>
                        Egg Type
          </Text>
                    <Text style={{ flex: 1, justifyContent: 'flex-start', fontWeight: 'bold', fontSize: 15, }}>
                        {getEggTypes(speciesData[currentId - 1].egg_groups)}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default About;


