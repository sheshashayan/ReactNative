import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    Navigator,
    TouchableOpacity,
    Image,
    StatusBar,
    View,
    LayoutAnimation,
    Dimensions,
    Platform,
    BackAndroid,
    AsyncStorage
} from 'react-native';

import LoginTypes from "./LoginTypes";
import Splash from "./Splash";
import GuestSignup from "./GuestSignup";
import HvacPartnersLogin from "./HvacPartnersLogin";
import CustomisedPopup from "./CustomisedPopup";
import CrossReference from "./CrossReference";
import MainSearchView from "./MainSearchView";
import ProductCategoryList from "./ProductCategoryList";
import ProductCategory from "./ProductCategory";
import ProductPage from "./ProductPage";
import ProductCategoryReference from "./ProductCategoryReference";
import ProductCrossReference from "./ProductCrossReference";
import NavBar from "./CustomNavBar";
import {globalStyles, deviceFinder} from "./globalStyles";
import SideMenu from "./SideMenu";
import FilterBases from "./FilterBases";
import FilterBasesResults from "./FilterBasesResults";
import SearchLiterature from "./SearchLiterature";
import GlobalLiterature from './GlobalLiterature';
import GlobalLiteratureFilters from './GlobalLiteratureFilters';
import CallHvacLogin from './ModServices'
import AlternativeParts from '../containers/AlternativeParts'
import Parts from '../containers/Parts'
import PartsandJobs from './PartsandJobs';
import PartsAndJobsList from './PartsAndJobsList';

import ServiceContracts from './ServiceContracts';
import ServiceHistory from './ServiceHistory'
import Warranty from './Warranty';
import WarrantyDetails from './WarrantyDetails';
import PrivacyPolicy from "./PrivacyPolicy";
import EndUserLicense from "./EndUserLicense";
import ActivityIndicator from "./ActivityIndicator";
import ChangeCurrentStore from "./ChangeCurrentStore";
import LiteratureWebView  from  "./LiteratureWebView";

import ProductSemihermetic from "./ProductSemihermetic";
import ProductAfterMarketMotor from "./ProductAfterMarketMotor";
import ProductFilterDriers from "./ProductFilterDriers";
import ProductHermetic from "./ProductHermetic";
import ProductThermostat from "./ProductThermostat";

import LegalInfo from "./LegalInfo";
import Diagnose from "./Diagnose";
import Installation from "./Installation";
import AllLiterature from "./AllLiterature";

import Icon from 'react-native-vector-icons/FontAwesome';

const hamberger = (<Icon name="reorder" size={25} color="#ffffff" />)
const sideMenuWdth = 50
let headerTitleLeftMargin = Navigator.NavigationBar.Styles.Stages.Left.Title.marginLeft || 0

export default class Router extends Component {
    constructor(props) {
        super(props);
        this.navigator = null;
        this.state = { isMenuOPened: true };
        this.sideMenuAction = this.sideMenuAction.bind(this);
        this.handleBack = this.handleBack.bind(this)
        this.initialRootUpdate = this.initialRootUpdate.bind(this);

    }

    componentWillMount() {
        // Animate creation
        LayoutAnimation.easeInEaseOut();
        this.initialRootUpdate()

    }

    componentDidMount() {

        //Register the Andoid device back button listner
        BackAndroid.addEventListener('hardwareBackPress', this.handleBack);
    }
    handleBack() {

        // Check if ActivityIndicator is started because of web service, ignore back event

        let activityIndicator = new ActivityIndicator();

        if(activityIndicator.isActivityStarted()){
            return true;
        }

        // Check if side menu is opened, close on back event
        if(!this.state.isMenuOPened){
            this.sideMenuAction();
            return true;
        }

        if(this.navigator && this.navigator.state){
            const currentRoutes = this.navigator.state.routeStack;
            var currViewName = currentRoutes[currentRoutes.length-1].name;
            if(currViewName === 'LoginTypes' || 
                currViewName === 'PrivacyPolicy' ||
                currViewName === 'EndUserLicense'){
                // Close app if app is in first screen
                return BackAndroid.exitApp();
            }
            else if(currentRoutes.length > 1 && currViewName !== 'HvacPartnersLogin'){
                // Pop the screen in other cases
                this.navigator.pop();
            }
        }

        return true;
    }
    sideMenuAction() {
        // Animate the update
        LayoutAnimation.easeInEaseOut();
        this.setState({isMenuOPened: this.state.isMenuOPened?false:true})
    }

