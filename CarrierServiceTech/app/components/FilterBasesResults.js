/**
 * # FilterBasesResults.js
 * This class will render the list of parts results for the 
 * selected filtered options in filterBases/ entered Model No 
 * Author: Ravichandran P
 */

import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  StatusBar,
  Alert, 
  ScrollView,
  Platform,
  Dimensions,
  Linking,
  TouchableHighlight,
  } from 'react-native';

import CellView from "./CellView";  
import CustomCrossRefResultsListView from "./CrossReferenceResults";
import CustomisedListView from "./CrossReference";
import * as dataResource from './dataResource';
import SwipeRow from './SwipeRow';
import {globalStyles, deviceFinder} from "./globalStyles"; 
import CustomModal from "./CustomModal";
import Modal from 'react-native-simple-modal';
import * as stringConstant from '../constants/StringConstant';
import BackNavComponent from "./BackNavComponent";
import {startJobsService} from "../lib/PartsAndJobsServices";
import ActivityIndicator from "../components/ActivityIndicator";

var CarrierServiceScandit = require('NativeModules').CarrierServiceScandit;
const isItiPhone6S = deviceFinder.isItiPhone6S();
const isItiPhone5S = deviceFinder.isItiPhone5S();
const isItiPad = deviceFinder.isItiPad();
const isIt7InchTablet = deviceFinder.isIt7InchTablet();
const isIt10InchTablet = deviceFinder.isIt10InchTablet();
const isItAndroidPhone = deviceFinder.isItAndroidPhone();

const fetchedPartNumber = "";

const backNavText = stringConstant.carrierConstClass.FILTER_BASES_RESULTS_BACK_BUTTON;
const filterSizeTxt = stringConstant.carrierConstClass.FILTER_BASES_RESULTS_FILTER_SIZE;
const filterWidthTxt = stringConstant.carrierConstClass.FILTER_BASES_RESULTS_FILTER_WIDTH;
const filterTypeTxt = stringConstant.carrierConstClass.FILTER_BASES_RESULTS_FILTER_TYPE;
const callToOrderTxt = stringConstant.carrierConstClass.FILTER_BASES_RESULTS_CALL_TO_ORDER;
const savePartTxt = stringConstant.carrierConstClass.FILTER_BASES_RESULTS_SAVE_PART;
const infoTxt = stringConstant.carrierConstClass.FILTER_BASES_RESULTS_INFO;
const partTxt = stringConstant.carrierConstClass.FILTER_BASES_RESULTS_PARTINFO_PART;
const partInfoHeaderTxt = stringConstant.carrierConstClass.
                          FILTER_BASES_RESULTS_PART_INFO_HEADER_TXT;
const partInfoDescriptionTxt = stringConstant.carrierConstClass.
                               FILTER_BASES_RESULTS_PARTINFO_DESCRIPTION;

const savePartImage = require('../resources/images/SavePart.png');
const infoImage = require('../resources/images/Information.png');
const callToOrder = require('../resources/images/Call.png');

class FilterBasesResults extends Component {

