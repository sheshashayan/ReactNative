//Description : Use of this file is while we are in Product cross reference page. 
//And when we are going to Tap to the After Market Motor this page will open.
//FileName: ProductAfterMarketMotor


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
import LinearGradient from 'react-native-linear-gradient';
import * as stringConstant from '../constants/StringConstant';
import BackNavComponent from "./BackNavComponent";

const radioBtnCheckedSrc = require('../resources/images/CheckedStep.png');
const radioBtnUnCheckedSrc = require('../resources/images/UncheckedStep.png');
const isItiPhone6S = deviceFinder.isItiPhone6S();
const isItiPhone5S = deviceFinder.isItiPhone5S();
const isItiPad = deviceFinder.isItiPad();
const isIt7InchTablet = deviceFinder.isIt7InchTablet();
const isIt10InchTablet = deviceFinder.isIt10InchTablet();
const isItAndroidPhone = deviceFinder.isItAndroidPhone();

const backNavText = stringConstant.carrierConstClass.PRODUCT_RESULTS_BACK_BUTTON;

class ProductAfterMarketMotor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedmotorType : "",
            ismotorSelected : false,
            MotorDefaultValue : "Select",
            marketMotor : [ 'Belted Blower', 'Capcitor Start', 'Condenser Fan', 'Direct Drive Blower' , 'Oil Burner'],

            selectedhP : "",
            isHpSelected : false,
            HpDefaultValue : "Select",
            HpMotor : [ '1', '1-1/2',
                '1/2', '1/3',
                '1/4', '1/5-1/2',
                '1/5-3/4', '1/6',
                '1/6-1/2', '1/6-1/3',
                '1/7', '1/8',
                '3/4'],

            selectedvoltage : "",
            isvoltageSelected : false,
            VoltageDefaultValue : "Select",
            Voltage : [ '115', '115/230' ,
                '208/230', '208/230/460',
                '230', '460'],

            selectedrpmSpeed : "",
            isRpmSpeedSelected : false,
            RpmSpeedDefaultValue : "Select",
            RpmSpeed : [ '1075', '1075/2' ,
                '1075/3', '1075/4',
                '1100/4', '1140/1',
                '1725','3450',
                '825/1','825/2'],

            /*----------- two Radio buttons -----------*/
            radioBtn1UnChecked : false,
            radioBtn2Checked : false,

            radioBtnCheckedImg : radioBtnCheckedSrc,
            radioBtnUnCheckedImg : radioBtnUnCheckedSrc,

            isCheckedFirst: true,
            isCheckedSecond: false,
            dropDownWidth : 200,

            frameSize1: "48",
            frameSize2: "56",
        };

        this.radioFirstBtnEventHandle = this.radioFirstBtnEventHandle.bind(this);
        this.radioSecndBtnEventHandle = this.radioSecndBtnEventHandle.bind(this);


        this.threeRadioBtnSecondEventHandle = this.threeRadioBtnSecondEventHandle.bind(this);
        this.threeRadioBtnFirstEventHandle = this.threeRadioBtnFirstEventHandle.bind(this);
        this.threeRadioBtnThirdEventHandle = this.threeRadioBtnThirdEventHandle.bind(this);
        this.find_dimesions = this.find_dimesions.bind(this);
        this.filterBasesModelSearchNav = this.filterBasesModelSearchNav.bind(this);
        this.dropdownOnSelect = this.dropdownOnSelect.bind(this);
    }

    _dropdown_3_adjustFrame(style) {
        console.log(`frameStyle={width:${style.width}, height:${style.height}, top:${style.top}, left:${style.left}}`);
        style.left -= 9;
        style.top += 7;
        style.height -= (isItiPhone6S || isItAndroidPhone)?  80 : 110;
        return style;
    }
    find_dimesions(layout){
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
                <ScrollView>
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
                                               placeholder = "Model Number"
                                               onSubmitEditing= {() =>  alert("Development is in progress")}
                                               style = {[styles.textInputStyle]} >
                                    </TextInput>
                                </View>

                                <View style = {[styles.crossRefModelSearchTxtView]}>
                                    <Text style = {[globalStyles.subordinateTxt, {textAlign : 'justify'}]}>Type your model number above to get cross reference results.
                                        If you do not know your model number,
                                        select your filter base type below.</Text>
                                </View>

                                <TouchableHighlight style={[styles.searchBtnTop]}
                                                    onPress = {() => this.filterBasesModelSearchNav(this.state.searchedItem)}
                                                    underlayColor='#4582b5'>
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
                                <Text style = {[styles.filterSizeTxt]}>Motor Type</Text>
                                <View style={[styles.dropDownMenuContent,{marginLeft: 15,marginRight: 15,marginTop:5}]}>
                                    <ModalDropdown
                                        defaultValue={this.state.MotorDefaultValue}
                                        ref={el => this.filterSizeDropDown = el}
                                        style={styles.dropDownMenu}
                                        textStyle= {styles.dropdownText}
                                        dropdownStyle={[styles.dropDown,{minWidth:this.state.dropDownWidth}]}
                                        adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                                        onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
                                        options={this.state.marketMotor}
                                        onSelect = {(idx, value) => this.dropdownOnSelect(idx, value)} />
                                    <Image source={require('../resources/images/FilterArrow.png')}  style={styles.backgroundImage} />
                                </View>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss()} } >
                        <View style = {{ alignSelf : "stretch", flexDirection : 'column'}} >
                            <View style = {[styles.filterSizeTxtView,{}]} >
                                <Text style = {[styles.filterSizeTxt]}>HP</Text>
                                <View style={[styles.dropDownMenuContent,{marginLeft: 15,marginRight: 15,marginTop:5}]}>
                                    <ModalDropdown
                                        defaultValue={this.state.HpDefaultValue}
                                        ref={el => this.filterSizeDropDown = el}
                                        style={styles.dropDownMenu}
                                        textStyle= {styles.dropdownText}
                                        dropdownStyle={[styles.dropDown,{minWidth:this.state.dropDownWidth}]}
                                        adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                                        onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
                                        options={this.state.HpMotor}
                                        onSelect = {(idx, value) => this.dropdownOnSelect(idx, value)} />
                                    <Image source={require('../resources/images/FilterArrow.png')}  style={styles.backgroundImage} />
                                </View>

                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss()} } >
                        <View style = {{ alignSelf : "stretch", flexDirection : 'column'}} >
                            <View style = {[styles.filterSizeTxtView,{}]} >
                                <Text style = {[styles.filterSizeTxt]}>Voltage</Text>
                                <View style={[styles.dropDownMenuContent,{marginLeft: 15,marginRight: 15,marginTop:5}]}>
                                    <ModalDropdown
                                        defaultValue={this.state.VoltageDefaultValue}
                                        ref={el => this.filterSizeDropDown = el}
                                        style={styles.dropDownMenu}
                                        textStyle= {styles.dropdownText}
                                        dropdownStyle={[styles.dropDown,{minWidth:this.state.dropDownWidth}]}
                                        adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                                        onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
                                        options={this.state.Voltage}
                                        onSelect = {(idx, value) => this.dropdownOnSelect(idx, value)} />
                                    <Image source={require('../resources/images/FilterArrow.png')}  style={styles.backgroundImage} />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>


                    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss()} } >
                        <View style = {{ alignSelf : "stretch", flexDirection : 'column'}} >
                            <View style = {[styles.filterSizeTxtView,{}]} >
                                <Text style = {[styles.filterSizeTxt]}>RPM/Speed</Text>
                                <View style={[styles.dropDownMenuContent, {marginLeft: 15,marginRight: 15,marginTop:5}]}>
                                    <ModalDropdown
                                        defaultValue={this.state.RpmSpeedDefaultValue}
                                        ref={el => this.filterSizeDropDown = el}
                                        style={styles.dropDownMenu, styles.ContentRpmDropDown}
                                        textStyle= {styles.dropdownText}
                                        dropdownStyle={[styles.dropDown,{minWidth:this.state.dropDownWidth}]}
                                        adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                                        onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
                                        options={this.state.RpmSpeed}
                                        onSelect = {(idx, value) => this.dropdownOnSelect(idx, value)} />
                                    <Image source={require('../resources/images/FilterArrow.png')}  style={styles.backgroundImage} />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss()} } >
                        <View  style = {[styles.radioBtnViewStyle,{paddingTop : 20}]}>
                            <Text style = {[styles.twoCustomRadioBtnTxt]}>Frame</Text>
                            <CustomRadioButton
                                arrayData={this.state.arrayData}
                                radioBtn1UnChecked= {this.state.radioBtn1UnChecked}
                                radioBtnCheckedImg = {this.state.radioBtnCheckedImg}
                                radioBtnUnCheckedImg = {this.state.radioBtnUnCheckedImg}
                                isCheckedFirst={this.state.isCheckedFirst}
                                isCheckedSecond={this.state.isCheckedSecond}
                                radioSecndBtnEventHandle = {this.radioSecndBtnEventHandle}
                                radioFirstBtnEventHandle = {this.radioFirstBtnEventHandle}
                                firstRadioBtnLbl = {this.state.frameSize1}
                                secondRadioBtnLbl = {this.state.frameSize2}
                                isItFirstTier = {"firstTier"}
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
                </ScrollView>
            </View>
        );
    }

    backToCrossReference = () =>{
        Keyboard.dismiss();
        this.props.navigator.pop();
    }

    radioFirstBtnEventHandle(){
        if(this.state.isCheckedFirst){
            return;
        }
        this.setState({isCheckedFirst:this.state.isCheckedFirst?false:true, isCheckedSecond:this.state.isCheckedSecond?false:true})

    }

    radioSecndBtnEventHandle(){
        if(this.state.isCheckedSecond){
            return;
        }
        this.setState({isCheckedSecond:this.state.isCheckedSecond?false:true, isCheckedFirst:this.state.isCheckedFirst?false:true})
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

        flexWrap: 'wrap',
        borderColor: "#CACACA",
        alignItems: 'stretch',
        borderWidth: 1,
        padding: 8,
        position: 'relative',
        borderRadius: 3,
    }
});
export default ProductAfterMarketMotor;