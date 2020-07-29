import React,{Component} from 'react'
import {TouchableOpacity,TextInput,View,Modal,ScrollView,KeyboardAvoidingView, Text} from 'react-native'
import MyHeader from '../component/MyHeader'

export default class SignupLoginScreen extends Component{
  
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
itemStatus:''

}

  }


    render(){

return(
    <View>
        <View>
            {
            this.showModal()
            }
        </View>
          <TextInput
          style={{height:80,width:30,borderWidth:2}}
          placeHolder="e.x - Barter@gmail.com"
          keyboardType='email-address'
          onChangeText={(text)=>{
              this.setState=({
                  email:text
              })
          }}
          />

         <TextInput
          style={{height:80,width:30,borderWidth:2}}
          placeHolder="Password"
          secureTextEntry={true}
          onChangeText={(text)=>{
              this.setState=({
                  password:text
              })
          }}
          />

          <TouchableOpacity style = {{height:40,width:70,borderWidth:2}}
onPress={()=>{
    this.userLogin(this.state.emailId,this.state.password)
}}>
    <Text>Login</Text>
</TouchableOpacity>

<TouchableOpacity style = {{height:40,width:70,borderWidth:2}}
onPress={()=>{
    this.userSignUp(this.state.emailId,this.state.password)
}}>
    <Text>SignUp</Text>
</TouchableOpacity>
    </View>
)
    }

    userSignUp=(emailId,password,confirmPassword)=>{
        if(password!==confirmPassword){
           return alert("Password Does not Match!")
        }
        firebase.auth().createUserWithEmailAndPassword(emailId,password).then(
            (response)=>{
                return alert("User Successfully SignedUp")
            }
        ).catch(function(error){
            var errorCode = error.code
            var errorMessage = error.message 
            return alert(errorMessage)
        })
        db.collection('user').add({
            first_name:this.state.firstName,
            last_name:this.state.last_name,
            contact:this.state.contact,
            email_id:this.state.emailId,
            address:this.state.address
        })
    }

    userLogin=(emailId,password)=>{
        firebase.auth().signInWithEmailAndPassword(emailId,password).then(
            ()=>{
                this.props.navigation.navigate('Home')
            }
        ).catch((error)=>{
            var errorCode = error.code
            var errorMessage = error.message
            return alert(errorMessage)
        })
    }
    showModal=()=>{
        return(
            <Modal 
            animationType="fade"
            transparent={true}
            visible= {this.state.isModalVisible}>
                <View>
                 <ScrollView style={{
                     width:'100%'
                 }}>
                     <KeyboardAvoidingView 
                     style={styles.keyboardBox}>
                         <Text> 
                             Registration
                         </Text>
                         <TextInput style={{
                             width:200,
                             height:30,
                            borderWidth:2,                      
                         }}
                         placeholder={"firstname"}
                         maxLength={8}
                         onChangeText={(text)=>{
                             this.setState({
                                 firstName:text
                             })
                         }}></TextInput>
    
    <TextInput style={{
                             width:200,
                             height:30,
                            borderWidth:2,                      
                         }}
                         placeholder={"lastName"}
                         maxLength={8}
                         onChangeText={(text)=>{
                             this.setState({
                                 lastName:text
                             })
                         }}></TextInput>
    
    <TextInput style={{
                             width:200,
                             height:30,
                            borderWidth:2,                      
                         }}
                         placeholder={"contact"}
                         maxLength={10}
                         keyboardType={'numeric'}
                         onChangeText={(text)=>{
                             this.setState({
                                 contact:text
                             })
                         }}></TextInput>
    
    <TextInput style={{
                             width:200,
                             height:30,
                            borderWidth:2,                      
                         }}
                         placeholder={"address"}
                         multiline={true}
                         onChangeText={(text)=>{
                             this.setState({
                                 address:text
                             })
                         }}></TextInput>
    
    <TextInput style={{
                             width:200,
                             height:30,
                            borderWidth:2,                      
                         }}
                         placeholder={"email"}
                         keyboardType={"email-address"}
                         onChangeText={(text)=>{
                             this.setState({
                                 emailId:text
                             })
                         }}></TextInput>
    
    <TextInput style={{
                             width:200,
                             height:30,
                            borderWidth:2,                      
                         }}
                         placeholder={"password"}
                         secureTextEntry={true}
                         onChangeText={(text)=>{
                             this.setState({
                                 password:text
                             })
                         }}></TextInput>
    
    <TextInput style={{
                             width:200,
                             height:30,
                            borderWidth:2,                      
                         }}
                         placeholder={"confirmPassword"}
                         secureTextEntry={true}
                         onChangeText={(text)=>{
                             this.setState({
                                 confirmPassword:text
                             })
                         }}></TextInput>
    
    
    
    <View>
        <TouchableOpacity style={styles.button}
        onPress={()=>{
            this.userSignUp(this.state.emailId,this.state.password,this.state.confirmPassword)
        }}>
            <Text>register</Text>
        </TouchableOpacity>
    
        <TouchableOpacity style={styles.button}
        onPress={()=>{
            this.setState({isModalVisible:false})
        }}>
            <Text>cancel</Text>
        </TouchableOpacity>
    
    </View>
    
    
                     </KeyboardAvoidingView>
                 </ScrollView>
                </View>
            </Modal>
        )
    }
    
    }

