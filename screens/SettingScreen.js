import React,{Component} from 'react'
import {TouchableOpacity,TextInput,View,Modal,ScrollView,KeyboardAvoidingView, Text, Alert} from 'react-native'
import MyHeader from '../component/MyHeader'
import firebase from 'firebase'
import db from '../config'

export default class SettingScreen extends Component{
    constructor(){
        super()
        this.state={
        emailId:'',
        firstName:'',
        lastName:'',
        address:'',
        contact:'',
        docId:'',
        }
    }

    getData(){
        var user = firebase.auth().currentUser
        var email = user.email

        db.collection('users').where('email_Id','==',email).get()
        .then(snapshot =>{
            snapshot.forEach(doc =>{
                var data = doc.data(
                this.setState({
                    emailId:data.email_id,
                    firstName:data.first_name,
                    lastName:data.last_name,
                    address:data.address,
                    contact:data.contact,
                    docId:doc.id,
                })
                )
            })
        })
    }

updateData=()=>{
    db.collection('users').doc(this.state.docId)
    .update({
        "first_name":this.state.firstName,
        "last_name":this.state.lastName,
        "contact":this.state.contact,
        "address":this.state.address
    })
   Alert.alert("Profile Updated Successfully!")
}

componentDidMount(){
    this.getData()
}

    render(){
        return(
            <View style={styles.container}>
            <MyHeader title="Settings" navigation={this.props.navigation}/>
            <View style = {styles.formContainer}>

            <TextInput
            style={styles.formTextInput}
            placeholder={"First Name"}
            maxLength={8}
            onChangeText={(text)=>{
                this.setState({
                    firstName:text
                })
            }}
            value = {this.state.firstName}
            />

<TextInput
            style={styles.formTextInput}
            placeholder={"Last Name"}
            maxLength={8}
            onChangeText={(text)=>{
                this.setState({
                    LastName:text
                })
            }}
            value = {this.state.lastName}
            />

<TextInput
            style={styles.formTextInput}
            placeholder={"Address"}
            onChangeText={(text)=>{
                this.setState({
                    address:text
                })
            }}
            value = {this.state.address}
            />

<TextInput
            style={styles.formTextInput}
            placeholder={"Contact"}
            maxLength={10}
            onChangeText={(text)=>{
                this.setState({
                    contact:text
                })
            }}
            value = {this.state.contact}
            />

<TouchableOpacity style={styles.button}
onPress={()=>{
  this.updateData
}}
>
    <Text> Sumbit </Text>
</TouchableOpacity>

            </View>
            </View>
        )
    }
}