//Description : Use of this file is while we are in Product cross reference page.
//And when we are going to Tap to the Product Thermostat this page will open.
//FileName: ProductThermostat

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
    ScrollView,
} from 'react-native';

import CellView from "./CellView";
import CustomCrossRefResultsListView from "./CrossReferenceResults";
import {globalStyles, deviceFinder} from './globalStyles';
import CustomRadioButton from "./customRadioButton";
import CustomThreeRadioButton from "./CustomThreeRadioButton";
import ModalDropdown from 'react-native-modal-dropdown';
import * as stringConstant from '../constants/StringConstant';
import BackNavComponent from "./BackNavComponent";

const radioBtnCheckedSrc = require('../resources/images/CheckedStep.png');
const radioBtnUnCheckedSrc = require('../resources/images/UncheckedStep.png');

const radioBtnSecondTileCheckedSrc = require('../resources/images/CheckedStep.png')
const radioBtnSecondTileUnCheckedSrc = require('../resources/images/UncheckedStep.png');

const radioBtnThirdTileCheckedSrc = require('../resources/images/CheckedStep.png')
const radioBtnThirdTileUnCheckedSrc = require('../resources/images/UncheckedStep.png');

const isItiPhone6S = deviceFinder.isItiPhone6S();
const isItiPhone5S = deviceFinder.isItiPhone5S();
const isItiPad = deviceFinder.isItiPad();
const isIt7InchTablet = deviceFinder.isIt7InchTablet();
const isIt10InchTablet = deviceFinder.isIt10InchTablet();
const isItAndroidPhone = deviceFinder.isItAndroidPhone();
const backNavText = stringConstant.carrierConstClass.PRODUCT_RESULTS_BACK_BUTTON;

class ProductThermostat extends Component {
    constructor(props) {
        super(props);
        this.state = {
          /*--------Stage drop down option values-----------*/
            selecteddrierType : "",
            isDrierTypeSelected : false,
            DrierTypeDefaultValue : "Select",
            DrierType : ['1 Heat/1 Cool', '2 Heat/1 Cool' ,
                '3 Heat/2 Cool', '4 Heat/2 Cool'],

          /*----------- two Radio buttons -----------*/
            radioBtn1UnChecked : false,
            radioBtnCheckedImg : radioBtnCheckedSrc,
            radioBtnUnCheckedImg : radioBtnUnCheckedSrc,
            isCheckedFirst: false,
            isCheckedSecond: false,

            dropDownWidth : 200,

            radioBtn1SecondTileUnChecked : false,
            radioBtnSecondTileCheckedImg : radioBtnSecondTileCheckedSrc,
            radioBtnSecondTileUnCheckedImg : radioBtnSecondTileUnCheckedSrc,
            isSecondTileCheckedFirst: true,
            isSecondTileCheckedSecond: false,

            radioBtn1ThirdTileUnChecked : false,
            radioBtnThirdTileCheckedImg : radioBtnThirdTileCheckedSrc,
            radioBtnThirdTileUnCheckedImg : radioBtnThirdTileUnCheckedSrc,
            isThirdTileCheckedFirst: true,
            isThirdTileCheckedSecond: false,

            isThreeCheckedFirst: true,
            isThreeCheckedSecond: false,
            isThreeCheckedThird: false,


            radioBtnCheckedImg3: radioBtnCheckedSrc,
            radioBtnUnCheckedImg3 : radioBtnUnCheckedSrc,

          /*--------Label value of all radio button---------*/
            BrandType1: "Totaline",
            BrandType2: "Carrier",

            AppType1: "Standard Heat/Cool",
            AppType2: "HP W/Aux",


            ResType1: "Resedential",
            ResType2: "Commercial",

            threeRadiofirstBtnLbl: "Non Prog",
            threeRadiosecondBtnLbl: "5-2 Day",
            threeRadiothirdBtnLbl: "7 Day",
        };

        this.radioFirstBtnEventHandle = this.radioFirstBtnEventHandle.bind(this);
        this.radioSecndBtnEventHandle = this.radioSecndBtnEventHandle.bind(this);
        this.radioFirstBtnSecondTileEventHandle = this.radioFirstBtnSecondTileEventHandle.bind(this);
        this.radioSecndBtnSecondTileEventHandle = this.radioSecndBtnSecondTileEventHandle.bind(this);

        this.radioSecndBtnThirdTileEventHandle = this.radioSecndBtnThirdTileEventHandle.bind(this);
        this.radioFirstBtnThirdTileEventHandle = this.radioFirstBtnThirdTileEventHandle.bind(this);

        this.threeRadioBtnFirstEventHandle = this.threeRadioBtnFirstEventHandle.bind(this);
        this.threeRadioBtnSecondEventHandle = this.threeRadioBtnSecondEventHandle.bind(this);
        this.threeRadioBtnThirdEventHandle = this.threeRadioBtnThirdEventHandle.bind(this);

        this.find_dimesions = this.find_dimesions.bind(this);
        this.filterBasesModelSearchNav = this.filterBasesModelSearchNav.bind(this);
        this.dropdownOnSelect = this.dropdownOnSelect.bind(this);
    }

