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
  TouchableHighlight,
  Image,
  ListView,
  Dimensions,
  Platform,
  Animated,
  TouchableOpacity,
} from 'react-native';
import GridLiterature from './GridLiterature';
import ModalDropdown from 'react-native-modal-dropdown';
import CustomRadioButton from "./CustomRadioButton1"; 
import {globalStyles, deviceFinder} from "./globalStyles"; 
import LinearGradient from 'react-native-linear-gradient';
import * as dataResource from './dataResource';
import CellView from "./CellView";  

const radioBtnCheckedSrc = require('../resources/images/CheckedStep.png');
const radioBtnUnCheckedSrc = require('../resources/images/UncheckedStep.png');
class GlobalLiteratureFilters extends Component {
  constructor(props)
  {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { 
      dataSource: ds.cloneWithRows(['row 1', 'row 2','row 3','row 4','row 5','row 6','row 7','row 8']),
      testData : ['row 1', 'row 2','row 3','row 4','row 5','row 6','row 7','row 8'],
      isSalesSelected:true, isTechnicalSelected:false, borderWidthFirst:0, borderWidthSecond: 1,colorFirst:'white',colorSecond:'black',expanded: false,animation   : new Animated.Value(),
      flexFirst:9,flexSecond:4, dataSource : ds.cloneWithRows(dataResource.listItemData.Literature_Category),
      /*----------- two Radio buttons -----------*/
        radioBtn1UnChecked : false,
        radioBtn2Checked : false,

        radioBtnCheckedImg : radioBtnCheckedSrc,
        radioBtnUnCheckedImg : radioBtnUnCheckedSrc,
      
        isCheckedFirst: true,
        isCheckedSecond: false,
        imageBottom:15,
        rightImage : require('../resources/images/Next.png')

      };
      this.icons = {
            'up'    : require('../resources/images/Minus.png'),
            'down'  : require('../resources/images/Add.png')
        };
      this.dropdownOnSelect = this.dropdownOnSelect.bind(this);
      this.radioFirstBtnEventHandle = this.radioFirstBtnEventHandle.bind(this);

      this.radioSecndBtnEventHandle = this.radioSecndBtnEventHandle.bind(this);



      }


  toggle(){
    if(Dimensions.get('window').width > 500){
      this.setState({
            flexSecond   : 3,
        });
    
      
    }
    if (this.state.expanded) {
      this.setState({
            flexFirst   : 9,
            imageBottom  : 15,  
        });
    }
    else
    {
      this.setState({
            flexFirst   : 6,
            imageBottom  : 22,  


        });
    }
    let initialValue    = 0,
        finalValue      = 120;

    this.setState({
            expanded : !this.state.expanded
        });
    this.state.animation.setValue(initialValue);  //Step 3
    Animated.spring(     //Step 4
        this.state.animation,
        {
            toValue: finalValue
        }
    ).start();  //Step 5

  this.windowWidth = 0;
  this.windowHeight = 0;

}
_setMaxHeight(event){
        this.setState({
            maxHeight   : event.nativeEvent.layout.height
        });
    }

    _setMinHeight(event){
        this.setState({
            minHeight   : event.nativeEvent.layout.height
        });
      }
_renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    let key = `spr_${rowID}`;
    return (<View style={styles.separator}
                  key={key}
    />);
  }
_dropdown_3_adjustFrame(style) {
      console.log(`frameStyle={width:${style.width}, height:${style.height}, top:${style.top}, left:${style.left}}`);
      style.left -= 9;
      style.top += 7;
      style.height -=70;
      return style;
    }
    find_dimesions(layout){
      this.setState({dropDownWidth:layout.width})
      console.log(layout.width);
    }
  render() {
     icon = this.icons['<'];

    let viewpage = null;

    
    
    if(this.state.expanded){
      icon = this.icons['>'];

      
        viewpage = (
          <View style={{backgroundColor: '#CACACA' ,height:220 }}>
          <View style={[styles.dropDownMenuContent,{marginLeft: 15,marginRight: 15,marginTop:5,backgroundColor: '#CACACA'}]}>
                    <ModalDropdown

                      renderSeparator={this._renderSeparator.bind(this)}
                      defaultValue='Sort by: Author'

                      ref={el => this.filterSizeDropDown = el}

                      style={styles.dropDownMenu}
                      textStyle= {styles.dropdownText}
                      dropdownStyle={[styles.dropDown,{minWidth:this.state.dropDownWidth}]}
                      adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                      onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
                      options={['Current', 'non-current','obselete']}
                      onSelect = {(idx, value) => this.dropdownOnSelect(idx, value)} />
                  
                    <Image source={require('../resources/images/FilterArrow.png')}  style={styles.backgroundImage} />
                </View>  
                <View style={[styles.dropDownMenuContent,{marginLeft: 15,marginRight: 15,marginTop:5,backgroundColor: '#CACACA'}]}>
                    <ModalDropdown

                     renderSeparator={this._renderSeparator.bind(this)}


                      defaultValue='Sort by: All Documents'

                      ref={el => this.filterSizeDropDown = el}

                      style={styles.dropDownMenu}
                      textStyle= {styles.dropdownText}
                      dropdownStyle={[styles.dropDown,{minWidth:this.state.dropDownWidth}]}
                      adjustFrame={style => this._dropdown_3_adjustFrame(style)}
                      onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }}
                      options={['Author', 'Catalog Number','Category','Comment','Content ID','Country','Division','Document Group','Document MIME Type','File Type','Form Number','Model Category','Model Number','Part Number','Print Date','Sample Mail','Source Department','Status','Sub-Category','Sub Type','Types']}
                      onSelect = {(idx, value) => this.dropdownOnSelect(idx, value)} />
                  
                    <Image source={require('../resources/images/FilterArrow.png')}  style={styles.backgroundImage} />
                </View> 
                 <View  style = {[styles.radioBtnViewStyle]}> 
                <Text style = {[styles.twoCustomRadioBtnTxt]}></Text>
                    <CustomRadioButton  
                      arrayData={this.state.arrayData}
                      radioBtn1UnChecked= {this.state.radioBtn1UnChecked} 
                      radioBtnCheckedImg = {this.state.radioBtnCheckedImg} 
                      radioBtnUnCheckedImg = {this.state.radioBtnUnCheckedImg} 
                      isCheckedFirst={this.state.isCheckedFirst} 
                      isCheckedSecond={this.state.isCheckedSecond} 
                      radioSecndBtnEventHandle = {this.radioSecndBtnEventHandle} 
                      radioFirstBtnEventHandle = {this.radioFirstBtnEventHandle} />
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
                      Apply
                    </Text>
                  </LinearGradient>
               </TouchableHighlight>


      </View>

              
         </View>
      )
  
    }else{
      viewpage = null;

    }
    
 let icon = this.icons['down'];

        if(this.state.expanded){
            icon = this.icons['up'];
        }
    return (
       <View style={{flex:1}}>
       

       <View style={{backgroundColor: '#CACACA', flexDirection: 'row',height:120}}>
    
          <Text style={styles.titleText}>Filtering Options</Text>
            <TouchableHighlight
                style={{justifyContent: 'flex-end',alignItems: 'flex-end', flex:1 ,height:100,backgroundColor:'#CACACA',marginTop:20}}
                underlayColor= '#CACACA'
                              onPress={this.toggle.bind(this)}>
             <Image style={{alignItems:'center',marginRight:20,marginBottom:this.state.imageBottom}} source= {icon} />

             </TouchableHighlight>
         </View>


          {viewpage}
       

          <View style={styles.listNav}>
          <Text style={styles.titleTexts}>Results for:19VIE592021</Text>

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
    );
  }
