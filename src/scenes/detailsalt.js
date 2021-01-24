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
        height: screenHeight * 0.80,
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
        backgroundColor: '#fff',
        elevation: 4, // Android,
        overflow: 'hidden',
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'row'
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

    function getHeightConversions(height) {
        let ft = (Math.floor(height / 3)).toFixed(0)
        let inches = (((height * 10) % 30) / 2.5).toFixed(2)
        return `${ft}' ${inches}" (${height * 10} cm)`
    }
    function getWeightConversions(weight) {
        let kg = (weight * 0.45).toFixed(2)
        return `${weight} lbs (${kg} kg)`
    }

    function getEggTypes(eggArr) {
        var eggStr = ''
        for (let i = 0; i < eggArr.length - 1; i++) {
            eggStr = eggStr + eggArr[i].name.capitalize() + ', '
        }
        eggStr = eggStr + eggArr[eggArr.length - 1].name.capitalize()
        return eggStr
    }

    function getMale(ratio) {
        return (ratio * 100 / (ratio + 1)).toFixed(2)
    }
    function getFemale(ratio) {
        return (100 / (ratio + 1)).toFixed(2)
    }

    const About = () => (
        <View style={[styles.scene, { backgroundColor: 'white' }]} >
            <Text style={{ fontSize: 15, paddingLeft: 20, paddingRight: 20, marginTop: 30, fontWeight: '700', lineHeight: 30 }}>{speciesData[currentId - 1].aboutText.replace('\n', ' ')}</Text>
            <View style={styles.tile}>
                <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 20 }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'left', color: 'grey' }}>Height</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 15 }}>{getHeightConversions(allData[currentId - 1].height)}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1 }}></View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'left', color: 'grey' }}>Weight</Text>
                    </View>
                    <View style={{ flex: 2, justifyContent: 'center' }}>
                        <Text style={{ textAlign: 'left', fontWeight: 'bold', fontSize: 15 }}>{getWeightConversions(allData[currentId - 1].weight)}</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </View>
            <View style={{ paddingLeft: 20, marginTop: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 17, marginBottom: 15 }}>Breeding</Text>
                <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                    <Text style={{ color: 'grey', marginRight: 20, fontSize: 15, width: 70 }}>Gender</Text>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flexDirection: 'row', width: 100, justifyContent: 'flex-start' }}>
                            <Image source={images.male} style={{ width: 20, height: 20, marginRight: 5 }} resizeMode='contain'></Image>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{getMale(speciesData[currentId - 1].gender_rate)}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: 100, justifyContent: 'flex-start' }}>
                            <Image source={images.female} style={{ width: 20, height: 20, marginRight: 5 }} resizeMode='contain'></Image>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{getFemale(speciesData[currentId - 1].gender_rate)}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ color: 'grey', marginRight: 20, fontSize: 15, width: 70 }}>Egg Type</Text>
                    <Text style={{ flex: 1, justifyContent: 'flex-start', fontWeight: 'bold', fontSize: 15 }}>{getEggTypes(speciesData[currentId - 1].egg_groups)}</Text>
                </View>
            </View>
        </View>
    );

    function Stats() {
        let dataLoaded = allData[currentId - 1]
        let speciesLoaded = speciesData[currentId - 1]
        const baseList = dataLoaded.stats.map((stat) => {
            return (
                <View style={{flexDirection:'row',paddingLeft:20,marginTop:5,marginBottom:5}}>
                    <Text style={{flex:4,textAlign:'left',fontWeight:'bold',marginRight:5,color:'grey'}}>{stat.name}</Text>
                    <Text style={{flex:1,textAlign:'left',fontWeight:'bold',marginRight:5,color:'grey'}}>{stat.value}</Text>
                    <View style={{flex:8,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                        {getProgress(stat.value,100)}
                    </View>
                    <View style={{width:20}}></View>
                </View>
            )
        })

        function otherStat(name,value){
            return (<View style={{flexDirection:'row',paddingLeft:20,marginTop:5,marginBottom:5}}>
                    <Text style={{flex:4,textAlign:'left',fontWeight:'bold',marginRight:5,color:'grey'}}>{name}</Text>
                    <Text style={{flex:9,textAlign:'left',fontWeight:'bold',marginRight:5,color:'grey'}}>{value}</Text>
                    <View style={{width:20}}></View>
                </View>)
        }

        function total(){
            let statArr = dataLoaded.stats
            var totalToDivide = 0
            var total = 0

            for (let i=0;i<statArr.length;i++){
                totalToDivide += 100
                total += statArr[i].value
            }

            return (
                <View style={{flexDirection:'row',paddingLeft:20,marginTop:5,marginBottom:5}}>
                    <Text style={{flex:4,textAlign:'left',fontWeight:'bold',marginRight:5,color:'grey'}}>Total</Text>
                    <Text style={{flex:1,textAlign:'left',fontWeight:'bold',marginRight:5,color:'grey'}}>{total}</Text>
                    <View style={{flex:8,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                        {getProgress(total,totalToDivide)}
                    </View>
                    <View style={{width:20}}></View>
                </View>
            )
        }

        return (
            <View style={[styles.scene, { backgroundColor: 'white' }]} >
                <Text style={{paddingLeft:20,marginBottom:10,marginTop:20,fontWeight:'bold',fontSize:17}}>Base Stats</Text>
                {baseList}
                {total()}
                <Text style={{paddingLeft:20,marginBottom:10,marginTop:20,fontWeight:'bold',fontSize:17}}>Other Stats</Text>
                {otherStat('Experience',dataLoaded.base_experience)}
                {otherStat('Happiness',speciesLoaded.base_happiness)}
                {otherStat('Capture Rate',speciesLoaded.capture_rate)}
                {otherStat('Generation',speciesLoaded.generation.capitalize())}
                {otherStat('Growth Rate',speciesLoaded.growth_rate.capitalize())}
                {otherStat('Habitat',speciesLoaded.habitat.capitalize())}
            </View>
        )

    }

    const imgCommon = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/"

    function getProgress(stat,total) {
        return (
            <View style={{width:'100%',height:4,flexDirection:'row',borderRadius:2,overflow:'hidden'}}>
                <View style={{flex:stat,height:4,backgroundColor:(stat/total >= 0.5)?'green':'red'}}></View>
                <View style={{flex:(total-stat),height:4,backgroundColor:'grey'}}></View>
            </View>
        )
    }

    function Evolution() {
        let evoArr = evoData[speciesData[currentId - 1].evoID]
        let firstEvo = evoArr.length > 0 ? evoArr[0] : false
        let secondEvo = evoArr.length > 1 ? evoArr[1] : false
        let currentData = allData[currentId - 1]
        return (
            <View style={[styles.scene, { backgroundColor: 'white', flexDirection: 'column' }]} >
                <Text style={{ paddingLeft: 20, marginTop: 20, marginBottom: 0, color: 'black', fontWeight: 'bold', fontSize: 17 }}>Evolution Chain</Text>
                {
                    !firstEvo ?
                        <View style={{ width: screenWidth, height: 150, justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                            <Image source={images.pokeball} resizeMode='contain' style={{ position: 'absolute', height: 100, width: 100, tintColor: 'grey', opacity: 0.2, top: 10, marginLeft: 10, zIndex: 1 }}></Image>
                            <Image source={{ uri: `${imgCommon}${currentId}.png` }} style={{ width: 100, height: 100 }} resizeMode='contain'></Image>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{currentData.name}</Text>
                        </View>
                        :
                        <View style={{ width: screenWidth, height: 300, flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'row', height: 150, justifyContent: 'center' }}>
                                <View style={{ width: screenWidth * 0.3, height: 150, justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                                    <Image source={images.pokeball} resizeMode='contain' style={{ position: 'absolute', height: 100, width: 100, tintColor: 'grey', opacity: 0.2, top: 10, marginLeft: 10, zIndex: 1 }}></Image>
                                    <Image source={{ uri: `${imgCommon}${firstEvo.start}.png` }} style={{ width: 100, height: 100 }} resizeMode='contain'></Image>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{firstEvo.startName}</Text>
                                </View>
                                <View style={{ width: screenWidth * 0.3, height: 150, justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                                    <Image source={images.frontarrow} style={{ width: 50, height: 25 }} resizeMode='contain'></Image>
                                    <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Lvl. {firstEvo.levels}</Text>
                                </View>
                                <View style={{ width: screenWidth * 0.3, height: 150, justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                                    <Image source={images.pokeball} resizeMode='contain' style={{ position: 'absolute', height: 100, width: 100, tintColor: 'grey', opacity: 0.2, top: 10, marginLeft: 10, zIndex: 1 }}></Image>
                                    <Image source={{ uri: `${imgCommon}${firstEvo.end}.png` }} style={{ width: 100, height: 100 }} resizeMode='contain'></Image>
                                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{firstEvo.endName}</Text>
                                </View>
                            </View>
                            {
                                secondEvo ?
                                    <View style={{ flexDirection: 'row', height: 150, justifyContent: 'center' }}>
                                        <View style={{ width: screenWidth * 0.3, height: 150, justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                                            <Image source={images.pokeball} resizeMode='contain' style={{ position: 'absolute', height: 100, width: 100, tintColor: 'grey', opacity: 0.2, top: 10, marginLeft: 10, zIndex: 1 }}></Image>
                                            <Image source={{ uri: `${imgCommon}${secondEvo.start}.png` }} style={{ width: 100, height: 100 }} resizeMode='contain'></Image>
                                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{secondEvo.startName}</Text>
                                        </View>
                                        <View style={{ width: screenWidth * 0.3, height: 150, justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                                            <Image source={images.frontarrow} style={{ width: 50, height: 25 }} resizeMode='contain'></Image>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>Lvl. {secondEvo.levels}</Text>
                                        </View>
                                        <View style={{ width: screenWidth * 0.3, height: 150, justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center' }}>
                                            <Image source={images.pokeball} resizeMode='contain' style={{ position: 'absolute', height: 100, width: 100, tintColor: 'grey', opacity: 0.2, top: 10, marginLeft: 10, zIndex: 1 }}></Image>
                                            <Image source={{ uri: `${imgCommon}${secondEvo.end}.png` }} style={{ width: 100, height: 100 }} resizeMode='contain'></Image>
                                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{secondEvo.endName}</Text>
                                        </View>
                                    </View> : null
                            }
                        </View>
                }
            </View>
        )
    }

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
                            <View style={{ flex: 4, alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
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
