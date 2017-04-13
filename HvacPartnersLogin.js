import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView, StatusBar, TextInput, Button, Alert, TouchableOpacity, MapView,Image,TouchableHighlight
} from 'react-native';

import * as stringConstant from '../constants/StringConstant';
import LinearGradient from 'react-native-linear-gradient';
import SideMenu from './SideMenu';
import {globalStyles, deviceFinder} from "./globalStyles"; 
import {CallHvacLogin} from "./ModServices";
import ActivityIndicator from "./ActivityIndicator";

export default class HvacPartnersLogin extends Component {  
  constructor(props) {
    super(props);
    this.state = {
         email: '',
         password: '',
         isLoading: false
      }
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  render() {
    return (      
      <View style = {[globalStyles.compContainer]}>
        <ScrollView>
            
            <View style = {{paddingTop: 60, paddingBottom : 60, flex :1, flexDirection : 'row', justifyContent : 'center'}}>          
              <Image
                style={[globalStyles.imageLogo]}
                source={require('../resources/images/carrierLogo.png')} />          
            </View>

            <View style = {{flex : 1}}>
              <Text style = {[styles.HVACLoginTxt]}>HVACPartners Login</Text>
              <View style = {styles.textInputViewStyle}>
                  <TextInput autoCorrect = {false}                
                    value= {this.state.email}
                    returnKeyType = "next" 
                    onSubmitEditing= {() => {(this.state.email != "" && this.state.email)? this.passwordInput.focus() : alert("Please enter the Username and Password") }}
                    onChangeText = {email => this.setState({email})} 
                    placeholderTextColor="#000000" 
                    autoCapitalize="none" 
                    keyboardType= "email-address" 
                    placeholder = "Username"
                    underlineColorAndroid='transparent'
                    onKeyPress={this.handleKeyDown}  
                    style= {[styles.textInputStyle]}></TextInput>
              </View>


              <View style = {styles.textInputViewStyle}>
                  <TextInput  
                    autoCorrect = {false} 
                    value= {this.state.password}
                    returnKeyType = "go" 
                    onChangeText = {password => this.setState({password})}
                    onSubmitEditing= {() => this.onLoginClick(this.state.email, this.state.password)} 
                    ref = {(input) => this.passwordInput = input} 
                    placeholderTextColor="#000000" 
                    autoCapitalize="none" 
                    secureTextEntry= {true} 
                    underlineColorAndroid='transparent'
                    placeholder = "Password" 
                    style= {[styles.textInputStyle]}>
                  </TextInput>
              </View>

              <TouchableHighlight 
                style={[globalStyles.globalBtnStyle, styles.HVACBtnStyle]} 
                onPress =  {this.HVACPartnersLogin}>
                    <View style={[{borderRadius: 40,}]}>
                      <Text style={[globalStyles.globalBtnTextViewStyle]}>
                        Login
                      </Text>
                    </View>
              </TouchableHighlight>

              <Text style = {[styles.HVACTroubleLoginTxt]}> Trouble Logging In? </Text>
              <TouchableHighlight 
                style={[globalStyles.globalBtnStyle, styles.HVACBtnStyle, {marginTop:2}]} 
                onPress =  {this.GoBackToLogintypes}>
                  <View style={[{borderRadius: 40,}]}>
                    <Text style={[globalStyles.globalBtnTextViewStyle]}>
                      Login as a Guest
                    </Text>
                  </View>
              </TouchableHighlight>
              
            </View>   
           
        </ScrollView>
       <ActivityIndicator  />
      </View>
      );
  }

  GoBackToLogintypes = () => {  
    this.setState({email: ""});
    this.setState({password: ""});
    let sideMenu = new SideMenu();
		sideMenu.setupLogoutBtnText(stringConstant.carrierConstClass.LOGINAS_HVAC_PARTNERS);
    this.props.navigator.push({
         name: 'MainSearchView',
          title: 'Search for a Product',
          isHidden:false
      });
  }

  HVACPartnersLogin = () => {

    
    
    const { email, password } = this.state;
    if(email !== "" && password !== ""){ 
      let activityIndicator = new ActivityIndicator();
      activityIndicator.startActivity();
      CallHvacLogin(this);
    }
    else{
          Alert.alert('Alert', 'Please enter the username and password.',
          [{text: 'OK', onPress: () => this.setState({spinnerVisible: false}) } ],
          { cancelable: false })
        }

    }

  onLoginClick(email, password){
    if(email !== "" && password != "" && email && password){
        this.HVACPartnersLogin();
    }
    else{
      if(password === "" && email === ""){
          Alert.alert(
          'Alert',
          'Please enter the Username and Password',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}] );   
        } 
      else if(password === ""){
         Alert.alert(
          'Alert',
          'Please enter the Username and Password',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}] );
      }             
    }
  }
  handleKeyDown(e) {
    if(e.nativeEvent.key === "next" ){
      console.log("next Key is Pressed..");      
    }
  }  

}
const styles = StyleSheet.create({
  textInputStyle: {
    paddingTop : 9,
    paddingLeft : 5,
    paddingBottom : 9,
    borderColor : "black", 
    height: 35,
    fontWeight: "100",
    color:"#000000",
    fontSize: 12,
  },

  textInputViewStyle: {
    marginLeft : 15,
    marginRight : 15,
    marginBottom : 25,
    shadowColor : "#808080",
    shadowOpacity : 1,
    shadowRadius : 3,
    shadowOffset : {width: 1, height: 1.0},
    borderWidth : 1,
    borderColor : "lightgray"
  },

  HVACLoginTxt: {
    marginLeft : 12, 
    marginTop : 15, 
    marginBottom: 8, 
    color : "#000000"
  },

  HVACTroubleLoginTxt: {

  marginLeft : 50, 
  color : "#000000",
  marginTop : 30,
  },

  HVACBtnStyle: {  
    marginTop : 20,
  }

});