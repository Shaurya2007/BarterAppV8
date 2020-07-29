import React,{Component} from 'react'
import {TouchableOpacity,TextInput,View,Modal,ScrollView,KeyboardAvoidingView, FlatList,StyleSheet} from 'react-native'
import MyHeader from '../component/MyHeader'
import { ListItem } from 'react-native-elements'

export default class HomeScreen extends Component{

constructor(){

super()
this.state={
    allRequests:[]
}
this.requestRef=null
}

getAllRequests=()=>{
    this.requestRef= db.collection("bookRequests")
    .onSnapShot(()=>{
        var allRequests = snapshot.docs.map(document => document.data());
        this.setState({
            allRequests:allRequests
        })
    })
}

keyExtractor = (item,index) => index.toString()

renderItem = ({item,i}) =>{
    return(
        <ListItem
        key={i}
        title={item.itemName}
        subtitle={item.itemDescription}
        titleStyle={{color:'black',fontWeight:'bold'}}
        rightElement={
            <TouchableOpacity style={styles.button}
            onPress={()=>{
                this.props.navigation.navigate('RecieverDetails',{'details':item})
            }}
            >
<Text style={{color:'#ffffff',}}>Exchange</Text>
            </TouchableOpacity>
        }
        bottomDivider
        />
    )
}

componentWillUnmount(){
    this.requestRef();
}

render(){
return(
<View style={{flex:1}}>
    <MyHeader title="Home"/>
    <View style={{flex:1}}>
        {
this.state.allRequests.length === 0
?(
    <View style={{flex:1,fontSize:20,justifyContent:'center',alignItems:'center'}}>
        <Text style ={{fontSize:20}}>List Of All Request</Text>
    </View>
)
:(
    <FlatList
    keyExtractor={this.keyExtractor}
    data={this.state.allRequests}
    renderItem={this.renderItem}
    />
)
        }
    </View>
</View>
)
}}

const styles = StyleSheet.create({
    button:{
        height:30,
        width:100,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ff5722',
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:8
        }
    }
})
