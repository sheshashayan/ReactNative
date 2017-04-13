import React, { Component } from 'react'
import {
   View,
   TouchableHighlight,
   TouchableOpacity,
   Text,
   Image,
   StyleSheet
} from 'react-native'

import {globalStyles, deviceFinder} from "./globalStyles"; 

const radioBtnCheckedSrc = require('../resources/images/CheckedStep.png');
const radioBtnUnCheckedSrc = require('../resources/images/UncheckedStep.png');

const CustomRadioButton = (props) =>  {
   return (
   	<View style = {{flexDirection : 'row'}}>       
        <View>
            <TouchableOpacity style = {{padding:10}} onPress = {props.radioFirstBtnEventHandle}>           
                <Image style={[{paddingTop : 15,width: 22,height: 22}]} source={props.isCheckedFirst? props.radioBtnCheckedImg : props.radioBtnUnCheckedImg} />          
            </TouchableOpacity>
        </View>
         <View style = {{paddingRight : 35,paddingTop : 15}}>         
            <Text style={[ globalStyles.subordinateTxt]}>Gas</Text>
        </View>  
         <View>
            <TouchableOpacity style = {{padding:10}} onPress = {props.radioSecndBtnEventHandle}>            
                <Image style={[{width: 22 , height: 22}]} source={(props.isCheckedSecond)? props.radioBtnCheckedImg : props.radioBtnUnCheckedImg} />            
            </TouchableOpacity>
         </View>   
        <View style = {{paddingRight : 10,paddingTop : 15}}>         
          <Text style={[globalStyles.subordinateTxt]}>Electric</Text>  
        </View> 
    </View>
      
   );

}

const styles = StyleSheet.create ({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
  button: {
      borderWidth: 1,
      padding: 25,
      borderColor: 'black'
  }
});

export default CustomRadioButton;
