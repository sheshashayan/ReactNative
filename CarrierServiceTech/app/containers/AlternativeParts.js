
/**
 * # AlternativeParts.js
 * This class is used to show the list of Alternative parts under parts and jobs.
 * Author: Rakesh
 */

'use strict'

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
  Dimensions,
  TextInput,
  StatusBar,
  Alert, 
  TouchableHighlight,

} from 'react-native';

import CellView from "../components/CellView";
import * as dataResource from '../components/dataResource';
import * as stringConstant from '../constants/StringConstant';

import { globalStyles, deviceFinder } from "../components/globalStyles";
import SupersedeNewerList from "../components/SupersedeNewerList"
import SupersedeOlderList from "../components/SupersedeOlderList"
import AlternativePartCrossReferenceDetails from "../components/AlternativePartCrossReferenceDetails"
import BackNavComponent from "../components/BackNavComponent";
import CustomModal from "../components/CustomModal";
import CustomCrossRefResultsListView from "../components/CrossReferenceResults";
import CustomisedListView from "../components/CrossReference";
import LinearGradient from 'react-native-linear-gradient';
import ActivityIndicator from "../components/ActivityIndicator";
import {CheckAndStoreAuthToken}  from "../lib/ProductSearchService";
import {startJobsService} from "../lib/PartsAndJobsServices";
const backNavText = stringConstant.carrierConstClass.ALTERNATIVE_PARTS_BACK_BUTTON;
const CarrierServiceScandit = require('NativeModules').CarrierServiceScandit;

export default class AlternativeParts extends Component{
  constructor(props){
      super(props);
      this.state = {
          backArrow : "<",
          fromwhichScreen : "alternativeParts",
          leftImage : null,
          rightImage : null,
          title : dataResource.Alternative_Part_upper_List.title,
          subTitle : dataResource.Alternative_Part_upper_List.subTitle,
          superSedeHeader : stringConstant.carrierConstClass.SUPERSEDE_HEADER,
          crossRefHeader : stringConstant.carrierConstClass.CROSSREFERENCE,
          open:false,
          popUpWindowHeight: 0,
          partData : this.props.partData,
          partDetails : this.props.partDetails,
          carrierSalesDetails : dataResource.CarrierSalesDetails,
          jobsList:null,
      }

      this.responseCallBackPartsAndJobs = this.responseCallBackPartsAndJobs.bind(this);
  }

  componentWillMount() {      
    let activityIndicator = new ActivityIndicator();
    activityIndicator.startActivity();
    CheckAndStoreAuthToken(this, "AlternateParts","","324171-201");

    this.windowWidth= Dimensions.get('window').width;
    this.windowHeight= Dimensions.get('window').height;

      if(Platform.OS === 'ios'){
          if(this.windowWidth > 700){ //ipad
            this.setState({popUpWindowHeight : this.windowWidth/2}) ;
          }
          else if(this.windowWidth >= 310 && this.windowWidth <= 360){ //iPhone 5s,5c
            this.setState({popUpWindowHeight : this.windowWidth +10});
          }
          else if(this.windowWidth >= 360){ //iPhone 6S plus // 410              
            this.setState({popUpWindowHeight : this.windowWidth -20});
          }
      }
      else if(Platform.OS === 'android'){
          if(this.windowWidth > 500 && this.windowWidth < 700){ //Androidtablet 
            this.setState({popUpWindowHeight : this.windowWidth/3}); 
          } 
          else if(this.windowWidth > 700){ //Androidtablet 10" // 800
            this.setState({popUpWindowHeight : this.windowWidth/2});           
          }    
          else if(this.windowWidth < 400){ //Androidphone        
            this.setState({popUpWindowHeight : this.windowWidth -20});
          }
      }
  }

  componentDidMount() {
   //Close Indicator started from web service
      let activityIndicator = new ActivityIndicator();
      activityIndicator.stopActivity();
  }

