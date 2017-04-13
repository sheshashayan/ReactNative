/**
 * # ProductSearchService.js
 *
 * Define and handled network call for main search view page 
 *  error message is displayed to the user
 *
 */
'use strict'

/**
 * ## Imports
 *
 * 
 *
 */
import CarrierServiceHandler from '../lib/CarrierServiceHandler'
import * as urlCOnfig from '../lib/UrlConfig';
import {showAlert} from "../lib/CarrierAlert";
import ActivityIndicator from "../components/ActivityIndicator";
import { AsyncStorage,ListView, } from 'react-native';

const CheckAndStoreAuthToken = (pSearchobj,pFunctiontoCall,pModelNo,pPartNo) =>{
    console.log("CheckAndStoreAuthToken  : pPartNo: "+pPartNo);
    AsyncStorage.getItem("AuthTokenTimeStamp").then((value) => {
      if(value){

            var lStoredTimeStamp = JSON.parse(value);
            var lDateInObjFormat = new Date(lStoredTimeStamp);
            
            var lCurrentDate = new Date();
            var lDiffinDates = lCurrentDate - lDateInObjFormat;
            
            var lDiffInMinutes = Math.round(((lDiffinDates % 86400000) % 3600000) / 60000);
           
            if(lDiffInMinutes >= 10){
                    CallAuthToken(pSearchobj,pFunctiontoCall,pModelNo,pPartNo);
            }
            else{
                  AsyncStorage.getItem("AuthToken").then((accessToken) => {
                        CallNextFunctionPostAuthToken(pSearchobj,pFunctiontoCall,accessToken,pModelNo,pPartNo); 
                  }).done()
                   
            }
            
      }
      else{
            console.log("abcabcabc...");
            CallAuthToken(pSearchobj,pFunctiontoCall,pModelNo,pPartNo);
                  
      }
    }).done() 

}

const CallAuthToken = (pSearchobj,pFunctiontoCall,pModelNo,pPartNo) => { 

    let parameter = "username=app_service_tech" +'&' + "password=2!1kX2opNSFvJ9ZbLlZI52bXf[bdTE5x" +'&'+ "grant_type=password"
    let header = 'Basic bDd4eGU3YTA2MjkwNGExMTQ3YWE5NmFjZjUxMTM5YzJiZjYyOjczZmYxYzNlYzQ3MTQ0NDc5YTVjN2ZlZjZmNzRkOGZk';
    let url = urlCOnfig.carrierServiceUrl.AUTH_TOKEN_URL;
    CarrierServiceHandler.post(url, parameter, header, (jsonResponse, errMsg) => {

        if(jsonResponse === null){
            showAlert(errMsg);  
        }else{

            var lAccesstoken = jsonResponse.access_token;
            var lCurrentDate = Date();
            AsyncStorage.setItem("AuthTokenTimeStamp", JSON.stringify(lCurrentDate)); 
            AsyncStorage.setItem("AuthToken", lAccesstoken); 
            
            CallNextFunctionPostAuthToken(pSearchobj,pFunctiontoCall,lAccesstoken,pModelNo,pPartNo); 
        }   
    });
}


const CallNextFunctionPostAuthToken = (pObj, pFunctiontoCall,pAccessToken,pModelNo,pPartNo) => {

    switch(pFunctiontoCall){

        case "Category":
            CallCategory(pObj,pAccessToken);
            break;

        case "Serial Search" : 
            CallSerialSearch(pObj,pAccessToken);
            //GetModelList(pObj,pAccessToken)
            break;
         case "ModelList Search" :
         	GetModelList(pObj,pAccessToken)
         	break;

        case "ModelData" :
         	GetModelData(pAccessToken,pModelNo,pObj,"ModelList")
         	break;

        case "AlternateParts" :
          console.log("CallNextFunctionPostAuthToken  : pPartNo: "+pPartNo);
          GetPartData(pAccessToken,pPartNo,pObj);
          break; 

        default :
            break;

    }

}


