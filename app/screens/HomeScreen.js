import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import HoursCard from '../components/HourCard';
import colors from '../config/colors';
import MyImage from '../components/MyImage';

function HomeScreen({route}) {
  const [firstColor, setFirstColor] = useState(colors.blue);
  const [secondColor, setSecondColor] = useState(colors.dimBlue);
  const [index, setIndex] = useState(0);
  const [hoursWeather, setHoursWeather] = useState([]);
  const [name, setName] = useState();
  const [isLoaded, setIsLoaded] = useState(true);
  var isMounted = false;

  useEffect(() => {
    isMounted = true;
    if (route.params && route.params.name) {
      getHoursWeaather(route.params.name);
      setName(route.params.name);
    } else {
      retrieveLocation();
    }
    return () => {
      isMounted = false;
    };
  }, [route.params]);

  const getHoursWeaather = async name => {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${name}&days=1`;
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
      const hoursDataArray = [];
      const today = result.forecast.forecastday[0].hour;
      today.forEach(snap => {
        const chanceOfRain = snap.chance_of_rain;
        const chanceOfSnow = snap.chance_of_snow;
        const condition = snap.condition;
        const humidity = snap.humidity;
        const temp = snap.temp_c.toFixed(0);
        const time = snap.time.split(' ')[1];
        const date = snap.time.split(' ')[0];
        const windSpeed = snap.wind_kph.toFixed(0);
        hoursDataArray.push({
          chanceOfRain: chanceOfRain,
          chanceOfSnow: chanceOfSnow,
          condition: condition,
          humidity: humidity,
          temp: temp,
          time: time,
          windSpeed: windSpeed,
          date: date,
        });
      });
      setHoursWeather(hoursDataArray);
      setIsLoaded(false);
    } catch (error) {
      Alert.alert('error', error);
    }
  };

  changeColor = () => {
    if (firstColor === colors.blue) {
      setFirstColor(colors.dimBlue);
      setSecondColor(colors.blue);
    } else {
      setFirstColor(colors.blue);
      setSecondColor(colors.dimBlue);
    }
  };
  const retrieveLocation = async () => {
    try {
      const storedLocation = await AsyncStorage.getItem('location');
      if (storedLocation !== null) {
        setName(storedLocation);
        getHoursWeaather(storedLocation);
      } else {
        setName('London');
        await AsyncStorage.setItem('location', 'London');
        getHoursWeaather('London');
      }
    } catch (error) {
      console.log('Error retrieving location from AsyncStorage:', error);
    }
  };

  const updateLocation = async name => {
    try {
      setName(name);
      await AsyncStorage.setItem('location', name);
      Alert.alert('Done', 'updated succesfuly');
    } catch (error) {
      console.log('Error updating location in AsyncStorage:', error);
    }
  };

  return (
    <LinearGradient colors={colors.background} style={{flex: 1}}>
      <SafeAreaView>
        {isLoaded ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <ActivityIndicator />
          </View>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              }}>
              <View style={{width: 50}}></View>
              <Text style={styles.headerText}>{name}</Text>
              <TouchableOpacity
                style={{width: 50}}
                onPress={() => updateLocation(name)}>
                <Text style={styles.top}>Make default</Text>
              </TouchableOpacity>
            </View>
            {hoursWeather[index] && (
              <Text style={styles.dateText}>{hoursWeather[index].date}</Text>
            )}
            <View style={styles.topBottons}>
              <TouchableWithoutFeedback onPress={() => changeColor()}>
                <View style={[styles.button, {backgroundColor: firstColor}]}>
                  <Text style={styles.buttonTitle}>Forcast</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => changeColor()}>
                <View style={[styles.button, {backgroundColor: secondColor}]}>
                  <Text style={styles.buttonTitle}>Air Quality</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            {/* {hoursWeather[index] && ( */}
            <MyImage source={hoursWeather[index].condition.icon} />
            {/* // )} */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 110,
                marginBottom: 20,
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.top}>Rain</Text>
                {hoursWeather[index] && (
                  <Text style={styles.bottom}>
                    {hoursWeather[index].chanceOfRain}%
                  </Text>
                )}
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.top}>Snow</Text>
                {hoursWeather[index] && (
                  <Text style={styles.bottom}>
                    {hoursWeather[index].chanceOfSnow}%
                  </Text>
                )}
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 40,
              }}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.top}>Temp</Text>
                {hoursWeather[index] && (
                  <Text style={styles.bottom}>
                    {hoursWeather[index].temp}&deg;
                  </Text>
                )}
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.top}>Wind</Text>
                {hoursWeather[index] && (
                  <Text style={styles.bottom}>
                    {hoursWeather[index].windSpeed}km/h
                  </Text>
                )}
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.top}>humidity</Text>
                {hoursWeather[index] && (
                  <Text style={styles.bottom}>
                    {hoursWeather[index].humidity}%
                  </Text>
                )}
              </View>
            </View>
            <View style={styles.container}>
              <Text style={styles.primaryText}>Today</Text>
              {hoursWeather[index] && (
                <Text style={styles.bottomDateText}>
                  {hoursWeather[index].date}
                </Text>
              )}
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={hoursWeather}
              renderItem={({item, index}) => (
                <View>
                  <TouchableOpacity onPress={() => setIndex(index)}>
                    <HoursCard item={item} url={item.condition.icon} />
                  </TouchableOpacity>
                </View>
              )}
            />
          </>
        )}
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
  dateText: {
    fontSize: 16,
    color: colors.grey,
    marginTop: 20,
    marginBottom: 30,
    alignSelf: 'center',
  },

  topBottons: {
    backgroundColor: colors.dimBlue,
    height: 40,
    marginHorizontal: 80,
    borderRadius: 10,
    flexDirection: 'row',
  },
  button: {
    width: '50%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: colors.white,
    fontWeight: '600',
  },
  top: {
    color: colors.grey,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  bottom: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 30,
  },
  primaryText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '400',
  },
  bottomDateText: {
    fontSize: 16,
    color: colors.grey,
  },
});
export default HomeScreen;
