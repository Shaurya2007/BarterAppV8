import React,{Component} from 'react'
import {TouchableOpacity,TextInput,View,Modal,ScrollView,KeyboardAvoidingView,Alert} from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import UserDetailsScreen from '../screens/UserDetailsScreen'
import ExchangeScreen from '../screens/ExchangeScreen'

export const AppStckNavigator = createStackNavigator({
    ProductDonateList:{
    screen:ExchangeScreen,
    navigationOptions:{
        header: false
    }
    },
    ReceiverDetails:{
        screen:UserDetailsScreen,
        navigationOptions:{
            header: false
    }
}
},
{
    initialRouteName:'ProductDonateList'
}
);
