import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Colors from '../styles/colors';
import images from '../assets/images';
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  tile: {
    marginTop: 10,
    marginBottom: 10,
    width: '80%',
    height: 100,
    borderRadius: 20,
    marginRight: '10%',
    marginLeft: '10%',
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    elevation: 2, // Android,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  name: {
    position: 'absolute',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 20,
    color: 'white',
    fontWeight: 'bold',
    zIndex: 10,
  },
});

function HomeScreen({navigation}) {
  const data = [
    {
      name: 'Pokedex',
      color: Colors.cardPokedex,
      fnToPress: () => {
        navigation.navigate('Pokedex',{showMyPokemon:false});
      },
    },
    {
      name: 'My Pokemon',
      color: Colors.cardMy,
      fnToPress: () => {
        navigation.navigate('Pokedex',{showMyPokemon:true});
      },
    },
    {
      name: 'Account',
      color: Colors.cardAccount,
      fnToPress: () => {
        navigation.navigate('Account');
      },
    },
    {
      name: 'Logout',
      color: Colors.cardLogout,
      fnToPress: () => {
        logOut();
      },
    },
  ];

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      style={[styles.tile, {backgroundColor: item.color}]}
      onPress={() => item.fnToPress()}>
      <Image
        source={images.pokeball}
        resizeMode="contain"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          height: 120,
          width: 120,
          tintColor: 'white',
          opacity: 0.5,
          top: -65,
          marginLeft: -90,
        }}
      />
      <Image
        source={images.pokeball}
        resizeMode="contain"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          position: 'absolute',
          height: 120,
          width: 120,
          tintColor: 'white',
          opacity: 0.5,
          marginTop: -10,
          marginLeft: screenWidth * 0.8 - 100,
        }}
      />
      <Text style={styles.name}>{item.name.capitalize()}</Text>
    </TouchableOpacity>
    // <View style={[styles.tile, { backgroundColor: item.color, width: '100%', marginLeft: 0 }]}>
    //     <Button title={''} onPress={() => item.fnToPress()} raised={true} buttonStyle={[styles.tile, { backgroundColor: item.color }]} />
    //     <Text style={styles.name}>{item.name.capitalize()}</Text>
    // </View>
  );

  const logOut = async (userId) => {
    try {
      await AsyncStorage.setItem('loggedIn', 'none');
      await AsyncStorage.setItem('userEmail', '');
      navigation.navigate('Auth');
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  };
  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        flexDirection: 'column',
      }}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
        }}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '100%',
          backgroundColor: 'white',
          alignSelf: 'center',
          height: 350,
        }}
      />
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
        }}
      />
    </View>
  );
}

export default HomeScreen;
