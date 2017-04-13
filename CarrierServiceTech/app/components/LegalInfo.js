/**
 * LegalInfo.js
 * This class is used to show the legal info
 * Author: Girija
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Linking,
  ScrollView
} from 'react-native';
import Router from "./Router";
import * as stringConstant from '../constants/StringConstant';
import * as dataResource from './dataResource';
import BackNavComponent from "./BackNavComponent";


const backNavText = stringConstant.carrierConstClass.LEGAL_PAGE_BACK_BUTTON;

class LegalInfo extends Component {

  constructor(props) {
    super(props); 
  };
      
  render() {  
    return (
      <View style = {styles.container} >    
        <View style = {[styles.backNavBtnStyle]}>
            <TouchableOpacity onPress = { this.backToPage }>
              <BackNavComponent 
                    backNavText = {backNavText} />
            </TouchableOpacity>     
        </View>
           
        <View style = {styles.topContainer}>
         <ScrollView>
         <Text style={styles.headerTextStyle}>Version 1.4.0{"\n"}{"\n"}</Text>

         <Text style={styles.subTextStyle}>No warranty, either expressed or implied, is given with respect to the accuracy or the sufficiency of the information provided hereby, and the user must assume all risks and responsibility in connection with the use thereof.{"\n"}{"\n"}
         Carrier is a part of UTC Building & Industrial Systems, a unit of United Technologies Corp.{"\n"}{"\n"}
         (c) United Technologies Corporation 2014. All rights reserved. This program is protected by US and International copyright laws.{"\n"}{"\n"}
         All trademarks are the property of their respective owners.{"\n"}{"\n"}
         To view the privacy policy, please visit</Text>
         <Text style={{color: 'blue'}}
            onPress={() => Linking.openURL('http://mobiledocs.carrier.com/privacypolicy/carrier_mobile_privacypolicy_20160425.pdf')}>
            http://mobiledocs.carrier.com/privacypolicy/carrier_mobile_privacypolicy_20160425.pdf {"\n"}{"\n"}
         </Text>
         <Text>To view the end user license agreement, please visit</Text>
         <Text style={{color: 'blue'}}
            onPress={() => Linking.openURL('http://mobiledocs.carrier.com/eula/carrierservicetech_eula_20160426.pdf')}>
            http://mobiledocs.carrier.com/eula/carrierservicetech_eula_20160426.pdf
         </Text>
       
       </ScrollView>
        </View>
   </View>	
    );
  }

/**
  * backToPage
  * Purpose: This function is used to do the navigation from legal info to other 
  * Author: Girija
  */
   backToPage = () =>{
        this.props.navigator.pop();
  }

 
}

const styles = StyleSheet.create({
 container:{
    flex : 1,
    flexDirection : "column",
    justifyContent : "flex-start",
    backgroundColor : "#F6F6F6",
    paddingTop: 64, 
  },
  topContainer: {
    flex:1, 
    flexDirection : "column",
    paddingTop : 5,
    paddingLeft:10,
    paddingRight:5
  },
  headerTextStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily : "Montserrat",
    marginTop: 20,
    color:'#213450',
    
  },
  subTextStyle:{
    fontSize : 14, 
    fontWeight : "normal", 
    fontFamily : "Montserrat",
    color : "#6A6A6A",
  }
  
});

export default LegalInfo;