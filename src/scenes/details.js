import React, {useEffect, useRef, useState} from 'react';
import {View, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import CarouselItem from '../components/carouselitem';
const screenWidth = Math.round(Dimensions.get('window').width);

export default function DetailsScreen({navigation, route}) {
  const {id, allData} = route.params;
  const refFlatList = useRef(null);
  const [temp, setTemp] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      refFlatList?.current?.snapToItem(id - 1);
      setTemp(temp + 1);
    }, 1000);
    // for(let i=0; i < id; i++){
    //     refFlatList?.current?.snapToNext()
    // }

    return () => {
      clearTimeout(timeout);
    };
  });

  function renderItem({item, index}) {
    return <CarouselItem item={item} />;
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
