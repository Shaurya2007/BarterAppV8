import React,{Component} from 'react'
import {TouchableOpacity,TextInput,View,Modal,ScrollView,KeyboardAvoidingView, Text} from 'react-native'
import MyHeader from '../component/MyHeader'

export default class RequestStatusScreen extends Component{
  
 constructor(){

super()

this.state={
email:'',
password:'',
confirmPassword:'',
firstName:'',
lastName:'',
contact:'',
address:'',
isModalVisible:'false',
isExchangeRequestActive:false,
itemStatus:'',
itemName:''
}
 }


 getIsExchangeRequestActive(){
    db.collection('user')
    .where('email_id','==',this.state.userId)
    .onSnapshot(querySnapshot=>{
        querySnapshot.forEach(doc => {
            this.setState({
                isExchangeRequestActive:doc.data().isExchangeRequestActive
            })
        });
    })
}

render(){
    if(this.state.isExchangeRequestActive === true){
        return(
            <View style={{flex:1,justifyContent:'center'}}>
            <View style={{borderColor:'orange',borderWidth:2,justifyContent:'center',alignItems:'center'}}>
            <Text>Item Name</Text>
            <Text>{this.state.itemStatus}</Text>
            </View>
            <View style={{borderColor:'orange',borderWidth:2,justifyContent:'center',alignItems:'center'}}>
            <Text>Item Status</Text>
            </View>
            <TouchableOpacity style={{borderWidth:1,borderColor:'orange',backgroundColor:'orange',width:300}}>
             <Text>I Received The Book</Text>
            </TouchableOpacity>
            </View>
        )
        }
       else{ 
    return(
     <View style ={{flex:1}}>
         <MyHeader title="Request Book" navigation={this.props.navigation}/>
         <ScrollView>
             <KeyboardAvoidingView style={StyleSheet.keyboardStyle}>
                 <TextInput
                 style={styles.formTextInput}
                 placeholder="Enter Item Name"
                 onChangeText={(text)=>{
                     this.setState({
                         itemName:text
                     })
                 }}
                 value={this.state.itemName}/>

             </KeyboardAvoidingView>
         </ScrollView>
     </View>
    )
}
}

}