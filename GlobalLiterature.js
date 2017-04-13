  import React, { Component } from 'react';
  import { StyleSheet, View, Button, Alert, AppRegistry,Text, TextInput, ListView, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
  import GridLiterature from './GridLiterature';
  import LinearGradient from 'react-native-linear-gradient';
  import {globalStyles, deviceFinder} from "./globalStyles"; 
  import CellView from "./CellView";  
  import * as dataResource from './dataResource';

  class GlobalLiterature extends Component {
    constructor(props)
    {
      super(props);
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = { dataSource: ds.cloneWithRows(['row 1', 'row 2','row 3','row 4','row 5','row 6','row 7','row 8']),
      testData : ['row 1', 'row 2','row 3','row 4','row 5','row 6','row 7','row 8'], 
      isSalesSelected:true, isTechnicalSelected:false, borderWidthFirst:0, borderWidthSecond: 1,colorFirst:'white',colorSecond:'black',touchableText:'Sales',
      dataSource : ds.cloneWithRows(dataResource.listItemData.Literature_Category),


        rightImage : require('../resources/images/Next.png'),
    };
    this._onPress = this._onPress.bind(this);
  }
  LoginAsHvacPartner = () => {

    //alert("login as HVAC...");
    // body...

    this.props.navigator.push({
            name: 'GlobalLiteratureFilters',
            title: 'Literature',
            isHidden:false
          }); 
          /*
          this.props.navigator.push(
          {
          name:'GlobalLiterature',
          title:'Literature',
          isHidden:false
          } );
          */

    }
  _onPress(props) {
    this.setState({
      colorFirst:this.state.isSalesSelected?'#06273F':"white",
      colorSecond:this.state.isSalesSelected?'white':"#06273F",
      borderWidthFirst:this.state.isSalesSelected?1:0 ,
      borderWidthSecond:this.state.isSalesSelected?0:1 ,
      isSalesSelected:this.state.isSalesSelected?false:true ,
      isTechnicalSelected:this.state.isTechnicalSelected?false:true ,
      touchableText:this.state.isSalesSelected?'Sales':"Technical",

    })

  }
  render(props) {
    return (
    <View style={{flex:1,backgroundColor: '#F6F6F6', flexDirection: 'column'}}>
      <View style={{flex:3}}>
        <View style={[styles.container,  {justifyContent: 'flex-start',alignItems: 'flex-end'}]}>
          <Text style={styles.titleText}>Search Literature</Text>
          </View>
          <View style={{flex:2,flexDirection: 'row'}}>
            <View style={{flex:1, height: 90}}>
              <TouchableHighlight style={{flex:1, justifyContent: 'center',alignItems: 'center',marginTop: 25,marginLeft:25,marginBottom: 25,backgroundColor:isSalesSelected=this.state.isSalesSelected?'#429BE4':"#FFFFFF", borderWidth:this.state.borderWidthFirst, borderColor: 'grey'}}
              underlayColor={this.state.isSalesSelected?'#429BE4':"#FFFFFF"}onPress={this._onPress}>
              <Text style={[globalStyles.headerTxt4,styles.BtnDualText,{color:this.state.colorFirst},]} >Sales</Text>
              </TouchableHighlight>
              </View>
              <View style={{flex:1, height: 90}}>
                <TouchableHighlight style={{flex:1, justifyContent: 'center',alignItems: 'center', marginTop: 25,
                  marginRight:25,marginBottom: 25,backgroundColor:this.state.isTechnicalSelected?'#429BE4':"#FFFFFF",borderWidth:this.state.borderWidthSecond, borderColor: 'grey', height: 40}}
                  color={this.state.isSalesSelected?'#FFFFFF':"#5B6A79"}underlayColor={this.state.isTechnicalSelected?'#429BE4':"#FFFFFF"} onPress={this._onPress}>
                  <Text style={[globalStyles.headerTxt4,styles.BtnDualText,{color:this.state.colorSecond},]} >Technical</Text>
                  </TouchableHighlight>
</View>

      
      </View>
    
      </View>
      <View style={[{flex:7,backgroundColor: '#F6F6F6'}]}>

        <View style = {[styles.textInputViewStyle]}>

        <TextInput
          style={[styles.textInputStyle,{height: 40, fontSize:16, fontStyle: 'italic',}]}
          placeholder="  Search by Model # or keyword"
          underlineColorAndroid='transparent'
          autoCorrect={false}
          
          placeholderTextColor='#D3D3D3'/>
        </View>
      

      <View style={styles.searchBtnContainer}>
        {/*<TouchableHighlight onPress={this._onPressSearchBtn}> */}
          <TouchableHighlight style={[globalStyles.globalBtnStyle, styles.globalBtnStyle]} onPress =  {this.LoginAsHvacPartner}>
                <LinearGradient
                      start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                      locations={[0,0.5,1]}
                      colors={['#57A3E3', '#56A6D1', '#57A3E3']}
                      underlayColor={['#4582B5', '#498FB5', '#4582B5']}
                      
                      style={[{borderRadius: 40}]}>
                      <Text style={[styles.globalBtnTextViewStyle]}>
                        Search
                      </Text>
                    </LinearGradient>
                </TouchableHighlight>
                </View>

                <View style={styles.listNav}>
                  <Text style={styles.titleTexts}>Most Popular</Text>

                    <ListView
                        scrollEnabled = { true }
                        backgroundColor= '#F6F6F6'
                        dataSource={this.state.dataSource}
                        renderRow={(rowData,sectionId, rowId) => 
                          <View style={styles.rowView}>
                            <TouchableOpacity style={{flex:1}}>
                            
                              <CellView
                                title={rowData["title"]}
                                subTitle={rowData["subTitle"]}
                                leftImage={this.state.leftImage}
                                rightImage={this.state.rightImage} />
                                  
                            </TouchableOpacity >  
                        </View>
                      } 
                    />
      </View>    
    </View>
    </View>
  );
  }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 2,
      flexDirection: 'row',
      alignItems: 'flex-start',

    },
    buttonContainerLeft: {
      flex:1,
      marginTop: 97,
      shadowColor: '#000000',
      height:40,
      fontSize:14,
      fontFamily: 'Montserrat-Regular',
      marginLeft: 20,
      width: 50,

    },
    buttonContainerRight: {

      flex:1,
      marginTop: 97,
      shadowColor: '#000000',
      height:40,
      fontSize:14,
      fontFamily: 'Montserrat-Regular',


    },
    list: {
          flexDirection: 'row',
          flexWrap: 'wrap'
      },
      item: {
          backgroundColor: 'red',
          margin: 3,
          width: 100
      },
      titleTexts: {
    fontSize: 18,
    fontFamily: 'Montserrat',
    fontWeight : '100',
    marginLeft:14,
    marginBottom:12,
    color:'#213450',

  },
  titleText: {
    fontSize: 18,
    fontFamily: 'Montserrat',
    fontWeight : '100',
    marginLeft:14,
    color:'#213450',

  },
  searchBtnContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonGradient: {
      borderRadius: 30,
      width: 170,
      marginTop: 10,
      height: 33,
    },
    buttonText: {
      fontSize: 14,
      textAlign: 'center',
      color: '#ffffff',
      padding: 2,
      fontFamily: 'Montserrat',

    },

    HVACBtnStyle: {
      marginTop : 5,

    },

    globalBtnStyle : {
      marginLeft: 50,
      marginRight : 50,
      padding: 2,
      borderRadius : 20,
      backgroundColor : "#57a3e2",
      marginTop: 0,

      },

      textInputViewStyle: {
      marginLeft : 25,
      marginRight : 25,
      marginBottom : 25,
      shadowColor : "#808080",
      shadowOpacity : 1,
      shadowRadius : 3,
      shadowOffset : {width: 1, height: 1.0},
      borderWidth : 1,
      borderColor : "lightgray",
      backgroundColor:'#F6F6F6',
    },
    textInputStyle: {
      paddingTop : 9,
      paddingLeft : 5,
      paddingBottom : 9,
      borderColor : "black", 
      height: 30,
      fontWeight: "100",
      color:"#000000",
      fontSize: 12,
    },
  BtnDualText: {
      color: "#06273F",
      textAlign: 'center',
      alignItems: 'center',
      paddingTop: 10,
      paddingBottom: 8,
    },
    globalBtnTextViewStyle: {
      textAlign : 'center',
      color : "#FFFFFF",
      paddingLeft: 60,
      paddingRight: 60,
      paddingBottom: 5,

    
      },
      globalBtnStyle : { 

      },
      listNav: {
      flex: 7,
      alignSelf : "stretch",
      backgroundColor: '#F6F6F6',
      paddingTop:20,
    },
    rowView : {
      paddingTop: 5, 
      paddingBottom: 5, 
      paddingLeft: 10,
      paddingRight: 10,
      height: 80, 
      backgroundColor: '#F6F6F6',
    },

  })

  export default GlobalLiterature;