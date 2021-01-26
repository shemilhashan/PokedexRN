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
import Tab from '../components/details/tabview/tab'


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
  const imgCommon =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';
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
                      const likedDataStore = await JSON.stringify({ data: likedData });
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
                      const likedDataStore = await JSON.stringify({ data: likedData });
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
            <Tab allData={allData} speciesData={speciesData} currentId={currentId} evoData={evoData}></Tab>
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