	constructor(props) {
	  super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});	
	  this.state = {
      isItFilterBasesResults : "FilterBasesResults",
      rightImage : require('../resources/images/More.png'),   
      dataSource : ds.cloneWithRows(dataResource.listItemData.Filter_Bases_Results),
      fromWhichScreen : "FilterBasesResults",
      isCellSwipeable :  true,
      asPerDeviceWidth : "",
      carrierSalesDetails : dataResource.CarrierSalesDetails,
      open: false,
      infoOpen: false,
      popUpWindowHeight: 0,
    	jobsList:null,
      }

      this.responseCallBackPartsAndJobs = this.responseCallBackPartsAndJobs.bind(this);
      this.callToOrderForParts = this.callToOrderForParts.bind(this);
	  };
	
  componentWillMount() {      
      this.windowWidth= Dimensions.get('window').width;
      this.windowHeight= Dimensions.get('window').height;
      console.log("windowWidth : "+this.windowWidth);
      console.log("windowHeight : "+this.windowHeight);

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

  render() {      
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

    return (
      <View style = {styles.container}>	
        
        <View style = {[globalStyles.backNavBtnStyle]} >
          <TouchableOpacity onPress = { this.backToFilterBases }>
            <BackNavComponent 
                backNavText =  {backNavText} />
           </TouchableOpacity>     
        </View>        

  	  	<View style = {[styles.filterOptionsView]}>               
  	  		<View style = {[styles.filterSizeView]}>
            <View style = {{minWidth : 150}}>
              <Text style= {[styles.filterSizeTxt]}>{filterSizeTxt}</Text>
            </View>			  	  
            <Text style = {[styles.selectedFilterSizeTxt]}>14 x 25</Text>
  	  		</View>
  	  		<View style = {[styles.filterOptionViewOthers]}>
            <View style = {{minWidth : 150}}>	
              <Text style= {[styles.filterSizeTxt]}>{filterTypeTxt}</Text>
            </View>	
            <Text style = {[styles.selectedFilterSizeTxt]}>Gas</Text>
  	  		</View>
  	  		<View style = {[styles.filterOptionViewOthers]}>
            <View style = {{minWidth : 150}}>
              <Text style= {[styles.filterSizeTxt]}>{filterWidthTxt}</Text>
            </View>
            <Text style = {[styles.selectedFilterSizeTxt]}>1</Text>
  	  		</View> 
  		  </View>

      	<View style = {{ backgroundColor : "#F6F6F6",alignSelf : "stretch"}} >
          <View style = {[{paddingTop : 20,paddingLeft :10,
              alignSelf : "flex-start",flexDirection : "row"}]}>
            <Text style = {[styles.filterSizeTxt]}>Current Parts</Text>
          </View>
          <View style = {{paddingTop: 10, paddingBottom : 200}}>
            <ListView
              scrollEnabled = { true }
              dataSource={this.state.dataSource}
              renderRow={(rowData,sectionId, rowId) => 
                <View style={styles.rowView}>
                  <SwipeRow                     
                    rightOpenValue= {this.rightOpenValueAsPerDevice}                               
                    disableRightSwipe = {true}
                    modalDidOpen={() => console.log('modal did open')}
                    partDataFromRow = {this.partDataFromRow}
                    rowData = {rowData}
                    rowId = {rowId}
                    swipeLeftSet={(rightOpenValue) =>  {{this.rightOpenValueAsPerDevice}}}  >

                    <View style={styles.swipeableRowBack}>
                      <TouchableOpacity onPress = {this.callToOrderForParts}>
                        <View style ={{flexDirection : "column",marginLeft : 40}}>
                          <Image style ={[styles.swipeImageStyle,{}]} source = {callToOrder}/>
                          <Text style ={[globalStyles.globalBtnTextViewStyle,
                            styles.subMenuTxt]}>{callToOrderTxt}</Text>
                        </View>
                      </TouchableOpacity >

                      <TouchableOpacity onPress={() => this.savePart()}> 
                        <View style ={{flexDirection : "column",}}>
                          <Image style ={[styles.swipeImageStyle,{}]} source = {savePartImage}/>
                          <Text style = {[globalStyles.globalBtnTextViewStyle,
                            styles.subMenuTxt]}>{savePartTxt}</Text>
                        </View>
                      </TouchableOpacity >

                      <TouchableOpacity onPress={() => this.setState({infoOpen: true})}> 
                        <View style ={{flexDirection : "column",}}>
                          <Image style ={[styles.swipeImageStyle,{}]} source = {infoImage}/>
                          <Text style = {[globalStyles.globalBtnTextViewStyle,
                            styles.subMenuTxt]}>{infoTxt}</Text>
                        </View>
                      </TouchableOpacity >   
                    </View>

                    <View style={styles.swipeableRowFront}>
                      <CellView
                        title={rowData["title"]}
                        subTitle={rowData["subTitle"]}
                        leftImage={this.state.leftImage}
                        rightImage={this.state.rightImage} 
                        toBePopulatedOn = {this.state.fromWhichScreen} />                                  
                    </View>                                  
                  </SwipeRow>         
                </View>
              } 
                />
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
          <View style = {{flexDirection : 'row', flex : 1}}>          
            <View style = {[styles.btnContainerView]}>
              <TouchableHighlight style={[{paddingTop: 10, }]} >
                <LinearGradient
                  start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                  locations={[0,0.5,1]}
                  colors={['#57A3E3', '#56A6D1', '#57A3E3']}
                  underlayColor={['#4582B5', '#498FB5', '#4582B5']}
                  style={[{borderRadius: 20}]}>
                  <Text style={[globalStyles.globalBtnTextViewStyle]}>
                    Create & Add
                  </Text>
                </LinearGradient>
              </TouchableHighlight>
            </View>  
            <View style = {[styles.btnContainerView]}>
              <TouchableHighlight style={[{paddingTop: 10, }]} >
                <LinearGradient
                  start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                  locations={[0,0.5,1]}
                  colors={['#57A3E3', '#56A6D1', '#57A3E3']}
                  underlayColor={['#4582B5', '#498FB5', '#4582B5']}              
                  style={[{borderRadius: 20}]}>
                  <Text style={[globalStyles.globalBtnTextViewStyle]}>
                    Add to Job
                  </Text>
                </LinearGradient>
              </TouchableHighlight>
            </View>            
          </View>    
        </CustomModal>

        <Modal
          offset={this.state.offset}
          open={this.state.infoOpen}
          modalDidOpen={() => console.log('modal did open')}
          modalDidClose={() => this.setState({infoOpen: false})}
          style={{alignItems: 'center'}}>
          <View style={{ position:'relative', paddingTop: 15, paddingBottom : 15,}}>           
            <View style = {[styles.partInfoCloseBtn]}> 
              <TouchableOpacity
                 onPress={() => this.setState({infoOpen: false})}>
                  <Text style={{ color: '#333',fontSize: 25,
                    textAlign: 'right',paddingRight: 8}}>&#10005;</Text>
              </TouchableOpacity>
            </View>
            <View style = {[{flexDirection : 'row', justifyContent : 'center',paddingBottom: 10,}]}>
              <Text style={[globalStyles.headerTxt2 ,{fontSize: 20,}]}>{partInfoHeaderTxt}</Text>
            </View>           
            <View>
              <View style = {[styles.partInfoRowCntr]}>
                <View style = {{flex:0.9, alignItems : 'flex-end'}}>
                  <Text style={globalStyles.headerTxt2 }>{partTxt+" "}</Text>
                </View>
                <View style = {{flex:1.1, alignItems : 'flex-start'}}>
                  <Text style={[globalStyles.headerTxt2,styles.partDataTxt]}>PIO2-FHG1425-2 </Text>
                </View>
              </View> 

              <View style = {[styles.partInfoRowCntr]}>
                <View style = {{flex:0.9, alignItems : 'flex-end'}}>
                  <Text style={[globalStyles.headerTxt2,
                    {alignItems: 'center',}]}>{filterSizeTxt+" "}</Text>
                </View>
                <View style = {{flex:1.1, alignItems : 'flex-start'}}>
                  <Text style={[globalStyles.headerTxt2,styles.partDataTxt]}>Five Season  </Text>
                </View>
              </View>
                 
              <View style = {[styles.partInfoRowCntr]}>
                <View style = {{flex:0.9, alignItems : 'flex-end'}}>
                  <Text style={[globalStyles.headerTxt2,
                    {alignItems: 'center',}]}>{filterSizeTxt+" "}</Text>
                </View>
                <View style = {{flex:1.1, alignItems : 'flex-start'}}>
                  <Text style={[globalStyles.headerTxt2,styles.partDataTxt]}>14 x 5 </Text>
                </View>
              </View>
                 
              <View style = {[styles.partInfoRowCntr]}>
                <View style = {{flex:0.9, alignItems : 'flex-end'}}>
                  <Text style={[globalStyles.headerTxt2,
                    {alignItems: 'center',}]}>{filterTypeTxt+" "}</Text>
                </View>
                <View style = {{flex:1.1, alignItems : 'flex-start'}}>
                  <Text style={[globalStyles.headerTxt2,styles.partDataTxt]}>Gas</Text>
                </View>
              </View>
                 
              <View style = {[styles.partInfoRowCntr]}>
                <View style = {{flex:0.9, alignItems : 'flex-end'}}>
                  <Text style={[globalStyles.headerTxt2,
                    {alignItems: 'center',}]}>{filterWidthTxt+" "}</Text>
                </View>
                <View style = {{flex:1.1, alignItems : 'flex-start'}}>
                  <Text style={[globalStyles.headerTxt2,styles.partDataTxt]}>1</Text>
                </View>
              </View>

              <View style = {[{ flexDirection : 'row', justifyContent : 'center',paddingTop: 7}]}>
                <View style = {{flex:0.9, alignItems : 'flex-end'}}>
                  <Text style={[globalStyles.headerTxt2,
                    {alignItems: 'center',}]}>{partInfoDescriptionTxt+ " "}</Text>
                </View>
                <View style = {{flex:1.1, alignItems : 'flex-start'}}>
                  <Text style={[globalStyles.headerTxt2,
                    styles.partDataTxt]}>Filter Housing for 1" Filters. Gas, Air-Title Series.</Text>
                </View>
              </View>                                  
            </View>               
          </View>
        </Modal>
      </View>
    );
  }

  /**
  * # backToFilterBases
  * Purpose: This function is used to do the Back navigation from Filter Bases Results screen
  * Author: Ravichandran P
  * Input Param: 
  * Output Param: 
  */
  backToFilterBases = () => {  
    this.props.navigator.pop();
  }

  /*
  Objective: Get response from web services
  @Param: null
  @return: null
  */
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

partDataFromRow = (pRowId, pRowDataForParts) =>{
    //rowIdForPartNumber to fetch the partNumber from this.props.partslist,and pass that PartNumber to getPartData
    fetchedPartNumber = pRowDataForParts.PartNumber;
    console.log("fetchedPartNumber : "+fetchedPartNumber)
  }

}


