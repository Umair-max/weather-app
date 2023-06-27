import React from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';

import AppIcon from './AppIcon';
import colors from '../config/colors';

function Search({onChangeText, onPress, value}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <AppIcon source={require('../assets/search.png')} onPress={onPress} />
      </TouchableOpacity>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search"
        placeholderTextColor={colors.grey}
        style={styles.textInput}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.dimBlue,
    flexDirection: 'row',
    borderRadius: 15,
  },
  textInput: {
    color: colors.white,
    fontSize: 16,
  },
});
export default Search;