    sideMenuAction1(route) {
        // Animate the update
        alert(route.passProps.LogOutText)
        this.setState({LogOutText: route.passProps.LogOutText})
    }

    /*    Author: Rakesh
     Objective: Setting initial root based policy acceptance criteria
     */
    initialRootUpdate = () =>{
        AsyncStorage.getItem('isEULAAcceptedKey').then((value) => {
            if(value === '"isEULAAcceptedValue"')
            {
                this.navigator.replace({
                    name:'LoginTypes',
                    title:'Login Types',
                    isHidden:true
                });
            }else{

                this.navigator.replace({
                    name:'PrivacyPolicy',
                    title:'Privacy Policy',
                    isHidden:true
                });
            }

        }).done()
    }


    render() {
        return (
            <View style={{flex:1}}>
                <StatusBar
                    backgroundColor="#06273F"
                    barStyle="light-content"
                />
                <Navigator
                    initialRoute = {{
                        name:"" ,
                        title: 'Carrier Service Tech',
                        isHidden:true
                    }}

                    renderScene = { this.renderScene }

                    ref={navigator => {this.navigator = navigator}}
                    navigationBar={
                        <NavBar
                            navigationStyles={Navigator.NavigationBar.StylesIOS}
                            routeMapper={{
                                LeftButton: (route, navigator, index, navState) =>
                                {
                                    return (
                                        <TouchableOpacity onPress= {this.sideMenuAction} style={styles.sideMenuContainer}>
                                            {hamberger}
                                        </TouchableOpacity>
                                    );
                                },
                                RightButton: (route, navigator, index, navState) =>
                                {
                                    return (<Text style={styles.sideMenuRightContainer}></Text>);
                                },
                                Title: (route, navigator, index, navState) =>
                                {
                                    return (
                                        <View style={styles.navHeaderTitleContainer}>
                                            <Text style={[globalStyles.headerTxt3,{color:"#F6F6F6"}]}>
                                                {route.title}
                                            </Text>
                                        </View>
                                    );
                                },
                            }}
                            style={{backgroundColor:'#06273F',flex:1}}
                        />
                    }
                />
                <SideMenu
                    style={[styles.sideMenuView, {width: this.state.isMenuOPened?0:Dimensions.get('window').width, height:Dimensions.get('window').height}]}
                    width={this.state.isMenuOPened}
                    isMenuOPened={this.state.isMenuOPened}
                    sideMenuAction={this.sideMenuAction}
                    navigator={this.navigator}
                />
                <ActivityIndicator />
            </View>
        );
    }


