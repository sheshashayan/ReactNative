/*-------------------------------------------------------------------------------------------------
--- Name      : PartsAndJobs
--- Author    : Prakash S
--- Date      : 03/20/2017
--- Purpose   : Jobs & Parts screen with Map and Address and Parts and Jobs List View
-------------------------------------------------------------------------------------------------*/
import React, { Component } from 'react';

import * as dataResource from './dataResource';
import CellView from './CellView';
import {globalStyles, deviceFinder} from "./globalStyles"; 
import renderIf from './renderif';
import LinearGradient from 'react-native-linear-gradient';
import PartsAndJobsList from './PartsAndJobsList';
import BackNavComponent from "./BackNavComponent";
import Icon from 'react-native-vector-icons/FontAwesome';
import Router from "./Router";
import ChangeCurrentStore from "./ChangeCurrentStore";
import * as stringConstant from '../constants/StringConstant';


import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
  PropTypes,
  Image,
  Dimensions,
  Platform,
  TouchableHighlight,
  MapView,
  ListView,
  Linking,
} from 'react-native';

import AndroidMapView from 'react-native-maps';
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';

var CarrierServiceScandit = require('NativeModules').CarrierServiceScandit;
const backNavText = stringConstant.carrierConstClass.SEARCH_BACK_BUTTON;
const { width, height } = Dimensions.get('window');
const mapIcon = (<Icon name="map-marker" size={24} color="#ffffff" />)
const phoneIcon = (<Icon name="phone" size={22} color="#ffffff" />)
const minusIcon = (<Icon name="minus-circle" size={22} color="#000000" />)
var windowWidth=Dimensions.get('window').width;

