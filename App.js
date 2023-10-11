/* eslint-disable prettier/prettier */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  PermissionsAndroid,
} from 'react-native';

import Tabs from './navigation/tabs';
import {
  Home,
  OrderDelivery,
  Restaurants,
  Search
} from './screens'

import 'react-native-gesture-handler'

import SignInScreen from './src/Authencation/SignInScreen';
// import CustomInput from './src/Authencation/CustomInput';
import SignUpScreen from './src/Authencation/SignUpScreen';
import ConfirmEmailScreen from './src/Authencation/ConfirmEmailScreen';
import ForgotPassword from './src/Authencation/ForgotPassword';
import NewPassword from './src/Authencation/NewPassword';
import { SetDay, Reservation, Recommend, SetTime, GetFood, Confirm } from './screens';
import Review from './src/components/Review';
import RestaurantSignIn from './src/Authencation/SignInScreen/RestaurantSignIn';

import MyOrderlist from './screens/MyOrderlist';
import { Tabs2 } from './navigation/tabs';
import Stats from './screens/Stats';
const Stack = createStackNavigator();
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
      alert("Ứng dụng đang sử dụng quyền vị trí");
    } else {
      console.log("location permission denied")
      alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err)
  }
};

const App = () => {
  requestLocationPermission()
  return (

    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName='RestaurantManager'
        initialRouteName='Home'
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name='Home' component={Tabs} />
        <Stack.Screen name='SignInScreen' component={SignInScreen} />
        <Stack.Screen name='OrderDelivery' component={OrderDelivery} />
        <Stack.Screen name='Restaurants' component={Restaurants} />
        <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
        <Stack.Screen name='ConfirmEmailScreen' component={ConfirmEmailScreen} />
        <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
        <Stack.Screen name='NewPassword' component={NewPassword} />
        <Stack.Screen name='Recommend' component={Recommend} />
        <Stack.Screen name='Reservation' component={Reservation} />
        <Stack.Screen name='SetDay' component={SetDay} />
        <Stack.Screen name='SetTime' component={SetTime} />
        <Stack.Screen name='GetFood' component={GetFood} />
        <Stack.Screen name='Confirm' component={Confirm} />
        <Stack.Screen name='Review' component={Review} />
        <Stack.Screen name='RestaurantSignIn' component={RestaurantSignIn} />
        <Stack.Screen name='RestaurantManager' component={Tabs2} />
        <Stack.Screen name='Stats' component={Stats}></Stack.Screen>
        <Stack.Screen name='MyOrderlist' component={MyOrderlist} />

      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App;