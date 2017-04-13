import React, { Component } from 'react';
import HvacPartnersLogin from "./HvacPartnersLogin";
import { Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import * as stringConstant from '../constants/StringConstant';
import SideMenu from './SideMenu';
import ActivityIndicator from "./ActivityIndicator";

const CallHvacLogin = (Userinfo,setStateFunc) => {
  let activityIndicator = new ActivityIndicator();
            var luser = Userinfo.state.email;
            var lPAssword = Userinfo.state.password;
            var lIsl = Userinfo.state.isLoading;
              
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
              
            if (this.readyState === 4){
                if(xhttp.response){

                    var jsonResponse = JSON.parse(xhttp.response);
                  
                  if(this.status === 200){
                    let sideMenu = new SideMenu();
                    
                    activityIndicator.stopActivity();
		            sideMenu.setupLogoutBtnText(stringConstant.carrierConstClass.LOGOUT);
                   Userinfo.props.navigator.immediatelyResetRouteStack([{
                   name: 'MainSearchView',
                   title: 'Search for a Product',
                   isHidden:false,
                   passProps: {LogOutText: "Login"}
                    }]);
                    
                  }
                  else{
                        CommonAlertForSearch(Userinfo,jsonResponse.response[0].error[0].message)
                      }
                }
              	else{
                        CommonAlertForSearch(Userinfo,"Network error. Please try later.")
                      }

			           	}
               
            };
            xhttp.open("POST", "https://staging-services.ccs.utc.com/authenticate", true);
            xhttp.setRequestHeader('Content-Type' : 'application/x-www-form-urlencoded','');
            xhttp.send("USER=" + luser + "&PASSWORD=" + lPAssword);
              
      
    }

const CallCategory = (pSearchobj,pAccesstoken) => {
  let activityIndicator = new ActivityIndicator();
      var lCategoryData = [];
      var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
            
          if (this.readyState === 4){
                
              if(this.status === 200){

                  var jsonResponse = JSON.parse(xhttp.responseText);
              	  if(jsonResponse && jsonResponse.items.length){

                     activityIndicator.stopActivity();
                     
                     pSearchobj.props.navigator.push({
		         		     name:'ProductCategoryReference',
		          		   title:'Search by Product Category',
		          		   isHidden:false,
		          		   passProps : {CategoryData: jsonResponse.items}
                     });
                   
                  }
            	    else{
                        CommonAlertForSearch(pSearchobj,"Category Data not found.")
                  }

              } 
              else{
                  CommonAlertForSearch(pSearchobj,"Network error. Please try later.")
              }
          }

    }
    var lAuthorization = "Bearer " + pAccesstoken;
    xhttp.open("GET", "https://staging-services.ccs.utc.com/apps/catalog/categories", true);
    xhttp.setRequestHeader('Authorization', lAuthorization,'');
    xhttp.send();
}
  
const CallAuthToken = (pSearchobj) => { 

              var xmlhttp = new XMLHttpRequest();
              xmlhttp.open('POST', 'https://staging-services.ccs.utc.com/auth/realms/hvac/tokens/grants/access', true);
   
     
                xmlhttp.onreadystatechange = function () {
                  
                if (xmlhttp.readyState == 4) {
                  if (xmlhttp.status == 200) {

                        var lJsonResponse = JSON.parse(xmlhttp.responseText);
                        if(lJsonResponse && lJsonResponse.access_token){
                          var lAccesstoken = lJsonResponse.access_token;
                          CallCategory(pSearchobj,lAccesstoken)
                        }
                        else{
                              CommonAlertForSearch(pSearchobj,"Network error. Please try later.")
                        }
                        
                  }
                  else{
                        CommonAlertForSearch(pSearchobj,"Network error. Please try later.")
                  }
                }
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Authorization', 'Basic bDd4eGU3YTA2MjkwNGExMTQ3YWE5NmFjZjUxMTM5YzJiZjYyOjczZmYxYzNlYzQ3MTQ0NDc5YTVjN2ZlZjZmNzRkOGZk','');
            xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded','');
            xmlhttp.send("username=app_service_tech" +'&' + "password=2!1kX2opNSFvJ9ZbLlZI52bXf[bdTE5x" +'&'+ "grant_type=password") ;
          
      
}

const CommonAlertForSearch = (pSearchobj,pMessage) =>{
  let activityIndicator = new ActivityIndicator();
    Alert.alert('Alert', pMessage,
                        [{text: 'OK', onPress: () => { activityIndicator.stopActivity();  }} ],
                        { cancelable: false })

}

module.exports = { CallHvacLogin, CallCategory,CallAuthToken}
