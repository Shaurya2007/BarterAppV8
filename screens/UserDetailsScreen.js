import React,{Component} from 'react'
import {TouchableOpacity,TextInput,View,Modal,ScrollView,KeyboardAvoidingView,Alert,Text} from 'react-native'
import HomeScreen from './HomeScreen'
import firebase from 'firebase'
import db from '../config'



export default class UserDetailsScreen extends Component{
   constructor(){
   super()
   this.state={
       userId: firebase.auth().currentUser.email,
       receiverId:this.props.navigation.getParam('details')["user_id"],
       requestId:this.props.navigation.getParam('details')["request_id"],
       productId:this.props.navigation.getParam('details')["product_id"],
       itemDescription:this.props.navigation.getParam('details')["item_description"],
       receiverName:'',
       receiverContact:'',
       receiverAddress:'',
       receiverRequestDocId:'',
   }
}

getUserDetails(){
    db.collection('users').where('emailId','==',this.state.receiverId).get()
    .then(snapshot=>{
        snapshot.forEach(doc=>{
            this.setState({
                receiverName:doc.data().first_name,
                receiverAddress:doc.data().address,
                receiverContact:doc.data().contact
            })
        })
    })
}

addBarters=()=>{
    db.collection('myBarters').add({
        item_name:this.state.itemName,
        request_id:this.state.requestId,
        request_by:this.state.receiverName,
        contact:this.state.receiverContact,
        address:this.state.receiverAddress,
        donor_id:this.state.userId,
        request_status:"donor interested"
    })
}

addNotification=()=>{
    var message = this.state.userName + "has shown interest"
    db.collection('all_notification').add({
        "targeted_user_id"   :this.state.receiverId,
        "donor_id"           :this.state.userId,
        "request_id"         :this.state.requestId,
        "item_name"          : this.state.itemName,
        "date"               :firebase.firestore.FieldValue.serverTimestamp(),
        "notification_status":"unread",
        "message"            : message
    })
}

sendNotification=(itemDetails,requestStatus)=>{
var requestId = itemDetails.request_id
var donorId = itemDetails.donor_id
db.collection('all_notifiaction')
.where('request_id','==',requestId)
.where('donor_id','==',donorId)
.get()
.then((snapshot)=>{
    snapshot.forEach((doc)=>{
        var message=""
        if(requestStatus==="Item Sent"){
            message= this.state.donorName + "has sent the item"
        }
        else{
            message = this.state.donorName + "has shown interest"
        }
        db.collection('all_notification').doc(doc.id).update({
            "message":message,
            "notificationStatus":"unread",
            "date":firebase.firestore.FieldValue.serverTimestamp()
        })
    })
})
}

sendItem=(itemDetails)=>{
if(itemDetails.request_status==="Item Sent"){
    var requestStatus="Donor Interested"
db.collection('myBarters').doc(itemDetails.doc_id).update({
    "request_status": "Book Sent"
})
this.sendNotification(itemDetails,requestStatus)
}
else{
    var requestStatus="Book Sent"
    db.collection('all_barters').doc(itemDetails.doc_id).update({
        "request_status":"Book Sent"
    })
    this.sendNotification(itemDetails,requestStatus)
}
}

    render(){
        return(
            <View>
                {
                    this.state.receiverId !== this.state.userId
                }
                    ?(
                        <TouchableOpacity
                        style={{height:40,width:55,borderWidth:2}}
                        onPress={()=>{
                            this.addBarters()
                            this.addNotification()
                            this.sendItem()
                            this.props.navigation.navigate('ExchangeScreen')
                        }}
                        >
                         <Text>Exchange</Text>
                        </TouchableOpacity>
                    )
            </View>
        )
    }
}