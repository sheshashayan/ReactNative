/**
 * # WarrantyDetails.js
 * This class is used to show display the Entitlement overview, warranty details, service history & service contracts
 * Author: Girija
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
   Platform,
   TouchableHighlight,
    Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as dataResource from './dataResource';
import CellView from "./CellView"; 
import Router from "./Router";
import * as stringConstant from '../constants/StringConstant';
import BackNavComponent from "./BackNavComponent";
import ChangeCurrentStore from "./ChangeCurrentStore";
import {globalStyles, deviceFinder} from "./globalStyles"; 
import Modal from 'react-native-simple-modal';
import CustomModal from "./CustomModal";
import Diagnose from "./Diagnose";

const backNavText = stringConstant.carrierConstClass.WARRANTY_PAGE_BACK_BUTTON;
const serialNumber = stringConstant.carrierConstClass.WARRANTY_SERIAL_NUMBER;
const modelNumber = stringConstant.carrierConstClass.WARRANTY_MODEL_NUMBER;
const sectionHeader = stringConstant.carrierConstClass.WARRANTY_SECTION_HEADER
const owner = stringConstant.carrierConstClass.WARRANTY_OWNER;
const warrantyDateInstalled = stringConstant.carrierConstClass.WARRANTY_DATE_INSTALLED;
const warrantyDateTransfered = stringConstant.carrierConstClass.WARRANTY_DATE_TRANSFERED;
const policyDescription = stringConstant.carrierConstClass.WARRANTY_POLICY_DESCRIPTION;
const markAs = stringConstant.carrierConstClass.WARRANTY_MARK_AS;
const entitlementInfo = stringConstant.carrierConstClass.WARRANTY_ENTITLEMENT_INFO;
const warrantyInfo = stringConstant.carrierConstClass.WARRANTY_INFO;
const shippedDate = stringConstant.carrierConstClass.WARRANTY_SHIPPED_DATE;
const replModel = stringConstant.carrierConstClass.WARRANTY_REPL_MODEL;
const replSerial = stringConstant.carrierConstClass.WARRANTY_REPL_SERIAL;
const addToJob = stringConstant.carrierConstClass.WARRANTY_ADD_TO_JOB;
const contactStore = stringConstant.carrierConstClass.WARRANTY_CONTACT_STORE;

const isItiPhone6S = deviceFinder.isItiPhone6S();
const isItiPhone5S = deviceFinder.isItiPhone5S();
const isItiPad = deviceFinder.isItiPad();

const mapIcon = (<Icon name="map-marker" size={24} color="#ffffff"/>)

class Warranty extends Component {

  constructor(props) {
    super(props); 
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  	this.state = {
      rightImage : require('../resources/images/Next.png'),
      isItFilterBasesResults : "FilterBasesResults",
      dataSourceWarrantyPageList : ds.cloneWithRows(dataResource.listItemData.Warranty_Page_List),  
      dataSourcePartsListsTechnicalLiterature : ds.cloneWithRows(dataResource.listItemData.PartsLists_TechnicalLiterature),  
      partsListFromWarrantyPage : this.props.partsList  ,
      open: false,  
      warrantyInfo : this.props.warrantyInfo, 
      ownerValue: "Name",
      dateInstalledValue: "date install",
      dateTransferredValue: "data transfer",
      policyDescriptionValue: "policy description",
      markedAsValue: "N/A",
      shippedDate: "",
      repalOfModel:"",
      replaOfSerial:"" 
    };   

  };

    componentWillMount() {
        this.windowWidth= Dimensions.get('window').width;
        this.windowHeight= Dimensions.get('window').height;

        console.log("windowWidth : "+this.windowWidth);
        console.log("windowHeight : "+this.windowHeight);
    }

    /* Updated by: Rakesh
    Adding view life cycle method
    componentDidMount() is invoked immediately after a component is mounted. 
*/
  componentDidMount(){
    
    let warraantyInfoArray = [];
    warraantyInfoArray = this.state.warrantyInfo["EntitlementResponse"]["entitlementData"];
    let entitlementOverArray  = warraantyInfoArray[0].detail;

    let lWarranty= null;
    let ldateInstalled = null;
    let ldateTransferred = null;
    let lpolicyDescription = null;
    let lmarkedAs = null;
    let lshippedDate = null;
    let lreplModel = null;
    let lreplSerial = null;


    entitlementOverArray.forEach(function(element){

      if(element.dataKey === "owner"){
        lWarranty = element.dataDescription
      }else if(element.dataKey === "dateInstalled"){
        ldateInstalled = element.dataDescription
      }else if(element.dataKey === "dateTransferred"){
        ldateTransferred = element.dataDescription
      }else if(element.dataKey === "warrantyPolicyDescription"){
        lpolicyDescription = element.dataDescription
      }else if(element.dataKey === "markedAs"){
        lmarkedAs = element.dataDescription
      }else if(element.dataKey === "shippedDate"){
        lshippedDate = element.dataDescription
      }else if(element.dataKey === "replacementOfModel"){
        lreplModel = element.dataDescription
      }else if(element.dataKey === "replacementOfSerialNumber"){
        lreplSerial = element.dataDescription
      }
    });


    this.setState({
      ownerValue:lWarranty,
      dateInstalledValue:ldateInstalled,
      dateTransferredValue:ldateTransferred,
      policyDescriptionValue:lpolicyDescription,
      markedAsValue:lmarkedAs,
      shippedDate:lshippedDate,
      replaOfSerial:lreplSerial,
      repalOfModel:lreplModel
    })

   }


  render() {

    let ownerDetails = null;
    let dateInstalledDetails = null;
    let dateTransferredDetails = null;
    let policyDescriptionDetails = null
    let markedAsDetails = null;
    let shippedDateDetails = null;
    let replModelDetails = null;
    let replSerialDetails = null;


     ownerDetails = ( <View style = {[styles.rowText1]}>
                    <Text style= {styles.textStyleLeft}>{owner}</Text>
                    <Text style= {[styles.textStyleRight, {paddingLeft:68}]}>{this.state.ownerValue}</Text>
                </View>)

    dateInstalledDetails = ( <View style = {[styles.rowText2]}>
                    <Text style= {styles.textStyleLeft}>{warrantyDateInstalled}</Text>
                    <Text style= {[styles.textStyleRight, {paddingLeft:25}]}>{this.state.dateInstalledValue}</Text>
                </View>)

    dateTransferredDetails = (<View style = {[styles.rowText1]}>
                    <Text style= {styles.textStyleLeft}>{warrantyDateTransfered}</Text>
                    <Text style= {[styles.textStyleRight, {paddingLeft:8}]}>{this.state.dateTransferredValue}</Text>            
                </View>)

    policyDescriptionDetails = ( <View style = {[styles.rowText2]}>
                    <Text style= {styles.textStyleLeft}>{policyDescription}</Text> 
                    <Text style= {[styles.textStyleRight]}>{this.state.policyDescriptionValue}</Text>                
                </View>)

    markedAsDetails = (<View style = {[styles.rowText1]}>
                    <Text style= {styles.textStyleLeft}>{markAs}</Text>  
                    <Text style= {[styles.textStyleRight, {paddingLeft:60}]}>{this.state.markedAsValue}</Text>
                </View>  )
    
    shippedDateDetails = ( <View style = {styles.rowText2}>
                        <Text style= {styles.textStyleLeft}>{shippedDate}:</Text>
                        <Text style= {[styles.textStyleRight, {paddingLeft:56}]}>{this.state.shippedDate}</Text>
                        </View>)

    replModelDetails = (<View style={styles.rowText1}>
                         <Text style= {styles.textStyleLeft}>{replModel}:</Text>
                          <Text style= {[styles.textStyleRight, {paddingLeft:52}]}>{this.state.repalOfModel}</Text>
                       </View>)
    replSerialDetails = ( <View style = {styles.rowText2}>
                    <Text style= {styles.textStyleLeft}>{replSerial}:</Text>
                    <Text style= {[styles.textStyleRight, {paddingLeft:56}]}>{this.state.replaOfSerial}</Text>
                  </View>)
        
   


      let imageLogo = null;

      if(this.windowWidth > 300 && this.windowWidth < 500){
          imageLogo = (
              <Image  style={styles.productImage}
                      source={require('../resources/images/carrierLogo-mobile.png')} />
          )
      }
      else{
          imageLogo = (
              <Image  style={styles.productImage}
                      source={require('../resources/images/carrierLogo.png')} />
          )
      }


    return (
      <View style = {styles.container} >    
          <View style = {[styles.backNavBtnStyle]}>
            <TouchableOpacity onPress = { this.backToMainProductPage }  >
                <BackNavComponent 
                    backNavText =  {backNavText} />
             </TouchableOpacity>     
          </View>
        <ScrollView>  
        <View style = {styles.topContainer}>
          
          <View style = {styles.topRightSection}>
                  <View style={styles.productImageContainer}>
                      {imageLogo}
                </View> 

                  <View style={[styles.headerTextContainer]}>
                    <View style = {{ paddingLeft:10}}>
                        <Text style= {styles.sectionHeader }>{sectionHeader}</Text>
                      </View>
                      <View style = {[styles.serialModelView,{paddingTop :5,}]}>
                        <Text style= {styles.textStyleLeft}>{serialNumber}</Text>
                        <Text style= {[styles.textStyleRight, {paddingLeft:16}]}>QW1233</Text>
                      </View>
                      <View style = {[styles.serialModelView,{paddingTop : 10,}]}>
                        <Text style= {styles.textStyleLeft}>{modelNumber}</Text>
                        <Text style= {[styles.textStyleRight, {paddingLeft:12}]}>RT231232</Text>
                      </View>
                     
                </View>
          </View>
         
        <View style = {styles.warrantyInfo}>
            <Text style= {{color:'#FFFFFF',fontSize:16, fontFamily:'Montserrat', paddingTop: 10,paddingBottom: 10,}}>{warrantyInfo}</Text>
        </View>
          
      <View style={styles.entitlementInfo}>
         <Text style= {{color:'#000000',fontSize:18}}>{entitlementInfo}</Text>
         <View style={styles.entitlementInfoRowText}>
           <Text style= {{color:'#000000'}}></Text>
         </View>

          {ownerDetails}
          {dateInstalledDetails}
          {dateTransferredDetails}
          {policyDescriptionDetails}
          {markedAsDetails}
          {shippedDateDetails}
          {replModelDetails}
          {replSerialDetails}
      
      </View> 
       <View style={styles.listNav}>
          
          <ListView scrollEnabled = { true }
            dataSource={this.state.dataSourceWarrantyPageList}
            renderRow={(rowData,sectionId, rowId) => 
                          <View style={styles.rowView}>
                            <TouchableOpacity style={{flex:1}} onPress={() => this.warrantyDetailsNav(rowData["title"])}>
                            <CellView
                              title={rowData["title"]}
                              rightImage={this.state.rightImage} />
                            </TouchableOpacity >  
                        </View>
                      } 
          />
         </View>
        </View>
        </ScrollView>
   </View>	
    );
  }

  /**
  * # backToWarrantyPage
  * Purpose: This function is used to do the back navigation from Warranty screen
  * Author:  Girija
  * Input Param: 
  * Output Param: 
  */
  backToMainProductPage = () => {
    this.props.navigator.pop();
  }
 
 /**
  * # toSearchAnotherStore
  * Purpose: This function is used to do the back navigation from Warranty screen to store
  * Author:  Girija
  * Input Param: 
  * Output Param: 
  */
  toSearchAnotherStore= () => {
   this.props.navigator.push({
            name:'ChangeCurrentStore',
            title:'Change Current Store',
            isHidden:false 
          });

  }
  
  /**
  * # addToJob
  * Purpose: This function is used to do the back navigation from Warranty screen to Add to job
  * Author:  Girija
  * Input Param: 
  * Output Param: 
  */
  addToJob= () => {
    alert("Development is in progress..");
  /*this.props.navigator.push({
            name:'ChangeCurrentStore',
            title:'Change Current Store',
            isHidden:false 
          });*/

  }

  /**
  * # warrantyDetailsNav
  * Purpose: This function is used to do the navigation from Warranty screen to Other 
  * Author: Ravichandran P
  * Input Param: title
  * Output Param: 
  */
  warrantyDetailsNav =(title) => {    
   switch(title){    
    
    case 'Warranty Details':{
      this.props.navigator.push({
        name:'WarrantyDetails',
        title:'Warranty Details',
        isHidden:false });      
      }
      break;  

    case 'Service History':{
      this.props.navigator.push({
        name:'ServiceHistory',
        title:'Service History',
        isHidden:false });        
    }
    break; 

    case 'Service Contracts':{
       let contractArray = [];
        contractArray = this.state.warrantyInfo["EntitlementResponse"]["entitlementData"];
        let entitlementOverArray  = contractArray[4].detail;
      
      this.props.navigator.push({
          name:'ServiceContracts',
          title:'Service Contracts',
          isHidden:false,
          passProps:{serviceContractsArray : entitlementOverArray}
        });
    }
    break; 
    }
  }

  /**
  * # warrantyPartsLiterature
  * Purpose: This function is used to do the navigation from Warranty screen to Other 
  * Author: Ravichandran P
  * Input Param: title
  * Output Param: 
  */
  warrantyPartsLiterature =(title) => {  
   switch(title){    
    
    case 'Parts List':{
      this.props.navigator.push({
            name:'Parts',
            title:'Parts List',
            isHidden:false,
            passProps: {partsListFromWarrantyPage: this.state.partsListFromWarrantyPage}
          });     
      }
      break;  

    case 'Technical Literature':{
       this.props.navigator.push({
           name:'Diagnose',
           title:'Technical Literature',
            isHidden:false 
          });
      }
    break; 

    }
  }
}

