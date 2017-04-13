import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Image,
    ListView,
    TouchableOpacity,
    TouchableHighlight,
    StatusBar,
    Alert,
    ScrollView,
    PropTypes,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions

} from 'react-native';
import {globalStyles, deviceFinder} from "./globalStyles";
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import CellView from "./CellView";
import CustomisedListView from "./CrossReference";
import GlobalLiteratureFilters from "./GlobalLiteratureFilters";
import Parts from '../containers/Parts'
import Modal from 'react-native-simple-modal';

import * as dataResource from './dataResource';
import * as stringConstant from '../constants/StringConstant';
import BackNavComponent from "./BackNavComponent";
import ActivityIndicator from "../components/ActivityIndicator";
import WarrantyService from '../lib/WarrantyService';
import {showAlert} from "../lib/CarrierAlert";
import {CallLiteratureInfo,CallLiteratureInfoType,CallLiteratureInfoAll} from '../lib/LiteratureService';


const backNavText = stringConstant.carrierConstClass.PRODUCT_CATEGORY_PAGE_BACK_BUTTON;
const isItiPhone6S = deviceFinder.isItiPhone6S();
const isItiPhone5S = deviceFinder.isItiPhone5S();
const isItiPad = deviceFinder.isItiPad();


class ProductPage extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            isItProdSubCategory : "ProductCategoryDetails",
            fromWhichScreen : 'productPage',
            dataSource : ds.cloneWithRows(dataResource.listItemData.Product_SubCategory_Details),
            reloadingDataSource : ds.cloneWithRows(dataResource.listItemData.Product_SubCategory_Details),
            offset : 5,
            addSerialNoModalOpen : false,
            addedSerialNo : "",
            isModalPressed: false,
            ProductImage: 'http://epicimg.hvacpartners.com/' + this.props.modelandPartData.UnitImageLink,
            rightImage : require('../resources/images/Next.png'),
            modelNumber : props.modelandPartData.ModelNumber,
            modelDescription : this.props.modelandPartData.ModelDescription,
            serialNumber : "",
            partlist_productPage : this.props.modelandPartData.BomLine.GetModelDataReplyBomLine,

            isItSubCategoryModelNo : this.props.isItSubCategoryModelNo,
            dataSource1:  ds.cloneWithRows(dataResource.PartsListArray),
            titleProduct : " " ,

        };
        this.productListDetailsNav.bind(this);
        this.onPressAddSerialNo = this.onPressAddSerialNo.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleAndroidKeyDown = this.handleAndroidKeyDown.bind(this);

        //this.onceHappened = false;
    }
    componentWillMount() {
        this.windowWidth= Dimensions.get('window').width;
        this.windowHeight= Dimensions.get('window').height;

        console.log("windowWidth : "+this.windowWidth);
        console.log("windowHeight : "+this.windowHeight);
    }


    completionHandler = (jsonResponse) => {


        
            var docArr = [];
            var docTitle = [];
            var docCategory = [];
            console.log("in handler111")
            docArr = jsonResponse["Documents"];

            this.props.navigator.push({
                name: 'GlobalLiteratureFilters',
                title: this.state.titleProduct,
                isHidden: false,
                passProps: {"searchedData": docArr, "CurrentDoc" : docArr,"DropDownData" : [],"Searchedtext" : ""},
            });
        
        
        let activityIndicator = new ActivityIndicator();
        activityIndicator.stopActivity();
    }

    render() {
        let imageLogo = null;

        if(this.windowWidth > 300 && this.windowWidth < 500){
            imageLogo = (
                <Image  style = {[styles.productImage,{height:100, width: 100 }]}
                        source={{uri : this.state.ProductImage} }  />
            )
        }
        else{
            imageLogo = (
                <Image  style = {[styles.productImage,{height:100, width: 100 }]}
                        source={{uri : this.state.ProductImage} } />
            )
        }

        let cellView = (
            <View style = {{paddingTop: 10,paddingBottom: 20,}}>
                <ListView
                    scrollEnabled = { true }
                    dataSource={this.state.dataSource}
                    renderRow={(rowData,sectionId, rowId) =>
                        <View style={styles.rowView}>
                            <TouchableOpacity style={{flex:1}} onPress={() => this.productListDetailsNav(rowData["title"])}>
                                <CellView
                                    title={rowData["title"]}
                                    subTitle={rowData["subTitle"]}
                                    leftImage={rowData["leftImage"]}
                                    rightImage={this.state.rightImage}
                                    isButtonEnabled={rowData["isButtonEnabled"]}
                                    toBePopulatedOn = {this.state.fromWhichScreen}/>
                            </TouchableOpacity >
                        </View>
                    }
                />
            </View>)

        let cellViewWithoutButton = (
            <View style = {{paddingTop: 20}}>
                <ListView
                    scrollEnabled = { true }
                    dataSource={this.state.reloadingDataSource}
                    onChangeVisibleRows = {(rowData,sectionId, rowId) => alert("onchangeVisibleRows...")}
                    renderRow={(rowData,sectionId, rowId) =>
                        <View style={styles.rowView}>
                            <TouchableOpacity style={{flex:1}} onPress={() => this.productListDetailsNav(rowData["title"])}>
                                <CellView
                                    title={rowData["title"]}
                                    subTitle={rowData["subTitle"]}
                                    leftImage={rowData["leftImage"]}
                                    rightImage={this.state.rightImage}
                                    toBePopulatedOn = {this.state.fromWhichScreen}/>
                            </TouchableOpacity >
                        </View>
                    }
                />
            </View> )
        let requiredCell = (!this.state.isModalPressed ? cellView : cellViewWithoutButton);
        return (
            <View style={styles.container}>
                <View style = {[globalStyles.backNavBtnStyle,styles.backNavBtnStyle]}>
                    <TouchableOpacity onPress = { this.backToProductList }>
                        <BackNavComponent  backNavText =  {backNavText} />
                    </TouchableOpacity>
                </View>
                <View style={[styles.headerContent]}>
                    <View style={styles.productDetailsContainer}>
                        <View style={styles.productImageContainer}>
                            {imageLogo}
                        </View>
                        <View style={[styles.headerTextContainer]}>
                            <Text style={[globalStyles.headerTxt4,styles.productText]}>{this.state.modelDescription}</Text>
                            <Text style={[globalStyles.headerTxt4,styles.productText]}>Heat</Text>
                            <Text style={[globalStyles.headerTxt4,styles.productText]}>Model #: {this.state.modelNumber}</Text>
                            <Text style={[globalStyles.headerTxt4,styles.productText]}>Serial #: {this.state.serialNumber }</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.listNav}>
                    {requiredCell}
                </View>
                <Modal
                    open={this.state.addSerialNoModalOpen}
                    modalDidOpen={() => console.log('modal did open')}
                    modalDidClose={() => this.setState({addSerialNoModalOpen: false, addedSerialNo : ""})}
                    style={{alignItems: 'center'}}>
                    <TouchableWithoutFeedback onPress={ () => { Keyboard.dismiss()} }>
                        <View style={{ position:'relative', paddingTop: 15, paddingBottom : 15,flexDirection : "column"}}>
                            <View style = {{paddingBottom : 10,position:'absolute', top: -10, right: -10, width : 35, height : 35}}>
                                <TouchableOpacity
                                    onPress={() => this.setState({addSerialNoModalOpen: false,addedSerialNo : ""})}>
                                    <Text style={{ color: '#333',fontSize: 20,textAlign: 'right',paddingRight: 8}}>&#10005;</Text>
                                </TouchableOpacity>
                            </View>
                            <View style = {[{ alignItems : 'center',paddingBottom: 25,}]}>
                                <Text style={[globalStyles.headerTxt2 ,{fontSize: 20,color: "#06273F"}]}>Serial Number</Text>
                            </View>
                            <View style = {styles.textInputViewStyle}>
                                <TextInput
                                    value= {this.state.addedSerialNo}
                                    autoCorrect = {false}
                                    onChangeText = {addedSerialNo => this.setState({addedSerialNo})}
                                    placeholderTextColor="#CACACA"
                                    autoCapitalize="none"
                                    underlineColorAndroid='transparent'
                                    placeholder = "Enter Serial Number"
                                    keyboardType= "default"
                                    returnKeyType = "go"
                                    onSubmitEditing = {() => this.onSubmitClick(this.state.addedSerialNo)}
                                    onKeyPress={Platform.os === 'ios'? this.handleKeyDown : this.handleAndroidKeyDown}
                                    style= {[styles.textInputStyle]}>
                                </TextInput>
                            </View>
                            <TouchableHighlight onPress = {()=> this.onPressAddSerialNo()}
                                                style={[styles.globalBtnStyle, styles.searchBtnStyle]}
                                                underlayColor='#4582b5'
                            >
                                <Text style={[styles.globalBtnTextViewStyle]}>Add</Text>
                            </TouchableHighlight>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        );
    }

    backToProductList = () =>{
        this.props.navigator.pop();
    }



    /*
    name: responseHandlerForWarrayntyService
    Objective: this is call back method for network call
    @return: successResponse object or error message in case service failure.
    */

