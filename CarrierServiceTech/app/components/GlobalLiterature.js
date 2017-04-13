/**
 * # GlobalLiterature.js
 * This component will render the Most popular
 * literature & enable to search the litearture based on Model No.
 * Author: Ajit
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
    Alert,
    AppRegistry,
    Text,
    TextInput,
    ListView,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    AsyncStorage,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import GridLiterature from './GridLiterature';
import LinearGradient from 'react-native-linear-gradient';
import {globalStyles, deviceFinder} from "./globalStyles";
import CellView from "./CellView";
import * as dataResource from './dataResource';
import * as stringConstant from '../constants/StringConstant';
import {CallLiteratureInfo} from '../lib/LiteratureService';
import GlobalLiteratureFilters from './GlobalLiteratureFilters';
import LiteratureWebView from  './LiteratureWebView';
import {onSubmitClickSearchFromServer, onChangeTextSearchHistory} from './SearchHistory';

import ActivityIndicator from "./ActivityIndicator";


class GlobalLiterature extends Component {    
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            
            borderWidthFirst: 0,
            borderWidthSecond: 1,
            colorFirst: 'white',
            colorSecond: 'black',
            touchableText: 'Sales',
            inputValue : '',
            dataSource: this.props.mostPopularLiteratureDataStore ? ds.cloneWithRows(this.props.mostPopularLiteratureDataStore) : null,
            rightImage: require('../resources/images/Next.png'),
            setAsyncValue: true,
            asName: '',
        };
        this.onPress = this.onPress.bind(this);
   
    }
    /**
     * # globalLiteratureWebNav
     * Purpose: This function will be invoked to navigate to globalLiteratureWebNav screen
     * Author: Ajit
     * Input Param:
     * Output Param:
     */

   globalLiteratureWebNav = (rowData) => {
        
        console.log(rowData)
        var lUrl = rowData.DocumentBaseURL + rowData.DocumentPath;
        //console.log(lUrl);


        this.props.navigator.push({
            name: 'LiteratureWebView',
            title: 'LiteratureDetailsView',
            isHidden: false,
            passProps : {URL: lUrl},
            });
        
    }
     
    /**
     * # globalLiteratureFilterNav
     * Purpose: This function will be invoked to navigate to globalLiteratureFilter screen
     * Author: Ajit
     * Input Param:
     * Output Param:
     */

         globalLiteratureFilterNav = () => {
         Keyboard.dismiss();    
         let activityIndicator = new ActivityIndicator();
         activityIndicator.startActivity();
        
        if(this.state.inputValue){
            CallLiteratureInfo(this);

        }
        else{
            alert("Please enter Model number to view literatures.")
            activityIndicator.stopActivity();

        }   

    }

    /**
     * # globalLiteratureFilterNav
     * Purpose: CompletionHandler
     * Author: Ajit
     * Input Param:
     * Output Param:
     */
    completionHandler = (jsonResponse) => {

                var lAllDoc = [];
                var docTitle = [];
                var docCategory = [];
                console.log("in handler")
                lAllDoc = jsonResponse["Documents"];
                var lReturnObj = this.createCurrentDocumentArray(lAllDoc);

                var lCurrentDocArray = lReturnObj.CurrentDocArray;
                var LDropDownArray = lReturnObj.DropDownArray;

                this.props.navigator.push({
                    name: 'GlobalLiteratureFilters',
                    title: 'GlobalLiteratureFilters',
                    isHidden: false,
                    passProps: {"searchedData": lAllDoc,"CurrentDoc" : lCurrentDocArray,"DropDownData" : LDropDownArray,"Searchedtext" : this.state.inputValue},
                });
           
            let activityIndicator = new ActivityIndicator();
            activityIndicator.stopActivity();
        }

        createCurrentDocumentArray = (lAllDoc) => {
            var lCurrentDoctemp = [];
            var lDMSTypeObject = {}
            var lDropDownArray = ["All Document"]
            for (var index = 0 ; index < lAllDoc.length;  index++){
                
                if(lAllDoc[index].Status === "Current"){
                    
                    if(lDMSTypeObject[lAllDoc[index].DMSType]){

                        lDMSTypeObject[lAllDoc[index].DMSType] += 1;
                    }else
                    {
                        lDMSTypeObject[lAllDoc[index].DMSType] = 1;

                    }
                    lCurrentDoctemp[lCurrentDoctemp.length] = lAllDoc[index];
                }
                
            }
            console.log(lDMSTypeObject)
            for (var lIndex in lDMSTypeObject){

                lDropDownArray[lDropDownArray.length] = lIndex + " (" + lDMSTypeObject[lIndex] + ")";

            }
            console.log(lDropDownArray)
            return {"CurrentDocArray" :lCurrentDoctemp, "DropDownArray" : lDropDownArray}
        }

    /**
     * # onPress
     * Purpose: This function will be invoked to handle the action between Sales & Technical tabs
     * Author: Ravichandran P
     * Input Param: props
     * Output Param:
     */
    onPress(props) {
        this.setState({
            colorFirst: this.state.isSalesSelected ? '#06273F' : "white",
            colorSecond: this.state.isSalesSelected ? 'white' : "#06273F",
            borderWidthFirst: this.state.isSalesSelected ? 1 : 0,
            borderWidthSecond: this.state.isSalesSelected ? 0 : 1,
           
            touchableText: this.state.isSalesSelected ? 'Sales' : "Technical",
        })
    }

    literaturePageSelect(rowData) {
        alert(rowData);
    }
    
    
    handleKeyDown(e) {
        if (e.nativeEvent.key == "Enter") {
            console.log('Pressed Enter Key');
        }
    }
    hideKeyBoard() {
        Keyboard.dismiss();
    }

    ShowMostPopularLiterature(){

         const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
         AsyncStorage.getItem("mostPopularLit").then((value) => {
        if(value) {
          console.log(value)
            var lTempArray = JSON.parse(value);
            this.setState({dataSource : ds.cloneWithRows(lTempArray)})
        }
        
        }).done()
    }

    render() {

        let fviewpage = null;
        if (this.state.setAsyncValue && this.props.mostPopularLiteratureDataStore) {
            fviewpage = (
                <View style={styles.listNav}>
                    <Text style={styles.titleTexts}>Most Popular</Text>
                    <ListView
                        scrollEnabled={ true }
                        backgroundColor='#F6F6F6'
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, sectionId, rowId) =>
                            <View style={styles.rowView}>
                                <TouchableOpacity
                                    onPress={() => this.globalLiteratureWebNav(rowData)}
                                    style={{flex: 1}}>

                                    <CellView
                                        title={rowData["DocumentTitle"]}
                                        subTitle={rowData["DMSCategory"]}
                                        leftImage={this.state.leftImage}
                                        rightImage={this.state.rightImage}/>
                                </TouchableOpacity >
                            </View> }
                    />
                </View>


            )
        }
        else {
            fviewpage = null;

        }
        return (
          <View style={{flex: 1, backgroundColor: '#F6F6F6', flexDirection: 'column'}}>              
            <View style={[{flex: 1.2}]}>
              <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss()} } >
                <View style={[styles.container, {justifyContent: 'flex-start', alignItems: 'flex-end'}]}>
                    <Text style={styles.titleText}>Search Literature</Text>
                </View>
              </TouchableWithoutFeedback> 
               
            </View>
            <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss()} } >  
              <View style={[{flex: 7, backgroundColor: '#F6F6F6', minHeight: 120}]}>                  
                <View style={[styles.textInputViewStyle]}>
                  <TextInput
                      style={[styles.textInputStyle, {height: 40, fontSize: 16, fontStyle: 'italic',}]}
                      placeholder="  Search by Model # or keyword"
                      underlineColorAndroid='transparent'
                      autoCorrect={false}
                      onChangeText={(text) => this.setState({"inputValue":text})}                            
                      onSubmitEditing={ this.globalLiteratureFilterNav}                            
                      placeholderTextColor='#D3D3D3'/>
                </View>                  
                <View style={styles.searchBtnContainer}>
                    <TouchableHighlight style={[globalStyles.globalBtnStyle,
                        styles.globalBtnStyle]} onPress={this.globalLiteratureFilterNav}>
                        <LinearGradient
                            start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                            locations={[0, 0.5, 1]}
                            colors={['#57A3E3', '#56A6D1', '#57A3E3']}
                            underlayColor={['#4582B5', '#498FB5', '#4582B5']}
                            style={[{borderRadius: 40}]}>
                            <Text style={[styles.globalBtnTextViewStyle]}>Search </Text>
                        </LinearGradient>
                    </TouchableHighlight>
                </View>
                {fviewpage}
              </View>
            </TouchableWithoutFeedback>                
          </View> );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    buttonContainerLeft: {
        flex: 1,
        marginTop: 97,
        shadowColor: '#000000',
        height: 40,
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
        marginLeft: 20,
        width: 50,
    },
    buttonContainerRight: {
        flex: 1,
        marginTop: 97,
        shadowColor: '#000000',
        height: 40,
        fontSize: 14,
        fontFamily: 'Montserrat-Regular',
    },
    list: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        backgroundColor: 'red',
        margin: 3,
        width: 100
    },
    titleTexts: {
        fontSize: 18,
        fontFamily: 'Montserrat',
        fontWeight: '100',
        marginLeft: 14,
        marginBottom: 12,
        color: '#213450',
    },
    titleText: {
        fontSize: 18,
        fontFamily: 'Montserrat',
        fontWeight: '100',
        marginLeft: 14,
        color: '#213450',
    },
    searchBtnContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonGradient: {
        borderRadius: 30,
        width: 170,
        marginTop: 10,
        height: 33,
    },
    buttonText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#ffffff',
        padding: 2,
        fontFamily: 'Montserrat',
    },
    HVACBtnStyle: {
        marginTop: 5,
    },
    globalBtnStyle: {
        marginLeft: 50,
        marginRight: 50,
        padding: 2,
        borderRadius: 20,
        backgroundColor: "#57a3e2",
        marginTop: 0,
    },
    textInputViewStyle: {
        marginLeft: 25,
        marginRight: 25,
        marginBottom: 25,
        marginTop: 20,
        shadowColor: "#808080",
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {width: 1, height: 1.0},
        borderWidth: 1,
        borderColor: "lightgray",
        backgroundColor: '#F6F6F6',
    },
    textInputStyle: {
        paddingTop: 9,
        paddingLeft: 5,
        paddingBottom: 9,
        borderColor: "black",
        height: 30,
        fontWeight: "100",
        color: "#000000",
        fontSize: 12,
    },
    BtnDualText: {
        color: "#06273F",
        textAlign: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 8,
    },
    globalBtnTextViewStyle: {
        textAlign: 'center',
        color: "#FFFFFF",
        paddingLeft: 60,
        paddingRight: 60,
        paddingBottom: 5,
    },
    globalBtnStyle: {},
    listNav: {
        flex: 7,
        alignSelf: "stretch",
        backgroundColor: '#F6F6F6',
        paddingTop: 20,
    },
    rowView: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        height: 80,
        backgroundColor: '#F6F6F6',
    },
    technicalBtnView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginRight: 25,
        marginBottom: 25,
        borderColor: 'grey',
        height: 40
    },
    salesBtnView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 25,
        marginLeft: 25,
        marginBottom: 25,
        borderColor: 'grey'
    },

})
export default GlobalLiterature;