class PartsandJobs extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    console.log('ds', ds)
    this.state ={
      dataSource : ds.cloneWithRows(dataResource.Items_Parts_List),
      mapaddressViewHeight:'',
      searchViewHeight:0,
      addressCallViewHeight:0,
      isExpanded:false,

    }
    //this.jobItemPress = this.jobItemPress.bind(this);
    this.onPressDeleteParts = this.onPressDeleteParts.bind(this);
    this.callToOrderForParts = this.callToOrderForParts.bind(this);
    
  }
  measureAddressMapView(layout){
    const {x, y, width, height} = layout;
    var measureAddressMapViewHeight = height;
    this.setState({addressMapHeight:measureAddressMapViewHeight});
    console.log("measureAddressMapViewHeight" +measureAddressMapViewHeight);
  }
  addressCallView(layout){
    const {x, y, width, height} = layout;
    var addressCallViewHeight = height;
    this.setState({addressCallHeight:addressCallViewHeight});
    console.log("addressCallViewViewHeight" +addressCallViewHeight);
  }
  
  callToOrderForParts = () => {    
    CarrierServiceScandit.isDevSupportCalling((isSupportCall) => {
    if(!isSupportCall){
        alert('Device does not support call feature');
        return;
      } 
    let phoneNo = "5186904455";
    let pinCodeAsPerCurrentLatLong = "12110"; //or pinCodeAsPerUserRegisteredAddress
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
  removeJob(){
    alert('Remove Job');
  }
  jobItemPress(e, id){
    console.log("jobItemPress...111", id, e);
    console.log("this.state.isExpanded : " +this.state.isExpanded);
    this.setState({isExpanded: !this.state.isExpanded});
    console.log("this.state.isExpanded : " +this.state.isExpanded);
  }
  onPressDeleteParts(){
    alert('onPressDeleteParts.. ');
  }
  render() {
    let mapView = null;
    let mapContainerHeight = this.state.addressMapHeight - this.state.addressCallHeight;
    console.log("mapContainerHeight" +mapContainerHeight);
    let i=1;
    const SECTIONS = this.state.dataSource;
    console.log('section', SECTIONS);

    if(Platform.OS === 'ios'){
       mapView = (<MapView
          style={{flex: 1}}
          showsUserLocation={true}
          region={dataResource.searchView_Locations["region"]}
          annotations={dataResource.searchView_Locations["markers"]}
          marker={require('../resources/images/Next.png')}>
        </MapView>)
    }else{
      mapView = (<AndroidMapView
        style={styles.map}
        annotations={dataResource.searchView_Locations["markers"]}
        initialRegion={dataResource.searchView_Locations["region"]}>
      </AndroidMapView>)
    }

      return (      
      <View style={styles.container}>

        <View style = {[globalStyles.backNavBtnStyle]}>
          <TouchableOpacity style = {[]}  onPress = { this.backToMainSearch }>
            <BackNavComponent  backNavText =  {backNavText} />
          </TouchableOpacity>
        </View>
        <PartsAndJobsList 
            style = {styles.partsSellersList}
            jobsList = {this.props.jobsList} />
        <View 
          ref="mycomponent"
          onLayout={(event) => this.measureAddressMapView(event.nativeEvent.layout)}
          style={[styles.mapaddressView,styles.mapaddressViewContainer]}>
            <View 
              ref="mycomponent"
              onLayout={(event) => this.addressCallView(event.nativeEvent.layout)}
              style={styles.addressCall}>
                <View style={styles.address}>
                  <View style={styles.titleLink}>
                    <Text style={[globalStyles.headerTxt3,styles.addressTitle,]}>ABC Distrubutors </Text>
                    <Text style={[globalStyles.Link,styles.change]}
                        onPress={() => alert("Development in progress")}>
                      Change
                    </Text>
                  </View>
                  <Text style={[globalStyles.headerTxt4,styles.addressText]}>3471 Popular Lane</Text>
                  <Text style={[globalStyles.headerTxt4,styles.addressText]}>Wapasauka, WI 38193</Text>
                </View>
                <View style={styles.call}>
                    <TouchableOpacity onPress = {this.callToOrderForParts}>
                       <View style ={styles.callTo}>
                          {phoneIcon}
                       </View>
                       <Text style ={globalStyles.LinkText}>Call to Order</Text>
                     </TouchableOpacity >
                </View>
            </View>
            <View style={[styles.mapContainer,{height:mapContainerHeight}]}>
              {mapView}
              <TouchableHighlight 
                  onPress = {() => this.toSearchAnotherStore()}
                  style={styles.anotherStore}
                  underlayColor='#4582b5'>
                  <View style={[styles.mapTextContainer,globalStyles.rowView]}>
                    <Text style={styles.ffff}>
                      {mapIcon} 
                    </Text>
                    <Text style={[globalStyles.headerTxt,styles.buttonText]}>
                      Find Another Store
                    </Text>
                  </View>
              </TouchableHighlight>
            </View>
        </View>
      </View>
    );
  }
  backToMainSearch = () => {
      this.props.navigator.pop();
   }  
  toSearchAnotherStore= () => {
    this.props.navigator.push({
      name:'ChangeCurrentStore',
      title:'Select Another Store',
      isHidden:false
    });

  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignSelf : "stretch",
      paddingTop: 64,
  },
  headerContent:{
    paddingLeft: 10,
    paddingRight: 10,
  },
  jobPartsContainer: {

  },
  partsSellersList: {
    flex: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  itemsContainer: {
    // backgroundColor:'yellow',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  itemPartsList:{
    backgroundColor:'#ECECEC',
    shadowColor : "#CACACA",
    shadowOpacity : 1,
    shadowRadius : 3,
    shadowOffset : {width: 1, height: 1.0},
    flexDirection:'row',
    padding: 10,
    justifyContent:'space-between',
    borderRadius: 4,
  },
  itemPartsListLeft: {
    alignItems:'flex-start',
    flexDirection:'row',
    justifyContent:'center',
  },
  removeJobContainer: {
    justifyContent:'center',
    alignItems:'flex-start',
  },
  itemPartsListRight: {
    alignItems:'flex-end',
    justifyContent:'center',
  },
  removeJobButton: {
    //backgroundColor:'yellow',
  },
  removeJobIcon: {
    justifyContent:'center',
    alignItems:'center',
    fontSize: 25, 
    fontWeight: 'bold'
  },
  removePartIcon: {
    fontSize: 20, 
    fontWeight: 'bold'
  },
  itemPartsTitleContainer: {
    justifyContent:'center',
  },
  itemPartsTitle:{
    fontWeight: 'normal',

  },
  innerItemPartsTitle: {
    fontWeight: 'normal',
  },
  partDetails: {
    justifyContent:'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#CACACA',
  },
  partDetailsLeft: {
    justifyContent:'flex-start',
  },
  partDetailsRight: {
    justifyContent:'flex-end',
  },
  innerItemParts: {
    color: '#CACACA',
  },
  innerItemPartsLeft: {
    paddingRight: 60,
  },
  mapaddressView :{
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'stretch',
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight: 5,
  },
  addressCall: {
    justifyContent: 'space-between',
    flexDirection:'row',
    paddingTop: 10,
    paddingBottom: 10,   
    paddingLeft: 5,
    paddingRight: 5, 
  },
  address :{
    justifyContent: 'flex-start',
  },
  call: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    flexDirection:'row',
    justifyContent:'center',
    //textAlign:'center',
  },
  change: {
    position: 'relative',
    top: 3,
  },
  mapContainer: {
    position:'relative',
  },
  mapTextContainer: {
    justifyContent:'center',
  },
  titleLink: {
    flexDirection:'row',
  },
  addressTitle: {
    color:'#06273F'
  },
  addressText: {
    color: '#6a6a6a',
    fontWeight:'normal',
  },
  linkText: {
    textAlign: 'center',
  },
  callToOrder: {
    justifyContent:'center',
    textAlign:'center',
  },

  callTo: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    width: 35,
    height: 35,
    backgroundColor:'#429be4',
    borderRadius: 35/2,
  },
  anotherStore:{
    borderRadius: 40,
    justifyContent:'center',
    width: 240,
    left: width/2-120,
    position:'absolute',
    bottom: 10,
    backgroundColor:'#56A6D1',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  buttonGradient: {
    borderRadius: 40,
    padding: 10,
    paddingLeft: 40,
    paddingRight: 40,
    justifyContent:'center',
  },
  buttonText: {
    color: '#ffffff',
    textAlign:'center',
    paddingLeft: 6,
    paddingTop: 4,
    textAlign:'center',
    fontFamily: 'Montserrat',
  },
  accordionBtn: {
    width: 30,
    height: 30,
    //backgroundColor:'yellow',
  },
  accordionBtn: {
    fontSize: 30,
  },
  show : {
    backgroundColor :'yellow',
  }
});
export default PartsandJobs;