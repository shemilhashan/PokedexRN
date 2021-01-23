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
import CarouselItem from '../components/carouselitem'
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


export default function DetailsScreen({ navigation, route }) {
    const { id, item, allData } = route.params
    const refFlatList = useRef(null);
    const [temp, setTemp] = useState(0)

    useEffect(() => {
        const timeout = setTimeout(() => {
            refFlatList?.current?.snapToItem(id-1)
            setTemp(temp+1)
        }, 1000)
        // for(let i=0; i < id; i++){
        //     refFlatList?.current?.snapToNext()
        // }
        
        return () => {clearTimeout(timeout)}
    }, []);

    function renderItem({ item, index }) {
        return (
            <CarouselItem item={item}></CarouselItem>
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
