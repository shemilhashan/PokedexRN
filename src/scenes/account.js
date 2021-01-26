import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, Text } from 'react-native';
import images from '../assets/images'
import { Input } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'flex-start' },
});

function AccountScreen({ navigation }) {
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('Shemil')
  const [userAge, setUserAge] = useState(10)

  useEffect(() => {
    const getAccountData = async () => {
      try {
        let userEmailAsync = (await AsyncStorage.getItem('userEmail')) || 'none';
        if (userEmailAsync && userEmailAsync !== 'none') {
          setUserEmail(userEmailAsync)
        }
        let userNameAsync = (await AsyncStorage.getItem('userName')) || 'none';
        if (userNameAsync && userNameAsync !== 'none') {
          setUserName(userNameAsync)
        }
        let userAgeAsync = (await AsyncStorage.getItem('userAge')) || 'none';
        if (userAgeAsync && userAgeAsync !== 'none') {
          setUserAge(userAgeAsync)
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getAccountData()
  })

  async function updateName(name) {
    try {
      await AsyncStorage.setItem('userName', name);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }
  async function updateAge(age) {
    try {
      await AsyncStorage.setItem('userAge', age);
    } catch (error) {
      // Error retrieving data
      console.log(error.message);
    }
  }

  function getDataRow(editable, label) {
    var value = ''

    switch (label) {
      case 'Email':
        value = userEmail;
        break;
      case 'Name':
        value = userName;
        break;
      case 'Age':
        value = userAge;
        break;
      default:
        value = '';
        break;
    }

    return (
      <View style={{ alignContent: 'flex-start', justifyContent: 'flex-start', width: '100%', marginBottom: 10, marginTop: 10,paddingLeft:40 }}>
        <Text style={{color:'grey',fontSize:15,marginBottom:5,fontFamily:'DMSans-Regular'}}>{label}</Text>
        <Text style={{color:'black',fontSize:15,marginBottom:5,fontFamily:'DMSans-Regular'}}>{value}</Text>
      </View>
    )
  }

  return <View style={styles.container}>
    <Image source={images.account} style={{ width: screenWidth, height: screenWidth * 445 / 630 }}></Image>
    <View style={{marginTop:30,width:'100%'}}>
      {getDataRow(false, 'Email')}
      {getDataRow(true, 'Name')}
      {getDataRow(true, 'Age')}
    </View>

  </View>;
}

export default AccountScreen;
