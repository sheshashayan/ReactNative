//'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View, 
  Alert,
  Text,
  TouchableOpacity,
  Button
   } from 'react-native';

import PopupDialog from 'react-native-popup-dialog';


export default class CustomisedPopup extends Component {


  constructor(props) {
    super(props);
  
    this.state = {};
  }


  render() {

    return (
    <View style={styles.container}>

          <View style = {[styles.filterViewStyle]}>
                  <TouchableOpacity  onPress = { () => { this.popupDialog.openDialog(); }} >
                          <Text style= {styles.btnTextViewStyle}>Filter Options</Text>    
                   </TouchableOpacity> 
          </View>  

          <PopupDialog ref={(popupDialog) => { this.popupDialog = popupDialog; }} >
                         
                <View style = {styles.popupTxtView}>
                  <Text style={styles.popupTxt}> 
                  Sorry, guest users cant access that document. Would you like to login using HVAC Partners login?
                  </Text>
                </View>

                <View  style = {styles.popupBtnContainer}>
                    <TouchableOpacity >
                            <Text style= {styles.popupBtnTxt}>HVAC Partners Login</Text>    
                     </TouchableOpacity> 
                </View>
                

                <View  style = {styles.popupBtnContainer}>
                    <TouchableOpacity >
                            <Text style= {styles.popupBtnTxt}>Continue as Guest</Text>    
                     </TouchableOpacity> 
                </View>

          </PopupDialog>

    </View>

        
     	
    );
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: '#f7f7f7',
    flexDirection : "column"
  },
  
  popupTxt: {
    padding: 20,
    justifyContent : 'center'
    //borderBottomWidth: 4,
  },

  filterViewStyle :{
    paddingLeft: 10,
    paddingTop: 20,
    borderBottomWidth : 0.5,
    borderColor : "black"
  },

   btnTextViewStyle: {
    paddingTop : 5,
    paddingBottom : 5,
    color : "black",
  },

  popupBtnContainer: {
    marginTop : 25, 
    marginLeft: 50, 
    marginRight : 50, 
    padding: 10, 
    borderRadius : 30, 
    backgroundColor : "#57a3e2"

  },

  popupTxtView: {
    justifyContent : 'center', 
    alignItems : "center"
  },

  popupBtnTxt: {
    textAlign : 'center',
    color : "#FFFFFF",

  }

  
});