const CallCategory = (pSearchobj,pAccesstoken) => {
  
    var lAuthorization = "Bearer " + pAccesstoken;
    let header = lAuthorization;
    
    let url = urlCOnfig.carrierServiceUrl.PRODUCT_CATEGORY_URL
    CarrierServiceHandler.get(url, header, (jsonResponse, errMsg) =>{
        
        if(jsonResponse === null){
            showAlert(errMsg);  
        }else{
            
            pSearchobj.props.navigator.push({
		         		     name:'ProductCategoryReference',
		          		   title:'Search by Product Category',
		          		   isHidden:false,
		          		   passProps : {CategoryData: jsonResponse.items}
                });
        }
    });
}


const CallSerialSearch = (pSearchobj,pAuthToken) => {

    
    var lAuthorization = "Bearer " + pAuthToken;
    let header = lAuthorization;
    var lSearchedText = pSearchobj.state.inputValue;
    let url = urlCOnfig.carrierServiceUrl.SERIAL_SEARCH + lSearchedText;
    CarrierServiceHandler.get(url, header, (jsonResponse, errMsg) =>{
        
         console.log(jsonResponse)
        if(jsonResponse === null){
            showAlert(errMsg); 
            let activityIndicator = new ActivityIndicator();
            activityIndicator.stopActivity();
        }else{
            
            	if(jsonResponse.suggestedResults.length && jsonResponse.suggestedResults[0].discreetNo){

                console.log(jsonResponse.suggestedResults)
                var lDiscreetModelno = jsonResponse.suggestedResults[0].discreetNo;
                GetModelData(pAuthToken,lDiscreetModelno,pSearchobj,"Serial")

            }
            else{

                    //showAlert("Serial number not found.  Please make sure you have entered the correct serial number.");
                    let activityIndicator = new ActivityIndicator();
                    activityIndicator.stopActivity();
                    const ds = new ListView.DataSource({
						    rowHasChanged: (r1, r2) => r1 !== r2,
						    sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
						  });
                    var ltemplistviewdata = ds.cloneWithRowsAndSections({"SearchedData": []})
	                pSearchobj.setState({dataSourceSearch: ltemplistviewdata})
	   				pSearchobj.setState({IsSearchedResultEmpty: true})
	   				pSearchobj.setState({willShowHistoryListView:false})
                    pSearchobj.setState({willShowSearchResult: true})
                    
            }
               
        }
    });

}
const GetModelData = (pAuthToken,pModelNo,pSearchobj,pComingFrom) =>{

	var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'https://staging-services.ccs.utc.com/apps/epic/epicservice.svc', true);
   		console.log(pModelNo+"A")
   		var lModelNumber = pModelNo.trim().toUpperCase();
   		console.log(lModelNumber+"A")
        var envelope = '<?xml version="1.0" encoding="utf-8"?>' +
                
                '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:epic="http://sharedservices.carrier.com/EPICWrapper">' +
                    '<soapenv:Header/>' +
                     '<soapenv:Body>' +
                        '<tem:GetModelData>' +
                          '<tem:GetModelData1>' +
                             '<epic:ModelNumber>' +lModelNumber+ '</epic:ModelNumber>' +
                             //'<epic:ModelNumber>CNPVP3117ALAAAAA</epic:ModelNumber>' +
                              '<epic:UserBrands>CA,BR,PY</epic:UserBrands>' +
                             '<epic:ExpandMultiples>Y</epic:ExpandMultiples>' +
                              '<epic:UserCompanyType>Internal</epic:UserCompanyType>' +
                           '</tem:GetModelData1>' +
                        '</tem:GetModelData>' +
                     '</soapenv:Body>' +
                  '</soapenv:Envelope>';

                xmlhttp.onreadystatechange = function () {
                  
                if (xmlhttp.readyState == 4) {
                	console.log(xmlhttp.status)
                	console.log(xmlhttp.response)
                  	if (xmlhttp.status == 200) {

                       const ds = new ListView.DataSource({
						    rowHasChanged: (r1, r2) => r1 !== r2,
						    sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
						  });
                       var jsonResponse = JSON.parse(xmlhttp.response);
                       
                       if(jsonResponse && jsonResponse.GetModelDataResponse.GetModelDataResult){

                       		var lModelDataObj = jsonResponse.GetModelDataResponse.GetModelDataResult;
                       		
                          pSearchobj.setState({willShowSearchResult: false})
                     			pSearchobj.props.navigator.push({
			              		  name: 'ProductPage',
			              	    title: 'Product Page',
			              	    isHidden: false,
			             		    passProps: {modelandPartData: lModelDataObj}
			              		  });

                       }
                       else{
                       			var ltemplistviewdata = ds.cloneWithRowsAndSections({"SearchedData": []})
	                        	pSearchobj.setState({dataSourceSearch: ltemplistviewdata})
        	   					    	pSearchobj.setState({IsSearchedResultEmpty: true})
        	   					    	pSearchobj.setState({willShowHistoryListView:false})
                       			pSearchobj.setState({willShowSearchResult: true})
						            }
                        let activityIndicator = new ActivityIndicator();
                	      activityIndicator.stopActivity();

					     } //if 200
					     else{
							 showAlert("Network error. Please try later.");
							 let activityIndicator = new ActivityIndicator();
                activityIndicator.stopActivity();
					}
                }
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Authorization', 'Bearer ' + pAuthToken,'');
            xmlhttp.setRequestHeader('Content-Type', 'text/xml;charset=UTF-8','');
            xmlhttp.setRequestHeader('soapAction', 'http://tempuri.org/IEPICService/GetModelData','');
            xmlhttp.setRequestHeader('responseType', 'json','');
            xmlhttp.send(envelope);

}
function filterDatasource(sections,pDescription){
		
    
   var pModellistObj = {};
   if(sections.length){
   		for(var index = 0; index < sections.length; index++){
	  		pModellistObj[index] = {ModelApplication : sections[index].ModelApplication, ModelDescription : pDescription, ModelNumber : sections[index].SalesPackage}
      	}
	}
	else{
		pModellistObj["listview"] = {ModelApplication : sections.ModelApplication, ModelDescription : pDescription, ModelNumber : sections.SalesPackage}
	}
    return pModellistObj;
   
}

