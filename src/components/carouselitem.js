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
import CachedImage from './cacheimage'
import { SwipeablePanel } from 'rn-swipeable-panel';
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
        height: screenHeight / 3,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
});


export default function CarouselItem(props) {
    const {item} = props
    return (
        <View style={[styles.slide, { backgroundColor: getCardColor(item.types[0].name) }]}>
            <Text style={styles.caseTitle}>{item.name}</Text>
            <View style={styles.detailsBox}>
                <CachedImage uri={item.imgUrl} style={{ width: 200, height: 200 }} resizeMode='stretch'></CachedImage>
            </View>
            <SwipeablePanel fullWidth={true} openLarge={false} showCloseButton={false} onClose={() => { }} onPressCloseButton={() => { }} isActive={true} noBackgroundOpacity={true}>
                <View style={[styles.detailsBox, { borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: 'white' }]}>

                    <Text style={styles.caseTitle}>Weight: {item && item.weight ? item.weight : 0}</Text>
                </View>
            </SwipeablePanel>


        </View>
    );
}
