import React,{Component} from 'react'
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import {DrawerItems} from 'react-navigation-drawer'
import firebase from 'firebase'
import {Avatar} from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker'

export default class CustomSideBarMenu extends Component{
    
    constructor(){
        super()
    this.state={
        userId:firebase.auth().currentUser.email,
        image:'#',
        name:'',
        docId:''
       }
    }

    selectPicture=async()=>{
        const {cancelled,uri} = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            aspect:[4,3],
            quality:1
        })
        if(!cancelled){
            this.uploadImage(uri,this.state.userId)
        }
    }

    uploadImage = async()=>{
        var response = await fetch(uri)
        var blob = await response.blob()

        var ref = firebase
        .storage()
        .ref()
        .child("user_profiles/"+imageName)

        return ref.put(blob).then((response)=>{
            this.fetchImage(imageName);
        })
    }

    fetchImage=(imageName)=>{
        var storageRef = firebase
        .storage()
        .ref()
        .child("user_profiles/"+imageName)

        storageRef
        .getDownloadURL()
        .then((url)=>{
            this.setState({image:url})
        })
        .catch((error)=>{
            this.setState({image:'#'})
        })
    }

getUserprfile(){
    db.collection("users")
    .where('emailId','==',this.state.userId)
    querySnapshot=((querySnapshot)=>{
        querySnapshot=((doc)=>{
        this.setState({
            name:doc.data().firstName+""+doc.data().last_name
        }) 
        })

    })

}    

    componentDidMount(){
        this.fetchImage(imageName)
    }
   
    render(){
    return(
        <View>
            <View style={{flex:1}}>
            <View style={{flex:5,alignItems:'center',background:'orange'}}>
             
             <Avatar
             rounded
             source={{
                 uri:this.state.image
             }}
             size='medium'
             onPress={()=>{
                 this.selectPicture()
             }}
             showEditButton
             /> 
             <Text style={{fontWeight:"100",fontSize:'20',paddingTop:'10'}}>
              {this.state.userId}
             </Text>

             </View>
             </View>
             <View style={{flex:1}}>
             <View style = {styles.drawerItemsContainer}>
             <DrawerItems {...this.props}/>

             <View style={{flex:1,justifyContent:'flex-end',paddingBottom:30}}>
             <TouchableOpacity style={{justifyContent:'center',padding:10,height:30,width:'100%'}}
             onPress={()=>{
                 this.props.navigation.navigate('SignupLoginScreen')
                 firebase.auth().signOut()
             }}>
             <Text>LogOut</Text>
             </TouchableOpacity>
             </View>
             </View>
            </View>
            </View>
    )
}
}


