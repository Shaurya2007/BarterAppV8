import React,{Component} from 'react'
import {TouchableOpacity,TextInput,View,Modal,ScrollView,KeyboardAvoidingView,Alert} from 'react-native'
import HomeScreen from './HomeScreen'
import db from '../config'
import MyHeader from '../component/MyHeader'

export default class ExchangeScreen extends Component{
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            itemName:'',
            itemDescription:''
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }
    
    render(){
        
        
        return(
             <View>
                      <View style={{flex:1}}>
                      <MyHeader title="Request Item" navigation={this.props.navigation}/>
                      </View>
                 <TextInput
                 style={{height:30,width:70,borderWidth:2}}
                 placeholder="ex- Book"
                 onChangeText={(text)=>{
                     this.setState({
                         itemName:text
                     })
                 }}
                 value={this.state.itemName}
                 />

<TextInput
                 style={{height:30,width:70,borderWidth:2}}
                 placeholder="About this product"
                 onChangeText={(text)=>{
                     this.setState({
                         itemDescription:text
                     })
                 }}
                 value={this.state.itemDescription}
                 />
                 
            <TouchableOpacity
            style={{height:25,width:40,borderWidth:2}}
            onPress={()=>{
            this.addItem()
            }}
            >
            <Text>Add Item</Text>
            </TouchableOpacity>

             </View>
        )
    }

    addItem=(itemName,itemDescription)=>{
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId()
        db.collection('bookRequest').add({
            user_id:userId,
            itemName:itemName,
            itemDescription:itemDescription,
        })
        this.setState({
            itemName:'',
            itemDescription:''
        })
    } 
}

const SwitchContainer = createSwitchNavigator({
SignupLoginScreen:{screen:SignupLoginScreen},
TabNavigator:TabNavigator
})

const AppContainer = createAppContainer(SwitchContainer);

