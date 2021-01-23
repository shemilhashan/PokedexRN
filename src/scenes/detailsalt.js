import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    useWindowDimensions,
    Animated,
    Dimensions,
    TouchableOpacity,
    Image,
    Easing
} from 'react-native';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import { SwipeablePanel } from 'rn-swipeable-panel';
import { getCardColor } from '../utils'
import images from '../assets/images'
import CachedImage from '../components/cacheimage'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

const initialLayout = { width: Dimensions.get('window').width };

const styles = StyleSheet.create({
    header: {
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'white'
    },
    item: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    imageWrapper: {
        position: 'absolute',
    },
    overlayImage: {
        tintColor: '#27a98a',
    },
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
        height: screenHeight * 2 / 3,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
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
        height: 27,
        paddingLeft: 10,
        paddingRight: 10
    },
    scene: {
        flex: 1,
    },
});

export default function DetailAltScreen({ navigation, route }) {

    const { id, allData, evoData, speciesData } = route.params
    const [currentId, setCurrentId] = useState(id)
    const [data, setData] = useState(null);
    const [idArr, setIdArr] = useState([])
    const [enableList, setEnableList] = useState(true)
    const { width } = useWindowDimensions();

    const scrollX = useRef(new Animated.Value(0)).current;

    const itemWidth = width * 0.65;
    const spacerWidth = (width - itemWidth) / 2;
    const refFlatList = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            refFlatList?.current?.scrollToIndex({ animated: false, index: id - 1 })
        }, 300)

        let arr = [-1]
        for (let i = 1; i < 152; i++) {
            arr.push(i)
        }
        arr.push(-1)
        setIdArr(arr)

        return () => { clearTimeout(timeout) }
    }, [refFlatList?.current]);

    //   if (data === null) {
    //     return <Text>Loading...</Text>;
    //   }

    function getItemLayout(data, index) {
        return { length: itemWidth, offset: itemWidth * index, index }
    }

    const onViewRef = useRef((viewableItems) => {
        if (viewableItems.changed[0].isViewable && viewableItems.changed[0].item >= 0) {
            setCurrentId(viewableItems.changed[0].item + 1)
        }
        else if (viewableItems.changed[0].isViewable && viewableItems.changed[0].item == -1) {
            console.log(viewableItems)
            setCurrentId(1)
        }
        // Use viewable items in state or as intended
    })
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 })

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'purple' }}
            style={{ backgroundColor: 'white' }}
            activeColor='black'
            inactiveColor='grey'
        />
    );

    const About = () => (
        <View style={[styles.scene, { backgroundColor: 'white' }]} >
            <Text>{speciesData[currentId - 1].aboutText.replace('\n', ' ')}</Text>
        </View>
    );

    const Stats = () => (
        <View style={[styles.scene, { backgroundColor: 'white' }]} ></View>
    );

    const Evolution = () => (
        <View style={[styles.scene, { backgroundColor: 'white' }]} >
            <Text>{speciesData[currentId - 1].evoID}</Text>
        </View>
    );

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'about', title: 'About' },
        { key: 'stats', title: 'Stats' },
        { key: 'evolution', title: 'Evolution' }
    ]);

    const renderScene = SceneMap({
        about: About,
        stats: Stats,
        evolution: Evolution
    });

    function Expanded() {
        setEnableList(!enableList)
    }

    function topContent() {
        if (enableList) {
            return (
                <Animated.View style={{ position: 'absolute', width: screenWidth, height: 200, backgroundColor: 'transparent', zIndex: 10, flexDirection: 'column' }}>

                    <View style={{ flex: 1, flexDirection: 'column', marginBottom: 0 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}></View>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 0 }}>
                            <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <TouchableOpacity style={{ width: 60, height: '100%', justifyContent: 'center' }} onPress={() => { navigation.goBack() }}>
                                    <Image source={images.backarrow} style={{ width: 40, height: 20, tintColor: 'white', marginLeft: 20 }} resizeMode='contain'></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 3, alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <View style={[styles.header, { height: '100%', justifyContent: 'center' }]}>
                                    <Text style={styles.title}>{allData[currentId - 1].name}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignContent: 'flex-end', justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'transparent' }}>
                                <TouchableOpacity style={{ width: 60, height: '100%', justifyContent: 'center' }} onPress={() => { navigation.goBack() }}>
                                    <Image source={images.heartline} style={{ width: 30, height: 30, backgroundColor: 'transparent', tintColor: 'white', marginRight: 20 }} resizeMode='contain'></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'column' }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 0 }}>
                            <View style={{ flex: 3, alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <View style={[styles.header, { height: '100%', justifyContent: 'center' }]}>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignContent: 'flex-end', justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'transparent' }}>
                                <View style={[styles.header, { height: '100%', justifyContent: 'center' }]}>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 15 }}>
                        </View>
                    </View>
                </Animated.View>
            );
        }
        else {
            return (
                <Animated.View style={{ position: 'absolute', width: screenWidth, height: 200, backgroundColor: 'transparent', zIndex: 10, flexDirection: 'column' }}>

                    <View style={{ flex: 1, flexDirection: 'column', marginBottom: 0 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}></View>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 0 }}>
                            <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <TouchableOpacity style={{ width: 60, height: '100%', justifyContent: 'center' }} onPress={() => { navigation.goBack() }}>
                                    <Image source={images.backarrow} style={{ width: 40, height: 20, tintColor: 'white', marginLeft: 20 }} resizeMode='contain'></Image>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, alignContent: 'flex-end', justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'transparent' }}>
                                <TouchableOpacity style={{ width: 60, height: '100%', justifyContent: 'center' }} onPress={() => { navigation.goBack() }}>
                                    <Image source={images.heartline} style={{ width: 30, height: 30, backgroundColor: 'transparent', tintColor: 'white', marginRight: 20 }} resizeMode='contain'></Image>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'column' }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 0 }}>
                            <View style={{ flex: 3, alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                <View style={[styles.header, { height: '100%', justifyContent: 'center' }]}>
                                    <Text style={styles.title}>{allData[currentId - 1].name}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignContent: 'flex-end', justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'transparent' }}>
                                <View style={[styles.header, { height: '100%', justifyContent: 'center' }]}>
                                    <Text style={[styles.title, { fontSize: 20 }]}>#{currentId < 10 ? `00${currentId}` : currentId < 100 ? `0${currentId}` : `${currentId}`}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 15 }}>
                            <Text style={styles.type}>{allData[currentId - 1].types[0].name}</Text>
                            {allData[currentId - 1].types.length > 1 ? <Text style={styles.type}>{allData[currentId - 1].types[1].name}</Text> : null}
                        </View>
                    </View>
                </Animated.View>
            );
        }
    }

    function bottomContent() {
        return (
            <View style={{ zIndex: 100, width: screenWidth, height: 300, backgroundColor: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40, top: 450, position: 'absolute' }}>
                <SwipeablePanel onExpanded={Expanded} horizontal={false} noBar fullWidth={true} openLarge={false} showCloseButton={false} onClose={() => { }} onPressCloseButton={() => { }} isActive={true} noBackgroundOpacity={true}>
                    <View style={[styles.detailsBox, { borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: 'white' }]}>
                        <TabView
                            navigationState={{ index, routes }}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={initialLayout}
                            renderTabBar={renderTabBar}
                            activeColor='black'
                            inactiveColor='grey'
                            style={{ backgroundColor: 'white' }}
                        />
                    </View>
                </SwipeablePanel>
            </View>
        )
    }

    return (
        <View style={{ width: screenWidth, height: screenHeight }}>
            {topContent()}
            {bottomContent()}
            <View style={{ zIndex: 1, width: screenWidth, height: screenHeight, backgroundColor: getCardColor(allData[currentId - 1].types[0].name) }}>
                <View style={{ width: screenWidth, height: 200 }}></View>
                <Animated.FlatList
                    scrollEnabled={!enableList}
                    ref={refFlatList}
                    getItemLayout={getItemLayout}
                    onViewableItemsChanged={onViewRef.current}
                    viewabilityConfig={viewConfigRef.current}
                    horizontal
                    data={idArr}
                    snapToInterval={itemWidth}
                    decelerationRate={0}
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: true },
                    )}
                    scrollEventThrottle={16}
                    keyExtractor={(item, index) => (item + index).toString()}
                    renderItem={({ item, index }) => {
                        if (item === -1) {
                            return <View style={{ width: spacerWidth }} />;
                        }
                        const inputRange = [
                            (index - 2) * itemWidth,
                            (index - 1) * itemWidth,
                            index * itemWidth,
                        ];
                        const scale = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.65, 1, 0.65],
                        });
                        const overlayOpacity = scrollX.interpolate({
                            inputRange,
                            outputRange: [0.9, 0, 0.9],
                        });
                        return (
                            <Animated.View style={[styles.item, { transform: [{ scale }] }]}>
                                <View style={styles.imageWrapper}>
                                    <CachedImage
                                        showSpin={true}
                                        uri={allData[item - 1].imgUrl}
                                        resizeMethod="auto"
                                        resizeMode="contain"
                                        style={{ width: itemWidth, height: itemWidth }}
                                    />
                                </View>
                                <CachedImage
                                    showSpin={true}
                                    uri={allData[item - 1].imgUrl}
                                    resizeMethod="auto"
                                    resizeMode="contain"
                                    style={[
                                        styles.overlayImage,
                                        {
                                            width: itemWidth,
                                            height: itemWidth,
                                            opacity: overlayOpacity,
                                        },
                                    ]}
                                />
                            </Animated.View>
                        );
                    }}
                />
                <View style={{ width: screenWidth, height: 300, marginTop: 10, backgroundColor: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                </View>
            </View>
        </View>
    );
}
