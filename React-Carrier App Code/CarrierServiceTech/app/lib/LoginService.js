/**
 * # LoginService.js
 *
 * Define and handled network call for HVAC login 
 *  error message is displayed to the user
 *
 */
'use strict'

/**
 * ## Imports
 *
 * login
 *
 */

import CarrierServiceHandler from '../lib/CarrierServiceHandler'
import SideMenu from '../components/SideMenu';
import HvacPartnersLogin from "../components/HvacPartnersLogin";
import {showAlert} from "../lib/CarrierAlert";
import ActivityIndicator from "../components/ActivityIndicator";
import * as stringConstant from '../constants/StringConstant';
import * as urlCOnfig from '../lib/UrlConfig';

import { Alert } from 'react-native';


 const CallHvacLogin = (Userinfo) => {
            var luser = Userinfo.state.email;
            var lPAssword = Userinfo.state.password;
            var lIsl = Userinfo.state.isLoading;
            let url = urlCOnfig.carrierServiceUrl.LOGIN

            let parameter = "USER=" + luser + "&PASSWORD=" + lPAssword;
            CarrierServiceHandler.postLogin(url, parameter, null, (jsonResponse, errMsg) =>{
                console.log(jsonResponse)
                if(jsonResponse === null){
                    showAlert(errMsg);  
                }else{
                    let sideMenu = new SideMenu();
                    sideMenu.setupLogoutBtnText(stringConstant.carrierConstClass.LOGOUT);
                    Userinfo.props.navigator.immediatelyResetRouteStack([{
                    name: 'MainSearchView',
                    title: 'Search for a Product',
                    isHidden:false,
                    passProps: {LogOutText: "Login"}
                    }]);
                }
            });            
          } 

module.exports = {CallHvacLogin}
