import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../config/colors';

const getDayName = date => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayIndex = new Date(date).getDay();
  return daysOfWeek[dayIndex];
};

function DaysCard({item}) {
  const dayName = getDayName(item.date);
  return (
    <>
      <Text style={styles.condition}>{item.condition}</Text>
      <View style={styles.background}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.dayText}>{dayName}</Text>
          <Text style={[styles.dateText]}>{item.Date}</Text>
        </View>
        <View style={{flex: 1}}></View>
        <View>
          <Text style={styles.maxTemp}>{item.maxTemp}&deg;C</Text>
          <Text style={styles.minTemp}>{item.minTemp}&deg;C</Text>
        </View>
        <View style={{flex: 1}}></View>
        <Image
          style={{
            height: '100%',
            width: '30%',
          }}
          source={{uri: 'https:' + item.icon}}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  condition: {
    fontSize: 16,
    color: colors.grey,
    alignSelf: 'flex-end',
    marginRight: 30,
    marginTop: 10,
  },
  background: {
    backgroundColor: colors.dimBlue,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    opacity: 0.7,
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 15,
  },
  dayText: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 18,
    marginBottom: 5,
  },
  dateText: {
    color: colors.grey,
  },
  maxTemp: {
    color: colors.white,
    fontSize: 40,
  },
  minTemp: {
    color: colors.white,
    fontSize: 16,
  },
});
export default DaysCard;
