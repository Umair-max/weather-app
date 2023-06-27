import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

function MyImage({source}) {
  const url = source;
  console.log(url);
  const time = url.split('/')[5];
  const code = url.split('/')[6].split('.')[0];

  let icon;
  switch (code) {
    case '113':
      if (time === 'day') {
        icon = require('../assets/day113.png');
      } else if (time === 'night') {
        icon = require('../assets/night113.png');
      }
      break;
    case '116':
      if (time === 'day') {
        icon = require('../assets/day116.png');
      } else if (time === 'night') {
        icon = require('../assets/night116.png');
      }
      break;
    case '119':
      if (time === 'day') {
        icon = require('../assets/day119.png');
      } else if (time === 'night') {
        icon = require('../assets/night119.png');
      }
      break;
    case '122':
      if (time === 'day') {
        icon = require('../assets/day119.png');
      } else if (time === 'night') {
        icon = require('../assets/night119.png');
      }
      break;
    case '176':
      if (time === 'day') {
        icon = require('../assets/day293.png');
      } else if (time === 'night') {
        icon = require('../assets/night293.png');
      }
      break;
    case '302':
      if (time === 'day') {
        icon = require('../assets/day293.png');
      } else if (time === 'night') {
        icon = require('../assets/night293.png');
      }
      break;
    case '200':
      if (time === 'day') {
        icon = require('../assets/day200.png');
      } else if (time === 'night') {
        icon = require('../assets/night200.png');
      }
      break;
    case '389':
      if (time === 'day') {
        icon = require('../assets/day200.png');
      } else if (time === 'night') {
        icon = require('../assets/night200.png');
      }
      break;
    case '293':
      if (time === 'day') {
        icon = require('../assets/day293.png');
      } else if (time === 'night') {
        icon = require('../assets/night293.png');
      }
      break;
    case '353':
      if (time === 'day') {
        icon = require('../assets/day293.png');
      } else if (time === 'night') {
        icon = require('../assets/night293.png');
      }
      break;
    case '356':
      if (time === 'day') {
        icon = require('../assets/day356.png');
      } else if (time === 'night') {
        icon = require('../assets/night356.png');
      }
      break;
    case '266':
      if (time === 'day') {
        icon = require('../assets/day356.png');
      } else if (time === 'night') {
        icon = require('../assets/night356.png');
      }
      break;
    case '308':
      if (time === 'day') {
        icon = require('../assets/day356.png');
      } else if (time === 'night') {
        icon = require('../assets/night356.png');
      }
      break;
    case '248':
      if (time === 'day') {
        icon = require('../assets/day248.png');
      } else if (time === 'night') {
        icon = require('../assets/night248.png');
      }
      break;
    case '143':
      if (time === 'day') {
        icon = require('../assets/day248.png');
      } else if (time === 'night') {
        icon = require('../assets/night248.png');
      }
      break;
    case '296':
      if (time === 'day') {
        icon = require('../assets/day176.png');
      } else if (time === 'night') {
        icon = require('../assets/night176.png');
      }
      break;
    default:
      icon = require('../assets/night248.png');
      break;
  }

  return (
    <View>
      {icon && (
        <Image source={icon} style={styles.image} resizeMode={'contain'} />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    marginTop: 30,
    marginBottom: 20,
    width: 200,
    height: 230,
    alignSelf: 'center',
    marginBottom: 50,
  },
});
export default MyImage;
