import React,{Component} from 'react'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {AppTabNavigator} from './AppTabNavigator'
import CustomSideBarMenu from './CustomSideBarMenu'
import SettingScreen from '../screens/SettingScreen'
import MyBarters from '../screens/MyBarters'
import NotificationScreen from '../screens/NotificationScreen'

export const AppDrawerNavigator = createDrawerNavigator({

    MyBarters:{
    screen:MyBarters
    },

    Notifications:{
        screen:NotificationScreen
    },
    Home:{
        screen:AppTabNavigator
    },
    Setting:{
        screen:SettingScreen
},
},
{
   contentComponent:CustomSideBarMenu
},
{
   initialRouteName: 'Home'
})