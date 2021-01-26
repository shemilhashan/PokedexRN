import React from 'react';
import {Text, View, StyleSheet, Dimensions} from 'react-native';
import {getCardColor} from '../utils';
import CachedImage from './cacheimage';
import {SwipeablePanel} from 'rn-swipeable-panel';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
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
    fontFamily:'DMSans-Bold'
  },
  detailsBox: {
    width: screenWidth,
    height: screenHeight / 3,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default function CarouselItem(props) {
  const {item} = props;
  return (
    <View
      style={[
        styles.slide,
        {backgroundColor: getCardColor(item.types[0].name)},
      ]}>
      <Text style={styles.caseTitle}>{item.name}</Text>
      <View style={styles.detailsBox}>
        <CachedImage
          uri={item.imgUrl}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 200, height: 200}}
          resizeMode="stretch"
        />
      </View>
      <SwipeablePanel
        fullWidth={true}
        openLarge={false}
        showCloseButton={false}
        onClose={() => {}}
        onPressCloseButton={() => {}}
        isActive={true}
        noBackgroundOpacity={true}>
        <View
          style={[
            styles.detailsBox,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: 'white',
            },
          ]}>
          <Text style={styles.caseTitle}>
            Weight: {item && item.weight ? item.weight : 0}
          </Text>
        </View>
      </SwipeablePanel>
    </View>
  );
}
