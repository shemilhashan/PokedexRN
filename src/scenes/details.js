import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    useWindowDimensions,
    Animated,
    Dimensions
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { ActivityIndicator } from 'react-native';
import { Image } from 'react-native-elements';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    slide: {
        height: screenHeight,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 25
    },
    caseTitle: {
        height: 30,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14
    },
    detailsBox: {
        width: screenWidth * 2 / 3,
        height: screenHeight / 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
});


export default function DetailsScreen({ navigation, route }) {
    const { item, allData } = route.params
    const [id, setId] = useState(route.params.id);
    const [idUrl, setIdUrl] = useState(item.url);
    const [name, setName] = useState(item.name);
    const [data, setData] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true)
    const refFlatList = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            refFlatList?.current?.snapToItem(id-1)
          }, 60)
        if (idUrl && !allData[id-1].data) {
            fetch(idUrl)
                .then((response) => {
                    response.json().then((result)=>{
                            // console.log('poke data: ',result)
                            let data = { weight: result.weight,imageUrl: result.sprites.other['official-artwork']['front_default']}
                            var currentData = allData[id-1]
                            currentData['data'] = data
                            allData[id-1] = currentData

                        }
                    );
                })
                .catch((error) => {
                    console.log('Error', error);
                });
        }
        if (idUrl && id <= allData.length-1 && !allData[id].data) {
            fetch(allData[id].url)
                .then((response) => {
                    response.json().then((result)=>{
                            // console.log('poke data: ',result)
                            let data = { weight: result.weight,imageUrl: result.sprites.other['official-artwork']['front_default']}
                            var currentData = allData[id]
                            currentData['data'] = data
                            allData[id] = currentData

                        }
                    );
                })
                .catch((error) => {
                    console.log('Error', error);
                });
        }
        if (idUrl && id-2>=0 && !allData[id-2].data) {
            fetch(allData[id-2].url)
                .then((response) => {
                    response.json().then((result)=>{
                            // console.log('poke data: ',result)
                            let data = { weight: result.weight,imageUrl: result.sprites.other['official-artwork']['front_default']}
                            var currentData = allData[id-2]
                            currentData['data'] = data
                            allData[id-2] = currentData

                        }
                    );
                })
                .catch((error) => {
                    console.log('Error', error);
                });
        }
        return () => clearTimeout(timeout)
    }, [refFlatList?.current,id]);

    if (data === null) {
        return <Text>Loading...</Text>;
    }
// /uri: data&&data.sprites&&data.sprites.other['official-artwork']['front_default']?data.sprites.other['official-artwork']['front_default']:'https://pokeres.bastionbot.org/images/pokemon/1.png',
    function renderItem({ item, index }) {
        // console.log('item: ',item)
        return (
            <View style={styles.slide}>
                <Text style={styles.caseTitle}>{item.name.capitalize()}</Text>
                <View style={styles.detailsBox}>
                    <Image source={{ uri: item.data&&item.data.imageUrl?item.data.imageUrl:'' }} style={{ width: 200, height: 200 }} resizeMode='stretch' PlaceholderContent={<ActivityIndicator />}></Image>
                </View>
                <Text style={styles.caseTitle}>Weight: {item.data&&item.data.weight?item.data.weight:0}</Text>
            </View>
        );
    }

    function onSnapToItem(index) {
        console.log('index: ', index)
        setId(index+1)
        setIdUrl(allData[index].url)
        setName(allData[index].name)
    }


    return (
        <View>

            <Carousel
                data={allData}
                renderItem={renderItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth * 2 / 3}
                inactiveSlideShift={0}
                layout={'default'}
                inactiveSlideScale={0.5}
                layoutCardOffset={10}
                onSnapToItem={onSnapToItem}
                ref={refFlatList}
                keyExtractor={(item, index) => item.name}
            />
        </View>
    );
}