const GetModelList = (pSearchobj,pAuthToken) =>{

	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('POST', 'https://staging-services.ccs.utc.com/apps/epic/epicservice.svc', true);
   	
   	var lModelNumber = pSearchobj.state.inputValue.trim().toUpperCase();
   		
        var envelope = '<?xml version="1.0" encoding="utf-8"?>' +
                
                '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:epic="http://sharedservices.carrier.com/EPICWrapper">' +
                    '<soapenv:Header/>' +
                     '<soapenv:Body>' +
                        '<tem:ListModels>' +
                          '<tem:ListModels1>' +
                             '<epic:ModelNumber>' +lModelNumber+ '</epic:ModelNumber>' +
                             '<epic:UserBrands>CA,BR,PY</epic:UserBrands>' +
                             '<epic:ExpandMultiples>Y</epic:ExpandMultiples>' +
                              '<epic:UserCompanyType>Internal</epic:UserCompanyType>' +
                           '</tem:ListModels1>' +
                        '</tem:ListModels>' +
                     '</soapenv:Body>' +
                  '</soapenv:Envelope>';

                xmlhttp.onreadystatechange = function () {
                  
                if (xmlhttp.readyState == 4) {
                	
                  	if (xmlhttp.status == 200) {

                       const ds = new ListView.DataSource({
						    rowHasChanged: (r1, r2) => r1 !== r2,
						    sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
						  });
                       var jsonResponse = JSON.parse(xmlhttp.response);
                       console.log(jsonResponse)

                       if(jsonResponse && jsonResponse.ListModelsResponse.ListModelsResult.PackageLine.ListModelsReplyPackageLine){

                       		var lModelDesc = jsonResponse.ListModelsResponse.ListModelsResult.ModelDescription;
                       		var lModelDataObj = filterDatasource(jsonResponse.ListModelsResponse.ListModelsResult.PackageLine.ListModelsReplyPackageLine,lModelDesc);

							var ltemplistviewdata = ds.cloneWithRows(lModelDataObj)
	                        pSearchobj.setState({dataSourceSearch: ltemplistviewdata})
	   					    pSearchobj.setState({IsSearchedResultEmpty: false})
	   					    pSearchobj.setState({willShowHistoryListView:false})
                       		pSearchobj.setState({willShowSearchResult: true})	

                       }
                       else{
                       			var ltemplistviewdata = ds.cloneWithRowsAndSections({"SearchedData": []})
	                        	pSearchobj.setState({dataSourceSearch: ltemplistviewdata})
	   					    	pSearchobj.setState({IsSearchedResultEmpty: true})
	   					    	pSearchobj.setState({willShowHistoryListView:false})
                       			pSearchobj.setState({willShowSearchResult: true})
						}
                       let activityIndicator = new ActivityIndicator();
                	   activityIndicator.stopActivity();

					} //if 200
					else{
							showAlert("Network error. Please try later.");
							 let activityIndicator = new ActivityIndicator();
                			 activityIndicator.stopActivity();
					}
                }
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Authorization', 'Bearer ' + pAuthToken,'');
            xmlhttp.setRequestHeader('Content-Type', 'text/xml;charset=UTF-8','');
            xmlhttp.setRequestHeader('soapAction', 'http://tempuri.org/IEPICService/ListModels','');
            xmlhttp.setRequestHeader('responseType', 'json','');
            xmlhttp.send(envelope);

}


const GetPartData = (pAuthToken,pPartNo,pSearchobj) =>{
  var xmlhttp = new XMLHttpRequest();
      xmlhttp.open('POST', 'https://staging-services.ccs.utc.com/apps/epic', true);
      //console.log("pGlobalPartNo : "+pPartNo);
      //var lGlobalPartNo = pPartNo.trim();
      //console.log("lGlobalPartNo : "+lGlobalPartNo);
        var envelope = '<?xml version="1.0" encoding="utf-8"?>' +                
                '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/" xmlns:epic="http://sharedservices.carrier.com/EPICWrapper">' +
                    '<soapenv:Header/>' +
                      '<soapenv:Body>' +
                        '<tem:GetPartData>'+
                            '<tem:GetPartData1>'+            
                              '<epic:PartNumber>P021-1527P</epic:PartNumber>'+            
                              '<epic:UserBrands>CA,BR,PY</epic:UserBrands>'+
                              '<epic:UserCompanyType>internal</epic:UserCompanyType>'+
                            '</tem:GetPartData1>'
                        '</tem:GetPartData>'                        
                      '</soapenv:Body>' +
                '</soapenv:Envelope>';
                xmlhttp.onreadystatechange = function () { 

                if (xmlhttp.readyState == 4) {                    
                    console.log("xmlhttp.status : "+xmlhttp.status);   
                    if (xmlhttp.status == 200) {      
                        const ds = new ListView.DataSource({
                        rowHasChanged: (r1, r2) => r1 !== r2,
                        sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
                         });
                        var jsonResponse = JSON.parse(xmlhttp.response); 
                        var partDataReplyPartHistory = jsonResponse.GetPartDataResponse.GetPartDataResult.PartHistory.GetPartDataReplyPartHistory;                      
                        alert("partDataReplyPartHistory : "+JSON.stringify(partDataReplyPartHistory))
                        if (jsonResponse && jsonResponse !== "" &&
                            partDataReplyPartHistory && partDataReplyPartHistory.length >0){

                            //alert("insyde");
                            

                        }
                        else{
                            alert("errorMsg..");
                       
                        }
                        let activityIndicator = new ActivityIndicator();
                        activityIndicator.stopActivity();
                    } //if 200
                    else{
                        showAlert("Network error. Please try later.");
                        let activityIndicator = new ActivityIndicator();
                        activityIndicator.stopActivity();
                    }
                }
            }
            // Send the POST request
            xmlhttp.setRequestHeader('Authorization', 'Bearer ' + pAuthToken,'');
            xmlhttp.setRequestHeader('Content-Type', 'text/xml;charset=UTF-8','');
            xmlhttp.setRequestHeader('soapAction', 'http://tempuri.org/IEPICService/GetPartData','');
            xmlhttp.setRequestHeader('responseType', 'json','');
            xmlhttp.send(envelope);

}

module.exports = {CallCategory,CallAuthToken,CheckAndStoreAuthToken}
