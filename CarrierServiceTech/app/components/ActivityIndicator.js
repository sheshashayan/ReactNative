
/**
 * # CarrierActivityIndicator.js
 * This class is used to Activity Indicator and disable/enable the UI events
 * Author: Ashish
 */

import React, { Component } from 'react';
import {
   ActivityIndicator,
   View,
   StyleSheet,
   Dimensions,
   Modal
} from 'react-native';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;
var indicatorWidth = 125;//deviceWidth*3/4;
var indicatorHeight = 125;

let singletonObj = null;
export default class CarrierActivityIndicator extends Component {
   constructor(props) {
	  super(props);
	  
	  if(!singletonObj){
      singletonObj = this;
      this.state = {showActivityIndicator:false}
      this.startActivity = this.startActivity.bind(this);
      this.stopActivity = this.stopActivity.bind(this);
    }
    
    return singletonObj;
	}
  
  isActivityStarted(){
    return this.state.showActivityIndicator;
  }
  startActivity(){
    this.setState({showActivityIndicator:true})
  }

  stopActivity(){
    this.setState({showActivityIndicator:false})
    
  }

   render(){
   return (
      this.state.showActivityIndicator ?(
        <View style = {styles.container}>
            <View style = {styles.topView} />
            
            <View style = {styles.indicatorView}>
                <ActivityIndicator animating = {true}
                    style = {styles.activityIndicator} size = "large"
                    color = 'white'
                />
            </View>
        </View>):null
   );
} 
}

const styles = StyleSheet.create ({
  container:{
    position: 'absolute',
      width: deviceWidth,
      height:deviceHeight,
      top: 0,
      left: 0,
      justifyContent: 'center',
      alignItems: 'center',
      
  },

   topView: {
     position: 'absolute',
      width: deviceWidth,
      height: deviceHeight,
      top: 0,
      left: 0,
      opacity:0.5,
      backgroundColor : 'black',
      flex:1,
   },
   activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      opacity:1,
   },

   indicatorView: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'rgba(0,0,0,0.5)',
      borderRadius : 30,
      width:indicatorWidth,
      height:indicatorHeight,
      top: (deviceHeight - indicatorHeight)/2,
      left: (deviceWidth - indicatorWidth)/2,
      opacity:1,
   }
   
})