const styles = StyleSheet.create({
 container:{
    flex : 1,
    flexDirection : "column",
    justifyContent : "flex-start",
    backgroundColor : "#F6F6F6",
    paddingTop: 64, 
  },
  topContainer: {
    //flex:1,
    flexDirection : "column",
    paddingTop : 10,
  },
  container1: {
    flexDirection : "column",  
    paddingTop: 10,
    paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
  },
  backToFilterBasesView : {
    paddingTop: 10, 
    paddingLeft:5, 
    height : 50,
  },
  filterOptionsView : {
    alignSelf : "stretch", 
    paddingTop: 20, 
    paddingLeft:10, 
    flex : 18 ,  
    flexDirection : "column", 
    justifyContent : "flex-start", 
    alignItems : "flex-start",
  },
  backToFilterBaseTxtStyle : {
    color : "#429BE4", 
    fontFamily : "Droid Serif", 
    paddingLeft : 5, 
    fontStyle : 'italic', 
    fontWeight : '100', 
    fontSize : 12, 
    paddingTop: 10
  },
  backToCrossRefStyle : {
    alignSelf:'flex-start', 
    justifyContent : "flex-start", 
    marginTop :0, 
    marginLeft: 0 
  },
  listNav: {
    //flex:5,
    marginTop:10
  },
  rowView : {
    paddingTop: 2, 
    paddingBottom: 5,   
    paddingLeft: 5,
    paddingRight: 5,
    height: 80, 
  },
  textStyleLeft:{
    color : "#06273F", 
    paddingRight : 20, 
    fontWeight : "normal", 
    fontFamily : "Montserrat", 
    fontSize : 12,
    paddingBottom:10,
  },
  textStyleRight:{
    color : "#CACACA", 
    paddingRight : 20, 
    fontWeight : "normal", 
    fontFamily : "Montserrat", 
    fontSize : 12,
    paddingBottom:10,
    flex:1,
    textAlign:'left',
  },
  backNavBtnStyle : {
    alignSelf:'flex-start', 
    justifyContent : "flex-start", 
  },
  rowTxtView: {
    paddingTop : 5, 
    paddingLeft : 25, 
    flexDirection : "row" 
  },
  entitlementTxt: {
    color : "#06273F", 
    paddingRight : 20, 
    fontSize:18, 
    fontWeight:'bold', 
    fontFamily : "Montserrat", 
  },
 
 jobContactStoreStyle: {
  position: 'absolute',
  //flex:1,
  left: 0,
  right: 0,
  bottom: 0,
  //top:-30,
  flexDirection:'row',
  height:40,
  alignItems:'center',
     paddingLeft: 5,
 paddingRight: 5,
},

jobStoreButton: {
  alignItems:'center',
  justifyContent: 'center',
  flex:1,
  height:40,
  backgroundColor:'#57a3e2',
  borderColor:'#F6F6F6',
  borderWidth:2,
  textAlign : 'center',
  fontFamily: 'Montserrat',
  fontSize:12,
},

jobStoreText: {
  color:'white',
  fontWeight:'bold',
  alignItems:'center',
  fontFamily: 'Montserrat',
  fontSize:12,
},
warrantyInfo: {
  paddingLeft:10,
  backgroundColor:'#6A6A6A',
  paddingTop:2,
},
entitlementInfo: {
  paddingTop:10, 
  paddingLeft:10,
  paddingRight:10
},
entitlementInfoRowText:{
  flexDirection:'row', 
  backgroundColor:'#FFFFFF',
  marginTop:10,
  paddingTop:10,
},
rowText1:{
  paddingTop :10,  
  marginTop:10, 
  flexDirection : "row", 
  paddingLeft:15
},
rowText2:{
  flexDirection:'row', 
  backgroundColor:'#FFFFFF',
  marginTop:10,
  paddingTop:10,
  paddingLeft:15
},
sectionHeader:{
  color : "#06273F",
  paddingRight : 0,
  fontSize:14,
  fontWeight:'bold', 
  fontFamily : "Montserrat",  
},
imgStyle:{
  paddingTop: 20, 
  paddingBottom: 20, 
  flex: 0.3, 
  flexDirection: 'row', 
  justifyContent: 'center',
   resizeMode: (Platform.OS === 'ios' ? 'center' : 'center')
},
topRightSection: {
  paddingTop : 5,  
  flexDirection : "row",
  marginBottom:30,
  paddingLeft: 10,
  paddingRight: 10,
},
serialModelView: {
  paddingLeft : 10, 
  flexDirection : "row"
},
 productImageContainer:{  
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    overflow: 'hidden',
    //backgroundColor:'silver'
  },
productImage: {
    resizeMode: (Platform.OS === 'ios' ? 'center' : 'center')
  },

  headerTextContainer:{  
    paddingRight: 10, 
    paddingTop:10, 
    flex:2,
    justifyContent:'center',
    alignItems:'flex-start',
  },

});

export default Warranty;


