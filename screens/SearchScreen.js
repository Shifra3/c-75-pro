import React from 'react';
import { Text, View,TextInput,TouchableOpacity,FlatList,StyleSheet } from 'react-native';
import db from "../config"
export default class Searchscreen extends React.Component {
  constructor(props){
  super(props)
  this.state={
    
    allTransactions:[],
    lastVisibleTranscation:null,
    search:""
  }  
}
  componentDidMount=async()=>{
 const query=await db.collection("transactions").limit(10).get()
 query.docs.map(doc=>{
 this.setState({
 allTransactions:[],
 lastVisibleTranscation:doc  
 })  
 })  
  }
  searchTransaction=async(text)=>{
  var text=text.split("") 
  if(text[0].toUpperCase()==="B"){
  const transaction=await db.collection("transactions").where("bookId","==",text).get()
  transaction.docs.map(doc=>{
  this.setState({
  allTransactions:[...this.state.allTransactions,doc.data()],
  lastVisibleTranscation:doc  
  })  
  })  
  } 
  else if(text[0].toUpperCase()==="S"){
    const transaction=await db.collection("transactions").where("studentId","==",text).get()
    transaction.docs.map(doc=>{
    this.setState({
    allTransactions:[...this.state.allTransactions,doc.data()],
    lastVisibleTranscation:doc  
    })  
    })  
    } 
  }
  fetchMoreTransactions=async()=>{
    var text=text.split("") 
    if(text[0].toUpperCase()==="B"){
      const transaction=await db.collection("transactions").where("bookId","==",text).startAfter(this.state.lastVisibleTranscation).limit(10).get()
      transaction.docs.map(doc=>{
      this.setState({
      allTransactions:[...this.state.allTransactions,doc.data()],
      lastVisibleTranscation:doc  
      })  
      })  
      } 
      else if(text[0].toUpperCase()==="S"){
        const transaction=await db.collection("transactions").where("studentId","==",text).startAfter(this.state.lastVisibleTranscation).limit(10).get()
        transaction.docs.map(doc=>{
        this.setState({
        allTransactions:[...this.state.allTransactions,doc.data()],
        lastVisibleTranscation:doc  
        })  
        })  
        } 
  }
      render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
         <TextInput
         placeholder='enter bookId or studentId'
         onChangeText={t=>{this.setState({search:t})}}
         style={{width:"60%",height:50,borderColor:"black"}}
         >

         </TextInput>
         <TouchableOpacity
         style={{backgroundColor:"grey",width:100,height:50}}
         onPress={()=>{this.searchTransaction(this.state.search)}}
         >
           <Text>
             Search
           </Text>
         </TouchableOpacity>

         <FlatList
         data={this.state.allTransactions}
         renderItem={({item})=>(
           <View>
            <Text>{"bookId:"+item.bookId}</Text> 
            <Text>{"studentId:"+item.studentId}</Text> 
            <Text>{"transactionType:"+item.transactionType}</Text>
            <Text>{"date:"+item.date.toDate()}</Text>  
           </View>
         )}
         keyExtractor={(item,index)=>index.toString()}
         onEndReached={this.fetchMoreTransactions}
         onEndReachedThreshold={0.7}
         />
        </View>
      );
    }
  }