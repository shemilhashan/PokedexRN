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
import { getCardColor } from '../utils'
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
    slide: {
        height: screenHeight,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 0
    },
    caseTitle: {
        height: 30,
        color: 'black',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14
    },
    detailsBox: {
        width: screenWidth,
        height: screenHeight / 2,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
});


export default function DetailsScreen({ navigation, route }) {
    const { id,item,allData } = route.params
    const refFlatList = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            refFlatList?.current?.snapToItem(id-1)
          }, 60)
        return () => clearTimeout(timeout)
    }, [refFlatList?.current]);

    function renderItem({ item, index }) {
        return (
            <View style={[styles.slide,{backgroundColor: getCardColor(item.types[0].name)}]}>
                <Text style={styles.caseTitle}>{item.name}</Text>
                <View style={styles.detailsBox}>
                    <Image source={{ uri: item&&item.imgUrl?item.imgUrl:'' }} style={{ width: 200, height: 200 }} resizeMode='stretch' PlaceholderContent={<ActivityIndicator />}></Image>
                </View>
                <View style={[styles.detailsBox,{borderTopLeftRadius:30,borderTopRightRadius:30,backgroundColor:'white'}]}>

                    <Text style={styles.caseTitle}>Weight: {item&&item.weight?item.weight:0}</Text>
                </View>
                
            </View>
        );
    }

    return (
        <View>
            <Carousel
                data={allData}
                renderItem={renderItem}
                sliderWidth={screenWidth}
                itemWidth={screenWidth}
                inactiveSlideShift={0}
                layout={'default'}
                inactiveSlideScale={1.0}
                layoutCardOffset={0}
                ref={refFlatList}
                keyExtractor={(item, index) => item.name}
            />
        </View>
    );
}
