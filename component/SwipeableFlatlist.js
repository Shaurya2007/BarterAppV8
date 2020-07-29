import React,{Component} from 'react'
import {View,Text,TouchableOpacity,StyleSheet,Dimensions} from 'react-native'
import {SwipeListView} from 'react-native-swipe-list-view'
import db from '../config'
import { render } from 'react-dom'

export default class SwipeableFlatlist extends Component{

    constructor(props){
        super(props)
        this.state={
            allNotification: this.props.allNotification
        }
    }


 updateMarkAsRead=(notification)=>{
     db.collection('all_notification').doc(notification.doc_id).update({
         "notification_status":"read"
     })
 }

 onSwipeChangeValue = swipeData=>{
     var allNotification = this.state.allNotification
     const {key,value} = swipeData;

     if(value<Dimensions.get('window').width){
         const newData = [...allNotification]
         const prevIndex=allNotification.findIndex(item =>item.key === key)
         this.updateMarkAsRead(allNotification[prevIndex])
         newData.splice(prevIndex,1)
         this.setState({
             allNotification:newData
         })
     }
 }

render(){
    return(
        <View>

        </View>
    )
}

}