responseHandlerForWarrayntyService = (jsonResponse, errorMsg) => {
    let activityIndicator = new ActivityIndicator();
        activityIndicator.stopActivity();
    
    if(jsonResponse === null){
        showAlert(errorMsg);
    }else{

        this.props.navigator.push({
                name:'Warranty',
                title:'Warranty',
                isHidden:false,
                passProps: {warrantyInfo : jsonResponse},
                });
    }
}

    productListDetailsNav =(title) => {
        let activityIndicator = new ActivityIndicator();

        const { addSerialNoModalOpen } = this.state;
        switch(title){
            case 'All Literature':{
                this.setState(
                    {titleProduct :title}
                );
                    console.log(title)
                    CallLiteratureInfoAll(this,title,this.state.modelNumber)
  
            }
                break;
            case 'View Parts & Equipment':{
                console.log("this.state.isItSubCategoryModelNo : "+JSON.stringify(this.state.isItSubCategoryModelNo) )
                console.log("partlist_productPage : "+JSON.stringify(this.state.partlist_productPage))
                if(this.state.isItSubCategoryModelNo){
                    this.props.navigator.push({
                        name:'Parts',
                        title:'Parts',
                        isHidden:false,
                        passProps: {
                            partsListSubCategory : (this.state.dataSource1)?  this.state.dataSource1 : [],
                            isItSubCategoryModelNo : this.state.isItSubCategoryModelNo
                        }
                    });
                }
                else{
                    this.props.navigator.push({
                        name:'Parts',
                        title:'Parts',
                        isHidden:false,
                        passProps: {partsList : (this.state.partlist_productPage && this.state.partlist_productPage.length>0)?  this.state.partlist_productPage : []}
                    });
                }

            }
                break;
            case 'Diagnose':
            {
                this.setState(
                    {titleProduct :title}
                );
                let activityIndicator = new ActivityIndicator();
                activityIndicator.startActivity();
                CallLiteratureInfoType(this,"Diagnose Literature",this.state.modelNumber,"Installation");

            }
                break;
            case 'Installation':
            {
                this.setState(
                    {titleProduct :title}
                );
                let activityIndicator = new ActivityIndicator();
                activityIndicator.startActivity();

                CallLiteratureInfoType(this,"Installation Literature",this.state.modelNumber,"Installation");

            }
                break;
            case 'Warranty': {
                if(this.state.isModalPressed){
                    this.props.navigator.push({
                        name:'Warranty',
                        title:'Warranty',
                        isHidden:false,
                        passProps: {partsList: (this.state.partlist_productPage && this.state.partlist_productPage.length>0)?  this.state.partlist_productPage : []}
                    });
                }
                else{
                    this.setState({addSerialNoModalOpen: true});
                }
            }
                break;
        }
    }

  

    onPressAddSerialNo() {
        let addedSerialNo = this.state.addedSerialNo;
        let errorAlertMsg =  "";
        let pattern = /[^a-zA-Z0-9]/;
        if(addedSerialNo === "" || pattern.test(addedSerialNo)){
            if(addedSerialNo === ""){
                errorAlertMsg = "Serial Number cannot be blank";
            }
            else if(pattern.test(addedSerialNo)){
                errorAlertMsg = "Please enter the valid Serial Number";
            }
            alert(errorAlertMsg);
        }
        else if(addedSerialNo && (addedSerialNo.length <6 || addedSerialNo.length >=14)){
            errorAlertMsg = "Please enter the valid Serial Number";
            alert(errorAlertMsg);
        }
        else if(addedSerialNo.length >=6 && addedSerialNo.length <=14){
            this.resetSerialNo(this.state.addedSerialNo);
        }
    }

    resetSerialNo(addedSerialNo){
        this.setState({addedSerialNo : ""});
        this.setState({addSerialNoModalOpen: false});
        this.setState({isModalPressed : !this.state.isModalPressed?true:false});
        Alert.alert(
            'Alert',
            "Serial Number is added successfully",
            [{ text: 'OK',
                onPress: () => {console.log("ok pressed")}
            }, ])
    }

    onSubmitClick(searchText){
        if(searchText !== "" && searchText){
            this.onPressAddSerialNo();
        }

    }

    handleKeyDown(e) {
        let addedSerialNo = this.state.addedSerialNo;
        if(e.nativeEvent.key == "Enter" && addedSerialNo === ""){
            console.log("Enter Key is pressed..");
            alert("Serial Number cannot be blank");
        }
    }


    handleAndroidKeyDown(e) {
        let addedSerialNo = this.state.addedSerialNo;
        if(e.nativeEvent.key == "Enter" && addedSerialNo === ""){
            console.log("Enter Key is pressed..");
            alert("Serial Number cannot be blank");
        }
    }
}

