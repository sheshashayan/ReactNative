//'use strict';

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
  Platform,
} from 'react-native';
import {globalStyles, deviceFinder} from "./globalStyles"; 
import ModalDropdown from 'react-native-modal-dropdown';
import LinearGradient from 'react-native-linear-gradient';
import CellView from "./CellView";  
import CustomisedListView from "./CrossReference";
import * as dataResource from './dataResource';
import * as stringConstant from '../constants/StringConstant';
import BackNavComponent from "./BackNavComponent";

const backNavText = stringConstant.carrierConstClass.PRODUCT_SUBCATEGORY_SEARCH_BACK_BUTTON;
class ProductCategoryList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      isItProdSubCategory : "SubCategoryList",
      dataSource : ds.cloneWithRows(dataResource.listItemData.Product_SubCategory_List),
      rightImage : require('../resources/images/Next.png'),
      leftImage : require('../resources/images/AlternativePart.png'),
      title : this.props.title,

    };
  }
  render() {
    return (
      <View style={styles.container}>        
        <View style = {[globalStyles.backNavBtnStyle]}>
          <TouchableOpacity onPress = { this.backToSubCategory }>
              <BackNavComponent  backNavText =  {backNavText} />                 
          </TouchableOpacity>     
        </View>  

        <View style={styles.titleContainer}>
                <Text style = {[globalStyles.titleText,{color : "#06273F"}]}>{this.state.title}</Text>
        </View>
        <View style={styles.listNav}>          
                   <ListView
                      scrollEnabled = { true }
                      dataSource={this.state.dataSource}
                      renderRow={(rowData,sectionId, rowId) => 
                        <View style={styles.rowView}>
                          <TouchableOpacity style={{flex:1}} onPress={() => this.productSubSubCategoryNav(rowData["id"])}>                           
                            <CellView
                              title={rowData["title"]}
                              subTitle={rowData["subTitle"]}
                              leftImage={this.state.leftImage}
                              rightImage={this.state.rightImage}
                              toBePopulatedOn = {this.state.isItProdSubCategory} />                                
                          </TouchableOpacity >  
                      </View>
                    } 
                  />
        </View>
      </View>
    );
  }

  productSubSubCategoryNav =(id) => {
    switch(id){      
      case 'wm0':
      {
        this.props.navigator.push({
        name:'ProductPage',
        title:'Product Page',
        isHidden:false ,
        passProps: {modelandPartData: {BomLine: {GetModelDataReplyBomLine: []}}, 
                      isItSubCategoryModelNo : true}
        });
      }
      break;
      case 'wm1':
      {
        this.props.navigator.push({
         name:'ProductPage',
         title:'Product Page',
          isHidden:false,
          passProps: {modelandPartData: {BomLine: {GetModelDataReplyBomLine: []}}, 
                      isItSubCategoryModelNo : true}
      
        });
      }
      break;            
    }
  }

  backToSubCategory = () => {
      this.props.navigator.pop();
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 64,
    flexDirection: 'column',
  },
  headerContent:{
    flex: 2,
    alignSelf : "stretch",
    paddingLeft: 10,
    paddingRight: 10,
  },
  listNav: {
    //flex: 1,
    flexDirection: 'column',
  },
  subordinateTxt:{
    color: "#429BE4",
    marginTop: 5,
    marginBottom: 5,
  },
  titleContainer: {
    //height:30,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom:10,
  },

  borderRadius: {
    backgroundColor: "yellow",
    padding: 20,
    minWidth: 320,
    minHeight: 60,
    margin: 10,
    borderRadius: 2,
    shadowColor: "rgb(52,21,23)",
    shadowOffset: {
        "width": 0.3,
        "height": 1.5
    },
    shadowOpacity: 0.32,
    shadowRadius: 2,        
  },
 rowView : {
    paddingTop: 5, 
    paddingBottom: 5, 
    paddingLeft: 10,
    paddingRight: 10,
    height: 80, 
    backgroundColor: 'white'
  },
  headerContent:{
    flex: 1,
    alignSelf : "stretch",
    paddingLeft: 10,
    paddingRight: 10,
  },
  subordinateTxt:{
    color: "#429BE4",
    marginTop: 5,
    marginBottom: 5,
  },
});

export default ProductCategoryList;
