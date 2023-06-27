import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LinearGradient from 'react-native-linear-gradient';
import colors from '../config/colors';

function CountryCard({item, index, setCurrentWeather}) {
  const navigation = useNavigation();

  const removeLocation = async index => {
    const storedLocations = await AsyncStorage.getItem('places');
    let updatedLocations = JSON.parse(storedLocations);

    updatedLocations.splice(index, 1);
    await AsyncStorage.setItem('places', JSON.stringify(updatedLocations));
    setCurrentWeather(updatedLocations);
  };

  return (
    <LinearGradient style={styles.background} colors={colors.cardBackground}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home', {name: item.name})}
        onLongPress={() => {
          Alert.alert('warning', 'do you want to remove this location', [
            {text: 'No', onPress: () => null},
            {text: 'Yes', onPress: () => removeLocation(index)},
          ]);
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[styles.text, {fontSize: 28}]}>{item.temp}&deg;</Text>
          <Image
            source={{uri: 'https:' + item.icon}}
            style={{height: 64, width: 80}}
          />
        </View>
        <Text style={styles.weatherText} numberOfLines={1}>
          {item.condition}
        </Text>
        <Text style={styles.text}>{item.name}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  background: {
    width: '45%',
    height: 120,
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
  text: {
    color: colors.white,
    fontSize: 20,
    fontWeight: '500',
  },
  weatherText: {
    color: colors.grey,
  },
});
export default CountryCard;
