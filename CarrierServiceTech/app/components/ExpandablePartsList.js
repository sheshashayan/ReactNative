import React, { Component } from 'react';

import * as dataResource from './dataResource';
import {listItemData} from './dataResource';
import CellView from './CellView';
import {globalStyles} from "./globalStyles"; 
import renderIf from './renderif';
import LinearGradient from 'react-native-linear-gradient';

import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Animated,
  PropTypes,
  Image,
  Dimensions,
  Platform,
  TouchableHighlight,
  MapView,
  ListView,
  ScrollView,
} from 'react-native';


const { width, height } = Dimensions.get('window');

class ExpandablePartsList extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    console.log('ds', ds)
    this.state ={
      dataSource : ds.cloneWithRows(dataResource.Items_Parts_List),
      //dataSource: ds.cloneWithRows(['row 1', 'row 2']),
      mapaddressViewHeight:'',
      searchViewHeight:0,
      addressCallViewHeight:0,
      isExpandable:false,
      isItExpanded : false,    
      jobId: "",
    }
    
  }

  
  onPressDeleteParts(){
    alert('onPressDeleteParts : ');
  }

  componentWillMount(){
    this.jobsPartsList = listItemData.Items_Parts_List;
    this.newArrayObj = this.partsList(listItemData.Items_Parts_List); 
  }

  render() {
    let i=1;
    const SECTIONS = this.state.dataSource;
    console.log('section', SECTIONS);  
    //let newArrayObj = this.newArrayObj ;
    let expandedView = "";

    return (
      <View style={styles.container}>        
        {/*<View style={styles.partsSellersList}>*/}
        {/*<ScrollView
            scrollEnabled = { true }
            dataSource={this.state.dataSource}
            renderRow={(rowData) =>         
                 rowData.part? rowData.part.map(function(row) {
                        <View style={[globalStyles.rowView,styles.partDetails]}>
                            <View style={[styles.partDetailsLeft,]}>
                              <Text style={[globalStyles.headerTxt2,styles.innerItemPartsTitle]}>{row.title}</Text>
                                <View style={[globalStyles.rowView,styles.partDetailsRight]}>
                                  <Text style={[globalStyles.headerTxt4,styles.innerItemParts,styles.innerItemPartsLeft]}>{row.float}</Text>
                                  <Text style={[globalStyles.headerTxt4,styles.innerItemParts]}>{row.partno}</Text>
                                </View>
                            </View>
                            <TouchableHighlight
                              onPress={this.onPressDeleteParts}
                              style={[{backgroundColor:'yellow',width: 30,height: 30,}]}>
                              <View style={styles.bb}>
                                <Text style={styles.bbb}>
                                  &#10005;
                                </Text>
                              </View>
                            </TouchableHighlight>
                          </View>
                  }) : (<Text style={[]}></Text>)
            }/>*/}

          
        {/*</View>*/}
      </View>
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignSelf : "stretch"
  },
  headerContent:{
    paddingLeft: 10,
    paddingRight: 10,
  },
  jobPartsContainer: {

  },
  partsSellersList: {
    flex: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 30,

  },
  itemsContainer: {
    // backgroundColor:'yellow',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  itemPartsList:{
    backgroundColor:'#CACACA',
    shadowColor : "#808080",
    shadowOpacity : 1,
    shadowRadius : 3,
    shadowOffset : {width: 1, height: 1.0},
    flexDirection:'row',
    padding: 10,
    justifyContent:'space-between',
    borderRadius: 4,
  },
  itemPartsListLeft: {
    alignItems:'flex-start',
    flexDirection:'row',
    justifyContent:'center',
  },
  removeJobContainer: {
    justifyContent:'center',
    alignItems:'flex-start',
  },
  itemPartsListRight: {
    alignItems:'flex-end',
    justifyContent:'center',
  },
  removeJobButton: {
    //backgroundColor:'yellow',
  },
  removeJobIcon: {
    justifyContent:'center',
    alignItems:'center',
    fontSize: 25, 
    fontWeight: 'bold'
  },
  removePartIcon: {
    fontSize: 20, 
    fontWeight: 'bold'
  },
  itemPartsTitleContainer: {
    justifyContent:'center',
  },
  itemPartsTitle:{
    fontWeight: 'normal',

  },
  innerItemPartsTitle: {
    fontWeight: 'normal',
  },
  partDetails: {
    justifyContent:'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#CACACA',
  },
  partDetailsLeft: {
    justifyContent:'flex-start',
  },
  partDetailsRight: {
    justifyContent:'flex-end',
  },
  innerItemParts: {
    color: '#CACACA',
  },
  innerItemPartsLeft: {
    paddingRight: 60,
  },
  mapaddressView :{
    flex: 4,
    alignSelf: 'stretch',
    alignItems: 'stretch',
    flexDirection: 'column',
    paddingLeft: 5,
    paddingRight: 5,
  },
  addressCall: {
    justifyContent: 'space-between',
    flexDirection:'row',
    paddingTop: 10,
    paddingBottom: 10,   
    paddingLeft: 5,
    paddingRight: 5, 
  },
  address :{
    justifyContent: 'flex-start',
  },
  call: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    flexDirection:'row',
    justifyContent:'center',
    textAlign:'center',
  },
  change: {
    position: 'relative',
    top: 3,
  },
  mapContainer: {
    position:'relative',
  },
  titleLink: {
    flexDirection:'row',
  },
  addressTitle: {
    
  },
  addressText: {
    color:'#CACACA',
    fontWeight:'normal',
  },
  linkText: {
    textAlign: 'center',
  },
  callToOrder: {
    justifyContent:'center',
    textAlign:'center',
  },

  callTo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    height: 30,
    backgroundColor:'#429be4',
    borderRadius: 30/2,
  },
  anotherStore:{
    borderRadius: 40,
    justifyContent:'center',
    width: 240,
    left: width/2-120,
    position:'absolute',
    bottom: 10,
  },
  buttonGradient: {
    borderRadius: 40,
  },
  buttonText: {
    color: '#ffffff',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    textAlign:'center',
    
  },
  accordionBtn: {
    width: 30,
    height: 30,
    //backgroundColor:'yellow',
  },
  accordionBtn: {
    fontSize: 30,
  },
  show : {
    backgroundColor :'yellow',
  }
});
export default ExpandablePartsList;