    _dropdown_3_adjustFrame(style) {
        console.log(`frameStyle={width:${style.width}, height:${style.height}, top:${style.top}, left:${style.left}}`);
        style.left -= 9;
        style.top += 7;
        style.height -= (isItiPhone6S || isItAndroidPhone)?  80 : 102;
        return style;
    }
    find_dimesions(layout){
        this.setState({dropDownWidth:layout.width})
        console.log(layout.width);
    }

    render() {
        return (
            <ScrollView>
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
                        <TextInput underlineColorAndroid='transparent'
                                   autoCorrect = {false}
                                   value = {this.state.searchedItem}
                                   returnKeyType = "go"
                                   onChangeText = {searchedItem => {this.setState({searchedItem});}}
                                   placeholderTextColor="#CACACA"
                                   autoCapitalize="none"
                                   keyboardType = "default"
                                   placeholder = "Part Number"
                                   onSubmitEditing= {() =>  alert("Development is in progress")}
                                   style = {[styles.textInputStyle]} >
                        </TextInput>
                      </View>

                        <View style = {[styles.crossRefModelSearchTxtView]}>
                            <Text style = {[globalStyles.subordinateTxt, {textAlign : 'justify'}]}>Type your competitor thermostat
                                part number above to get cross reference results. If you do not know your competitor thermostat part
                                number, select your thermostat type below.
                            </Text>
                        </View>

                      <TouchableHighlight style={[styles.searchBtnTop]}
                          onPress = {() => this.filterBasesModelSearchNav(this.state.searchedItem)}
                          underlayColor='#4582b5'
                      >
                        <Text style={[globalStyles.globalBtnTextViewStyle]}>
                          Search
                        </Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss()} } >
                  <View  style = {[styles.radioBtnViewStyle,{paddingTop : 20}]}>
                    <Text style = {[styles.twoCustomRadioBtnTxt]}>*Brand</Text>
                    <CustomRadioButton
                        arrayData={this.state.arrayData}
                        radioBtn1UnChecked= {this.state.radioBtn1UnChecked}
                        radioBtnCheckedImg = {this.state.radioBtnCheckedImg}
                        radioBtnUnCheckedImg = {this.state.radioBtnUnCheckedImg}
                        isCheckedFirst={this.state.isCheckedFirst}
                        isCheckedSecond={this.state.isCheckedSecond}
                        radioSecndBtnEventHandle = {this.radioSecndBtnEventHandle}
                        radioFirstBtnEventHandle = {this.radioFirstBtnEventHandle}
                        firstRadioBtnLbl = {this.state.BrandType1}
                        secondRadioBtnLbl = {this.state.BrandType2}
                        isItFirstTier = {"firstTier"}/>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss()} } >
                  <View  style = {[styles.radioBtnViewStyle,{paddingTop : 20}]}>
                    <Text style = {[styles.twoCustomRadioBtnTxt]}>Application</Text>

                    <CustomRadioButton
                        arrayData={this.state.arrayData}
                        radioBtn1SecondTileUnChecked= {this.state.radioBtn1SecondTileUnChecked}
                        radioBtnSecondTileCheckedImg = {this.state.radioBtnSecondTileCheckedImg}
                        radioBtnSecondTileUnCheckedImg = {this.state.radioBtnSecondTileUnCheckedImg}
                        isSecondTileCheckedFirst={this.state.isSecondTileCheckedFirst}
                        isSecondTileCheckedSecond={this.state.isSecondTileCheckedSecond}
                        radioSecndBtnSecondTileEventHandle = {this.radioSecndBtnSecondTileEventHandle}
                        radioFirstBtnSecondTileEventHandle = {this.radioFirstBtnSecondTileEventHandle}
                        firstRadioSecondBtnLbl = {this.state.AppType1}
                        secondRadioSecondBtnLbl = {this.state.AppType2}
                        isItSecondTier = {"secondTier"}/>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss()} } >
                  <View  style = {[styles.radioBtnViewStyle,{paddingTop : 20,}]}>
                    <Text style = {[styles.twoCustomRadioBtnTxt]}>Res/Comm</Text>
                    <View style ={[{paddingRight:120}]}>
                      <CustomRadioButton
                          arrayData={this.state.arrayData}
                          radioBtn1ThirdTileUnChecked= {this.state.radioBtn1ThirdTileUnChecked}
                          radioBtnThirdTileCheckedImg = {this.state.radioBtnThirdTileCheckedImg}
                          radioBtnThirdTileUnCheckedImg = {this.state.radioBtnThirdTileUnCheckedImg}
                          isThirdTileCheckedFirst={this.state.isThirdTileCheckedFirst}
                          isThirdTileCheckedSecond={this.state.isThirdTileCheckedSecond}
                          radioSecndBtnThirdTileEventHandle = {this.radioSecndBtnThirdTileEventHandle}
                          radioFirstBtnThirdTileEventHandle = {this.radioFirstBtnThirdTileEventHandle}
                          firstRadioThirdBtnLbl = {this.state.ResType1}
                          secondRadioThirdBtnLbl = {this.state.ResType2}
                          isItThirdTier = {"thirdTier"}/>
                    </View>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss()} } >
                  <View style = {{ alignSelf : "stretch", flexDirection : 'column'}} >
                    <View style = {[styles.filterSizeTxtView,{}]} >
                      <Text style = {[styles.filterSizeTxt]}>Stages</Text>
                      <View style={[styles.dropDownMenuContent,{marginLeft: 15,marginRight: 15,marginTop:5}]}>
                        <ModalDropdown
                            defaultValue={this.state.DrierTypeDefaultValue}
                            ref={el => this.filterSizeDropDown = el}
                            style={styles.dropDownMenu}
                            textStyle= {styles.dropdownText}
                            dropdownStyle={[styles.dropDown,{minWidth:this.state.dropDownWidth}]}
                            adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                            onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
                            options={this.state.DrierType}
                            onSelect = {(idx, value) => this.dropdownOnSelect(idx, value)} />
                        <Image source={require('../resources/images/FilterArrow.png')}  style={styles.backgroundImage} />
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>

                <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss()} } >
                  <View style = {[styles.radioBtnViewStyle]}>
                    <Text style = {[styles.threeCustomRadioBtnTxt]}>Programmable</Text>
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
                </TouchableWithoutFeedback>

                <TouchableHighlight style={[styles.searchBtnTop,{marginTop: 40, marginBottom: 140}]}
                    onPress = {() => this.filterBasesModelSearchNav(this.state.searchedItem)}
                    underlayColor='#4582b5'>
                  <Text style={[globalStyles.globalBtnTextViewStyle]}>
                    Search
                  </Text>
                </TouchableHighlight>
              </View>
            </ScrollView>
        );
    }

    backToCrossReference = () =>{
        Keyboard.dismiss();
        this.props.navigator.pop();
    }

    radioFirstBtnEventHandle(){
        // if(this.state.isCheckedFirst){
        //   return;
        // }
        this.setState({isCheckedFirst:!this.state.isCheckedFirst})

    }

    radioFirstBtnSecondTileEventHandle(){
        if(this.state.isSecondTileCheckedFirst){
            return;
        }
        this.setState({isSecondTileCheckedFirst:this.state.isSecondTileCheckedFirst?false:true, isSecondTileCheckedSecond:this.state.isSecondTileCheckedSecond?false:true})

    }

    radioFirstBtnThirdTileEventHandle(){
        if(this.state.isThirdTileCheckedFirst){
            return;
        }
        this.setState({isThirdTileCheckedFirst:this.state.isThirdTileCheckedFirst?false:true, isThirdTileCheckedSecond:this.state.isThirdTileCheckedSecond?false:true})
    }

    radioSecndBtnEventHandle(){
        // if(this.state.isCheckedSecond){
        //   return;
        // }
        this.setState({isCheckedSecond:!this.state.isCheckedSecond})
    }

    radioSecndBtnSecondTileEventHandle(){
        if(this.state.isSecondTileCheckedSecond){
            return;
        }
        this.setState({isSecondTileCheckedSecond:this.state.isSecondTileCheckedSecond?false:true, isSecondTileCheckedFirst:this.state.isSecondTileCheckedFirst?false:true})
    }

    radioSecndBtnThirdTileEventHandle(){
        if(this.state.isThirdTileCheckedSecond){
            return;
        }
        this.setState({isThirdTileCheckedSecond:this.state.isThirdTileCheckedSecond?false:true, isThirdTileCheckedFirst:this.state.isThirdTileCheckedFirst?false:true})
    }

    threeRadioBtnFirstEventHandle(){
        if(this.state.isThreeCheckedFirst){
            return;
        }
        this.setState(
            {isThreeCheckedFirst:true,
                isThreeCheckedSecond:false,
                isThreeCheckedThird:false,
            });
    }

    threeRadioBtnSecondEventHandle(){
        if(this.state.isThreeCheckedSecond){
            return;
        }
        this.setState(
            {
                isThreeCheckedSecond:true,
                isThreeCheckedThird:false,
                isThreeCheckedFirst:false,

            });

    }

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
    thermostat =() => {
        this.dropdownOnSelect(-1);
        if(this.state.isThermostatSelected === true){
          /* this.props.navigator.push({
           name:'Pro',
           title:'Thermostat',
           isHidden:false }); */
            //this.setState({filrterSizeDefaultValue : "Select: Stages});
        }
        else{
            Alert.alert(
                'Alert',
                'Please select the Stages',
                [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],{cancelable: false} );
        }
    }

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

    dropdownOnSelect(idx, value){
        //alert("idx : "+idx);
        if(value && value !== "" && this.state.isThermostatSelected === false && idx !== -1)
        {
            this.state.selectedFilterSize = value.toString();
            this.setState({selectedThermostat : this.state.selectedThermostat});
            this.setState({isThermostatSelected : !this.state.isThermostatSelected,});
        }
        else if( idx === -1){

            this.setState({thermostatStageDefaultValue : "Select: Stages"});

        }
    }

}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        flexDirection : "column",
        justifyContent : "flex-start",
        alignItems: 'flex-start',
        backgroundColor : "#F6F6F6", //F6F6F6
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
        //paddingLeft: 10,
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
        //marginTop : 10,
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
        //flex : 2,
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
        fontSize : 18
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
        //height: 180,(isItAndroidPhone || isItiPhone5S || isItiPhone6S)? 220 : 300,
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
        //flex :1,

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
        //flex : 2,
        alignSelf : "stretch",
        flexDirection : "column"
    },
    ContentRpmDropDown:{
        height: 25,
        flexWrap: 'wrap',
        borderColor: "#CACACA",
        alignItems: 'stretch',
        borderWidth: 1,
        padding: 8,
        position: 'relative',
        borderRadius: 3,
    }
});
export default ProductThermostat;