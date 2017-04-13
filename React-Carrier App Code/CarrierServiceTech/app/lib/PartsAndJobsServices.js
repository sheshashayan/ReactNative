/**
 * # Parts&Jobs Services.js
 *
 * Define and handled network call for Parts and Jobs 
 *  error message is displayed to the user
 *
 */

import CarrierServiceHandler from './ProductSearchService'
import {showAlert} from "../lib/CarrierAlert";
import {CheckAndSaveAuthToken} from "../lib/CarrierAuthTokenService";
import * as stringConstant from '../constants/StringConstant';

/**
     * # startJobsService
     * Purpose: This function will start for job services
     * Author: Devendra Kumar
     * Input Param:
     * Output Param:
     */
const startJobsService = (jobServiceType, callBackFunction) =>{

    var jobServiceFunction = null;
    switch(jobServiceType){

        case stringConstant.carrierConstClass.GET_JOB_SERVICES:
            jobServiceFunction = this.getJobs;
            break;

        default :
            break;

    }
     CheckAndSaveAuthToken(jobServiceFunction, callBackFunction)

}

/**
     * # getJobs
     * Purpose: This function will start for job services
     * Author: Devendra Kumar
     * Input Param:
     * Output Param:
     */
getJobs = (pAuthToken, responseHandler) => {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://staging-services.ccs.utc.com/apps/technician/carrier', true);

    var envelope = '<?xml version="1.0" encoding="utf-8"?>' +
                '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mob="http://mobiletech">' + 
                    '<soapenv:Header/>' +
                        '<soapenv:Body>' +
                            '<mob:getJobs soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">'+
                                '<UDID xsi:type="xsd:string">test12345</UDID>'+
                            '</mob:getJobs>'+
                        '</soapenv:Body>'+
                    '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            
            if (xmlhttp.status == 200) {
                var jsonResponse = JSON.parse(xmlhttp.response);

                responseHandler(jsonResponse)
            }
            else{
                showAlert("Network error. Please try later.");
            }
        }
    }
    
    // Send the POST request
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + pAuthToken,'');
    xmlhttp.setRequestHeader('Content-Type', 'text/xml;charset=UTF-8','');
    xmlhttp.setRequestHeader('soapAction', 'http://ccsusmobwsvctw.cloudapp.net/mobiletech/carrier_mobile_interface.cfc/carrier_mobile_interface_wrap/getJobsRequest','');
    xmlhttp.setRequestHeader('responseType', 'json','');
    xmlhttp.send(envelope);
}



/**
     * # getJobs
     * Purpose: This function will start for job services
     * Author: Devendra Kumar
     * Input Param:
     * Output Param:
     */
const insertOrUpdateJob = (callerObj,pAuthToken) => {
    //Not yet started
    
}

/**
     * # getJobs
     * Purpose: This function will start for job services
     * Author: Devendra Kumar
     * Input Param:
     * Output Param:
     */
const getJobParts = (callerObj,pAuthToken) => {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://staging-services.ccs.utc.com/apps/technician/carrier', true);

    var envelope = '<?xml version="1.0" encoding="utf-8"?>' +
                '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mob="http://mobiletech">' + 
                    '<soapenv:Header/>' +
                        '<soapenv:Body>' +
                            '<mob:getJobParts soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
                                '<UDID xsi:type="xsd:string">12345</UDID>'+
                                '<JobID xsi:type="xsd:string">'+ callerObj.props.jobId +'</JobID>' +
                            '</mob:getJobParts>'+
                        '</soapenv:Body>'+
                    '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
                 
            if (xmlhttp.status == 200) {
                callerObj.updateJobListView('Succedded');
                showAlert(xmlhttp.responseText);
            }
            else{
                showAlert("Failed with status : "+xmlhttp.status);
            }
        }
    }
    
    // Send the POST request
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + pAuthToken,'');
    xmlhttp.setRequestHeader('Content-Type', 'text/xml;charset=UTF-8','');
    xmlhttp.setRequestHeader('responseType', 'json','');
    xmlhttp.send(envelope);
}

