import React, { Component } from 'react';
import * as dataResource from './dataResource';
import {globalStyles, deviceFinder} from './globalStyles';
import CellView from './CellView';
import {CallCategory,CallAuthToken} from "./ModServices";
import {onSubmitClickSearchFromServer,onChangeTextSearchHistory} from './SearchHistory';
import ActivityIndicator from "./ActivityIndicator";


import{
  TextInput,
  View,
  Text,
  Image,
  ListView,
  StyleSheet,
  PixelRatio,
  MapView,
  TouchableOpacity,
  Platform,
  Dimensions,
  TouchableHighlight,
  Alert,
  Keyboard,
} from 'react-native';

import AndroidMapView from 'react-native-maps';
import { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome';


const { width, height } = Dimensions.get('window');
const FILTER_TEXT = 'Model or Serial number';
const EMPTY_TEXT = 'No match, try again.';
const mapIcon = (<Icon name="map-marker" size={24} color="#ffffff" />)
var CarrierServiceScandit = require('NativeModules').CarrierServiceScandit;
const isItiPad = deviceFinder.isItiPad();

type DataItem = {
  title: string;
  description: string;
  serialNo: string;
  modelNo: string;
}

class MainSearchView extends Component{
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    (this: any).renderRowHistory = this.renderRowHistory.bind(this);
    this.state = {
        dataSource: ds.cloneWithRows(dataResource.Search_Type_List),
        isItMainSearchView : "mainSearchView",
        dataSourceSearch : [],
        rightImage : require('../resources/images/Next.png'),
        searchViewHeight:0,
        searchQuery: props.searchQuery,
        inputValue:'',
        isSearchButtonClicked:true,
        filter: '',
        willShowSearchResult:false,
        willShowHistoryListView:false,
        isSearchImagePressed : false,
        isLoading: false,
        AuthToken: "",
    };
    this.ProductCategoryListView = this.ProductCategoryListView.bind(this);
    this.OnSearchButtonPressed = this.OnSearchButtonPressed.bind(this); 
    this.onChangeInputValue = this.onChangeInputValue.bind(this);
    this.onSubmitClick = this.onSubmitClick.bind(this);
  }
  onChangeInputValue = (searchText) =>{
    this.setState({inputValue : searchText})
    onChangeTextSearchHistory(this,searchText)
  }
  onSubmitClick(searchText){

    if(searchText.length <=0){
      alert("Please enter the "+FILTER_TEXT);
      Keyboard.dismiss();
    }
    else{
      Keyboard.dismiss();
      onSubmitClickSearchFromServer(this,searchText)
    }

  }
  OnSearchButtonPressed (searchText){
     this.setState({isSearchButtonClicked:true})
    if(searchText.length <= 0 ){
      return; 
    }
    this.setState({willShowSearchResult:true})
  }
  handleKeyDown(e) {
    if(e.nativeEvent.key == "Enter"){
      console.log('Pressed Enter Key');
    }
  }
  measureSearchView(layout){
    const {x, y, width, height} = layout;
    console.log('asdasd');
    var measureSearchViewheight = height;
    console.log(measureSearchViewheight);
    this.setState({searchViewHeight:measureSearchViewheight})
  }
  searchHistoryItem(rowData){
    this.setState({inputValue : rowData})
    onSubmitClickSearchFromServer(this,rowData) ;
  }
  findAnotherStore(){   
    alert('Development in progress');   
  }
  hideKeyBoard(){
    Keyboard.dismiss();
  }

  ProductCategoryListView(rowId) {
    switch(rowId){
      case '0':
      {

        let activityIndicator = new ActivityIndicator();
        activityIndicator.startActivity();
        CallAuthToken(this);
      }
      break;
      case '1':
      {
        let serialNumber = null;
        CarrierServiceScandit.barcodeScanner(dataResource.ScanditAppKey,(error, serialNumber) => {

          if (error || serialNumber.length <= 0) {
            alert("Unable to parse serial code.")
          } 
          else {
            if (true == serialNumber.startsWith("ZI")){
              serialNumber = serialNumber.substring(2, serialNumber.length);
            }
            else if (true == serialNumber.startsWith("S") || true == serialNumber.startsWith("B")){
              serialNumber = serialNumber.substring(1, serialNumber.length);
            }

            this.setState({inputValue : serialNumber})
          }
        })
      }
      break;
      case '2':
      {
        this.props.navigator.push({
         name:'ProductCrossReference',
          title: 'Cross Reference',
          isHidden:false
        });
      }
    }
  }

  render(){
    let mapView = null;
    var searchResultView = null;
    var searchResultViewHistory = null;
    var customeIndicator = null;
    //const dataSource = filterDatasource(this.state.filter);
    const dataSourceSearch = this.state.dataSourceSearch;
    var windowWidth=Dimensions.get('window').width;
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
    if(this.state.willShowSearchResult){
      searchResultView = (
        <View style={{position:'absolute',height:this.state.searchViewHeight,width:width,backgroundColor:'transparent',alignItems:'stretch',alignSelf:'stretch',flexWrap:'wrap',backgroundColor: 'rgba(0,0,0,0.3)',paddingLeft: 10,paddingRight: 10}}>
          <View style={{backgroundColor:'#ffffff',top: 0,paddingTop: 10,}}>
            <ListView
              style={styles.list}
              keyboardDismissMode="on-drag"
              dataSource={dataSourceSearch}
              renderRow={this.renderRowHistory}
              renderSectionHeader={this.renderSectionHeader}
              enableEmptySections={true}
            />
          </View>
        </View> 
      );
    }
    else{
      searchResultView = null;
    }
    if(this.state.willShowHistoryListView){
      searchResultViewHistory = (
        <View style={{position:'absolute',height:this.state.searchViewHeight,width:width,alignItems:'stretch',alignSelf:'stretch',flexWrap:'wrap',backgroundColor: 'rgba(0,0,0,0.3)',paddingLeft: 10,paddingRight: 10, }}>
          <View style={{backgroundColor:'#ffffff',top: 0,paddingTop: 10,}}>
            <ListView
              style={styles.list}
              keyboardDismissMode="on-drag"
              dataSource={dataSourceSearch}
              renderRow={(rowData) =>  <View style={styles.SearchedItemContainer}>
              <TouchableOpacity 
                onPress={() => this.searchHistoryItem(rowData)}>
                <View style={styles.rowSearchedItem}>
                    <View style={styles.searchContentLeft}>
                      <Text style={styles.SearchedItemDefault}>{rowData}</Text>
                    </View>
                    <View style={[styles.searchIconRight,styles.searchIconRightHistory]}>
                      <Image
                        style={[styles.crossRefResultsRightImage,styles.crossRefResultsRightImageHistory]}
                        source={ this.state.rightImage }/> 
                    </View>            
                </View>
                </TouchableOpacity>
              </View>
              }
              enableEmptySections={true}
            />
          </View>
        </View> 
      );
    }
    else{
      searchResultViewHistory = null;
    }
    return(
      <View style={styles.mainSearchView}>
        <View style={styles.searchView}>
          <Text style={[globalStyles.headerTxt1,styles.titleSearchPage]}>Search By</Text>            
         
          <View style={[styles.searchBarUnderline,{ height:40,backgroundColor:'transparent',marginBottom: 0,flexDirection: 'row'}]}>
            <View style={{flex:0.9, }}>
              <TextInput 
                style={[globalStyles.specialMsgTxt,styles.searchInput]} 
                autoCapitalize="none"
                autoCorrect={false}
                underlineColorAndroid='transparent'
                placeholder={FILTER_TEXT}
                placeholderTextColor= '#CACACA'
                onChangeText={(text) => this.onChangeInputValue(text)}
                value={this.state.inputValue}
                onSubmitEditing={(event) => this.onSubmitClick(event.nativeEvent.text)}
                onKeyPress={this.handleKeyDown}
                selectionColor={'white'}
              />
            </View>
            <View style={{flex:0.1,justifyContent: 'center',alignItems: 'stretch',}}>
              <TouchableOpacity onPress={() => this.onSubmitClick(this.state.inputValue)} >
                <Image style={styles.searchImage}  
                  source={require('../resources/images/Search.png')}/> 
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View 
          ref="mycomponent"
          onLayout={(event) => this.measureSearchView(event.nativeEvent.layout)} style={[styles.measureSearchView,{flex:11,}]}
          > 
          <View style={styles.listTopView}>
            <ListView
              scrollEnabled = { true }
              dataSource={this.state.dataSource}
              renderRow={(rowData,sectionId, rowId) => 
              <View style={styles.rowView}>
                <TouchableOpacity style={{flex:1}} onPress={() => this.ProductCategoryListView(rowId)}>
                  <CellView
                    title={rowData["Title"]}
                    subTitle={rowData["subTitle"]}
                    leftImage={rowData["leftImage"]}
                    rightImage={rowData["rightImage"]}
                    isButtonEnabled={rowData["isButtonEnabled"]}
                    toBePopulatedOn = {this.state.isItMainSearchView}
                  />
                </TouchableOpacity >  
              </View>
              } 
            />  
            <View style={styles.mapTopView}>
              {mapView}
                <TouchableHighlight
                  onPress={this.findAnotherStore}
                  style={{left:(windowWidth/2-125),bottom:15,width:250, 
                  height: 40, backgroundColor:'#56A6D1',justifyContent: 'center', 
                  alignItems: 'center',borderRadius : 100, position: 'absolute',}}
                  underlayColor=''>
                  <View style={{flexDirection: 'row'}}>
                    {mapIcon}
                  <Text style={[globalStyles.buttonTxt, {textAlign:'center', color: "#F6F6F6",paddingLeft: 10,paddingTop: 5,}]}>Find Another Store</Text>
                  </View>
                </TouchableHighlight>
            </View>
          </View>
          {searchResultView}
          {searchResultViewHistory}
          <ActivityIndicator />
        </View>
        
        </View>



    );
  }

  renderSectionHeader(sectionData: Array<DataItem>, sectionID: string): ?ReactElement<any> {
    const isEmpty = !sectionData || sectionData.length < 1; 
    let emptyContent;
    if(isEmpty){
        emptyContent = <Text style={styles.sectionEmpty}>{EMPTY_TEXT}</Text>
    }
    return (
      <View>
        {emptyContent}
      </View>      
    );
  }

  renderRowHistory(data: DataItem): ?ReactElement<any> {
    let handler = () => {
     console.log(data);
    }
    return (
      <View style={styles.SearchedItemContainer}>
        <TouchableOpacity onPress={handler} style={styles.SearchedItems}>
          <View style={styles.rowSearchedItem}>
            <View style={styles.searchContentLeft}>
              <Text style={styles.SearchedItemDefault}>{data.title}</Text>
              <Text style={styles.SearchedItemDefault}>{data.subTitle}</Text>
              <Text style={styles.SearchedItemDefault}>{data.modelNo}</Text>
            </View>
            <View style={styles.searchIconRight}>
              <Image
                style={[styles.crossRefResultsRightImage]}
                source={ this.state.rightImage }/> 
            </View>            
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainSearchView:{
    flex:1,
    paddingTop: (Platform.OS === 'ios' ? 64 : 54),
    backgroundColor: 'white',
  },
  whiteNormalText:{
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchView:{
    height:125, 
    backgroundColor:'#4795CA',
    paddingTop: 20, 
    paddingLeft: 20,
    paddingRight: 20
  },
  searchImage:{
    // marginLeft: 300,
    alignSelf:'flex-end',
    marginBottom: 5,
    width: 24,
    height: 24,
  },
  searchBarUnderline:{
    borderBottomColor: "white", 
    borderBottomWidth:2
  },
  rowView: {
    flex: 1,
    paddingBottom: 10, 
    paddingLeft: 10,
    paddingRight: 10,
    height: 70, 
    backgroundColor: 'white',
  },
  listTopView:{
    flex:5, 
    justifyContent: 'center', 
    paddingTop: 10,
  },
  mapTopView:{
    flex:6, 
    paddingBottom: 10, 
    paddingLeft: 10,
    paddingRight: 10,
    position: 'relative',
    minHeight: 150,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  noSearchResults: {
    color: "#F6F6F6",
    fontSize: 16,
    fontFamily: 'Droid Serif',
    fontWeight: 'normal',
    fontStyle: 'italic',
    padding: 20,
  },
  SearchedItemContainer :{
    margin: 10,
    marginTop:2,
    marginBottom: 10,
  },
  SearchedItems:{
    borderWidth: 1,
    borderColor: '#F6F6F6',
  },
  SearchedItemDefault: {
    color: "#6A6A6A",
    fontSize: 12,
    fontFamily: 'Montserrat',
    fontWeight: '300'
  },
  rowSearchedItem: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    alignSelf: 'stretch',
    flexDirection : 'row',
    //backgroundColor:'yellow',
  },
  searchContentLeft: {
    alignSelf : 'flex-start',
    justifyContent : 'flex-start',
    // backgroundColor:'red',
  },
  searchIconRight :{
    width: 10,
    height: 16,
    justifyContent : 'flex-end',
    flex : 1 ,
    flexDirection : 'row',
    // backgroundColor : "yellow",
    alignItems: 'center',
    alignSelf:'center',
  },
  searchIconRightHistory: {
    width: 8,
    height: 12,
  },
  crossRefResultsRightImage :{
    alignItems: 'center',
    position: 'relative',
    top: 0,

  },
  crossRefResultsRightImageHistory: {
    width: 8,
    height: 12,
  },
  sectionEmpty :{
    padding: 20,
    paddingTop: 15,
    color: "#6A6A6A",
    fontFamily: 'Droid Serif',
    fontWeight: 'normal',
    fontStyle: 'italic',
    fontSize : 12,
  },
  searchInput: {
    paddingBottom: 10,
    height: 50,
    paddingLeft: 5
  },
  titleSearchPage: {
    paddingLeft: 3,
    paddingBottom:10,
  }
});

export default MainSearchView;
