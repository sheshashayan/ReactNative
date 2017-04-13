/*
 Author: Rakesh
 Carrier service handle: commom class to handle web service boilerplate code
 Defined all service method like GET, POST, PUT, DELETE
 */

import * as urlConfig from '../lib/UrlConfig';
import { Alert } from 'react-native';
import * as stringConstant from '../constants/StringConstant';


class CarrierServiceHandler{

    static get(url, header, responseHandler) {
        this.getData(url, null, 'GET', header, responseHandler);
    }

    static post(url, params, header, responseHandler) {
        this.getData(url, params, "POST", header, responseHandler)
    }

    static getData = (url, params, type, header, responseHandler) => {
        const host = urlConfig.carrierServiceUrl.HOST_URL
        const serviceUrl = `${host}${url}`
        var xhttp = new XMLHttpRequest();
        xhttp.open(type, serviceUrl, true);

        xhttp.setRequestHeader('Authorization', header);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded','');
        xhttp.send(params);

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4) {
                if(xhttp.response){ 
                    
                    if(this.status === 200){
                        var jsonResponse = JSON.parse(xhttp.response);
                         responseHandler(jsonResponse, null);
                    }else{
                        responseHandler(null,stringConstant.carrierConstClass.NETWORK_SERVICE_ERROR);
                    }
                }else{ 
                        responseHandler(null, stringConstant.carrierConstClass.NETWORK_ERROR);
                }
            }
        }
    };

    /*
     Common handler for sharedService host
     */

    static getSharedService(url, paramater, responseHandler) {
        this.getDataFromSharedService(url, null, 'GET', responseHandler);
    }

    static postSharedService(url, params, header, responseHandler) {
        this.getDataFromSharedService(url, params, "POST", header, responseHandler)
    }
    
    static getDataFromSharedService = (url, params, type, responseHandler) => {
         const host = urlConfig.carrierServiceUrl.SHARED_SERVICE_HOST
        const serviceUrl = `${host}${url}`
        var xhttp = new XMLHttpRequest();
        xhttp.open(type, serviceUrl, true);
        xhttp.send(null);

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4) {

                if(xhttp.response){ 
                    if(this.status === 200){
                        var jsonResponse = JSON.parse(xhttp.response);
                        responseHandler(jsonResponse, null);
                    }else{
                        responseHandler(null,stringConstant.carrierConstClass.NETWORK_SERVICE_ERROR);
                    }
                }else{ 
                    responseHandler(null,stringConstant.carrierConstClass.NETWORK_ERROR);
                }
            }
        }
    };

/*
  Handle login service to get 
*/

    static postLogin(url, params, header, responseHandler) {
        this.fetchLoginService(url, params, "POST", header, responseHandler)
    }
    
    static fetchLoginService = (url, params, type, header, responseHandler) => {
        const host = urlConfig.carrierServiceUrl.HOST_URL
        const serviceUrl = `${host}${url}`
        var xhttp = new XMLHttpRequest();
        xhttp.open(type, serviceUrl, true);

        xhttp.setRequestHeader('Authorization', header);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded','');
        xhttp.send(params);

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4) {
                var jsonResponse = JSON.parse(xhttp.response);
                if(this.status === 200){
                    responseHandler(jsonResponse, null);
                }else{
                    responseHandler(null,jsonResponse.response[0].error[0].message);
                }
            }
        }
    };
}

export default CarrierServiceHandler;