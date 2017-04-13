/*-------------------------------------------------------------------------------------------------
--- Name      : ProductCategoryReference
--- Author    : Ravichandran P
--- Date      : 03/20/2017
--- Purpose   : To Display the product categories which fetched from - CallCategory/ JSON Web Service 
-------------------------------------------------------------------------------------------------*/
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
  } from 'react-native';

import CellView from "./CellView";  
import * as dataResource from './dataResource';
import * as stringConstant from '../constants/StringConstant';
import BackNavComponent from "./BackNavComponent";
import {globalStyles, deviceFinder} from "./globalStyles"; 
import ActivityIndicator from "./ActivityIndicator";

const backNavText = stringConstant.carrierConstClass.PRODUCT_CATEGORY_SEARCH_BACK_BUTTON;

class ProductCategoryReference extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        isItProdCategory : "ProductCategory",
        rightImage : require('../resources/images/Next.png'),
        dataSource : ds.cloneWithRows(this.props.CategoryData),        
    };
  }

 componentDidMount() {
   //Close Indicator started from web service
      let activityIndicator = new ActivityIndicator();
      activityIndicator.stopActivity();
  }
  render() {
    return (
      <View style = {styles.container}>      	
        <View style = {[globalStyles.backNavBtnStyle]}>
          <TouchableOpacity style = {[]}  onPress = { this.backToMainSearch }>
              <BackNavComponent  backNavText =  {backNavText} />                               
          </TouchableOpacity>     
        </View>  
      	<View style = {{ backgroundColor : "#F6F6F6", flex : 8, alignSelf : "stretch"}} >
          <View style = {{paddingTop: 10}}>
             <ListView
                    scrollEnabled = { true }
                    dataSource={this.state.dataSource}
                    renderRow={(rowData,sectionId, rowId) => 
                      <View style={styles.rowView}>
                        <TouchableOpacity style={{flex:1}} onPress={() => this.productCategoryNav(rowData)}>                         
                          <CellView
                            title={rowData["name"]}
                            rightImage={this.state.rightImage} />                              
                        </TouchableOpacity >  
                      </View> } 
                  />                   
            </View> 
      	</View>
      </View>
    );
  }

  backToMainSearch = () => {
      this.props.navigator.pop();
  }
  
  productCategoryNav =(rowData) => {
    
    console.log(rowData)
    var lSubCategoryPresent = false;
    var lSubCategoryData = [];
    if(rowData.subcategories){
        lSubCategoryPresent = true;
        lSubCategoryData = rowData.subcategories;
    }

   
    this.props.navigator.push({
         name:'ProductCategory',
          title:'Search By Product Category',
          isHidden:false,
          passProps : {title: rowData.name, SubCategoryData: lSubCategoryData,SubCategoryFlag: lSubCategoryPresent}      
        });      
  }
}
const styles = StyleSheet.create({
	container : {
	flex : 1,
	flexDirection : "column",
	justifyContent : "flex-start",
	backgroundColor : "#F6F6F6",
  paddingTop: 64,
	},
  navBackImage : {
    width : 30,
    height : 30,
  },
  rowView: {
    paddingTop: 5, 
    paddingBottom: 5, 
    paddingLeft: 10,
    paddingRight: 10,
    height: 80, 
    backgroundColor: 'white'
  },


});


export default ProductCategoryReference;