  render(){
      let sTouchableOpacity = null
      let sText = null;
      sText = (<Text style = {{
                              height:3, marginTop: 6, marginLeft:10, marginRight:10, 
                              backgroundColor:this.state.isSuperSede?'#06273F':'#CACACA'}}>
                              </Text>)
      sTouchableOpacity = ( <Text style={[
                                    globalStyles.headerTxt3, 
                                    {color:'#06273F',marginTop: 20, alignSelf:'center'}]}>
                                    {this.state.superSedeHeader}</Text>)                                    
      let selectedPartNoDetails ="";
      console.log("selectedPartNoDetails : "+JSON.stringify(this.props.partDetails));
      let partDetails = this.props.partDetails;
      partDetails = partDetails[0];
      console.log("partDetails : "+JSON.stringify(partDetails));        
      if(this.props.partDetails && (this.props.partDetails).length > 0){
          selectedPartNoDetails = (<CellView 
                          title={partDetails["ItemDescription"]}
                          subTitle={"Item #:" + partDetails["ItemIndex"] + "            Part #:" + partDetails["PartNumber"]}
                          leftImage={this.state.leftImage}
                          rightImage={this.state.rightImage}                            
                          toBePopulatedOn = {this.state.fromwhichScreen}/>)                        
      }
      else{
        selectedPartNoDetails = (<CellView 
                          title = {this.state.title}
                          subTitle = {this.state.subTitle}
                          leftImage = {this.state.leftImage}
                          rightImage = {this.state.rightImage}
                          toBePopulatedOn = {this.state.fromwhichScreen}/>)                        
      }
      return (
      <View style = {styles.container}>
        <View style = {[globalStyles.backNavBtnStyle]}>
          <TouchableOpacity onPress = { this.backAction }>
              <BackNavComponent  backNavText =  {backNavText} />                               
          </TouchableOpacity>     
        </View>  
        <View 
            style = {styles.upperContainer}>
            <View style = {styles.cellContainer}>
              {selectedPartNoDetails}    
            </View>
            </View>
            <View style = {styles.lowerContainer}>
                <View style = {styles.pagerContainer}>
                    <View style = {styles.leftPagerViewStyle}>
                        {sTouchableOpacity}
                        {sText}
                    </View>
                </View>

              <View style = {styles.listContainer}>
                  <ScrollView>
                       <SupersedeNewerList navigator={this.props.navigator} 
                              savePart = {this.savePart} callToOrderForParts = {this.callToOrderForParts}/>
                      <SupersedeOlderList navigator={this.props.navigator} 
                              savePart = {this.savePart} callToOrderForParts = {this.callToOrderForParts}/>
                      </ScrollView>
              </View>               
        </View>
        <CustomModal
          offset={this.state.offset}
          open={this.state.open}
          jobsList={this.state.jobsList}
          heightAsPerDevice = {this.state.popUpWindowHeight}
          modalDidOpen={() => console.log('modal did open')}
          modalDidClose={() => this.setState({open: false})} 
          style={{alignItems: 'center'}}>
        </CustomModal>
      </View>);
  }

  savePart = () => {
    let activityIndicator = new ActivityIndicator();
    activityIndicator.startActivity();
    startJobsService(stringConstant.carrierConstClass.GET_JOB_SERVICES, this.responseCallBackPartsAndJobs)
      // this.setState({open:true});
  }
  

  /*
  Objective: implement response for getJobs webserives
  @Param: value : Recieve response from web service
  @return: null
  */
  responseCallBackPartsAndJobs(value){
        let activityIndicator = new ActivityIndicator();
        activityIndicator.stopActivity();
        this.setState({jobsList:value});
        this.setState({open:true});
    }
  
  /*
  Objective: implement action for superSede
  @Param: not required any parameter
  @return: null
  */
  superSedeAction = () =>{
      // this.setState({
      //     isSuperSede:true
      // })
  }


  /*
  Objective: implement action for back button
  @Param: not required any parameter
  @return: null
  */
  backAction = () =>{
    this.props.navigator.pop();
  }

  /*
  Objective: implement action for cross reference
  @Param: not required any parameter
  @return: null     
  */
  crossReferenceAction = () =>{
      this.setState({
          isSuperSede:false
      })
  }

  /**
  * # callToOrderForParts
  * Purpose: This function will be invoked to handle the action on CallToOrder submenu 
  * Author: Ravichandran P
  * Input Param: 
  * Output Param: 
  */
  callToOrderForParts = () => {  
    CarrierServiceScandit.isDevSupportCalling((isSupportCall) => {
    if(!isSupportCall){
        alert('Device does not support call feature');
        return;
    } 
    let phoneNo = "";
    let pinCodeAsPerCurrentLatLong = "12110"; //or pinCodeAsPerUserRegisteredAddress
    let carrierSalesDetails = this.state.carrierSalesDetails;
    for(let i in carrierSalesDetails){
        if(carrierSalesDetails[i].Address.pinCode === pinCodeAsPerCurrentLatLong){
            phoneNo = carrierSalesDetails[i].Address.phoneNumber;
        }    
    }
    if(typeof phoneNo !== "string" || phoneNo.trim().length >10 || phoneNo === "") {
      console.log('the phone number must be provided as a String value');
      alert('the phone number must be provided as a String value');
      return;
    }
    let url;
    if(Platform.OS !== 'android') {
      url = 'telprompt:' ;
    }
    else {
      url = 'tel:';
    }
    url += phoneNo;
    this.launchURL(url);
    }) 
  }

  /**
  * # launchURL
  * Purpose: This function is used to link the passed url using Linking API
  * Author: Ravichandran P
  * Input Param: url
  * Output Param: 
  */
  launchURL = (url) => {
    console.log("launchURL..."+url)
    Linking.canOpenURL(url).then(supported => 
    {
      if(!supported) {
        console.log('Can\'t handle url: ' + url);
      } 
      else {
        Linking.openURL(url)
        .catch(err => {
          if(url.includes('telprompt')) {
            console.log(err);
          } 
          else {
            console.warn('openURL error', err);
          }
        });
      }
    }).catch(err => console.warn('An unexpected error happened', err));
  }


}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    paddingTop : 64,
  },
  upperContainer : {
    height: 100,
  },
  lowerContainer : {
    flex:6,
  },
  cellContainer : {
    flex:1,
    paddingTop : 4,
    paddingBottom : 4,
    paddingLeft : 4,
    paddingRight : 4,
  },
  subordinateTxt : {
    color: "#429BE4",
  },
  pagerContainer :{
    height: 60,
    flexDirection: 'row',   
  },
  listContainer :{
    flex: 5,
  },
  leftPagerViewStyle :{
    flex:1,
  },
  rightPagerViewStyle :{
    flex:1,
  },
  newerListContainer :{
    flex: 1,
  },
  olderListContainer :{
    flex: 1,
  },
});

