/**
 * # WarrantyService.js
 *Author: Rakesh
 * Define and handled the network call for Warranty pages
 *  error message is displayed to the user,incase network fail
 *
 */
'use strict'
import React, { Component } from 'react';
import CarrierServiceHandler from '../lib/CarrierServiceHandler'
import ActivityIndicator from "../components/ActivityIndicator";
import * as stringConstant from '../constants/StringConstant';
import * as urlCOnfig from '../lib/UrlConfig';
import { Alert } from 'react-native';
import {CheckAndSaveAuthToken} from "../lib/CarrierAuthTokenService";


class WarrantyService extends Component{

    constructor(props){
        super(props);
        var modelNumber = null;
    }

    GetWarrantyInfo = (responseHandler) => {
        CheckAndSaveAuthToken(this.callBackHandlerForAuthToken, responseHandler) 
    }

    callBackHandlerForAuthToken = (accessToken, responseHandler) =>{

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', 'https://staging-services.ccs.utc.com/apps/warranty/lookup', true);
        var envelope ='<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns="http://servicebench.com/entitlement/product/service/types">'+ 
                '<soap:Body>'+
                    '<EntitlementRequest>'+
                        '<version>1.0</version>'+
                        '<sourceSystemName>Ext</sourceSystemName>'+
                        '<sourceSystemVersion></sourceSystemVersion>'+
                        '<serviceAdministrator>92</serviceAdministrator>'+
                        '<modelNumber>24ABC648A003</modelNumber>'+
                        '<serialNumber>4610E09781</serialNumber>'+
                        '<firstName/>'+
                        '<lastName/>'+
                        '<phone/>'+
                        '<serviceContractNumber/>'+
                        '<purchaseDate/>'+
                        '<purchasedFrom/>'+
                    '</EntitlementRequest>'+
                '</soap:Body>'+
                '</soap:Envelope>';


                    xmlhttp.onreadystatechange = function () {
                    
                    if (xmlhttp.readyState == 4) {
                            if (xmlhttp.status == 200) {
                            var jsonResponse = JSON.parse(xmlhttp.response);
                            let activityIndicator = new ActivityIndicator();
                            activityIndicator.stopActivity();
                            responseHandler(jsonResponse, null);
                    } //if Not 200
                    else{
                            let activityIndicator = new ActivityIndicator();
                            activityIndicator.stopActivity();
                            responseHandler(null, stringConstant.carrierConstClass.NETWORK_SERVICE_ERROR);	 
                        }
                    }
                }
                
                xmlhttp.setRequestHeader('Authorization', 'Bearer ' + accessToken,'');
                xmlhttp.setRequestHeader('Content-Type', 'text/xml;charset=UTF-8','');
                xmlhttp.setRequestHeader('responseType', 'json','');
                xmlhttp.setRequestHeader('soapAction', 'http://servicebench.com/entitlement/product/service/ProductEntitlementServicePortType/EntitlementRequest','');
                xmlhttp.send(envelope);
        }        
}


export default WarrantyService;