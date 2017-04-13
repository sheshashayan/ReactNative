/**
 * # FilterBases.js
 * This class will render search through Model No. or search by applying Filter Options 
 * for the selected cross reference 
 * Author: Ravichandran P
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';

import CellView from "./CellView";  
import CustomCrossRefResultsListView from "./CrossReferenceResults";
import {globalStyles, deviceFinder} from './globalStyles';

import CustomRadioButton from "./customRadioButton"; 
import CustomThreeRadioButton from "./CustomThreeRadioButton";
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';

const radioBtnCheckedSrc = require('../resources/images/CheckedStep.png');
const radioBtnUnCheckedSrc = require('../resources/images/UncheckedStep.png');
const isItiPhone6S = deviceFinder.isItiPhone6S();
const isItiPhone5S = deviceFinder.isItiPhone5S();
const isItiPad = deviceFinder.isItiPad();
const isIt7InchTablet = deviceFinder.isIt7InchTablet();
const isIt10InchTablet = deviceFinder.isIt10InchTablet();
const isItAndroidPhone = deviceFinder.isItAndroidPhone();
const backNavText = stringConstant.carrierConstClass.FILTER_BASES_BACK_BUTTON;

const filterArrowImage = require('../resources/images/FilterArrow.png');
const filterSizeTxt = stringConstant.carrierConstClass.FILTER_BASES_RESULTS_FILTER_SIZE;
const filterWidthTxt = stringConstant.carrierConstClass.FILTER_BASES_RESULTS_FILTER_WIDTH;
const filterTypeTxt = stringConstant.carrierConstClass.FILTER_BASES_RESULTS_FILTER_TYPE;

import * as stringConstant from '../constants/StringConstant';
import BackNavComponent from "./BackNavComponent";

class FilterBases extends Component {

  constructor(props) {
      super(props);
    
      this.state = {
        searchedItem : "",
        selectedFilterSize : "",
        isFilterSizeSelected : false,
        filterSizeDefaultValue : "Select",
        filterSize : ['14 x 20', '14 x 25', '16 x 20', '16 x 25','20 x 20', '20 x 25','24 x 24', '30 x 25'],

        /*----------- two Radio buttons -----------*/
        radioBtn1UnChecked : false,
        radioBtn2Checked : false,
        radioBtnCheckedImg : radioBtnCheckedSrc,
        radioBtnUnCheckedImg : radioBtnUnCheckedSrc,      
        isCheckedFirst: true,
        isCheckedSecond: false,
       
        /*----------- three Radio buttons -----------*/        
        radioBtn1UnChecked3 : false,
        radioBtn2Checked3 : false,
        radioBtnCheckedImg3: radioBtnCheckedSrc,
        radioBtnUnCheckedImg3 : radioBtnUnCheckedSrc,      
        radioBtn3Checked3 : false,
        radioBtn3UnChecked3 : true,        
        isThreeCheckedFirst: true,
        isThreeCheckedSecond: false,
        isThreeCheckedThird: false,
        dropDownWidth : 200,

        firstRadioBtnLbl : "Gas",
        secondRadioBtnLbl : "Electric",
        threeRadiofirstBtnLbl: "1",
        threeRadiosecondBtnLbl: "2",
        threeRadiothirdBtnLbl: "3",
      };

      this.radioFirstBtnEventHandle = this.radioFirstBtnEventHandle.bind(this);
      this.radioSecndBtnEventHandle = this.radioSecndBtnEventHandle.bind(this);
      this.threeRadioBtnSecondEventHandle = this.threeRadioBtnSecondEventHandle.bind(this);
      this.threeRadioBtnFirstEventHandle = this.threeRadioBtnFirstEventHandle.bind(this);
      this.threeRadioBtnThirdEventHandle = this.threeRadioBtnThirdEventHandle.bind(this);
      this.findDimensions = this.findDimensions.bind(this);
      this.filterBasesModelSearchNav = this.filterBasesModelSearchNav.bind(this);
      this.dropdownOnSelect = this.dropdownOnSelect.bind(this);
  }

  /**
  * # dropDownAdjustFrame
  * Purpose: This function will be called to adjust the frame of dropDown
  * Author: Ravichandran P
  * Input Param: layout
  * Output Param: style
  */
  dropDownAdjustFrame(style) {
    console.log(`frameStyle={width:${style.width}, 
      height:${style.height}, top:${style.top}, left:${style.left}}`);
    style.left -= 9;
    style.top += 7;
    style.height -= (isItiPhone6S || isItAndroidPhone)?  80 : 110;
    return style;
  }

  /**
  * # findDimensions
  * Purpose: This function will be invoked to set the layout width
  * Author: Ravichandran P
  * Input Param: layout
  * Output Param: 
  */
  findDimensions(layout){
    this.setState({dropDownWidth:layout.width})
    console.log(layout.width);
  }

  render() {
    return (
      <View style = {styles.container}>

        <View style = {[globalStyles.backNavBtnStyle]}>
            <TouchableOpacity onPress = { this.backToCrossReference } >
              <BackNavComponent  backNavText =  {backNavText} />                 
            </TouchableOpacity>     
        </View>  

        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss()} }>   
          <View style = {[styles.filterBasesView]} >
            <View style = {{paddingTop: 10, flexDirection : "column", alignItems : "flex-start",}}>
              <View style = {[styles.textInputViewStyle]}>
                <TextInput autoCorrect = {false}                
                  value = {this.state.searchedItem}
                  returnKeyType = "go" 
                  onChangeText = {searchedItem => {this.setState({searchedItem});}}
                  placeholderTextColor="#CACACA" 
                  autoCapitalize="none" 
                  keyboardType = "default" 
                  placeholder = "Search by Model #"
                  onSubmitEditing= {() =>  alert("Development is in progress")}
                  style = {[styles.textInputStyle]} >
                </TextInput>
              </View>

              <View style = {[styles.crossRefModelSearchTxtView]}>
                <Text style = {[globalStyles.subordinateTxt, {textAlign : 'justify'}]}>Type your furnance model
                  number above to get cross reference results. If you do not know your furnace model number,
                  select your filter base type below.</Text>
              </View>

              <TouchableHighlight style={[styles.searchBtnTop]} onPress = {() => this.filterBasesModelSearchNav(this.state.searchedItem)} underlayColor='#4582b5'>
                <Text style={[globalStyles.globalBtnTextViewStyle]}>
                  Search
                </Text>
              </TouchableHighlight>         
            </View>
          </View>
        </TouchableWithoutFeedback>  
        
        <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss()} } >
          <View style = {{ alignSelf : "stretch", flexDirection : 'column'}} >
            <View style = {[styles.filterSizeTxtView,{}]} >
              <Text style = {[styles.filterSizeTxt]}>{filterSizeTxt}</Text>
                <View style={[styles.dropDownMenuContent,
                  {marginLeft: 15,marginRight: 15,marginTop:5}]}>
                    <ModalDropdown
                      defaultValue={this.state.filterSizeDefaultValue}
                      ref={el => this.filterSizeDropDown = el}
                      style={styles.dropDownMenu}
                      textStyle= {styles.dropdownText}
                      dropdownStyle={[styles.dropDown,{minWidth:this.state.dropDownWidth}]}
                      adjustFrame={style => this.dropDownAdjustFrame(style)}
                      onLayout={(event) => { this.findDimensions(event.nativeEvent.layout) }}
                      options={this.state.filterSize}
                      onSelect = {(idx, value) => this.dropdownOnSelect(idx, value)} />                  
                    <Image source={filterArrowImage} style={styles.backgroundImage} />
                </View>  
            </View>

            <View  style = {[styles.radioBtnViewStyle,{paddingTop : 20}]}> 
              <Text style = {[styles.twoCustomRadioBtnTxt]}>{filterTypeTxt}</Text>
                <CustomRadioButton  
                  arrayData={this.state.arrayData}
                  radioBtn1UnChecked= {this.state.radioBtn1UnChecked} 
                  radioBtnCheckedImg = {this.state.radioBtnCheckedImg} 
                  radioBtnUnCheckedImg = {this.state.radioBtnUnCheckedImg} 
                  isCheckedFirst={this.state.isCheckedFirst} 
                  isCheckedSecond={this.state.isCheckedSecond} 
                  radioSecndBtnEventHandle = {this.radioSecndBtnEventHandle} 
                  radioFirstBtnEventHandle = {this.radioFirstBtnEventHandle}
                  firstRadioBtnLbl =  {this.state.firstRadioBtnLbl}
                  secondRadioBtnLbl = {this.state.secondRadioBtnLbl}
                  isItFirstTier = {"firstTier"} />
            </View>

            <View style = {[styles.radioBtnViewStyle]}>
              <Text style = {[styles.threeCustomRadioBtnTxt]}>{filterWidthTxt}</Text>
              <CustomThreeRadioButton
                  arrayData={this.state.arrayDataThree}
                  radioBtn1UnChecked= {this.state.radioBtn1UnChecked3}
                  radioBtnCheckedImg3 = {this.state.radioBtnCheckedImg3}
                  radioBtnUnCheckedImg3 = {this.state.radioBtnUnCheckedImg3}
                  isThreeCheckedFirst={this.state.isThreeCheckedFirst}
                  isThreeCheckedSecond={this.state.isThreeCheckedSecond}
                  isThreeCheckedThird={this.state.isThreeCheckedThird}
                  threeRadioBtnSecondEventHandle = {this.threeRadioBtnSecondEventHandle}
                  threeRadioBtnFirstEventHandle = {this.threeRadioBtnFirstEventHandle}
                  threeRadioBtnThirdEventHandle = {this.threeRadioBtnThirdEventHandle}
                  threeRadiofirstBtnLbl = {this.state.threeRadiofirstBtnLbl}
                  threeRadiosecondBtnLbl = {this.state.threeRadiosecondBtnLbl}
                  threeRadiothirdBtnLbl = {this.state.threeRadiothirdBtnLbl}
              />
            </View>

            <View style = {{paddingTop : 0}}>
              <TouchableHighlight style={[styles.searchBtnBottom]} 
                onPress = {() => this.filterBasesResultsNav()} underlayColor='#4582b5'>
                <Text style={[globalStyles.globalBtnTextViewStyle]}>
                    Search
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </TouchableWithoutFeedback> 

      </View>
    );
  }

  /**
  * # backToFilterBases
  * Purpose: This function will be invoked to do the Back navigation from Filter Bases screen
  * Author: Ravichandran P
  * Input Param: 
  * Output Param: 
  */
  backToCrossReference = () =>{
     Keyboard.dismiss();
     this.props.navigator.pop();
  }

  /**
  * # radioFirstBtnEventHandle
  * Purpose: This function will be invoked to handle the press/tap events on first radio button
  * Author: Ravichandran P
  * Input Param: 
  * Output Param: 
  */
  radioFirstBtnEventHandle(){
    if(this.state.isCheckedFirst){
      return;
    }
    this.setState({isCheckedFirst:this.state.isCheckedFirst?false
      :true, isCheckedSecond:this.state.isCheckedSecond?false:true})
  }  

  /**
  * # radioSecndBtnEventHandle
  * Purpose: This function will be invoked to handle the press/tap events on second radio button
  * Author: Ravichandran P
  * Input Param: 
  * Output Param: 
  */
  radioSecndBtnEventHandle(){
    if(this.state.isCheckedSecond){
      return;
    }
    this.setState({isCheckedSecond:this.state.isCheckedSecond?false:true, isCheckedFirst:this.state.isCheckedFirst?false:true})
  } 

  /**
  * # threeRadioBtnFirstEventHandle
  * Purpose: This function will be invoked 
  * to handle the press/tap events on first radio button existing for filter width selection
  * Author: Ravichandran P
  * Input Param: 
  * Output Param: 
  */
  threeRadioBtnFirstEventHandle(){
    if(this.state.isThreeCheckedFirst){
      return;
    }
    this.setState({
      isThreeCheckedFirst:true, 
      isThreeCheckedSecond:false,
      isThreeCheckedThird:false,
      });
  }  

  /**
  * # threeRadioBtnSecondEventHandle
  * Purpose: This function will be invoked 
  * to handle the press/tap events on second radio button existing for filter width selection
  * Author: Ravichandran P
  * Input Param: 
  * Output Param: 
  */
  threeRadioBtnSecondEventHandle(){
    if(this.state.isThreeCheckedSecond){
      return;
    }
    this.setState({
      isThreeCheckedSecond:true, 
      isThreeCheckedThird:false,
      isThreeCheckedFirst:false,
    });
  }

  /**
  * # threeRadioBtnThirdEventHandle
  * Purpose: This function will be invoked 
  * to handle the press/tap events on third radio button existing for filter width selection
  * Author: Ravichandran P
  * Input Param: 
  * Output Param: 
  */
  threeRadioBtnThirdEventHandle(){    
    if(this.state.isThreeCheckedThird){
      return;
    }
    this.setState({
      isThreeCheckedThird:true, 
      isThreeCheckedFirst:false,
      isThreeCheckedSecond:false,
    });
  }

  /**
  * # filterBasesResultsNav
  * Purpose: This function will be invoked 
  * to navigate to results screen after selecting the required filtering options
  * Author: Ravichandran P
  * Input Param: 
  * Output Param: 
  */
  filterBasesResultsNav =() => {
    this.dropdownOnSelect(-1);
    if(this.state.isFilterSizeSelected === true){
        this.props.navigator.push({
        name:'FilterBasesResults',
        title:'Filter Bases Results',
        isHidden:false }); 
    } 
    else{
        Alert.alert(
          'Alert',
          'Please select the Filter Size',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],{cancelable: false} );           
    }  
  }

  /**
  * # filterBasesResultsNav
  * Purpose: This function will be invoked 
  * to navigate to results screen based on Model No. search
  * Author: Ravichandran P
  * Input Param: 
  * Output Param: 
  */
  filterBasesModelSearchNav = (searchedItem) => {
    if(searchedItem || searchedItem === ""){                 
      Alert.alert(
      'ModelNo Search',
      'Development is in progress',
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: false } );
    }
  } 

  /**
  * # dropdownOnSelect
  * Purpose: This function will be invoked 
  * to set the selected dropdown value and let search for parts happen
  * Author: Ravichandran P
  * Input Param: 
  * Output Param: 
  */
  dropdownOnSelect(idx, value){
    if(value && value !== "" && this.state.isFilterSizeSelected === false && idx !== -1){
        this.state.selectedFilterSize = value.toString();
        this.setState({selectedFilterSize : this.state.selectedFilterSize});
        this.setState({isFilterSizeSelected : !this.state.isFilterSizeSelected,});
      }
      else if( idx === -1){
        this.setState({filterSizeDefaultValue : "Select"});
      }
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
  textInputStyle: {
    paddingTop : 9,
    paddingLeft : 3,
    paddingBottom : 5,
    borderColor : "black", 
    height: 30,
    fontWeight: "100",
    color:"#000000",    
    fontSize: 14,
    fontFamily: 'Droid Serif',
    fontWeight: 'normal',
    fontStyle: 'italic',
  },

  textInputViewStyle: {
    paddingRight: 10,
    shadowColor : "#808080",
    shadowOpacity : 0.2,
    shadowRadius : 2,
    shadowOffset : {width: 1, height: 1},
    borderWidth : 0.5,
    borderColor : "lightgray",
    borderRadius : 2,
    paddingLeft : 5, 
    alignSelf : "stretch",
    marginLeft: 20, 
    marginRight: 20,
  },
  btnTextViewStyle: {
    textAlign : 'center',
    color : "#FFFFFF",
  },
  searchBtnTop : { 
    marginTop : isItiPhone5S? 15 : 20,
    marginBottom : 0, 
    borderRadius : 25, 
    backgroundColor : '#57a3e2',
    alignSelf : "center", 
    paddingLeft : 60, 
    paddingRight : 60, 
    paddingTop : 10,
    paddingBottom : 10,
  },
  searchBtnBottom : { 
    marginBottom : 0, 
    borderRadius : 25, 
    backgroundColor : '#57a3e2',
    alignSelf : "center", 
    paddingLeft : 60, 
    paddingRight : 60, 
    paddingTop : 20,
    paddingBottom : 10,
  },
  searchLoginBtnStyle: {
    marginTop : 40,
  },
  crossRefModelSearchTxtView :{
     paddingTop : 10, 
     alignSelf : "flex-start",
     backgroundColor : "#f7f7f7", 
     paddingRight: 20,
     paddingLeft : 20,
  },
  filterSizeTxtView: {  
    alignSelf : "stretch", 
    flexDirection : 'column',
    paddingLeft : 5,
    paddingRight : 5,
    paddingTop : 20,
  },
  filterSizeTxt : {
    color : "#06273F", 
    fontWeight : "normal", 
    fontFamily : "Montserrat", 
    fontSize : 18,
    paddingLeft: 5,
  },
  twoCustomRadioBtnTxt :{
    color : "#06273F", 
    fontWeight : "normal", 
    fontFamily : "Montserrat", 
    fontSize : 18
  },
  threeCustomRadioBtnTxt :{
    color : "#06273F", 
    fontWeight : "normal", 
    fontFamily : "Montserrat", 
    fontSize : 18    
  },
  dropdownText:{
    fontFamily: 'Montserrat',
    fontSize: 13,
  },
  dropDownMenu: {
    flexWrap: 'wrap',
    borderColor: "#CACACA",
    alignItems: 'stretch',
    borderWidth: 1,
    padding: 8,
    position: 'relative',
    borderRadius: 3,
  },
  dropDown: {
    alignSelf : "stretch",
    flexDirection: 'column',
    alignItems: 'stretch',
    flexWrap: 'wrap',
    shadowOffset:{
        width: 1,
        height: 3,
    },
    shadowColor: 'rgba(0,0,0,0.32)',
    shadowOpacity: 0.32,
    shadowRadius: 1,
    borderColor: '#F6F6F6',
    borderWidth: 1,
    borderBottomWidth: 1,
    height: (isItAndroidPhone || isItiPhone5S || isItiPhone6S)? 180 : 240,
  },
  backgroundImage: {
    width: 10,
    height: 5,
    position:'absolute',
    top: 16,
    right: 15,
  },
  radioBtnViewStyle : {
    flexDirection : 'column', 
    paddingLeft : 10,
    marginTop:0,
    paddingTop :10,
  },
  searchBtnBottom : { 
    marginTop : 10,
    marginBottom : 0, 
    borderRadius : 25, 
    backgroundColor : '#57a3e2',
    alignSelf : "center", 
    paddingLeft : 60, 
    paddingRight : 60, 
    paddingTop : 10,
    paddingBottom : 10,
  },  
  filterBasesView : { 
    backgroundColor : "#F6F6F6", 
    alignSelf : "stretch", 
    flexDirection : "column"
  },

});


export default FilterBases;