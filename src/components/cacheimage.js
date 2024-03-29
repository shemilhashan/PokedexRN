import {FileSystem} from 'react-native-unimodules';
import React, {useState, useEffect} from 'react';
import {View, Animated} from 'react-native';
import shorthash from 'shorthash';
function CachedImage(props) {
  const [source, setSource] = useState(null);

  // const spinValue = new Animated.Value(0);

  // Animated.loop(
  //     Animated.timing(
  //         spinValue,
  //         {
  //             toValue: 1,
  //             duration: 3000,
  //             easing: Easing.linear,
  //             useNativeDriver: true
  //         }
  //     )
  // ).start();

  // // Next, interpolate beginning and end values (in this case 0 and 1)
  // const spin = spinValue.interpolate({
  //     inputRange: [0, 1],
  //     outputRange: ['0deg', '360deg']
  // })

  useEffect(() => {
    // const getCachedData = async () => {
    //   const {uri} = props;
    //   const name = shorthash.unique(uri);
    //   const path = `${FileSystem.cacheDirectory}${name}`;
    //   const image = await FileSystem.getInfoAsync(path);
    //   if (image.exists) {
    //     setSource({
    //       uri: image.uri,
    //     });
    //     return;
    //   }
    //   const newImage = await FileSystem.downloadAsync(uri, path);
    //   setSource({
    //     uri: newImage.uri,
    //   });
    // };
    // getCachedData();
  });

  return (
    <View>
      {/* {props.showSpin?<Animated.Image
                style={[{ transform: [{ rotate: spin }] },{ zIndex: 1, width: '70%', height: '70%', position: 'absolute', tintColor: 'white', opacity: 0.3, top:'15%',left:'15%' }]}
                source={images.pokeball} />:null} */}
      <Animated.Image
        {...props}
        source={{uri:props.uri}}
        // eslint-disable-next-line react-native/no-inline-styles
        style={[props.style, {zIndex: 10}]}
      />
    </View>
  );
}

export default CachedImage;
