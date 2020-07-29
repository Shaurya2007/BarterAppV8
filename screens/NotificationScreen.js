import React,{Component} from 'react'
import {TouchableOpacity,TextInput,View,Modal,ScrollView,KeyboardAvoidingView, FlatList,StyleSheet,} from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import MyHeader from '../component/MyHeader'
import  SwipeableFlatlist from "../component/SwipeableFlatlist";

export default class NotificationScreen extends Component{
   
   constructor(){
       super()
       this.state={
           userId:firebase.auth().currentUser.email,
           allNotification:[]
           }
           this.notificationRef = null
   }

getNotification=()=>{
    this.requestRef=db.collection('all_notification')
    .where('notification_status','==','unread')
    .where('targeted_user_id','==',this.state.userId)
    .onSnapshot=((snapshot)=>{
        var allNotification = []
        snapshot.docs.map((doc)=>{
            var notification = doc.data()
            notifiaction["doc_id"]=doc.id
            allNotification.push(notification)
        })
        this.setState({
            allNotification:allNotification
        })
    })
}

componentDidMount(){
    this.getNotification()
}

keyExtractor=(item,index)=>index.toString()

renderItem=({item,index})=>{
    return(
       <ListItem
       key={index}
       leftElement={<Icon name="item" type="font-awesome" color='#696969'/>}
       title='item.item_name'
       titleStyle={{color:black ,fontWeight:'bold'}}
       subtitle={item.message}
       bottomDivider
       />
    )
}

    render(){
        return(
            <View>
                <View style={{flex:0.1}}>
                <MyHeader title="Notifications" navigation={this.props.navigation}/>
                </View>
                <View style={{flex:0.9}}>
                 {
                     this.allNotification.length === 0
                     ?(
                         <View style ={{flex:1 , justifyContent:'center' , alignItems:'center'}}>
                         <Text style={{fontSize:25}}>
                          You Have No New Notifications
                         </Text>
                         </View>
                     )
                     :(
                       <SwipeableFlatlist allNotification={this.state.allNotification}/>
                     )
                 }
                </View>
            </View>
        )
    }
}