/**
 * # SupersedeNewerList.js
 * This class is used to show the list of newer parts for supersede alternative parts.
 * Author: Rakesh
 */

'use strict'

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ListView,
    Image,
    Platform,
    TouchableOpacity,
    Linking,
} from 'react-native';

import CellView from "../components/CellView";
import * as dataResource from '../components/dataResource';
import * as stringConstant from '../constants/StringConstant';
import { globalStyles, deviceFinder } from "../components/globalStyles";
import SwipeRow from '../components/SwipeRow';
import AlternativeParts from '../containers/AlternativeParts';

import {CheckAndStoreAuthToken}  from "../lib/ProductSearchService";
import ActivityIndicator from "./ActivityIndicator";
const isItiPhone6S = deviceFinder.isItiPhone6S();
const isItiPhone5S = deviceFinder.isItiPhone5S();
const isItiPad = deviceFinder.isItiPad();
const isIt7InchTablet = deviceFinder.isIt7InchTablet();
const isIt10InchTablet = deviceFinder.isIt10InchTablet();
const isItAndroidPhone = deviceFinder.isItAndroidPhone();

const criticalPartslist = [];
const fetchedPartNumber = "";
const CarrierServiceScandit = require('NativeModules').CarrierServiceScandit;
export default class PartsList extends Component{
  constructor(props){
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
          newer : stringConstant.carrierConstClass.NEWER,
          dataSourceForWebservice: ds.cloneWithRows(this.props.partslist) ,
          dataSource:  ds.cloneWithRows(dataResource.PartsListArray),
          fromwhichScreen : "SwipeRightImage",
          rightImage:require('../resources/images/More.png'),
          partslist : this.props.partslist,
          rowIdForPartNumber : "",
          carrierSalesDetails : dataResource.CarrierSalesDetails,
      }
      this.partDataFromRow = this.partDataFromRow.bind(this);
  }

  componentWillMount() {
      //let activityIndicator = new ActivityIndicator();
      //activityIndicator.startActivity();
  }

  componentDidMount() {
      //Close Indicator started from web service
      //let activityIndicator = new ActivityIndicator();
      //activityIndicator.stopActivity();
  }

  render(){
      var listViewAsPerData = null;
      if(Platform.OS === 'ios'){
          if(isItiPad){ //ipad
              this.rightOpenValueAsPerDevice = -640;
          }
          else if(isItiPhone5S){ //iPhone 5s,5c
              this.rightOpenValueAsPerDevice = -255;
          }
          else if(isItiPhone6S){ //iPhone 6S plus // 410
              this.rightOpenValueAsPerDevice = -320;
          }
      }
      else if(Platform.OS === 'android'){
          if(isIt7InchTablet){ //Android7"tablet
              this.rightOpenValueAsPerDevice = -500;
          }
          else if(isIt10InchTablet){ //Android10"tablet // 800
              this.rightOpenValueAsPerDevice = -680;
          }
          else if(isItAndroidPhone){ //Androidphone
              this.rightOpenValueAsPerDevice = -280;
          }
      }

      if(this.props.partslist && this.props.partslist.length >0){
          listViewAsPerData = (<View style={styles.listTopView}>
                  <ListView
                      scrollEnabled = { true }
                      dataSource={this.state.dataSourceForWebservice}                        
                      renderRow={this.renderSwipeableRowForSearch} />
              </View>)
      }
      else{            
          listViewAsPerData = (<View style={styles.listTopView}>
                  <ListView
                      scrollEnabled = { true }
                      dataSource={this.state.dataSource}                        
                      renderRow={this.renderSwipeableRowForResource} />
              </View>)
      }
      return(
          <View style = {styles.container}>
              {/* Creating list view and populating cell using rendrRow method*/}
                  {listViewAsPerData}
              {/* End Listview */}
          </View>
      )
  }

  //by Ravi
  partDataFromRow = (pRowId, pRowDataForParts) =>{
      //this.setState({rowIdForPartNumber : rowId });
      //rowIdForPartNumber to fetch the partNumber from this.props.partslist,and pass that PartNumber to getPartData
      fetchedPartNumber = pRowDataForParts.PartNumber;
      console.log("fetchedPartNumber : "+fetchedPartNumber)
  }

  /**
   * # renderSwipeableRowForSearch
   * Purpose: This function will be invoked to populate the part data fetched 
              from  GetModelList SOAP Service
   * Author: Ravichandran P
   * Input Param: url
   * Output Param:
   */
  renderSwipeableRowForSearch = (rowData,sectionId, rowId) => {
      return(
      <View style={styles.rowView}>                          
        <SwipeRow                     
          rightOpenValue= {this.rightOpenValueAsPerDevice}                               
          disableRightSwipe = {true}
          swipeLeftSet={(rightOpenValue) =>  {{this.rightOpenValueAsPerDevice}}} 
          partDataFromRow = {this.partDataFromRow} 
          rowData = {rowData}
          rowId = {rowId}>
          <View style={styles.swipeableRowBack}>
              <TouchableOpacity onPress = {() => this.props.callToOrderForParts()}>
                <View style ={{flexDirection : "column",marginLeft : 40}}>
                    <Image style ={[styles.swipeImageStyle,{}]} source = {require('../resources/images/Call.png')}/>
                    <Text adjustsFontSizeToFit ={true} minimumFontScale= {0.8} style ={[globalStyles.globalBtnTextViewStyle,{paddingLeft : 10,paddingTop : 2,}]}>Call to Order</Text>
                </View>
              </TouchableOpacity >

                  <TouchableOpacity onPress={() => this.props.savePart()}> 
                    <View style ={{flexDirection : "column",}}>
                        <Image style ={[styles.swipeImageStyle,{}]} source = {require('../resources/images/SavePart.png')}/>
                        <Text adjustsFontSizeToFit ={true} minimumFontScale= {0.8} style = {[globalStyles.globalBtnTextViewStyle,{paddingLeft : 5,paddingTop : 2,}]}>Save Part</Text>
                    </View>
                  </TouchableOpacity >

              <TouchableOpacity onPress={(rowId) =>this.moveToAlternateParts(rowId)}> 
                <View style ={{flexDirection : "column",}}>
                    <Image style ={[styles.swipeImageStyle,{}]} source = {require('../resources/images/AlternativePart.png')}/>
                    <Text adjustsFontSizeToFit ={true} minimumFontScale= {0.8} style = {[globalStyles.globalBtnTextViewStyle,{paddingLeft : 5,paddingTop : 2,}]}>Alternate Parts</Text>
                </View>
              </TouchableOpacity >   
          </View>
          <View style={styles.swipeableRowFront}>
            <CellView
                title={rowData["ItemDescription"]}
                subTitle={"Item #:"+rowData["ItemIndex"]+"  "+"Part #:"+rowData["PartNumber"]}
                leftImage={rowData["leftImage"]}
                rightImage= {this.state.rightImage}
                toBePopulatedOn = {this.state.fromwhichScreen}/>
          </View>
        </SwipeRow>
      </View>)
  }

  /**
   * # renderSwipeableRowForResource
   * Purpose: This function will be invoked to populate the part data which is fetched 
              from  dataResource as of now
   * Author: Ravichandran P
   * Input Param: url
   * Output Param:
   */
  renderSwipeableRowForResource = (rowData,sectionId, rowId) => {
      return(
          <View style={styles.rowView}>
              <SwipeRow
                  rightOpenValue= {this.rightOpenValueAsPerDevice}
                  disableRightSwipe = {true}
                  swipeLeftSet={(rightOpenValue) =>  {{this.rightOpenValueAsPerDevice}}}
                  partDataFromRow = {this.partDataFromRow}
                  rowData = {rowData}
                  rowId = {rowId}>
                  <View style={styles.swipeableRowBack}>
                      <TouchableOpacity onPress = {() => this.props.callToOrderForParts()}>
                          <View style ={{flexDirection : "column",marginLeft : 40}}>
                              <Image style ={[styles.swipeImageStyle,{}]} source = {require('../resources/images/Call.png')}/>
                              <Text adjustsFontSizeToFit ={true} minimumFontScale= {0.8} style ={[globalStyles.globalBtnTextViewStyle,{paddingLeft : 10,paddingTop : 2,}]}>Call to Order</Text>
                          </View>
                      </TouchableOpacity >

                      <TouchableOpacity onPress={() => this.props.savePart()}>
                          <View style ={{flexDirection : "column",}}>
                              <Image style ={[styles.swipeImageStyle,{}]} source = {require('../resources/images/SavePart.png')}/>
                              <Text adjustsFontSizeToFit ={true} minimumFontScale= {0.8} style = {[globalStyles.globalBtnTextViewStyle,{paddingLeft : 5,paddingTop : 2,}]}>Save Part</Text>
                          </View>
                      </TouchableOpacity >

                      <TouchableOpacity onPress={(rowId) =>this.moveToAlternateParts(rowId)}>
                          <View style ={{flexDirection : "column",}}>
                              <Image style ={[styles.swipeImageStyle,{}]} source = {require('../resources/images/AlternativePart.png')}/>
                              <Text adjustsFontSizeToFit ={true} minimumFontScale= {0.8} style = {[globalStyles.globalBtnTextViewStyle,{paddingLeft : 5,paddingTop : 2,}]}>Alternate Parts</Text>
                          </View>
                      </TouchableOpacity >
                  </View>
                  <View style={styles.swipeableRowFront}>
                      <CellView
                          title={rowData["title"]}
                          subTitle={rowData["subTitle"]}
                          leftImage={rowData["leftImage"]}
                          rightImage={this.state.rightImage}
                          toBePopulatedOn={this.state.fromwhichScreen}/>                        
                  </View>
              </SwipeRow>
          </View>)
  }

  subTitleLngthCheck(itemDesc){
    console.log("subTitleLngthCheck....");

  }

  /*
   Action implementation for Alternate parts button
   */
  moveToAlternateParts = (rowId) => {

      console.log("moveToAlternateParts partNo : "+fetchedPartNumber);
      console.log("moveToAlternateParts rowId : "+rowId);

      var partDetails = {};
      if(this.props.partslist && (this.props.partslist).length >0){
        partDetails = (this.props.partslist).reduce(function(all,item,index){
        if(item.PartNumber === fetchedPartNumber){          
           all.push(item);           
          }
        return all;
        }, []);
      }
      console.log("moveToAlternateParts partDetails : "+JSON.stringify(partDetails));

          //let activityIndicator = new ActivityIndicator();
          //activityIndicator.startActivity();

          CheckAndStoreAuthToken(this, "AlternateParts",null,fetchedPartNumber);

          this.props.navigator.push({
              name:'AlternativeParts',
              title:'Alternative Parts',
              isHidden:false,
              //hard coded valid PartNumber
              //passProps: {partData: "324171-201"}

              //passing fetched PartNumber
              passProps: {partData: fetchedPartNumber, partDetails : partDetails}
          });


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


/*
 Creating style
 */
const styles = StyleSheet.create({
    container:{
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        paddingTop : 10,
    },
    listTopView:{
        paddingTop: 10
    },
    rowView: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        height: 80,
        backgroundColor: 'white'
    },
    swipeImageStyle : {
        alignSelf : 'center',
    },
    swipeableRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 70,
    },
    swipeableRowBack: {
        alignItems: 'center',
        backgroundColor: '#429BE4',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding : 20,
        paddingRight: 10,
        paddingLeft :10,
    },
});



