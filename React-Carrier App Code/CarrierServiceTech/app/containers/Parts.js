
/**
 * # Parts.js
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
import PartsList from "../components/PartsList"
import BackNavComponent from "../components/BackNavComponent";
import CustomModal from "../components/CustomModal";
import CustomCrossRefResultsListView from "../components/CrossReferenceResults";
import CustomisedListView from "../components/CrossReference";
import LinearGradient from 'react-native-linear-gradient';
import ActivityIndicator from "../components/ActivityIndicator";
import {startJobsService} from "../lib/PartsAndJobsServices";

const backNavText = stringConstant.carrierConstClass.LITERATURE_BACK_BUTTON;
const criticalPartslist = [];
const criticalPartslistToWarrantyPage = [];
const CarrierServiceScandit = require('NativeModules').CarrierServiceScandit;

export default class Parts extends Component{
  constructor(props){
    super(props);
    this.state = {
      backArrow : "<",
      fromwhichScreen : "Parts",
      leftImage : null,
      rightImage : null,
      title : dataResource.Alternative_Part_upper_List.title,
      subTitle : dataResource.Alternative_Part_upper_List.subTitle,
      criticalHeader : stringConstant.carrierConstClass.CRITICALPARTS,
      allPartsHeader : stringConstant.carrierConstClass.ALLPARTS,
      isCriticalParts: true,
      open:false,
      popUpWindowHeight: 0,
      partsList : this.props.partsList,
      carrierSalesDetails : dataResource.CarrierSalesDetails,
      partsListFromWarrantyPage : this.props.partsListFromWarrantyPage,

      partsListSubCategory : this.props.partsListSubCategory,
      isItSubCategoryModelNo: this.props.isItSubCategoryModelNo,
      criticalPartslistState : [],
      jobsList:null,
    }
    this.criticalListAction = this.criticalListAction.bind(this);
    this.allPartsAction = this.allPartsAction.bind(this);
    this.responseCallBackPartsAndJobs = this.responseCallBackPartsAndJobs.bind(this);
  }

  componentWillReceiveProps(){
    console.log("Parts componentWillReceiveProps... ");

  }

  componentWillMount() {      
    this.windowWidth= Dimensions.get('window').width;
    this.windowHeight= Dimensions.get('window').height;

    //let activityIndicator = new ActivityIndicator();
    //activityIndicator.startActivity();

    //Critical Parts segregation from All Parts
    let lcriticalPartslistToWarrantyPage =[];
    let lcriticalPartslist = [];

    if(this.props.partsList && (this.props.partsList).length > 0){
      lcriticalPartslist = this.props.partsList;
    }
    else if(this.props.partsListFromWarrantyPage){
      lcriticalPartslistToWarrantyPage = this.props.partsListFromWarrantyPage;
    }

    if(lcriticalPartslist && lcriticalPartslist.length >0){  
        criticalPartslist = lcriticalPartslist.reduce(function(all, item, index){     
          if(item["Recommended"] === "C" && item["GroupCode"].toString() !== "9"){
              all.push(item);
          }
          return all;
          },[]);
      console.log("criticalPartslist : "+JSON.stringify(criticalPartslist));

    }
    else if(lcriticalPartslistToWarrantyPage && lcriticalPartslistToWarrantyPage.length >0){ 
        criticalPartslistToWarrantyPage = lcriticalPartslistToWarrantyPage.reduce(function      (all, item, index){     
          if(item["Recommended"] === "C" && item["GroupCode"].toString() !== "9"){
              all.push(item);
          }
          return all;
          },[]);
      console.log("criticalPartslistToWarrantyPage : "+JSON.stringify(criticalPartslistToWarrantyPage));
    }
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
    let cTouchableOpacity = null
    let cText = null;
    let listDetailsView = null
    sText = (<Text 
                style = {[
                        styles.sTextStyle,                             
                        {backgroundColor:this.state.isCriticalParts?'#06273F':'#CACACA'}]}>
              </Text>)
    sTouchableOpacity = (<TouchableOpacity onPress = {() => this.criticalListAction()} 
                                        style = {{marginTop: 20, alignSelf:'center'}}>
                                <Text style={[
                                        globalStyles.headerTxt2, 
                                        {color:this.state.isCriticalParts?'#06273F':'#CACACA'}]}>
                                        {this.state.criticalHeader}
                                </Text>
                          </TouchableOpacity>)
     cText = (<Text style = {{
                            height:3, marginTop: 6, marginLeft:5, marginRight:5, 
                            backgroundColor:this.state.isCriticalParts?'#CACACA':'#06273F'}}>
                            </Text>)
    cTouchableOpacity = (<TouchableOpacity onPress = {() => this.allPartsAction()} 
                                        style = {{marginTop: 20, alignSelf:'center'}}>
                                <Text style={[
                                        globalStyles.headerTxt2, 
                                        {color:this.state.isCriticalParts?'#CACACA':'#06273F'}]}>
                                        {this.state.allPartsHeader}
                                </Text>
                            </TouchableOpacity>)   
    if(this.props.partsList && (this.state.isItSubCategoryModelNo === undefined ||
                          this.state.isItSubCategoryModelNo === null)){
        //alert("Parts for search from main..");
        listDetailsView = 
                    (this.state.isCriticalParts?<View style = {styles.listContainer}>
                      <PartsList navigator={this.props.navigator}  partslist = {criticalPartslist || criticalPartslistToWarrantyPage }
                                  savePart = {this.savePart} callToOrderForParts = {this.callToOrderForParts} />
                      </View>:<PartsList navigator={this.props.navigator} partslist = {this.state.partsList}
                                          savePart = {this.savePart}  callToOrderForParts = {this.callToOrderForParts}/>)        
      } 
    else if(this.props.partsListSubCategory && this.state.isItSubCategoryModelNo === true){
      //alert("Parts for search for subCategory..");
        listDetailsView = 
                    (this.state.isCriticalParts?<View style = {styles.listContainer}>
                      <PartsList  navigator={this.props.navigator}  partslist = {this.state.partsListSubCategory}
                                  savePart = {this.savePart} callToOrderForParts = {this.callToOrderForParts} />
                      </View>:<PartsList navigator={this.props.navigator} partslist = {this.state.partsListSubCategory}
                                          savePart = {this.savePart}  callToOrderForParts = {this.callToOrderForParts}/>)        
      }

    return (
      <View style = {styles.container}>
        <View style = {[globalStyles.backNavBtnStyle]}>
          <TouchableOpacity onPress = { this.backAction }>
              <BackNavComponent  backNavText =  {backNavText} />                               
          </TouchableOpacity> 
          </View> 
          <View style = {styles.lowerContainer}>
            <View style = {styles.pagerContainer}>
                <View style = {styles.leftPagerViewStyle}>
                    {sTouchableOpacity}
                    {sText}
                </View>
                <View style = {styles.rightPagerViewStyle}>
                    {cTouchableOpacity}
                    {cText}
                </View>
            </View>
            <View style = {styles.listContainer}>
                {listDetailsView}                        
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
      </View>
      );
  }

  /*
  Objective: implement action for superSede
  @Param: not required any parameter
  @return: null
  */
  criticalListAction = () =>{
    this.setState({isCriticalParts:true});
    console.log("criticalListAction "+JSON.stringify(this.state.isCriticalParts));    
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
  allPartsAction = () =>{
      this.setState({
          isCriticalParts:false
      });
      console.log("allPartsAction "+JSON.stringify(this.state.isCriticalParts)); 
  }

  /*
      Action implementation for Call to Order
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

  /*
   Method is use to launch phone call screen 
   @Param: url (String which has valid phone number)
   @return: null
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
  backButtonContainer :{
    height:30,
    paddingLeft : 10,
    paddingTop: 6,
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
  sTextStyle : {
    height:3, 
    marginTop: 6, 
    marginLeft:5, 
    marginRight:5,
  }
});


