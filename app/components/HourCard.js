import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../config/colors';

function HoursCard({item, url}) {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  const giventime = item.time;
  const givenHour = giventime.split(':')[0];
  if (currentHour >= givenHour) {
    return (
      <LinearGradient style={styles.background} colors={colors.cardBackground}>
        <View>
          <Text style={[styles.text, {fontSize: 16}]}>{givenHour}:00</Text>

          {item && <Text style={styles.text}>{item.temp}&deg;C</Text>}
        </View>
        <Image
          resizeMode="contain"
          source={{uri: 'https:' + url}}
          style={{height: 90, width: '60%'}}
        />
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    width: 130,
    height: 80,
    marginLeft: 20,
    marginRight: 5,
    marginRight: -10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    marginLeft: 10,
    color: colors.white,
    fontWeight: '500',
    marginBottom: 5,
  },
});
export default HoursCard;
