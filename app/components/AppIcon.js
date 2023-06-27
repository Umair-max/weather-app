import React from 'react';
import {View, Image} from 'react-native';
import colors from '../config/colors';

function AppIcon({
  size = 50,
  source,
  backgroundColor,
  iconColor = colors.white,
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={source}
        style={{
          height: (size * 2) / 3,
          width: (size * 2) / 3,
          tintColor: iconColor,
        }}
      />
    </View>
  );
}

export default AppIcon;
