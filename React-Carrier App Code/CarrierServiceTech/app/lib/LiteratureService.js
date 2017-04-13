/**
 * # LiteratureService.js
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


const CallLiteratureInfo = (LiteratureInfo) => {

    var lformat = "json";
    var lClientKey = "060213d4-b9a0-42bb-8833-d28f686fc79e";
    var lModelNumbers = LiteratureInfo.state.inputValue;
    var lStatus       = "All";
    

    let parameter = "format=" + lformat + "&ClientKey=" + lClientKey + "&ModelNumbers=" + lModelNumbers + "&Status=" + lStatus;
    let url = urlCOnfig.carrierServiceUrl.LITERATURE_INFO + parameter;

    CarrierServiceHandler.getSharedService(url, parameter, (jsonResponse, errMsg) =>{
        console.log(jsonResponse)
        if(jsonResponse === null){
            showAlert(errMsg);
        }else{
                if(jsonResponse.Documents && jsonResponse.Documents.length){
                    LiteratureInfo.completionHandler(jsonResponse);
                }
                else{
                     CallLiteratureInfoSearchByKeyword(LiteratureInfo);
                }
        }
    });
}
const CallLiteratureInfoSearchByKeyword = (LiteratureInfo) => {

    var lformat = "json";
    var lClientKey = "060213d4-b9a0-42bb-8833-d28f686fc79e";
    var lKeyword = LiteratureInfo.state.inputValue;
    var lStatus       = "All";
    
    let parameter = "format=" + lformat + "&ClientKey=" + lClientKey + "&DocumentTitle=" + lKeyword + "&Status=" + lStatus;
    let url = urlCOnfig.carrierServiceUrl.LITERATURE_INFO + parameter;

    CarrierServiceHandler.getSharedService(url, parameter, (jsonResponse, errMsg) =>{
        
        if(jsonResponse === null){
            showAlert(errMsg);
        }else{
                if(jsonResponse.Documents && jsonResponse.Documents.length){
                    LiteratureInfo.completionHandler(jsonResponse);
                }
                else{
                        alert("No Literatures found for the entered model number. Please check the model number.")
                        let activityIndicator = new ActivityIndicator();
                        activityIndicator.stopActivity();
                }
        }
    });

}
const CallLiteratureInfoAll = (LiteratureInfo,pTitle,pModelInfo) => {

    var lformat = "json";
    var lClientKey = "060213d4-b9a0-42bb-8833-d28f686fc79e";
    var lStatus       = "All";
    let parameter = "format=" + lformat + "&ClientKey=" + lClientKey + "&ModelNumbers=" + pModelInfo + "&Status=" + lStatus;

    let url = urlCOnfig.carrierServiceUrl.LITERATURE_INFO + parameter;

    console.log(url)

    CarrierServiceHandler.getSharedService(url, parameter, (jsonResponse, errMsg) =>{
        console.log(jsonResponse)
        if(jsonResponse === null){
            showAlert(errMsg);
        }else{
            if(jsonResponse.Documents && jsonResponse.Documents.length){
                alert("jsonResponse"+jsonResponse);

                LiteratureInfo.completionHandler(jsonResponse);
            }
            else{
                
            }
        }
    });
}

const CallLiteratureInfoType = (LiteratureInfo,pTitle,PmodelNumber,pType) => {

    var lformat = "json";
    var lClientKey = "060213d4-b9a0-42bb-8833-d28f686fc79e";
    
    var lStatus       = "All";

    let parameter = "format=" + lformat + "&ClientKey=" + lClientKey + "&ModelNumbers=" + "25" + "&Status=" + lStatus;
    let url = urlCOnfig.carrierServiceUrl.LITERATURE_INFO + parameter;
    console.log(url)
    CarrierServiceHandler.getSharedService(url, parameter, (jsonResponse, errMsg) =>{
        
        if(jsonResponse === null){
            showAlert(errMsg);
        }else{
            
            console.log(JSON.stringify(jsonResponse))
            if(jsonResponse.Documents && jsonResponse.Documents.length){
                LiteratureInfo.completionHandler(jsonResponse);
            }
            else{
               alert("No Literatures are present for this product.")
               let activityIndicator = new ActivityIndicator();
                activityIndicator.stopActivity();
            }
        }
    });
}


module.exports = {CallLiteratureInfo,CallLiteratureInfoType,CallLiteratureInfoAll}
