import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ForcastResport from '../screens/ForcastReportScreen';
import SearchScreen from '../screens/SearchScreen';
import AppIcon from '../components/AppIcon';
import colors from '../config/colors';

function AppNavigator(props) {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#070725',
          height: 40,
          borderTopColor: '#070725',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <AppIcon
              size={35}
              source={require('../assets/home.png')}
              iconColor={(color = focused ? colors.lightBlue : colors.white)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Forcast"
        component={ForcastResport}
        options={{
          tabBarIcon: ({focused, color}) => (
            <AppIcon
              size={35}
              source={require('../assets/statistics.png')}
              iconColor={(color = focused ? colors.lightBlue : colors.white)}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({focused, color}) => (
            <AppIcon
              source={require('../assets/search.png')}
              size={45}
              iconColor={(color = focused ? colors.lightBlue : colors.white)}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
