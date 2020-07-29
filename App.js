import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import { StyleSheet, Text, View } from 'react-native';
import { AppTabNavigator } from './component/AppTabNavigator';
import SignupLoginScreen from './screens/SignupLoginScreen'
import ExchangeScreen from './screens/ExchangeScreen'
import HomeScreen from './screens/HomeScreen';
import { AppDrawerNavigator } from './component/AppDrawerNavigation';
import { createAppContainer , createSwitchNavigator} from 'react-navigation';

export default function App() {
  return (
<AppContainer/>
  );
}

const switchNavigator = createSwitchNavigator({

SignupLoginScreen:{screen:SignupLoginScreen},
Drawer:{screen:AppDrawerNavigator}
})

const AppContainer = createAppContainer(switchNavigator);