/**
     * # getJobs
     * Purpose: This function will start for job services
     * Author: Devendra Kumar
     * Input Param:
     * Output Param:
     */
const deleteJobs = (callerObj,pAuthToken) => {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://staging-services.ccs.utc.com/apps/technician/carrier', true);

    var envelope = '<?xml version="1.0" encoding="utf-8"?>' +
                '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mob="http://mobiletech">' + 
                    '<soapenv:Header/>' +
                        '<soapenv:Body>' +
                            '<mob:deleteJob soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
                                '<UDID xsi:type="xsd:string">12345</UDID>'+
                                '<JobID xsi:type="xsd:string">'+ callerObj.props.jobId +'</JobID>' +
                            '</mob:deleteJob>'+
                        '</soapenv:Body>'+
                    '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
                 
            if (xmlhttp.status == 200) {
                callerObj.updateJobListView('Succedded');
                showAlert(xmlhttp.responseText);
            }
            else{
                showAlert("Failed with status : "+xmlhttp.status);
            }
        }
    }
    
    // Send the POST request
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + pAuthToken,'');
    xmlhttp.setRequestHeader('Content-Type', 'text/xml;charset=UTF-8','');
    xmlhttp.setRequestHeader('responseType', 'json','');
    xmlhttp.send(envelope);
}

/**
     * # getJobs
     * Purpose: This function will start for job services
     * Author: Devendra Kumar
     * Input Param:
     * Output Param:
     */
const deleteJobsParts = (callerObj,pAuthToken) => {

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://staging-services.ccs.utc.com/apps/technician/carrier', true);

    var envelope = '<?xml version="1.0" encoding="utf-8"?>' +
                '<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mob="http://mobiletech">' + 
                    '<soapenv:Header/>' +
                        '<soapenv:Body>' +
                            '<mob:deleteJobParts soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">' +
                                '<UDID xsi:type="xsd:string">12345</UDID>'+
                                '<JobID xsi:type="xsd:string">'+ callerObj.props.jobId +'</JobID>' +
                                '<JobPartsID xsi:type="xsd:string">'+ callerObj.props.jobPartsId +'</JobPartsID>' +
                            '</mob:deleteJobParts>'+
                        '</soapenv:Body>'+
                    '</soapenv:Envelope>';

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
                 
            if (xmlhttp.status == 200) {
                callerObj.updateJobListView('Succedded');
                showAlert(xmlhttp.responseText);
            }
            else{
                showAlert("Failed with status : "+xmlhttp.status);
            }
        }
    }
    
    // Send the POST request
    xmlhttp.setRequestHeader('Authorization', 'Bearer ' + pAuthToken,'');
    xmlhttp.setRequestHeader('Content-Type', 'text/xml;charset=UTF-8','');
    xmlhttp.setRequestHeader('responseType', 'json','');
    xmlhttp.send(envelope);
}


/**
     * # getAddressByLatLong
     * Purpose: This function will get latitude and longitude of device and returns current location details
     * Author: Devendra Kumar
     * Input Param: responseHandler
     * Output Param:
     */
const getAddressByLatLong = (responseHandler) =>{

     navigator.geolocation.getCurrentPosition(
        (position) => {
            var longitude = position.coords.longitude;
            var latitude = position.coords.latitude;
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open('POST', 'http://maps.googleapis.com/maps/api/geocode/json?latlng='+ latitude + "," + longitude + '&sensor=false', true);
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                        
                    if (xmlhttp.status == 200) {

                        var jsonResponse = JSON.parse(xmlhttp.response);
                        responseHandler(jsonResponse, null);
                    }
                    else{
                        responseHandler(null, stringConstant.carrierConstClass.LOCATION_ENABLE_MSG);
                    }
                }
            }
        
            // Send the POST request
            xmlhttp.send(null);
        },
        (error) => responseHandler(null, stringConstant.carrierConstClass.LOCATION_ENABLE_MSG),
        {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
    );
    
}

module.exports = {startJobsService, getAddressByLatLong}
