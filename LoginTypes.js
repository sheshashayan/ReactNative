
import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Text, Button, StatusBar, ScrollView, TouchableHighlight,

} from 'react-native';


import * as stringConstant from '../constants/StringConstant';
import SideMenu from "./SideMenu";
import Splash from "./Splash";
import HvacPartnersLogin from "./HvacPartnersLogin";
import GuestSignup from "./GuestSignup";
import {globalStyles, deviceFinder} from "./globalStyles"; 
import LinearGradient from 'react-native-linear-gradient';

export default class LoginTypesIpad extends Component {

  	constructor(props) {
  	  super(props);
  	  this.state = {};

  	}


render() {

return (
  	<View style = {[globalStyles.CompContainer,{flex : 1, flexDirection : 'column',justifyContent : 'space-around', alignItems : "stretch"}]}>

		    <View style = {{paddingTop: 80, paddingBottom : 40, flex :1, flexDirection : 'row', justifyContent : 'center'}}>
		      <Image
	          style={styles.guestSignupImage}
	          source={require('../resources/images/carrierLogo.png')} />
	        </View>


	      	<View style = {[{flex :3, flexDirection : 'column', justifyContent : 'center'}]} >

	      	    <View style = {[{flex: 0.5, flexDirection : 'column',alignItems : "center",paddingTop : 20}]}>
			          	<Text style = {[globalStyles.headerTxt4, {color : "#06273F"}]}>Guest login will grant you access to some </Text>
			          	<Text style = {[globalStyles.headerTxt4, {color : "#06273F"}]}>of the features within the app. You can </Text>
			          	<Text style = {[globalStyles.headerTxt4, {color : "#06273F"}]}>always login through HVAC Partners </Text>
			          	<Text style = {[globalStyles.headerTxt4, {color : "#06273F"}]}>within the app under user settings.</Text>
	            </View>


	          	<View style = {[{flex: 2}]}>
	             	<TouchableHighlight style={[globalStyles.globalBtnStyle, styles.HVACBtnStyle]} onPress =  {this.LoginAsHvacPartner}>
	             		<View style={[]}>
	                    	<Text style= {[globalStyles.globalBtnTextViewStyle]}>Login through HVAC Partners</Text>
			           </View>
					</TouchableHighlight>

					<TouchableHighlight style={[globalStyles.globalBtnStyle, styles.guestLoginBtnStyle]} onPress =  {this.LoginAsGuest}>
						<View style={[]}>
						  <Text style={[globalStyles.globalBtnTextViewStyle]}>
						    Login as a Guest
						  </Text>
						</View>
					</TouchableHighlight>

	        	</View>

	    	</View>

  </View>
);


}


	LoginAsHvacPartner = () => {

	//alert("login as HVAC...");
	// body...

	 this.props.navigator.push({
          name: 'HvacPartnersLogin',
          title: 'HvacPartnersLogin',
          isHidden:true
        }); 
        /*
        this.props.navigator.push(
        {
         name:'GlobalLiterature',
         title:'Literature',
         isHidden:false
        } );
        */

	}


	LoginAsGuest = () => {

		//alert("login as guest...");
		// body...
		/*this.props.navigator.push({
          name: 'GuestSignup',
          title: 'GuestSignup',
          isHidden:true
        });*/
				let sideMenu = new SideMenu();
				sideMenu.setupLogoutBtnText(stringConstant.carrierConstClass.LOGINAS_HVAC_PARTNERS);
        this.props.navigator.push({
         name: 'MainSearchView',
          title: 'Search for a Product',
          isHidden:false
      });
	}


}

const styles = StyleSheet.create({

	guestSignupImage : {
  	width : 220,
  	height : 90
 	},

 	HVACBtnStyle: {
 		marginTop : 20,

 	},
 	guestLoginBtnStyle: {
 		marginTop : 40,

 	}
});
