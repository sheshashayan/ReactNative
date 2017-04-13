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

const CustomRadioButton1 = (props) =>  {
   return (
   	<View style = {{flex :1, flexDirection : 'row', paddingLeft : 10, paddingTop : 10}}>

          <TouchableOpacity onPress = {props.radioFirstBtnEventHandle}> 
          <Image style={[{paddingTop : 15}]} source={props.isCheckedFirst? props.radioBtnCheckedImg : props.radioBtnUnCheckedImg} />
          </TouchableOpacity>
          
          <Text style={[ globalStyles.subordinateTxt,{paddingLeft : 10,paddingRight : 40}]}>Ascending</Text>

          <TouchableOpacity onPress = {props.radioSecndBtnEventHandle}> 
          <Image style={[{}]} source={(props.isCheckedSecond)? props.radioBtnCheckedImg : props.radioBtnUnCheckedImg} />
          </TouchableOpacity>

          <Text style={[globalStyles.subordinateTxt,{paddingLeft : 10,paddingRight : 40}]}>Descending</Text>  
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

export default CustomRadioButton1;
