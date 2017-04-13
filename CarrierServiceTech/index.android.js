/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import LoginTypes from "./app/components/LoginTypes";
import Splash from "./app/components/Splash";
import HvacPartnersLogin from "./app/components/HvacPartnersLogin";
import GuestSignup from "./app/components/GuestSignup";
import Router from "./app/components/Router";
import CustomisedPopup from "./app/components/CustomisedPopup";
import ProductCrossReference from "./app/components/ProductCrossReference";
import FilterBasesResults from "./app/components/FilterBasesResults";
import FilterBases from "./app/components/FilterBases";
import ProductPage from "./app/components/ProductPage";
import ProductCategoryReference from "./app/components/ProductCategoryReference";
import MainSearchView from "./app/components/MainSearchView";
import CellView from "./app/components/CellView";
import ProductCategory from "./app/components/ProductCategory";
import ProductCategoryList from "./app/components/ProductCategoryList";
import ChangeCurrentStore from "./app/components/ChangeCurrentStore";
import PartsandJobs from "./app/components/PartsandJobs";

import Warranty from "./app/components/Warranty";
import WarrantyDetails from "./app/components/WarrantyDetails";
import ServiceHistory from "./app/components/ServiceHistory";
import ServiceContracts from "./app/components/ServiceContracts";


export default class CarrierServiceTech extends Component {
  render() {
    return (
      <View style = {styles.container}>
        {/*<Splash /> */}
        
        {/*<LoginTypes />*/}

        {/*<HvacPartnersLogin />*/}

        {/*<GuestSignup />*/}

        {/*<CustomisedPopup />*/}

        {/*<MainSearchView />*/}

        {/*<FilterBasesResults />*/}

        {/*<FilterBases />*/}
        
        {/*<ProductCrossReference />*/}

        {/*<ProductCategoryList />*/}

        {/*<ProductCategoryReference />*/}

        {/*<ProductCategoryNewConstruction />*/}     

        {/*<Router />*/}

        {/*<ProductCategory />*/}

        {/*<Warranty />*/}
        
        {/*<WarrantyDetails />*/}

        {/*<ServiceHistory />*/}

        {/*<ServiceContracts />*/}

        {/*<PrivacyPolicy />*/}

        {/*<EndUserLicense />*/}     

        {/*<PrivacyPolicy />*/}

        {/*<Router />*/}

        <Router />




      </View>


    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  
}); 

AppRegistry.registerComponent('CarrierServiceTech', () => CarrierServiceTech);
