import React, { Component } from 'react';
import * as dataResource from './dataResource';

import {
  ListView,
  Text,
  View,
  StyleSheet,
  AsyncStorage
  } from 'react-native';

import CellView from './CellView';

const CustomisedListView = (props) => {
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    var dataSource = null;

    var rightImage = null;
    var leftImage = null;


    if(props.fromWhichScreen === "CrossRef"){
      dataSource = ds.cloneWithRows(dataResource.listItemData.Cross_Reference);
      rightImage = props.rightImage;
    }
    else if(props.fromWhichScreen === "ProductCategory"){

      dataSource = ds.cloneWithRows(dataResource.listItemData.Product_Category);
      rightImage = props.rightImage;

    }
    else if(props.fromWhichScreen === "ProductCategoryItems"  ){
      dataSource = ds.cloneWithRows(dataResource.listItemData.Product_SubCategory);
      leftImage = props.leftImage;
      rightImage = props.rightImage;
    }
    else if(props.fromWhichScreen === "ProductSubCategoryList"){
      dataSource = ds.cloneWithRows(dataResource.listItemData.Product_SubCategory_List);
      leftImage = props.leftImage;
      rightImage = props.rightImage;    
    }
    else if(props.fromWhichScreen === "ProductCategoryDetails"){
      dataSource = ds.cloneWithRows(dataResource.listItemData.Product_SubCategory_Details);
      leftImage = props.leftImage;
      rightImage = props.rightImage;
    }
    else if(props.fromWhichScreen === "FilterBasesResults"){

      dataSource = ds.cloneWithRows(dataResource.listItemData.Filter_Bases_Results);
      rightImage = props.rightImage;
      leftImage = props.leftImage;


    }


    return (
     <ListView
        dataSource={dataSource}
        renderRow={(rowData) => 
          <View style={styles.rowView}>
            <CellView
              leftImage = {leftImage}
              title={rowData["title"]}
              modelNo = {rowData["modelNo"]}
              subTitle={rowData["subTitle"]}
              rightImage={rightImage} 
              toBePopulatedOn = {props.fromWhichScreen}/>
          </View>
        }/>
    );
 


}

var styles = StyleSheet.create({
  rowContentView: {
    flex: 1,
    shadowOffset:{
            width: 1,
            height: 1,
        },
        shadowColor: 'gray',
        shadowOpacity: 1.0,
        borderColor: 'lightgray',
        borderWidth: 1,
        backgroundColor: 'white',
  },

  rowView: {
    paddingTop: 5, 
    paddingBottom: 5, 
    paddingLeft: 10,
    paddingRight: 10,
    height: 80, 
    backgroundColor: 'white'
  }
});


export default CustomisedListView;