    renderScene(route, navigator) {

        if(route.name == 'PrivacyPolicy') {
            return (
                <PrivacyPolicy
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }

        if(route.name == 'EndUserLicense') {
            return (
                <EndUserLicense
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }

        if(route.name == 'LoginTypes') {
            return (
                <LoginTypes
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }

        if(route.name == 'GuestSignup') {
            return (
                <GuestSignup
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }


        if(route.name == 'HvacPartnersLogin') {
            return (
                <HvacPartnersLogin
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }


        if(route.name == 'CustomisedPopup') {
            return (
                <CustomisedPopup
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }

        if(route.name == 'MainSearchView') {
            return (
                <MainSearchView
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }

        /*if(route.name == 'ProductCategoryListView') {
         return (
         <ProductCategoryList
         navigator = {navigator}
         {...route.passProps} />
         );
         }*/

        if(route.name == 'ProductCategoryReference') {
            return (
                <ProductCategoryReference
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }

        if(route.name == 'ProductCrossReference') {
            return (
                <ProductCrossReference
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }

        if(route.name == 'FilterBases') {
            return (
                <FilterBases
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }

        if(route.name == 'ProductSemihermetic') {
            return (
                <ProductSemihermetic
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }




        if(route.name == 'ProductHermetic') {
            return (
                <ProductHermetic
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }
        if(route.name == 'ProductThermostat') {
            return (
                <ProductThermostat
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }




        if(route.name == 'ProductAfterMarketMotor') {
            return (
                <ProductAfterMarketMotor
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }

        if(route.name == 'ProductFilterDriers') {
            return (
                <ProductFilterDriers
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }

        if(route.name == 'ProductCategoryList') {
            return (
                <ProductCategoryList
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }

        if(route.name == 'ProductCategory') {
            return (
                <ProductCategory
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }

        if(route.name == 'FilterBasesResults') {
            return (
                <FilterBasesResults
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }

        if(route.name == 'ProductPage') {
            return (
                <ProductPage
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }

        if(route.name == 'PartsandJobs') {
            return (
                <PartsandJobs
                    navigator = {navigator}
                    jobsList = {route.jobsList}
                    {...route.passProps} />
            );
        }
        if(route.name == 'ChangeCurrentStore') {
            return (
                <ChangeCurrentStore
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }
        if(route.name == 'SearchLiterature') {
            return (
                <SearchLiterature
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }
        if(route.name == 'GlobalLiterature') {
            return (
                <GlobalLiterature
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }
        if(route.name == 'GlobalLiteratureFilters') {
            return (
                <GlobalLiteratureFilters
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }

        if(route.name == 'LiteratureWebView') {
            return (
                <LiteratureWebView
                    navigator={navigator}
                    {...route.passProps} />
            );
        }
        if(route.name == 'AlternativeParts') {
            return (
                <AlternativeParts
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }
        if(route.name == 'Parts') {
            return (
                <Parts
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }
        if(route.name == 'Warranty') {
            return (
                <Warranty
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }
        if(route.name == 'WarrantyDetails') {
            return (
                <WarrantyDetails
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }
        if(route.name == 'ServiceContracts') {
            return (
                <ServiceContracts
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }
        if(route.name == 'ServiceHistory') {
            return (
                <ServiceHistory
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }

        if(route.name == 'Diagnose') {
            return (
                <Diagnose
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }
        if(route.name == 'Installation') {
            return (
                <Installation
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }
        if(route.name == 'AllLiterature') {
            return (
                <Installation
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }
        if(route.name == 'PrivacyPolicy') {
            return (
                <PrivacyPolicy
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }
        if(route.name == 'EndUserLicense') {
            return (
                <EndUserLicense
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }
        if(route.name == 'LegalInfo') {
            return (
                <LegalInfo
                    navigator = {navigator}
                    {...route.passProps} />
            );
        }





    }

}

var styles = StyleSheet.create({
    navHeaderTitleContainer:{
        flex:1,
        marginTop:(Platform.OS === 'ios' ? 0 : 2),
        alignItems: 'center',
        justifyContent:(Platform.OS === 'ios' ? 'center' : null),
    },
    leftImage: {
        marginLeft: 15
    },
    sideMenuView: {
        position: 'absolute',
        width: 100,
        top: 0,
        left: 0,
        backgroundColor: 'transparent',
    },
    sideMenuContainer : {
        width:sideMenuWdth,
        flex:1,
        alignItems: 'center',
        justifyContent:(Platform.OS === 'ios' ? 'center' : null),
    },
    sideMenuRightContainer:{
        color:'#ffffff',
        paddingTop: 15,
        paddingRight: 10,
    }
}); 


   