dropdownOnSelect(idx, value){
    //alert("idx : "+idx);
    if(value && value !== "" && this.state.isFilterSizeSelected === false && idx !== -1)
    {
      this.state.selectedFilterSize = value.toString();
      this.setState({selectedFilterSize : this.state.selectedFilterSize});
      this.setState({isFilterSizeSelected : !this.state.isFilterSizeSelected,});
    }
    else if( idx === -1){

      this.setState({filterSizeDefaultValue : "Select: Filter Size"}); 

    }
  }
  radioFirstBtnEventHandle(){
    if(this.state.isCheckedFirst){
      return;
    }
    this.setState({isCheckedFirst:this.state.isCheckedFirst?false:true, isCheckedSecond:this.state.isCheckedSecond?false:true})

  }  

  radioSecndBtnEventHandle(){
    if(this.state.isCheckedSecond){
      return;
    }
    this.setState({isCheckedSecond:this.state.isCheckedSecond?false:true, isCheckedFirst:this.state.isCheckedFirst?false:true})

  } 
  
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  titleText: {
          fontSize: 16,
          marginTop: 84,
          marginLeft:20,
          color:'#213450',
        },
  imagestyle: {
    height: 22,
    width: 22,

  } ,  
  dropdownText:{
    fontSize: 13,
  },
  dropDownMenu: {
    flexWrap: 'wrap',
    borderColor: "#CACACA",
    alignItems: 'stretch',
    borderWidth: 1,
    padding: 8,
    marginTop: 5,
    backgroundColor:'white',
    
    position: 'relative',
    borderRadius: 3,
  },
  radioBtnViewStyle : {
    flex :1, 
    flexDirection : 'column', 
    paddingLeft : 10,
    marginTop:0
  },
  twoCustomRadioBtnTxt :{
    color : "#06273F", 
    fontWeight : "normal", 
    fontFamily : "Montserrat", 
    fontSize : 18
  },
  globalBtnTextViewStyle: {
    textAlign : 'center',
    color : "#FFFFFF",
    paddingLeft: 60,
    paddingRight: 60,
    paddingBottom: 5,

   
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

  listNav: {
    flex: 7,
    alignSelf : "stretch",
    backgroundColor: '#F6F6F6',
    paddingTop:20,
    paddingBottom:10,
  },

  globalBtnStyle : {
    marginLeft: 50,
    marginRight : 50,
    padding: 2,
    borderRadius : 20,
    backgroundColor : "#57a3e2",
    marginBottom: 10,

    },
    globalBtnStyle : { 
    marginBottom: 10,


    },
    rowView : {
    paddingTop: 5, 
    paddingBottom: 5, 
    paddingLeft: 10,
    paddingRight: 10,
    height: 80, 
    backgroundColor: '#F6F6F6',
  },
    backgroundImage: {
    width: 10,
    height: 5,
    position:'absolute',
    top: 16,
    right: 15,
  },
 titleTexts: {
   fontSize: 18,
   fontFamily: 'Montserrat',
   fontWeight : '100',
   marginLeft:14,
   color:'#213450',
   marginBottom:12,

 },
 titleTexts: {
   fontSize: 18,
   fontFamily: 'Montserrat',
   fontWeight : '100',
   marginLeft:14,
   color:'#213450',
   marginBottom:12,

 },
  dropDown: {
    alignSelf : "stretch",
    flexDirection: 'column',
    alignItems: 'stretch',
    flexWrap: 'wrap',

    shadowOffset:{
        width: 1,
        height: 3,
    },

  
  }
});
export default GlobalLiteratureFilters;