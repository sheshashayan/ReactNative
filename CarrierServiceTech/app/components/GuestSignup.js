/**
 * # GuestSignup.js
 * This class will render the list of parts results for the 
 * selected filtered options in filterBases/ entered Model No 
 * Author: Ravichandran P
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  ScrollView,
  TextInput, 
  Alert, 
  Image,
  TouchableHighlight,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {BoxShadow} from 'react-native-shadow';
import CustomisedPopup from "./CustomisedPopup";
import {globalStyles, deviceFinder} from "./globalStyles";

const correctStatusBar= "";
class GuestSignup extends Component {  
  constructor(props) {
    super(props);
    this.state = {       
      fullName : '',
      companyName : '',
      email : '',
      phoneNumber : ''
    }        
  }
    componentWillMount(){
        if(Platform.OS === "android"){
            correctStatusBar =(<StatusBar
                backgroundColor="#06273F"
                barStyle=  "light-content"
            />);
        }
        else{
            correctStatusBar =( <StatusBar
                backgroundColor="#06273F"
                barStyle=  "dark-content"
            />);
        }
    }

  render() {
    const shadowOpt = {
            width:160,
            color:"#808080",
            border:2,
            opacity:1.0,};        
    return (      
      <KeyboardAvoidingView behavior = "height" style = {[globalStyles.compContainer]}>
          {correctStatusBar}
        <ScrollView>

          <View style = {[globalStyles.imageLogoView,styles.logoView]}>
            <Image
              source={require('../resources/images/carrierLogo.png')} />
          </View> 
          <View style = {{ flex : 7}}>          
            <Text style = {[styles.guestSignupTxt]}>Full Name</Text>            
            <View style = {styles.textInputViewStyle}>
              <TextInput autoCorrect = {false}                
                value= {this.state.fullName}
                returnKeyType = "next" 
                onSubmitEditing= {() => this.companyInput.focus()} 
                onChangeText = {fullName => this.setState({fullName})} 
                placeholderTextColor="#000000" 
                autoCapitalize="none" 
                keyboardType= "default" 
                placeholder = ""
                maxLength = {40}
                style= {[styles.textInputStyle]}>
              </TextInput>
            </View>
            <Text style = {[styles.guestSignupTxt]}>Company Name</Text>
            <View style = {styles.textInputViewStyle}>
              <TextInput autoCorrect = {false}                
                value= {this.state.companyName}
                returnKeyType = "next" 
                ref = {(input) => this.companyInput = input} 
                onSubmitEditing= {() => this.emailInput.focus()} 
                onChangeText = {companyName => this.setState({companyName})} 
                placeholderTextColor="#000000" 
                autoCapitalize="none" 
                keyboardType= "default" 
                placeholder = "" 
                maxLength = {40}
                style= {[styles.textInputStyle]}>
              </TextInput>
            </View>
            <Text style = {[styles.guestSignupTxt]}>Email</Text>
            <View style = {styles.textInputViewStyle}>
              <TextInput autoCorrect = {false}                
                value= {this.state.email}
                returnKeyType = "next" 
                ref = {(input) => this.emailInput = input} 
                onSubmitEditing= {() => this.phoneNoInput.focus()} 
                onChangeText = {email => this.setState({email})} 
                placeholderTextColor="#000000" 
                autoCapitalize="none" 
                keyboardType= "email-address" 
                placeholder = "" 
                maxLength = {40}
                style= {[styles.textInputStyle]}>
              </TextInput>
            </View>
            <Text style = {[styles.guestSignupTxt]} >Phone Number</Text>
            <View style = {styles.textInputViewStyle}>
              <TextInput 
                autoCorrect = {false}                
                value= {this.state.phoneNumber}
                returnKeyType = "go" 
                ref = {(input) => this.phoneNoInput = input} 
                onChangeText = {phoneNumber => this.setState({phoneNumber})} 
                placeholderTextColor="#000000" 
                autoCapitalize="none" 
                keyboardType= "numeric" 
                placeholder = ""
                maxLength = {10}
                style= {[styles.textInputStyle]}>
              </TextInput>
            </View>
            <TouchableHighlight style={[globalStyles.globalBtnStyle, styles.guestLoginBtnStyle]} 
                               onPress =  {this.guestSignupLogin}>
              <LinearGradient
                start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                locations={[0,0.5,1]}
                colors={['#57A3E3', '#56A6D1', '#57A3E3']}
                underlayColor={['#4582B5', '#498FB5', '#4582B5']}                  
                style={[{borderRadius: 40}]}>
                <Text style={[globalStyles.globalBtnTextViewStyle]}>
                  Login as a Guest
                </Text>
              </LinearGradient>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
  
  /**
  * # guestSignupLogin
  * Purpose: This function will be called to ensure the 
  * fields are filled & show the pop-up when guest cross the access limit
  * Author: Ravichandran P
  * Input Param: layout
  * Output Param: style
  */
  guestSignupLogin = () => {
    const { fullName, companyName, email, phoneNumber } = this.state;
    if(fullName ){ 
      this.props.navigator.push({
        name: 'CustomisedPopup',
        title: 'Customised Popup',
      });
    }
    else{
      Alert.alert(
        'Alert',
        'Please fill all the fields',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}]);                      
    }
  }

}

const styles = StyleSheet.create({
  textInputStyle: {
    paddingTop : 10,
    paddingLeft : 5,
    paddingBottom : 10,
    borderColor : "black", 
    height: 30,
    fontWeight: "100",
    color:"#000000",
    fontSize: 12,
    fontFamily:'Montserrat'
  },
  textInputViewStyle: {
    marginLeft : 15,
    marginRight : 15,
    marginBottom : 20,
    shadowColor : "#808080",
    shadowOpacity : 1,
    shadowRadius : 3,
    shadowOffset : {width: 1, height: 1.0},
    borderWidth : 1,
    borderColor : "lightgray"
  },
  guestSignupTxt : { 
    marginLeft : 12, 
    marginBottom: 5, 
    color : "#000000",
    fontFamily:'Montserrat'
  },
  guestLoginBtnStyle: {
    marginTop : 20,
  },
  logoView: {
    paddingTop: 60, 
    paddingBottom : 60, 
    flex :3, 
    alignItems : 'center', 
    flexDirection : 'row', 
    justifyContent : 'center'
  },

});
export default GuestSignup;