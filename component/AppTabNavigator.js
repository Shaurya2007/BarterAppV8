import React,{Component} from 'react'
import {Image} from 'react-native'
import {bottomTabNavigator} from 'react-navigation-tabs'
import HomeScreen from '../screens/HomeScreen'
import ExchangeScreen from '../screens/ExchangeScreen'

const TabNavigator = createBottomTabNavigator({
    Exchange: {
   screen: ExchangeScreen,
   navigationOptions:{
   tabBarIcon: <Image source={require("../assets/Background.png")} style={{width:20,height:20}}/>,
   tabBarLabel:"Exchange",
   }
    },
    Home: {
        screen: HomeScreen,
        navigationOptions:{
            tabBarIcon: <Image source={require("../assets/home.png")} style={{width:20,height:20}}/>,
            tabBarLabel:"Home",
            }
             },  
  })

  export default AppTabNavigator;