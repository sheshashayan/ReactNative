

import CarrierServiceHandler from '../lib/CarrierServiceHandler'
import * as urlCOnfig from '../lib/UrlConfig';
import {showAlert} from "../lib/CarrierAlert";
import ActivityIndicator from "../components/ActivityIndicator";
import { AsyncStorage,ListView, } from 'react-native';


const CheckAndSaveAuthToken = (callBackHandler, responseHandler) =>{

    AsyncStorage.getItem("AuthTokenTimeStamp").then((value) => {
      if(value){
            var lStoredTimeStamp = JSON.parse(value);
            var lDateInObjFormat = new Date(lStoredTimeStamp);
            
            var lCurrentDate = new Date();
            var lDiffinDates = lCurrentDate - lDateInObjFormat;
            
            var lDiffInMinutes = Math.round(((lDiffinDates % 86400000) % 3600000) / 60000);
           
            if(lDiffInMinutes >= 19){
                getAuthToken(callBackHandler, responseHandler);
            }
            else{
                  AsyncStorage.getItem("AuthToken").then((accessToken) => {
                      callBackHandler(accessToken, responseHandler);
                  }).done()   
            }               
      }
      else{
        getAuthToken(callBackHandler, responseHandler);
      }
    }).done()   
}

const getAuthToken = (callBackHandler,responseHandler) => { 

    let parameter = "username=app_service_tech" +'&' + "password=2!1kX2opNSFvJ9ZbLlZI52bXf[bdTE5x" +'&'+ "grant_type=password"
    let header = 'Basic bDd4eGU3YTA2MjkwNGExMTQ3YWE5NmFjZjUxMTM5YzJiZjYyOjczZmYxYzNlYzQ3MTQ0NDc5YTVjN2ZlZjZmNzRkOGZk';
    let url = urlCOnfig.carrierServiceUrl.AUTH_TOKEN_URL
    CarrierServiceHandler.post(url, parameter, header, (jsonResponse, errMsg) => {

        if(jsonResponse === null){
            showAlert(errMsg);  
        }else{

            var lAccesstoken = jsonResponse.access_token;
            var lCurrentDate = Date();
            AsyncStorage.setItem("AuthTokenTimeStamp", JSON.stringify(lCurrentDate)); 
            AsyncStorage.setItem("AuthToken", lAccesstoken); 
            callBackHandler(lAccesstoken, responseHandler);
        }   
    });
}

module.exports = {CheckAndSaveAuthToken}