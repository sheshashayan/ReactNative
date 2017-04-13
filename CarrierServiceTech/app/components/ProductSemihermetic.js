//Description : Use of this file is while we are in Product cross reference page. 
//And when we are going to Tap to the Themostats this page will open.
//FileName: ProductSemihermetic
//Author :

//'use strict';

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

const isItiPhone6S = deviceFinder.isItiPhone6S();
const isItiPhone5S = deviceFinder.isItiPhone5S();
const isItiPad = deviceFinder.isItiPad();
const isIt7InchTablet = deviceFinder.isIt7InchTablet();
const isIt10InchTablet = deviceFinder.isIt10InchTablet();
const isItAndroidPhone = deviceFinder.isItAndroidPhone();

import * as stringConstant from '../constants/StringConstant';
import BackNavComponent from "./BackNavComponent";

const backNavText = stringConstant.carrierConstClass.FILTER_BASES_BACK_BUTTON;

class ProductSemihermetic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchedItem : "",
            selectedhermostat : "",
        };

        this.find_dimesions = this.find_dimesions.bind(this);
        this.filterBasesModelSearchNav = this.filterBasesModelSearchNav.bind(this);
        this.dropdownOnSelect = this.dropdownOnSelect.bind(this);
    }

    _dropdown_3_adjustFrame(style) {
        console.log(`frameStyle={width:${style.width}, height:${style.height}, top:${style.top}, left:${style.left}}`);
        style.left -= 9;
        style.top += 7;
        style.height -= (isItiPhone6S || isItAndroidPhone)?  80 : 40;
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
                          <Text style = {[globalStyles.subordinateTxt, {textAlign : 'justify'}]}>
                              Type your part Number above to get cross reference results.</Text>
                      </View>

                      <TouchableHighlight style={[styles.searchBtnTop]} onPress = {() => this.filterBasesModelSearchNav(this.state.searchedItem)}>
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

    backToCrossReference = () =>{
        Keyboard.dismiss();
        this.props.navigator.pop();
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
});
export default ProductSemihermetic;