/*-------------------------------------------------------------------------------------------------
 --- Name      : ChangeCurrentStore
 --- Author    : Prakash S
 --- Date      : 03/30/2017
 --- Purpose   : Change Current Store / Favorite Store
 -------------------------------------------------------------------------------------------------*/
import React, {Component} from 'react';

import * as dataResource from './dataResource';
import {globalStyles, deviceFinder} from "./globalStyles";
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';
import BackNavComponent from "./BackNavComponent";
import * as stringConstant from '../constants/StringConstant';
import ActivityIndicator from "./ActivityIndicator";

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    PropTypes,
    Image,
    Dimensions,
    Platform,
    TouchableHighlight,
    ListView,
    Keyboard
} from 'react-native';

const backNavText = stringConstant.carrierConstClass.SEARCH_BACK_BUTTON;
const {width, height} = Dimensions.get('window');
const ZIP_PLACEHOLDER = "Enter Zip Code"
const radioBtnCheckedSrc = require('../resources/images/CheckedStep.png');
const radioBtnUnCheckedSrc = require('../resources/images/UncheckedStep.png');

class ChangeCurrentStore extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource:  ds.cloneWithRows(dataResource.globalStores),
            dropDownWidth: 200,
            radioBtnChecked: false,
            zipcode:'',
            isLoading: false,
            imageSelecteState:[]
        }
        this.radioBtn = this.radioBtn.bind(this);

    }

    componentDidMount() {
        //Close Indicator started from web service
        let activityIndicator = new ActivityIndicator();
        activityIndicator.stopActivity();
        //var listViewScrollView = this.refs.listView.getScrollResponder();
        //listViewScrollView.scrollTo(1); // Hack to get ListView to render fully
    }


    searchAnotherStore(zipcode){
        //alert(zipcode);
        let pattern = /[^0-9]/;
        if (zipcode.length <= 0 || zipcode.trim() === "") {
            //alert(zipcode);
            //alert("Please enter the ZIP Code");
            Keyboard.dismiss();
            return;
        }
        else if (zipcode.length >= 1 && zipcode.length <= 4) {
            alert("ZIP Code not found ");
            Keyboard.dismiss();
            return;
        }
        else if (pattern.test(zipcode)) {
            alert("ZIP Code not found ");
            return;
        }
        /*setTimeout(
            () => {
                let activityIndicator = new ActivityIndicator();
                activityIndicator.startActivity();
            },
            500
        );*/



    }

    setStoreSelection() {
        alert("Development is in progress");
    }

    radioBtn(rowId) {
        // alert("radioBtn"+rowId);
        // // Reloading individual cell based on the radio button selection
        // this.setState({radioBtnChecked: !this.state.radioBtnChecked});
        // if (this.state.radioBtnChecked === true) {
        //     this.setState({
        //        dataSource: this.state.dataSource.cloneWithRows(dataResource.globalStores),
        //     })
        // } else {
        //     let newArray = dataResource.globalStores.slice();
        //     newArray[rowId] = {
        //         ...dataResource.globalStores[rowId],
        //     }
        //     this.setState({
        //         dataSource: this.state.dataSource.cloneWithRows(newArray),
        //     });
        //
        // }

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        var imageState=[];
        for(var i=0; i<dataResource.jobDetails.length;i++){
            if(i==rowId){
                imageState[i]=!this.state.imageSelecteState[i]
            }
            else{
                imageState[i]=0
            }

        }
        this.setState({
            dataSource: ds.cloneWithRows(dataResource.globalStores),
            imageSelecteState:imageState
        });
    }


    render() {

        radioBtnImage = (
            <Image
                style={styles.imgRadioBtn}
                source={ this.state.radioBtnChecked ? radioBtnCheckedSrc : radioBtnUnCheckedSrc }
            />
        );
        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={[globalStyles.backNavBtnStyle]}>
                        <TouchableOpacity style={[]} onPress={ this.backToMainSearch }>
                            <BackNavComponent backNavText={backNavText}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.searchFilters}>
                        <Text style={[globalStyles.headerTxt1, styles.headerTxt1]}>Zip Code</Text>
                        {/*<View style={styles.textInputContainer}>
                            <TextInput
                                style={[globalStyles.specialMsgTxt, styles.searchInput]}
                                autoCapitalize="none"
                                autoCorrect={false}
                                value= {this.state.zipcode}
                                underlineColorAndroid='transparent'
                                onChangeText = {zipcode => this.setState({zipcode})}
                                placeholder={ZIP_PLACEHOLDER}
                                placeholderTextColor='#CACACA'
                            />
                        </View>*/}

                        <View style = {[styles.textInputViewStyle]}>
                            <TextInput underlineColorAndroid='transparent'
                                       autoCorrect = {false}
                                       placeholderTextColor="#CACACA"
                                       autoCapitalize="none"
                                       keyboardType = "default"
                                       value= {this.state.zipcode}
                                       placeholder = {ZIP_PLACEHOLDER}
                                       onChangeText = {zipcode => this.setState({zipcode})}
                                       style = {[styles.textInputStyle]} >
                            </TextInput>
                        </View>

                        <View style={styles.dropDownMenuContainer}>
                            <ModalDropdown
                                renderSeparator={this._renderSeparator.bind(this)}
                                defaultValue='Within: 50 Miles'
                                ref={el => this.filterSizeDropDown = el}
                                style={styles.dropDownMenu}
                                textStyle={styles.dropdownText}
                                dropdownStyle={[styles.dropDown, {minWidth: this.state.dropDownWidth}]}
                                adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                                onLayout={(event) => {
                                    this.find_dimesions(event.nativeEvent.layout)
                                }}
                                /*options={dataResource.PackagedOutDoorUnits_dropdown[this.state.selectionType]['Capacity']}*/
                                options={['Within: 10 Miles', 'Within: 20 Miles', 'Within: 30 Miles',
                                    'Within: 40 Miles','Within: 50 Miles', 'Within: 60 Miles',
                                    'Within: 70 Miles','Within: 80 Miles', 'Within: 90 Miles', 'Within: 100 Miles',]}
                               />
                            <Image source={require('../resources/images/FilterArrow.png')}
                                   style={styles.backgroundImage}/>
                        </View>
                        <View style={styles.searchContainer}>
                            <TouchableHighlight style={[styles.globalBtnStyle, styles.searchBtn]}
                                onPress= {() => this.searchAnotherStore(this.state.zipcode)}
                                underlayColor='#4582b5'>
                                <Text style={[styles.globalBtnTextViewStyle]}>
                                    Search
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                    <View style={styles.globalStores}>
                        <ListView
                            automaticallyAdjustContentInsets={false}
                            dataSource={this.state.dataSource}
                            initialListSize={1}
                            renderRow={(rowData, sectionId, rowId) =>
                                <TouchableOpacity
                                    style={styles.addressContainer}
                                    onPress={() => this.radioBtn(rowId)}>
                                    <View style={styles.radioView}>
                                        <View style={[styles.listItems,]}>
                                            <View style={styles.addressContent}>
                                                <Text style={[globalStyles.headerTxt1, styles.headerTxt1, styles.titleFavoriteStores]}>{rowData.title}</Text>
                                                <Text style={[globalStyles.headerTxt3, styles.headerTxt3]}>{rowData.address}</Text>
                                                <Text style={[globalStyles.headerTxt3, styles.headerTxt3]}>{rowData.city} {rowData.zipcode}</Text>
                                                <Text style={[globalStyles.headerTxt3, styles.headerTxt3, styles.distanceAwayTxt]}>0.3 mi away</Text>
                                            </View>
                                            <View style={styles.radioBtnContainer}>
                                                {/*{radioBtnImage}*/}
                                                <Image
                                                    style={styles.imgRadioBtn}
                                                    source={ this.state.imageSelecteState[rowId] ? radioBtnCheckedSrc : radioBtnUnCheckedSrc }
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            }
                        />
                    </View>
                </View>
                <View style={[styles.setDefaultStoresContainer, globalStyles.rowView]}>
                    <View style={[styles.setStoreSelection, styles.finalSelectionBtn]}>
                        <TouchableHighlight style={[styles.globalBtnStyle, styles.setStoreSelectionBtn]}
                                            onPress={this.setStoreSelection} underlayColor='#4582b5'>
                            <Text style={[styles.globalBtnTextViewStyle]}>
                                Set as my Preferred Store
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }

    _renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        let key = `spr_${rowID}`;
        return (<View style={styles.separator}
                      key={key}
        />);
    }

    _dropdown_3_adjustFrame(style) {
        console.log(`frameStyle={width:${style.width}, height:${style.height}, top:${style.top}, left:${style.left}}`);
        style.left -= 9;
        style.top += 7;
        style.height -= 70;
        return style;
    }

    find_dimesions(layout) {
        this.setState({dropDownWidth: layout.width})
        console.log(layout.width);
    }

    backToMainSearch = () => {
        this.props.navigator.pop();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignSelf: "stretch",
        paddingTop: 64,
        flexDirection: 'column',
    },
    topContainer: {
        flex: 9,
    },
    setDefaultStoresContainer: {
        justifyContent: 'center',
        flex: 1,
        maxHeight: 100,
        paddingBottom: 5,
    },
    searchFilters: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 10,
    },
    headerTxt1: {
        color: '#06273F',
        fontSize: 16,
    },
    headerTxt3: {
        fontSize: 14,
        color: '#6a6a6a',
    },
    distanceAwayTxt: {
        fontSize: 12,
        color: '#06273F',
    },
    textInputContainer: {
        borderRadius: 5,

        overflow: 'hidden',

        marginTop: 10,
        //height: 40,
        backgroundColor: '#ffffff',
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // shadowOffset: {
        //     height: 1,
        //     width: 0
        // }
        // borderColor: '#CACACA',
        // borderWidth: 1,
        // shadowColor: "#000000",

        shadowColor : "#808080",
        shadowOpacity : 1,
        shadowRadius : 3,
        shadowOffset : {width: 1, height: 1.0},
        borderWidth : 1,
        borderColor : "lightgray"
    },
    searchInput: {
        paddingLeft: 10,
        paddingTop: 0,
        color: '#333333',
        fontSize: 16,
        //backgroundColor: '#ffffff',
        height: 40,
    },
    dropDownMenuContainer: {
        marginTop: 10,
        position: 'relative',
    },
    dropDownMenu: {
        flexWrap: 'wrap',
        borderColor: "#CACACA",
        alignItems: 'stretch',
        borderWidth: 1,
        padding: 10,
        marginTop: 5,
        backgroundColor: 'white',
        position: 'relative',
        borderRadius: 3,
        height: 40,
    },
    dropdownText: {
        color: "#6A6A6A",
        fontSize: 18,
        fontFamily: 'Montserrat',
        fontWeight: '300'
    },
    dropDown: {
        fontSize: 16,
        minHeight: 250,
    },
    backgroundImage: {
        width: 10,
        height: 5,
        position: 'absolute',
        top: 25,
        right: 15,
    },
    searchContainer: {
        justifyContent: 'center',
        paddingTop: 10,
    },
    searchBtn: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        padding: 15,
        paddingRight: 50,
        paddingLeft: 50,
    },
    globalBtnStyle: {
        backgroundColor: "#57a3e2",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
        paddingRight: 50,
        paddingLeft: 50,
    },
    setStoreSelectionBtn: {
        paddingLeft: 30,
        paddingRight: 30,
    },
    globalBtnTextViewStyle: {
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: 'Montserrat',
        fontSize: 14,
    },
    globalStores: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 250,
    },
    titleFavoriteStores: {},
    listItems: {
        flexDirection: 'row',
        borderBottomColor: '#CACACA',
        borderBottomWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,

    },
    addressContent: {
        flexDirection: 'column',
        flex: 0.9,
        justifyContent: 'center',
    },
    radioBtnContainer: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 0,
    },
    radioBtnView: {
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    },

    cancelStoreSelectionBtn: {
        backgroundColor: "#CACACA",
        padding: 15,
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 30,
    },
    cancelTxt: {
        color: '#ffffff',
        fontFamily: 'Montserrat',
        fontSize: 14,
    },
    setStoreSelection: {},
    globalBtnStyle: {
        padding: 15,
        borderRadius: 30,
        backgroundColor: "#57a3e2"
    },
    finalSelectionBtn: {
        marginLeft: 5,
        marginRight: 5,
    },
    selected: {
        color: 'red',
    },
    unselected: {
        color: 'green',
    },
    imgRadioBtn: {
        width: 20,
        height: 20,
    },
    textInputViewStyle: {
        marginTop: 10,
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
    },
    textInputStyle: {
        paddingTop : 9,
        paddingLeft : 3,
        paddingBottom : 5,
        borderColor : "black",
        height: 40,
        fontWeight: "100",
        color:"#000000",
        fontSize: 16,
        fontFamily: 'Droid Serif',
        fontWeight: 'normal',
        fontStyle: 'italic',
    },
    addressContainer:{

    }


});
export default ChangeCurrentStore;