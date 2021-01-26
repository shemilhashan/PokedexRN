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
  Easing,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
import { SwipeablePanel } from 'rn-swipeable-panel';
import { getCardColor } from '../utils';
import images from '../assets/images';
import CachedImage from '../components/cacheimage';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import About from '../components/details/tabview/about'
import Stats from '../components/details/tabview/stats'
const initialLayout = { width: Dimensions.get('window').width };

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
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
    marginTop: 0,
  },
  caseTitle: {
    height: 30,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  detailsBox: {
    width: screenWidth,
    height: screenHeight * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
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
    paddingRight: 10,
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
    elevation: 4, // Android,
    overflow: 'hidden',
    justifyContent: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
});

export default function DetailAltScreen({ navigation, route }) {
  const { id, allData, evoData, speciesData } = route.params;
  const [currentId, setCurrentId] = useState(id);
  const [idArr, setIdArr] = useState([]);
  const [enableList, setEnableList] = useState(true);
  const { width } = useWindowDimensions();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [likedData, setLikedData] = useState(route.params.likedData);
  const itemWidth = width * 0.65;
  const spacerWidth = (width - itemWidth) / 2;
  const refFlatList = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      refFlatList?.current?.scrollToIndex({ animated: false, index: id - 1 });
    }, 300);

    let arr = [-1];
    for (let i = 1; i < 152; i++) {
      arr.push(i);
    }
    arr.push(-1);
    setIdArr(arr);
    return () => {
      clearTimeout(timeout);
    };
  }, [refFlatList?.current]);

  //   if (data === null) {
  //     return <Text>Loading...</Text>;
  //   }

  function getItemLayout(data, index) {
    return { length: itemWidth, offset: itemWidth * index, index };
  }

  const onViewRef = useRef((viewableItems) => {
    if (
      viewableItems.changed.length >= 2 &&
      viewableItems.changed[0].isViewable &&
      viewableItems.changed[0].item >= 0
    ) {
      // console.log('viewableItems.changed[0].item + 1: ',viewableItems.changed[0].item + 1)
      setCurrentId(viewableItems.changed[0].item + 1);
    } else if (
      viewableItems.changed.length >= 2 &&
      viewableItems.changed[0].isViewable &&
      viewableItems.changed[0].item === -1
    ) {
      // console.log('viewableItems.changed[0].item: ',viewableItems.changed[0].item)
      setCurrentId(1);
    }
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      // eslint-disable-next-line react-native/no-inline-styles
      indicatorStyle={{
        backgroundColor: 'purple',
      }}
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        backgroundColor: 'white',
      }}
      activeColor="black"
      inactiveColor="grey"
    />
  );

  const AboutTab = () => (
    <About allData={allData} speciesData={speciesData} currentId={currentId}></About>
  );

  const StatsTab = () => (
    <Stats allData={allData} speciesData={speciesData} currentId={currentId}></Stats>
  )

  const imgCommon =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

  

  function Evolution() {
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
              style={{ width: 100, height: 100, }}
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
                      width: 100, height: 100,
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
                    style={{ width: 100, height: 100, }}
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
                      style={{ width: 100, height: 100, }}
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
                      style={{ width: 100, height: 100 }}
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

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'about', title: 'About' },
    { key: 'stats', title: 'Stats' },
    { key: 'evolution', title: 'Evolution' },
  ]);

  const renderScene = SceneMap({
    about: AboutTab,
    stats: StatsTab,
    evolution: Evolution,
  });

  function Expanded() {
    setEnableList(!enableList);
  }



  function topContent() {
    function likeButton() {
      function getLikedPokemon() {
        if (likedData.includes(currentId)) {
          return true;
        } else {
          return false;
        }
      }

      function likePokemon() {
        if (likedData.includes(currentId)) {
          let liked = likedData
          const indexLiked = liked.indexOf(currentId);
          if (indexLiked > -1) {
            liked.splice(indexLiked, 1);
          }
          setLikedData([...liked]);
        } else {
          let liked = likedData;
          liked.push(currentId);
          setLikedData([...liked]);
        }
      }

      // useEffect(() => {
      //   console.log('likedData: ', likedData)
      // }, [likedData.length])
      return (
        <View style={{ flex: 1, alignContent: 'flex-end', justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'transparent', }}>
          <TouchableOpacity
            style={{ width: 60, height: '100%', justifyContent: 'center' }}
            onPress={() => {
              likePokemon();
            }}>
            {getLikedPokemon() ? <Image
              source={images.heart}
              style={[{ width: 30, height: 30, backgroundColor: 'transparent', marginRight: 20, tintColor: 'red' }]}
              resizeMode="contain"
            /> :
              <Image
                source={images.heartline}
                style={[{ width: 30, height: 30, backgroundColor: 'transparent', marginRight: 20, tintColor: 'white' }]}
                resizeMode="contain"
              />}
          </TouchableOpacity>
        </View>
      )
    }

    if (enableList) {
      return (
        <Animated.View style={{ position: 'absolute', width: screenWidth, height: 200, backgroundColor: 'transparent', zIndex: 10, flexDirection: 'column', }}>
          <View style={{ flex: 1, flexDirection: 'column', marginBottom: 0 }}>
            <View style={{ flex: 1, flexDirection: 'row' }} />
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 0 }}>
              <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                <TouchableOpacity
                  style={{ width: 60, height: '100%', justifyContent: 'center' }}
                  onPress={async () => {
                    try {
                      const likedDataStore = await JSON.stringify({data: likedData});
                      await AsyncStorage.setItem('likedData', likedDataStore);
                    } catch (error) {
                      // Error retrieving data
                      console.log(error.message);
                    }
                    navigation.goBack();
                  }}>
                  <Image
                    source={images.backarrow}
                    style={{ width: 40, height: 20, tintColor: 'white', marginLeft: 20, }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flex: 4, alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                <View style={[styles.header, { height: '100%', justifyContent: 'center' },]}>
                  <Text style={styles.title}>
                    {allData[currentId - 1].name}
                  </Text>
                </View>
              </View>
              {likeButton()}
            </View>
          </View>
          <View style={{ flex: 2, flexDirection: 'column' }}>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 0 }}>
              <View style={{ flex: 3, alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                <View style={[styles.header, { height: '100%', justifyContent: 'center' },]}
                />
              </View>
              <View style={{ flex: 1, alignContent: 'flex-end', justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'transparent', }}>
                <View style={[styles.header, { height: '100%', justifyContent: 'center' },]}
                />
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 15 }} />
          </View>
        </Animated.View>
      );
    } else {
      return (
        <Animated.View style={{ position: 'absolute', width: screenWidth, height: 200, backgroundColor: 'transparent', zIndex: 10, flexDirection: 'column', }}>
          <View style={{ flex: 1, flexDirection: 'column', marginBottom: 0 }}>
            <View style={{ flex: 1, flexDirection: 'row' }} />
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 0 }}>
              <View style={{ flex: 1, alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                <TouchableOpacity
                  style={{ width: 60, height: '100%', justifyContent: 'center' }}
                  onPress={async () => {
                    try {
                      const likedDataStore = await JSON.stringify({data: likedData});
                      await AsyncStorage.setItem('likedData', likedDataStore);
                    } catch (error) {
                      // Error retrieving data
                      console.log(error.message);
                    }
                    navigation.goBack();
                  }}>
                  <Image
                    source={images.backarrow}
                    style={{ width: 40, height: 20, tintColor: 'white', marginLeft: 20, }}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              {likeButton()}
            </View>
          </View>
          <View style={{ flex: 2, flexDirection: 'column' }}>
            <View style={{ flex: 1, flexDirection: 'row', marginTop: 0 }}>
              <View style={{ flex: 3, alignContent: 'flex-start', justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                <View style={[styles.header, { height: '100%', justifyContent: 'center' },]}>
                  <Text style={styles.title}>
                    {allData[currentId - 1].name}
                  </Text>
                </View>
              </View>
              <View style={{ flex: 1, alignContent: 'flex-end', justifyContent: 'flex-end', alignItems: 'flex-end', backgroundColor: 'transparent', }}>
                <View style={[styles.header, { height: '100%', justifyContent: 'center' },]}>
                  <Text style={[styles.title, { fontSize: 20 }]}>
                    #{currentId < 10 ? `00${currentId}` : currentId < 100 ? `0${currentId}` : `${currentId}`}
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', paddingLeft: 15 }}>
              <Text style={styles.type}>
                {allData[currentId - 1].types[0].name}
              </Text>
              {allData[currentId - 1].types.length > 1 ? (
                <Text style={styles.type}>
                  {allData[currentId - 1].types[1].name}
                </Text>
              ) : null}
            </View>
          </View>
        </Animated.View>
      );
    }
  }

  function bottomContent() {
    return (
      <View style={{ zIndex: 100, width: screenWidth, height: 300, backgroundColor: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40, top: 450, position: 'absolute', }}>
        <SwipeablePanel
          onExpanded={Expanded}
          horizontal={false}
          noBar
          fullWidth={true}
          openLarge={false}
          showCloseButton={false}
          onClose={() => { }}
          onPressCloseButton={() => { }}
          isActive={true}
          noBackgroundOpacity={true}>
          <View style={[styles.detailsBox, { borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: 'white', },]}>
            <TabView
              navigationState={{ index, routes }}
              renderScene={renderScene}
              onIndexChange={setIndex}
              initialLayout={initialLayout}
              renderTabBar={renderTabBar}
              activeColor="black"
              inactiveColor="grey"
              style={{ backgroundColor: 'white' }}
            />
          </View>
        </SwipeablePanel>
      </View>
    );
  }

  const spinValue = new Animated.Value(0);

  Animated.loop(
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  // Next, interpolate beginning and end values (in this case 0 and 1)
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ width: screenWidth, height: screenHeight }}>
      {topContent()}
      {bottomContent()}
      <View style={{ zIndex: 1, width: screenWidth, height: screenHeight, backgroundColor: getCardColor(allData[currentId - 1].types[0].name), }}>
        <Animated.Image
          style={[
            { transform: [{ rotate: spin }] },
            { zIndex: 0, width: screenWidth * 0.44, height: screenWidth * 0.44, position: 'absolute', tintColor: 'white', opacity: 0.3, top: '28%', left: '28%', },
          ]}
          source={images.pokeball}
        />
        <View style={{ width: screenWidth, height: 200 }} />
        <Animated.FlatList
          style={{ zIndex: 1 }}
          // initialScrollIndex={id-1}
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
                    uri={`${imgCommon}${currentId}.png`}
                    resizeMethod="auto"
                    resizeMode="contain"
                    style={{ width: itemWidth, height: itemWidth }}
                  />
                </View>
                <CachedImage
                  uri={`${imgCommon}${currentId}.png`}
                  resizeMethod="auto"
                  resizeMode="contain"
                  style={[styles.overlayImage, { width: itemWidth, height: itemWidth, opacity: overlayOpacity, },]}
                />
              </Animated.View>
            );
          }}
        />
        <View style={{ width: screenWidth, height: 300, marginTop: 10, backgroundColor: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40, }} />
        <View style={{ width: screenWidth, height: 350, marginTop: 10, backgroundColor: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40, position: 'absolute', bottom: 0, zIndex: 0, }} />
      </View>
    </View>
  );
}
