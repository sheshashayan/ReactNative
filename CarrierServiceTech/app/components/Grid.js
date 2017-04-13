/**
 * # Grid.js
 * This component will render the list of literature items in Grid view 
 * Author: Ajit 
 */
import React, { Component } from 'react';
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
  Dimensions,
  } from 'react-native';

const { width, height } = Dimensions.get('window');

class Grid extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2','row3','row4',
                                    'row5','row6','row7','row8'])};
  }
  render() {
    return (
      <View style={{flex:1}}>
        <Text style={styles.titleText}>Most Popular</Text>
          <ListView contentContainerStyle={styles.list} 
            dataSource={this.state.dataSource} renderRow={this.renderRowsInGrid}/>
      </View>);          
  }

  /**
  * # renderRowsInGrid
  * Purpose: This function will be invoked to render the list of literature items
  * Author: Ajit
  * Input Param: rowData
  * Output Param: 
  */
  renderRowsInGrid= (rowData) =>{
    return (<View style={{width:(width)/2, height:200, backgroundColor:'white', flexDirection: 'row', marginTop:20, marginBottom:20}}>
      <View style={{flex:0.5, backgroundColor:'white'}}>
        <Text style={{flex:1}}></Text>
      </View>
      <View style={{flex:1}}>
        <Image
            style={{flex:10}}
            source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}} />             
        <Text style={{flex:1, textAlign: 'center'}}>{rowData}</Text>
      </View>
      <View style={{flex:0.5, backgroundColor:'white'}}>
        <Text style={{flex:1}}></Text>
      </View>
    </View>)
  }
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    backgroundColor: 'red',
    margin: 3,
    width: 100,
  },
  titleText: {
    fontSize: 16,
    marginTop: 64,
    marginLeft:18,
    color:'#213450',
    fontFamily: 'Montserrat-Regular',
  },
});

export default Grid;