const styles = StyleSheet.create({
	container : {
  	flex : 1,
  	flexDirection : "column",
  	justifyContent : "flex-start",
  	alignItems: 'flex-start',
  	backgroundColor : "#F6F6F6",
    paddingTop: 64,
	},
  navBackImage : {
    width : 10,
    height : 10,
  },
  currentsPartsTextViewStyle :{
  	...Platform.select({
    ios: {
      paddingTop: 40,
    },
    android: {
      paddingTop: 10,
      
    }}),    
  },
  backToFilterBaseTxtStyle : {
    color : "#429BE4", 
    fontFamily : "Droid Serif", 
    fontStyle : 'italic', 
    fontWeight : '100', 
    fontSize : 12, 
    paddingTop: 10
  },
  filterOptionsView : {
    alignSelf : "stretch", 
    paddingTop: isItAndroidPhone? 0: 10, 
    paddingLeft:10,   
    flexDirection : "column", 
    justifyContent : "flex-start", 
    alignItems : "flex-start",
  },
  filterSizeView : {
    alignSelf : "flex-start", 
    paddingTop : (isItiPhone6S ? 10 : (isItiPhone5S ? 0 : 20)),
    paddingLeft : 25, 
    flexDirection : "row",
  }, 
  filterOptionViewOthers : {
    alignSelf : "flex-start", 
    paddingTop : 5, 
    paddingLeft : 25, 
    flexDirection : "row",
  },
  filterSizeTxt :{
    color : "#06273F", 
    paddingRight : 20, 
    fontWeight : "normal", 
    fontFamily : "Montserrat", 
    fontSize : 18
  },
  selectedFilterSizeTxt : {
    backgroundColor: "#F6F6F6",
    fontWeight : "normal", 
    fontFamily : "Montserrat", 
    fontSize : 18, 
    color : "#CACACA"
  },
  rowView: {
    paddingTop: 5, 
    paddingBottom: 5, 
    paddingLeft: 10,
    paddingRight: 10,
    height: 80, 
    backgroundColor: 'white'
  },
  swipeableRowBack: {
    alignItems: 'center',
    backgroundColor: '#429BE4',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20
  },
  backTextWhite: {
    color: '#FFF'
  },
  swipeableRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 70,
  },
  swipeImageStyle : {
    alignSelf : 'center',
  },
  textright: {    
    alignSelf: 'flex-end', 
  },
  backButtonContainer :{
    height:30,
    paddingLeft : 10,
    paddingTop: 6,
  },
  subMenuTxt: {
    paddingLeft : 5,
    paddingTop : 2,
  },
  btnContainerView: {
    flexDirection : "row", 
    flex :1,
    justifyContent : "center", 
    backgroundColor :"#429BE4",
    borderRadius : 30, 
    marginLeft: 20 
  },
  partInfoRowCntr: {
    flexDirection : 'row', 
    justifyContent : 'center',
    paddingTop: 7
  },
  partDataTxt: {
    color: '#CACACA',
    fontWeight:'normal',
    alignItems: 'center',
  },
  partInfoCloseBtn: {
    paddingBottom : 10,
    position:'absolute', 
    top: -10, 
    right: -10, 
    width : 35, 
    height : 35
  }

});

export default FilterBasesResults;