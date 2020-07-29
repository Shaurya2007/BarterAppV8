import React,{Component} from 'react'
import {TouchableOpacity,TextInput,View,Modal,ScrollView,KeyboardAvoidingView,FlatList} from 'react-native'
import db from '../config'
import HomeScreen from '../screens/HomeScreen'

export default class MyBarters extends Component{
    constructor(){
        super()
    }

    keyExtractor = (item,index) => index.toString()

getAllBarters(){
    db.collection('MyBarters')
    .onSnapShot(()=>{
        var allBarters = snapshot.docs.map(document => document.data());
        this.setState({
            allBarters:allBarters
        })
    })
 }

 renderItem=({item,i})=>{
    return(
       <ListItem
       key={i}
       leftElement={<Icon name="item" type="font-awesome" color='#696969'/>}
       title={item.item_name}
       titleStyle={{color:black ,fontWeight:'bold'}}
       subtitle={"Requested By:"+item.request_by+"\nStatus:"+item.request_status}
       bottomDivider
       />
    )
}

    render(){
        return(
            <View style={{flex:1}}>
            <FlatList
                 keyExtractor={this.keyExtractor}
                 data={this.state.allBarters}
                 renderItem={this.renderItem}
            />
            </View>
        )
    }
}