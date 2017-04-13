//Description : Use of this file is while we are in Product cross reference page. 
//And when we are going to Tap to the Filter-Drier this page will open.
//FileName: ProductFilterDriers

import React, {Component} from 'react';
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

const radioBtnSecondTileCheckedSrc = require('../resources/images/CheckedStep.png')
const radioBtnSecondTileUnCheckedSrc = require('../resources/images/UncheckedStep.png');

const isItiPhone6S = deviceFinder.isItiPhone6S();
const isItiPhone5S = deviceFinder.isItiPhone5S();
const isItiPad = deviceFinder.isItiPad();
const isIt7InchTablet = deviceFinder.isIt7InchTablet();
const isIt10InchTablet = deviceFinder.isIt10InchTablet();
const isItAndroidPhone = deviceFinder.isItAndroidPhone();

const backNavText = stringConstant.carrierConstClass.PRODUCT_RESULTS_BACK_BUTTON;
const PARTNUMBER_PLACEHOLDER = "Part Number"

let drierType = null;
let conSize = null;
let line = null;
let conType = null;

class ProductFilterDriers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selecteddrierType: "",
            searchedPartItem: '',

            DrierTypeDefaultValue: "Select",
            DrierType: ['Compacted Bead', 'HP Solid Core',
                'Replaceable Core', 'SolidCore'],

            selectedconnSize: "",

            connSizedefaultValue: "Select",
            connSize: ['1/4"', '3/8"', '1/2"',
                '5/8"', '3/4"', '7/8"', '11/8"', '13/8"',
                '15/8"', '21/8"', '25/8"'],

            /*----------- two Radio buttons -----------*/
            radioBtn1UnChecked: false,

            radioBtnCheckedImg: radioBtnCheckedSrc,
            radioBtnUnCheckedImg: radioBtnUnCheckedSrc,

            isCheckedFirst: true,
            isCheckedSecond: false,
            dropDownWidth: 200,

            radioBtn1SecondTileUnChecked: false,

            radioBtnSecondTileCheckedImg: radioBtnSecondTileCheckedSrc,
            radioBtnSecondTileUnCheckedImg: radioBtnSecondTileUnCheckedSrc,

            isSecondTileCheckedFirst: true,
            isSecondTileCheckedSecond: false,

            LineType1: "Liquid",
            LineType2: "Suction",

            ConnType1: "Flare",
            ConnType2: "ODF",

            isDrierTypeSelected: false,
            isConnSizeSelected: false,
        };

        this.radioFirstBtnEventHandle = this.radioFirstBtnEventHandle.bind(this);
        this.radioSecndBtnEventHandle = this.radioSecndBtnEventHandle.bind(this);

        this.radioFirstBtnSecondTileEventHandle = this.radioFirstBtnSecondTileEventHandle.bind(this);
        this.radioSecndBtnSecondTileEventHandle = this.radioSecndBtnSecondTileEventHandle.bind(this);

        this.find_dimesions = this.find_dimesions.bind(this);
        this.dropdownOnSelect = this.dropdownOnSelect.bind(this);
        this.dropdownOnSelectDrierType = this.dropdownOnSelectDrierType.bind(this);
        this.dropdownOnSelectConSize = this.dropdownOnSelectConSize.bind(this);

    }

    _dropdown_3_adjustFrame(style) {
        console.log(`frameStyle={width:${style.width}, height:${style.height}, top:${style.top}, left:${style.left}}`);
        style.left -= 9;
        style.top += 7;
        style.height -= (isItiPhone6S || isItAndroidPhone) ? 80 : 110;
        return style;
    }

    find_dimesions(layout) {
        this.setState({dropDownWidth: layout.width})
        console.log(layout.width);
    }

    defaultValidation(value){
        //alert("defaultValidation" +value);
        let pattern = /[^0-9A-Za-z]/;
        const safe = String(value || '').replace(/([.*^$+?!(){}\[\]\/\\])/g,'\\$1');
        const regex = new RegExp(safe, 'i');

        //alert("regex" +regex);

        if (value.length <= 0 || value.trim() === "") {
            alert("Please enter the Part Number");
            Keyboard.dismiss();
            return false;
        }
        else if (value.length >= 1 && value.length <=2) {
            alert("Please enter the valid Part Number");
            Keyboard.dismiss();
            return false;
        }
        else if(value === pattern ){
            alert("value = patter");
            return false;
        }
        else{
            alert("Development in progress :" +value);
            Keyboard.dismiss();
        }
    }

    /* Search Part Number Function  Prakash */
    searchPartNumberBtn(searchedPartItem) {
        //alert("Part # Entered is : " +searchedPartItem);
        this.defaultValidation(searchedPartItem);

    }

    /* Submit Function  Prakash S */
    filterDrierSearchPartNumber(){
        console.log(conSize,drierType);
        let lineLiquid = this.state.isCheckedFirst;
        let connFlare = this.state.isSecondTileCheckedFirst;
        //console.log("lineLiquid : " +lineLiquid);
        //console.log("connFlare : " +connFlare);
        if(lineLiquid === true){
            console.log("Line Type : Liquid  is selected")
        }else{
            console.log("Line Type : Suction  is selected")
        }
        if(connFlare === true){
            console.log("conn Type : Flare  is selected");
        }else{
            console.log("conn Type : ODF  is selected");
        }
        console.log(this.state.isCheckedFirst);
    }
    dropdownOnSelectDrierType(idx,value){
        if (value && value !== null) {
            this.setState({isDrierTypeSelected: true});
        }
        drierType === value;
    }
    dropdownOnSelectConSize(idx,value){
        if (value && value !== null) {
            this.setState({isConSizeSelected: true});
        }
        conSize === value;
    }
    render() {

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={[globalStyles.backNavBtnStyle]}>
                        <TouchableOpacity onPress={ this.backToCrossReference }>
                            <BackNavComponent backNavText={backNavText}/>
                        </TouchableOpacity>
                    </View>

                    <TouchableWithoutFeedback onPress={ () => {
                        Keyboard.dismiss()
                    } }>
                        <View style={[styles.filterBasesView]}>
                            <View style={{paddingTop: 10, flexDirection: "column", alignItems: "flex-start",}}>
                                <View style={[styles.textInputViewStyle]}>
                                    <TextInput underlineColorAndroid='transparent'
                                               autoCorrect={false}
                                               value={this.state.searchedPartItem}
                                               returnKeyType="go"
                                               onChangeText={searchedPartItem => {
                                                   this.setState({searchedPartItem});
                                               }}
                                               placeholderTextColor="#CACACA"
                                               autoCapitalize="none"
                                               keyboardType="default"
                                               placeholder={PARTNUMBER_PLACEHOLDER}
                                               onSubmitEditing={() => this.searchPartNumberBtn(this.state.searchedPartItem)}
                                               style={[styles.textInputStyle]}>
                                    </TextInput>
                                </View>

                                <View style={[styles.crossRefModelSearchTxtView]}>
                                    <Text style={[globalStyles.subordinateTxt, {textAlign: 'justify'}]}>Type your
                                        competitor drier part number above
                                        to get cross reference results. If you do not know your competitor drier part
                                        number, select your filter-drier type
                                        below</Text>
                                </View>

                                <TouchableHighlight style={[styles.searchBtnTop]}
                                                    onPress={() => this.searchPartNumberBtn(this.state.searchedPartItem)}
                                                    underlayColor='#4582b5'>
                                    <Text style={[globalStyles.globalBtnTextViewStyle]}>
                                        Search
                                    </Text>
                                </TouchableHighlight>
                                <View style={[styles.crossRefModelSearchTxtView]}>
                                    <Text style={[globalStyles.subordinateTxt, {textAlign: 'justify'}]}>* =
                                        Required</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => {
                        Keyboard.dismiss()
                    } }>
                        <View style={[styles.radioBtnViewStyle, {paddingTop: 20}]}>
                            <Text style={[styles.twoCustomRadioBtnTxt]}>*Line Type</Text>
                            <CustomRadioButton
                                arrayData={this.state.arrayData}
                                radioBtn1UnChecked={this.state.radioBtn1UnChecked}
                                radioBtnCheckedImg={this.state.radioBtnCheckedImg}
                                radioBtnUnCheckedImg={this.state.radioBtnUnCheckedImg}
                                isCheckedFirst={this.state.isCheckedFirst}
                                isCheckedSecond={this.state.isCheckedSecond}
                                radioSecndBtnEventHandle={this.radioSecndBtnEventHandle}
                                radioFirstBtnEventHandle={this.radioFirstBtnEventHandle}
                                firstRadioBtnLbl={this.state.LineType1}
                                secondRadioBtnLbl={this.state.LineType2}
                                isItFirstTier={"firstTier"}
                            />
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => {
                        Keyboard.dismiss()
                    } }>

                        <View style={{alignSelf: "stretch", flexDirection: 'column'}}>
                            <View style={[styles.filterSizeTxtView, {}]}>
                                <Text style={[styles.filterSizeTxt]}>*Drier Type</Text>
                                <View style={[styles.dropDownMenuContent, {
                                    marginLeft: 15,
                                    marginRight: 15,
                                    marginTop: 5
                                }]}>
                                    <ModalDropdown
                                        defaultValue={this.state.DrierTypeDefaultValue}
                                        ref={el => this.filterSizeDropDown = el}
                                        style={styles.dropDownMenu}
                                        textStyle={styles.dropdownText}
                                        dropdownStyle={[styles.dropDown, {minWidth: this.state.dropDownWidth}]}
                                        adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                                        onLayout={(event) => {
                                            this.find_dimesions(event.nativeEvent.layout)
                                        }}
                                        options={this.state.DrierType}
                                        onSelect={(idx, value) => this.dropdownOnSelectDrierType(idx, value)}/>
                                    <Image source={require('../resources/images/FilterArrow.png')}
                                           style={styles.backgroundImage}/>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => {
                        Keyboard.dismiss()
                    } }>
                        <View style={[styles.radioBtnViewStyle, {paddingTop: 20,}]}>
                            <Text style={[styles.twoCustomRadioBtnTxt]}>*Conn Type</Text>
                            <View>
                                <CustomRadioButton
                                    arrayData={this.state.arrayData}
                                    radioBtn1SecondTileUnChecked={this.state.radioBtn1SecondTileUnChecked}
                                    radioBtnSecondTileCheckedImg={this.state.radioBtnSecondTileCheckedImg}
                                    radioBtnSecondTileUnCheckedImg={this.state.radioBtnSecondTileUnCheckedImg}
                                    isSecondTileCheckedFirst={this.state.isSecondTileCheckedFirst}
                                    isSecondTileCheckedSecond={this.state.isSecondTileCheckedSecond}
                                    radioSecndBtnSecondTileEventHandle={this.radioSecndBtnSecondTileEventHandle}
                                    radioFirstBtnSecondTileEventHandle={this.radioFirstBtnSecondTileEventHandle}
                                    firstRadioSecondBtnLbl={this.state.ConnType1}
                                    secondRadioSecondBtnLbl={this.state.ConnType2}
                                    isItSecondTier={"secondTier"}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback onPress={ () => {
                        Keyboard.dismiss()
                    } }>
                        <View style={{alignSelf: "stretch", flexDirection: 'column'}}>
                            <View style={[styles.filterSizeTxtView, {}]}>
                                <Text style={[styles.filterSizeTxt]}>*Conn Size</Text>
                                <View style={[styles.dropDownMenuContent, {
                                    marginLeft: 15,
                                    marginRight: 15,
                                    marginTop: 5
                                }]}>
                                    <ModalDropdown
                                        defaultValue={this.state.connSizedefaultValue}
                                        ref={el => this.filterSizeDropDown = el}
                                        style={styles.dropDownMenu}
                                        textStyle={styles.dropdownText}
                                        dropdownStyle={[styles.dropDown, {minWidth: this.state.dropDownWidth}]}
                                        adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                                        onLayout={(event) => {
                                            this.find_dimesions(event.nativeEvent.layout)
                                        }}
                                        options={this.state.connSize}
                                        onSelect={(idx, value) => this.dropdownOnSelectConSize(idx, value)}/>
                                    <Image source={require('../resources/images/FilterArrow.png')}
                                           style={styles.backgroundImage}/>
                                </View>
                            </View>

                        </View>
                    </TouchableWithoutFeedback>

                    <TouchableHighlight style={[styles.searchBtnTop, {marginTop: 40, marginBottom: 100}]}
                                        onPress={() => this.filterDrierSearchPartNumber()}
                                        underlayColor='#4582b5'>
                        <Text style={[globalStyles.globalBtnTextViewStyle]}>
                            Search
                        </Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }

    backToCrossReference = () => {
        Keyboard.dismiss();
        this.props.navigator.pop();
    }

    radioFirstBtnEventHandle() {
        if (this.state.isCheckedFirst) {
            return;
        }
        this.setState({
            isCheckedFirst: this.state.isCheckedFirst ? false : true,
            isCheckedSecond: this.state.isCheckedSecond ? false : true
        })
    }

    radioFirstBtnSecondTileEventHandle() {
        if (this.state.isSecondTileCheckedFirst) {
            return;
        }
        this.setState({
            isSecondTileCheckedFirst: this.state.isSecondTileCheckedFirst ? false : true,
            isSecondTileCheckedSecond: this.state.isSecondTileCheckedSecond ? false : true
        })
    }

    radioSecndBtnEventHandle() {
        if (this.state.isCheckedSecond) {
            return;
        }
        this.setState({
            isCheckedSecond: this.state.isCheckedSecond ? false : true,
            isCheckedFirst: this.state.isCheckedFirst ? false : true
        })
    }

    radioSecndBtnSecondTileEventHandle() {
        if (this.state.isSecondTileCheckedSecond) {
            return;
        }
        this.setState({
            isSecondTileCheckedSecond: this.state.isSecondTileCheckedSecond ? false : true,
            isSecondTileCheckedFirst: this.state.isSecondTileCheckedFirst ? false : true
        })
    }

    threeRadioBtnFirstEventHandle() {
        if (this.state.isThreeCheckedFirst) {
            return;
        }
        this.setState(
            {
                isThreeCheckedFirst: true,
                isThreeCheckedSecond: false,
                isThreeCheckedThird: false,
            });
    }
    dropdownOnSelect(value) {

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: 'flex-start',
        backgroundColor: "#F6F6F6", //F6F6F6
        paddingTop: 64,
    },

    navBackImage: {
        width: 10,
        height: 10,
    },

    textInputStyle: {
        paddingTop: 9,
        paddingLeft: 3,
        paddingBottom: 5,
        borderColor: "black",
        height: 30,
        fontWeight: "100",
        color: "#000000",
        fontSize: 14,
        fontFamily: 'Droid Serif',
        fontWeight: 'normal',
        fontStyle: 'italic',
    },

    textInputViewStyle: {
        //paddingLeft: 10,
        paddingRight: 10,
        shadowColor: "#808080",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {width: 1, height: 1},
        borderWidth: 0.5,
        borderColor: "lightgray",
        borderRadius: 2,
        paddingLeft: 5,
        alignSelf: "stretch",
        marginLeft: 20,
        marginRight: 20,
    },

    btnTextViewStyle: {
        textAlign: 'center',
        color: "#FFFFFF",
    },

    searchBtnTop: {
        marginTop: isItiPhone5S ? 15 : 20,
        marginBottom: 0,
        borderRadius: 25,
        backgroundColor: '#57a3e2',
        alignSelf: "center",
        paddingLeft: 60,
        paddingRight: 60,
        paddingTop: 10,
        paddingBottom: 10,
    },

    searchBtnBottom: {
        //marginTop : 10,
        marginBottom: 0,
        borderRadius: 25,
        backgroundColor: '#57a3e2',
        alignSelf: "center",
        paddingLeft: 60,
        paddingRight: 60,
        paddingTop: 20,
        paddingBottom: 10,
    },

    searchLoginBtnStyle: {
        marginTop: 40,
    },

    crossRefModelSearchTxtView: {
        paddingTop: 10,
        alignSelf: "flex-start",
        backgroundColor: "#f7f7f7",
        paddingRight: 20,
        paddingLeft: 20,
    },

    filterSizeTxtView: {
        //flex : 2,
        alignSelf: "stretch",
        flexDirection: 'column',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 20,
    },

    filterSizeTxt: {
        color: "#06273F",
        fontWeight: "normal",
        fontFamily: "Montserrat",
        fontSize: 18
    },

    twoCustomRadioBtnTxt: {
        color: "#06273F",
        fontWeight: "normal",
        fontFamily: "Montserrat",
        fontSize: 18
    },

    threeCustomRadioBtnTxt: {
        color: "#06273F",
        fontWeight: "normal",
        fontFamily: "Montserrat",
        fontSize: 18
    },

    dropdownText: {
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
        alignSelf: "stretch",
        flexDirection: 'column',
        alignItems: 'stretch',
        flexWrap: 'wrap',

        shadowOffset: {
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
        height: (isItAndroidPhone || isItiPhone5S || isItiPhone6S) ? 180 : 240,
    },

    backgroundImage: {
        width: 10,
        height: 5,
        position: 'absolute',
        top: 16,
        right: 15,
    },

    radioBtnViewStyle: {
        //flex :1,
        flexDirection: 'column',
        paddingLeft: 10,
        marginTop: 0,
        paddingTop: 10,
    },

    searchBtnBottom: {
        marginTop: 10,
        marginBottom: 0,
        borderRadius: 25,
        backgroundColor: '#57a3e2',
        alignSelf: "center",
        paddingLeft: 60,
        paddingRight: 60,
        paddingTop: 10,
        paddingBottom: 10,

    },

    filterBasesView: {
        backgroundColor: "#F6F6F6",
        //flex : 2,
        alignSelf: "stretch",
        flexDirection: "column"
    },
    ContentRpmDropDown: {
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
export default ProductFilterDriers;