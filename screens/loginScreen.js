import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Alert
} from "react-native";
import * as firebase from "firebase";
import db from "../config.js";

export default class LoginScreen extends React.Component{
constructor(){
super()
this.state={
 email:"",
 password:""   
}    
}  
login=async(email,password) =>{
if(email && password) {
try{
 const response=await firebase.auth().signInWithEmailAndPassword(email,password)
 if(response){
this.props.navigation.navigate("Transaction")     
 }  
}    
catch(error){
    switch(error.code){
    case "auth/user-not-found":
     alert("user does not  exist")   
     break
     case "auth/invalid-email":
     alert("incorrect email or password")    
    
    }
}
}   
else{
alert("enter email or password")    
}
} 
 render(){
return(
<View>
<KeyboardAvoidingView style={{alignItems:"center",marginTop:20}}>
<View>
<Image
source={require("../assets/booklogo.jpg")}
style={{width:200, height:200}}
/> 
<Text>E-lib</Text>   
</View>
<View>
<TextInput
              style={styles.inputBox}
              placeholder="email Id"
              keyboardType="email-address"
              onChangeText={text => {
                this.setState({
                  email: text
                });
              }}
              
            />
            <TextInput
              style={styles.inputBox}
              placeholder="password"
              secureTextEntry={true}
              onChangeText={text => {
                this.setState({
                  password: text
                });
              }}
              
            />
            <TouchableOpacity
              style={styles.scanButton}
              onPress={() => {
                this.login(this.state.email,this.state.password);
              }}
            >
              <Text style={styles.buttonText}>login</Text>
            </TouchableOpacity>
</View>
</KeyboardAvoidingView>

</View>    
)
 }   
}