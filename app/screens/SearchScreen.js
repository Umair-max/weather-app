import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CountryCard from '../components/CountryCard';
import Search from '../components/Search';
import colors from '../config/colors';

function SearchScreen(props) {
  const [name, setName] = useState('');
  const [currentWeather, setCurrentWeather] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  console.log;
  const GetCurrentWeather = async name => {
    const url = `https://weatherapi-com.p.rapidapi.com/current.json?q=${name}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3e9679a8bamsh881611b2db6f4bcp163c3bjsn2188c1e2b3db',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      const current = result.current;
      const icon = current.condition.icon;
      const condition = current.condition.text;
      const temp = current.temp_c.toFixed(0);

      const data = {icon, condition, name, temp};

      const placesString = await AsyncStorage.getItem('places');
      let places = [];

      if (placesString) {
        places = JSON.parse(placesString);
      }
      places.push(data);
      const updatedPlacesString = JSON.stringify(places);
      await AsyncStorage.setItem('places', updatedPlacesString);
      setCurrentWeather(places);
      setName('');
    } catch (error) {
      console.log(error);
      Alert.alert('warning', 'The place name is incorrect');
    }
  };

  const getData = async () => {
    try {
      const placesString = await AsyncStorage.getItem('places');

      if (placesString) {
        const places = JSON.parse(placesString);
        setCurrentWeather(places);
      } else {
        console.log('No places found.');
      }
    } catch (error) {
      console.log('Error while retrieving places:', error);
    }
  };

  return (
    <LinearGradient
      colors={colors.background}
      style={{flex: 1, paddingHorizontal: 20}}>
      <SafeAreaView>
        <Text style={styles.headerText}>Search Location</Text>
        <View style={{marginTop: 20, marginBottom: 40}}>
          <Text style={styles.text}>
            Find the name of the place that you want to know
          </Text>
          <Text style={[styles.text]}>
            the current weather info at this time
          </Text>
        </View>
        <Search
          value={name}
          onChangeText={text => setName(text)}
          onPress={() => {
            name && GetCurrentWeather(name);
          }}
        />
        <View style={{height: '75%'}}>
          <FlatList
            // inverted={true}
            numColumns={2}
            data={currentWeather}
            renderItem={({item, index}) => (
              <CountryCard
                item={item}
                index={index}
                setCurrentWeather={setCurrentWeather}
              />
            )}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  headerText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '500',
    alignSelf: 'center',
  },
  text: {
    color: colors.grey,
    fontSize: 14,
    lineHeight: 22,
    alignSelf: 'center',
  },
});
export default SearchScreen;