ProductPage.defaultProps = {
    addSerialNoModalOpen: false,
    addedSerialNo: "",
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        alignSelf : "stretch",
        paddingTop: 64,
    },
    headerContent:{
        flex: 2,
        alignSelf : "stretch",
        paddingLeft: 10,
        paddingRight: 10,
        minHeight: 200,
    },
    listNav: {
        flex: 8,
        alignSelf : "stretch",
        backgroundColor:'silver',
        backgroundColor: '#FFFFFF',
    },
    subordinateTxt:{
        color: "#429BE4",
        marginTop: 5,
        marginBottom: 5,
    },
    titleContainer: {
    },
    productDetailsContainer:{
        padding: 5,
        flex:2,
        justifyContent:'center',
        flexDirection: 'row',
        overflow:'hidden',

    },
    productImageContainer:{
        flex:2,
        justifyContent:'center',
        alignItems:'center',
        overflow:'hidden',
    },
    headerTextContainer:{
        paddingRight: 10,
        paddingTop:10,
        flex:2,
        justifyContent:'center',
        alignItems:'flex-start',
    },

    productImage: {
        resizeMode: (Platform.OS === 'ios' ? 'center' : 'center')
    },

    productDetails: {
    },
    rowView : {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        height: 80,
        backgroundColor: 'white'
    },
    textInputViewStyle: {
        shadowColor : "#808080",
        shadowOpacity : 1,
        shadowRadius : 3,
        shadowOffset : {width: 1, height: 1.0},
        borderWidth : 1,
        borderColor : "lightgray"
    },
    textInputStyle: {
        paddingTop : 8,
        paddingLeft : 10,
        paddingBottom : 7,
        borderColor : "black",
        height: 30,
        fontWeight: "100",
        color:"#000000",
        fontSize: 14,
        fontFamily: 'Droid Serif',
        fontWeight: 'normal',
        fontStyle: 'italic',
    },
    productText: {
        paddingLeft : 5,
        paddingRight : 5,
    },
    searchBtnStyle: {
        paddingRight: 50,
        paddingLeft: 50,
    },
    globalBtnTextViewStyle: {
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: 'Montserrat',
        fontSize: 14,
    },
    globalBtnStyle: {
        borderRadius: 30,
        backgroundColor: "#57a3e2",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        padding: 10,
        paddingRight: 50,
        paddingLeft: 50,
        marginTop: 15,
    },

});

export default ProductPage;
