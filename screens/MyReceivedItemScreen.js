import React,{Component} from 'react'
import {TouchableOpacity,TextInput,View,Modal,ScrollView,KeyboardAvoidingView, Text} from 'react-native'
import MyHeader from '../component/MyHeader'
import {ListItem} from 'react-native-swipe-list-view'
import firebase from 'firebase'
import db from '../config'

export default class MyReceivedItemScreen extends Component{
    constructor(){
        super()
        this.state={
            userId:firebase.auth().currentUser.email,
            receivedItemList:[]
        }
        this.requestRef=null
    }

getReceivedItemList=()=>{
    this.requestRef=db.collection('request_item')
    .where('user_id','==',this.state.userId)
    .where('book_status','==','received')
    .onSnapshot((snapshot)=>{
        var receivedItemList = snapshot.docs.map((doc)=>doc.data)
        this.setState({
            receivedItemList: receivedItemList
        })
    })
}

componentDidMount(){
    this.getReceivedItemList()
}

componentWillUnmount(){
    this.requestRef()
}

keyExtractor=(item,index)=> index.toString()

renderItem=({item,index})=>{
    console.log(item.item_name)
    return(
       <ListItem
       key={i}
       title={item.item_name}
       titleStyle={{color:black ,fontWeight:'bold'}}
       subtitle={item.itemStatus}
       bottomDivider
       />
    )
}

render(){
    return(
        <View>
        <View style={{flex:0.1}}>
        <MyHeader title="Received Books" navigation={this.props.navigation}/>
        </View>
        <View style={{flex:1}}>
         {
             this.state.receivedItemList.length === 0
             ?(
                 <View style ={{flex:1 , justifyContent:'center' , alignItems:'center'}}>
                 <Text style={{fontSize:20}}>
                  List of all received items
                 </Text>
                 </View>
             )
             :(
               <Flatlist 
               keyExtractor={this.keyExtractor}
               renderItem={this.renderItem}
               data={this.state.receivedItemList}/>
             )
         }
        </View>
    </View>
    )
}

}
