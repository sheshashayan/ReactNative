import React, { Component } from 'react';
import listItemData from './dataResource';

import {
  ListView,
  Text,
  View,
  StyleSheet,
  AsyncStorage
  } from 'react-native';

import CellView from './CellView';

class CustomCrossRefResultsListView extends Component {
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(listItemData.Filter_Bases),
    };
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => 
          <View style={styles.rowView}>
            <CellView
              title={rowData["title"]}
              subTitle={rowData["subTitle"]}
              rightImage={require('../resources/images/More.png')}
              isProductCrossRef = {true}
              isProductCrossResult = {true} />
          </View>
        }/> 
    );
  }
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


export default CustomCrossRefResultsListView;