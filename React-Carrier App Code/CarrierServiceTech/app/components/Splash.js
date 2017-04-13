/**
 * Splash for carrierServiceTech App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';


export default class Splash extends Component {
  render() {
    return (

      <View style = {{flex :1, backgroundColor : "#f7f7f7", justifyContent : "center", alignItems : "center"}}>
      <Image
          style={{ width : 220, height : 90}}
          source={require('../resources/images/carrierLogo.png')} />           
      </View>


    );
  }
}