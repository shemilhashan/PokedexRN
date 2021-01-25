import React from 'react';
import {View, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});

function MypokemonScreen({navigation}) {
  return <View style={styles.container} />;
}

export default MypokemonScreen;
