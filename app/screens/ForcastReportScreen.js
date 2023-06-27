import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

import AppIcon from '../components/AppIcon';
import DaysCard from '../components/DayCard';
import HoursCard from '../components/HourCard';
import colors from '../config/colors';

function ForcastResport(props) {
  const [daysWeather, setDaysWeather] = useState([]);
  const [hoursWeather, setHoursWeather] = useState([]);
  const isFocused = useIsFocused();
  const [isLoaded, setIsLoaded] = useState(true);

  var isMounted = false;

  useEffect(() => {
    console.log('called');
    isMounted = true;
    if (isFocused) {
      recieveLocation();
    }
    return () => {
      isMounted = false;
    };
  }, [props, isFocused]);
  const recieveLocation = async () => {
    const storedLocation = await AsyncStorage.getItem('location');
    console.log(storedLocation);
    getDaysWeather(storedLocation);
  };

  const getDaysWeather = async parameter => {
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${parameter}&days=3`;
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
      const days = result.forecast.forecastday;
      const today = result.forecast.forecastday[0].hour;
      const hoursDataArray = [];
      const daysDataArray = [];

      days.forEach(each => {
        const maxTemp = each.day.maxtemp_c.toFixed(0);
        const minTemp = each.day.mintemp_c.toFixed(0);
        const icon = each.day.condition.icon.split('//')[1];
        const condition = each.day.condition.text;
        const date = each.date;
        daysDataArray.push({
          date: date,
          condition: condition,
          icon: icon,
          maxTemp: maxTemp,
          minTemp: minTemp,
        });
      });

      today.forEach(snap => {
        const chanceOfRain = snap.chance_of_rain;
        const chanceOfSnow = snap.chance_of_snow;
        const condition = snap.condition;
        const humidity = snap.humidity;
        const temp = snap.temp_c.toFixed(0);
        const time = snap.time.split(' ')[1];
        const windSpeed = snap.wind_kph;
        hoursDataArray.push({
          chanceOfRain: chanceOfRain,
          chance_of_snow: chanceOfSnow,
          condition: condition,
          humidity: humidity,
          temp: temp,
          time: time,
          windSpeed: windSpeed,
        });
      });
      setHoursWeather(hoursDataArray);
      setDaysWeather(daysDataArray);
      setIsLoaded(false);
    } catch (error) {
      console.error(error);
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
            <Text style={styles.headerText}>Forecast report</Text>
            <Text style={styles.text}>of your default location</Text>
            <View style={styles.container}>
              <Text style={styles.primaryText}>Today</Text>
              {daysWeather[0] && (
                <Text style={styles.dateText}>{daysWeather[0].date}</Text>
              )}
            </View>
            {hoursWeather[0] && (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={hoursWeather}
                renderItem={({item}) => (
                  <HoursCard item={item} url={item.condition.icon} />
                )}
              />
            )}
            <View style={[styles.container, {marginTop: 10, marginBottom: 0}]}>
              <Text style={[styles.primaryText]}>3 days forecast</Text>
              <AppIcon
                source={require('../assets/weather.png')}
                iconColor={colors.grey}
              />
            </View>
            <FlatList
              data={daysWeather}
              renderItem={({item}) => <DaysCard item={item} />}
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
  text: {
    alignSelf: 'center',
    color: colors.grey,
    lineHeight: 30,
  },
  primaryText: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '400',
  },
  dateText: {
    fontSize: 16,
    color: colors.grey,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 20,
  },
});
export default ForcastResport;
