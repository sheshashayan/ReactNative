/**
 * # ProductCrossReference.js
 * This class is used to show the list of product typh for cross reference
 * Author: Ravichandran P
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Image,
  ListView,
  TouchableOpacity,
  StatusBar,
  Alert, 
  ScrollView
  } from 'react-native';

import CellView from "./CellView";  
import CustomisedListView from "./CrossReference";
import * as dataResource from './dataResource';
import * as stringConstant from '../constants/StringConstant';
import BackNavComponent from "./BackNavComponent";
import {globalStyles, deviceFinder} from "./globalStyles"; 

const backNavText = stringConstant.carrierConstClass.CROSS_REFERENCE_BACK_BUTTON;
const partsCrossReferenceHeader = stringConstant.carrierConstClass.PARTS_CROSS_REFERENCE_HEADER;

class ProductCrossReference extends Component {

  constructor(props) {
    super(props);   
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        isItCrossRef : "CrossRef",        
        dataSource : ds.cloneWithRows(dataResource.listItemData.Cross_Reference),
        rightImage : require('../resources/images/Next.png'),
        leftImage  : "", 
    };
  }

  render() {
    return (
      <View style = {styles.container}>
          <View style = {[globalStyles.backNavBtnStyle]}>
            <TouchableOpacity onPress = { this.backToMainSearch }  >
                <BackNavComponent 
                    backNavText =  {backNavText} />
             </TouchableOpacity>     
          </View> 
          <View style = {[styles.headerTxtView]}>             
              <Text style = {[styles.partsCrossRefTxt]}>{partsCrossReferenceHeader}</Text>
          </View>
          <View style = {[styles.listViewFlexCntr]} >
            <View style = {{paddingTop: 10}}>
                <ListView
                    scrollEnabled = { true }
                    dataSource={this.state.dataSource}
                    renderRow={(rowData,sectionId, rowId) => 
                      <View style={styles.rowView}>
                          <TouchableOpacity style={{flex:1}} onPress={() => this.productCrossRefNav(rowData["title"])}>                         
                            <CellView
                              title={rowData["title"]}
                              subTitle={rowData["subTitle"]}
                              leftImage={rowData["leftImage"]}
                              rightImage={this.state.rightImage} />       
                          </TouchableOpacity >  
                      </View>    
                  } />
            </View>      
          </View>
      </View>
    );
  }

  /**
  * # productCrossRefNav
  * Purpose: This function is used to do the navigation from Cross Reference to Filter Bases screen
  * Author: Ravichandran P
  * Input Param: title
  * Output Param: 
  */
  productCrossRefNav =(title) => {    
    switch(title){      
      case 'Filter Bases':{
        this.props.navigator.push({
          name:'FilterBases',
          title:'Filter Bases',
          // passProps: {
          //   pushEvent : rowData,
          // },
          isHidden:false      
          });
        }
      break;

    case 'Semi-Hermetic Compressors': {
        this.props.navigator.push({
            name: 'ProductSemihermetic',
            title: 'Semi-Hermetic Compressors',
            isHidden: false
        });
    }
    break;

    case 'Aftermarket motors': {
        this.props.navigator.push({
            name: 'ProductAfterMarketMotor',
            title: 'Aftermarket motors',
            isHidden: false
        });
    }
    break;

    case 'Filter Driers': {
        this.props.navigator.push({
            name: 'ProductFilterDriers',
            title: 'Filter Driers',
            isHidden: false
        });
    }
    break;
    case 'Hermetic Compressors': {
        this.props.navigator.push({
            name: 'ProductHermetic',
            title: 'Hermetic Compressors',
            isHidden: false
        });
    }
    break;

    case 'Thermostats': {
        this.props.navigator.push({
            name: 'ProductThermostat',
            title: 'Thermostats',
            isHidden: false
        });
    }
    break;
    }
  }

  /**
  * # backToMainSearch
  * Purpose: This function is used to do the backward navigation from Cross Reference screen
  * Author: Ravichandran P
  * Input Param: 
  * Output Param: 
  */
  backToMainSearch = () => {
    this.props.navigator.pop();
  }

}

const styles = StyleSheet.create({
  
  container: {
    flex : 1,
    flexDirection : "column",
    justifyContent : "flex-start",
    alignItems: 'flex-start',
    backgroundColor : "#F6F6F6",
    paddingTop: 64, 
  },  
  navBackImage: {
    width : 10,
    height : 10,
  },
  rowView: {
    paddingTop: 5, 
    paddingBottom: 5, 
    paddingLeft: 10,
    paddingRight: 10,
    height: 80, 
    backgroundColor: 'white'
  },
  headerTxtView: { 
    backgroundColor: "#F6F6F6", 
    paddingTop: 15, 
    justifyContent: "flex-start",
    alignItems: "flex-start",
   },
  partsCrossRefTxt: {
      alignSelf: "flex-start",
      marginLeft: 15, 
      color: "#6A6A6A", 
      fontFamily: "Droid Serif", 
      fontStyle: 'italic', 
      fontWeight: '100', 
      fontSize: 12
  },
  listViewFlexCntr: { 
    backgroundColor: "#F6F6F6",
    flex: 1,
    alignSelf: "stretch"
    },  

});

export default ProductCrossReference;