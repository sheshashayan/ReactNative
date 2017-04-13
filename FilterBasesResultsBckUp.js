import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';

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
  ScrollView,
  Platform,
  Dimensions,
  Linking,
  TouchableHighlight,
  } from 'react-native';

import CellView from "./CellView";  
import CustomCrossRefResultsListView from "./CrossReferenceResults";
import CustomisedListView from "./CrossReference";
import * as dataResource from './dataResource';
import SwipeRow from './SwipeRow';
import {globalStyles, deviceFinder} from "./globalStyles"; 
import CustomModal from "./CustomModal";
import Modal from 'react-native-simple-modal';


const isItiPhone6S = deviceFinder.isItiPhone6S();
const isItiPhone5S = deviceFinder.isItiPhone5S();
const isItiPad = deviceFinder.isItiPad();
const isIt7InchTablet = deviceFinder.isIt7InchTablet();
const isIt10InchTablet = deviceFinder.isIt10InchTablet();
const isItAndroidPhone = deviceFinder.isItAndroidPhone();

class FilterBasesResults extends Component {

	constructor(props) {
	  super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  
	
	  this.state = {

        backArrow : "<",
        isItFilterBasesResults : "FilterBasesResults",
        rightImage : require('../resources/images/More.png'),

        dataSource : ds.cloneWithRows(dataResource.listItemData.Filter_Bases_Results),
        fromWhichScreen : "FilterBasesResults",
        isCellSwipeable :  true,
        asPerDeviceWidth : "",
        carrierSalesDetails : dataResource.CarrierSalesDetails,
        open: false,
        infoOpen: false,
        popUpWindowHeight: 0,

    	};

      this.callToOrderForParts = this.callToOrderForParts.bind(this);

	  };
	
  componentWillMount() {      
      this.windowWidth= Dimensions.get('window').width;
      this.windowHeight= Dimensions.get('window').height;

      console.log("windowWidth : "+this.windowWidth);
      console.log("windowHeight : "+this.windowHeight);

      if(Platform.OS === 'ios'){
          if(this.windowWidth > 700){ //ipad
            this.setState({popUpWindowHeight : this.windowWidth/2}) ;
          }
          else if(this.windowWidth >= 310 && this.windowWidth <= 360){ //iPhone 5s,5c
            this.setState({popUpWindowHeight : this.windowWidth +10});
          }
          else if(this.windowWidth >= 360){ //iPhone 6S plus // 410              
            this.setState({popUpWindowHeight : this.windowWidth -20});
          }
      }
      else if(Platform.OS === 'android'){
          if(this.windowWidth > 500 && this.windowWidth < 700){ //Androidtablet 
            this.setState({popUpWindowHeight : this.windowWidth/3}); 
          } 
          else if(this.windowWidth > 700){ //Androidtablet 10" // 800
            this.setState({popUpWindowHeight : this.windowWidth/2});           
          }    
          else if(this.windowWidth < 400){ //Androidphone        
            this.setState({popUpWindowHeight : this.windowWidth -20});
          }

      }



  }

render() {
    
    if(Platform.OS === 'ios'){
        if(isItiPad){ //ipad
          this.rightOpenValueAsPerDevice = -640;
        }
        else if(isItiPhone5S){ //iPhone 5s,5c
          this.rightOpenValueAsPerDevice = -255;
        }
        else if(isItiPhone6S){ //iPhone 6S plus // 410          
          this.rightOpenValueAsPerDevice = -320;
        }
    }
    else if(Platform.OS === 'android'){
        if(isIt7InchTablet){ //Android7"tablet           
          this.rightOpenValueAsPerDevice = -500;
        } 
        else if(isIt10InchTablet){ //Android10"tablet // 800          
          this.rightOpenValueAsPerDevice = -680;
        }    
        else if(isItAndroidPhone){ //Androidphone        
          this.rightOpenValueAsPerDevice = -280;
        }

    }

    return (
      <View style = {styles.container}>	
      	<View style = {{alignSelf : "stretch",  width : undefined, backgroundColor : "#06273F", flex : 1.25 }}>
        		<View style = {{alignSelf : "center", height : 40, paddingTop: 15}}>
        			<Text style = {{alignSelf : "center", color : "#F6F6F6", fontFamily : "Montserrat", fontWeight : '100', fontSize : 16}}> </Text>
        		</View>	
        </View>

	  	  	<View style = {[styles.filterOptionsView]}>

              <View style = {{ alignSelf : "flex-start", paddingBottom : isItiPhone5S ? 5 :0}}>
                <TouchableOpacity onPress = { this.backToFilterBases } style = {[styles.backToCrossRefStyle]}  >
                   <Text style = {styles.backToFilterBaseTxtStyle}>{this.state.backArrow+ " Back to Filter Bases "}</Text>
                </TouchableOpacity>
              </View >

  	  	  		<View style = {[styles.filterSizeView]}>
  	  	  			<View style = {{minWidth : 150}}>
  			  	  		<Text style= {[styles.filterSizeTxt]}>Filter Size:</Text>
  			  	  	</View>			  	  
  			  	  	<Text style = {[styles.selectedFilterSizeTxt]}>14 x 25</Text>
  	  	  		</View>

  	  	  		<View style = {[styles.filterOptionViewOthers]}>
  	  	  			<View style = {{minWidth : 150}}>	
  			  	  		<Text style= {[styles.filterSizeTxt]}>Gas/ Electric:</Text>
  			  	  	 </View>	
  			  	    <Text style = {[styles.selectedFilterSizeTxt]}>Gas</Text>
  	  	  		</View>

  	  	  		<View style = {[styles.filterOptionViewOthers]}>
  	  	  			<View style = {{minWidth : 150}}>
  			  	  		<Text style= {[styles.filterSizeTxt]}>Filter Width:</Text>
  			  	  	</View>
  			  	    <Text style = {[styles.selectedFilterSizeTxt]}>1</Text>
  	  	  		</View>

  	  	  		
	  	  	</View>

     

      	<View style = {{ backgroundColor : "#F6F6F6", flex : 8, alignSelf : "stretch"}} >

          <View style = {[{paddingTop : 20,paddingLeft :10,alignSelf : "flex-start",  flexDirection : "row"}]}>
                <Text style = {[styles.filterSizeTxt]}>Current Parts</Text>
          </View>

         <View style = {{paddingTop: 10}}>
               <ListView
                  scrollEnabled = { true }
                  dataSource={this.state.dataSource}
                  renderRow={(rowData,sectionId, rowId) => 
                    <View style={styles.rowView}>
                      <SwipeRow                     
                            rightOpenValue= {this.rightOpenValueAsPerDevice}                               
                            disableRightSwipe = {true}
                            modalDidOpen={() => console.log('modal did open')}
                            swipeLeftSet={(rightOpenValue) =>  {{this.rightOpenValueAsPerDevice}}}  >

                            <View style={styles.swipeableRowBack}>
                              <TouchableOpacity onPress = {this.callToOrderForParts}>
                                 <View style ={{flexDirection : "column",marginLeft : 40}}>
                                    <Image style ={[styles.swipeImageStyle,{}]} source = {require('../resources/images/Call.png')}/>
                                    <Text style ={[globalStyles.globalBtnTextViewStyle,{paddingLeft : 5,paddingTop : 2,}]}>Call to Order</Text>
                                 </View>
                               </TouchableOpacity >

                               <TouchableOpacity onPress={() => this.setState({open: true})}> 
                                 <View style ={{flexDirection : "column",}}>
                                    <Image style ={[styles.swipeImageStyle,{}]} source = {require('../resources/images/SavePart.png')}/>
                                    <Text style = {[globalStyles.globalBtnTextViewStyle,{paddingLeft : 5,paddingTop : 2,}]}>Save Part</Text>
                                 </View>
                               </TouchableOpacity >

                              <TouchableOpacity onPress={() => this.setState({infoOpen: true})}> 
                                 <View style ={{flexDirection : "column",}}>
                                    <Image style ={[styles.swipeImageStyle,{}]} source = {require('../resources/images/Information.png')}/>
                                    <Text style = {[globalStyles.globalBtnTextViewStyle,{paddingLeft : 5,paddingTop : 2,}]}>Info</Text>
                                 </View>
                               </TouchableOpacity >   
                            </View>

                            <View style={styles.swipeableRowFront}>
                              <CellView
                                title={rowData["title"]}
                                subTitle={rowData["subTitle"]}
                                leftImage={this.state.leftImage}
                                rightImage={this.state.rightImage} 
                                toBePopulatedOn = {this.state.fromWhichScreen} />                                  
                            </View>                                  
                      </SwipeRow>         
                  </View>
                } 
              />
            </View>
        </View>

        <CustomModal
               offset={this.state.offset}
               open={this.state.open}
               heightAsPerDevice = {this.state.popUpWindowHeight}
               modalDidOpen={() => console.log('modal did open')}
               modalDidClose={() => this.setState({open: false})} 

               style={{alignItems: 'center'}}>

              <View style = {{flexDirection : 'row', flex : 1}}>          
                <View style = {{flexDirection : "row", flex :1,justifyContent : "center", backgroundColor :"#429BE4",borderRadius : 30, marginLeft: 20 }}>
                  <TouchableHighlight style={[{paddingTop: 10, }]} >
                    <LinearGradient
                      start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                      locations={[0,0.5,1]}
                      colors={['#57A3E3', '#56A6D1', '#57A3E3']}
                      underlayColor={['#4582B5', '#498FB5', '#4582B5']}
                      style={[{borderRadius: 20}]}>
                      <Text style={[globalStyles.globalBtnTextViewStyle]}>
                        Create & Add
                      </Text>
                    </LinearGradient>
                  </TouchableHighlight>
                </View>  

                <View style = {{flexDirection : "row", flex :1,justifyContent : "center", backgroundColor :"#429BE4",borderRadius : 30, marginLeft: 20 }}>
                  <TouchableHighlight style={[{paddingTop: 10, }]} >
                    <LinearGradient
                      start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                      locations={[0,0.5,1]}
                      colors={['#57A3E3', '#56A6D1', '#57A3E3']}
                      underlayColor={['#4582B5', '#498FB5', '#4582B5']}
                      
                      style={[{borderRadius: 20}]}>
                      <Text style={[globalStyles.globalBtnTextViewStyle]}>
                        Add to Job
                      </Text>
                    </LinearGradient>
                  </TouchableHighlight>
                </View>  
                  
              </View>    

            </CustomModal>

            <Modal
               offset={this.state.offset}
               open={this.state.infoOpen}
               modalDidOpen={() => console.log('modal did open')}
               modalDidClose={() => this.setState({infoOpen: false})}
               style={{alignItems: 'center'}}>
               <View style={{ position:'relative', paddingTop: 15, paddingBottom : 15,}}>
                 
                  <View style = {{paddingBottom : 10,position:'absolute', top: -10, right: -10, width : 35, height : 35}}> 
                     <TouchableOpacity
                         onPress={() => this.setState({infoOpen: false})}>
                          <Text style={{ color: '#333',fontSize: 20,textAlign: 'right',paddingRight: 8}}>&#10005;</Text>
                      </TouchableOpacity>
                  </View>

                   <View style = {[{ flexDirection : 'row', justifyContent : 'center',paddingBottom: 10,}]}>
                    <Text style={[globalStyles.headerTxt2 ,{fontSize: 20,}]}>Part Info</Text>
                 </View>
                 
                 <View>
                   <View style = {[{ flexDirection : 'row', justifyContent : 'center',paddingTop: 7}]}>
                      <View style = {{flex:1, alignItems : 'flex-end'}}>
                          <Text style={globalStyles.headerTxt2 }>Part # : </Text>
                       </View>
                       <View style = {{flex:1, alignItems : 'flex-start'}}>
                          <Text style={[globalStyles.headerTxt2,{color: '#CACACA',fontWeight:'normal',alignItems: 'center',}]}>PIO2-FHG1425-2 </Text>
                       </View>
                     </View>
                     

                     <View style = {[{ flexDirection : 'row', justifyContent : 'center',paddingTop: 7}]}>
                       <View style = {{flex:1, alignItems : 'flex-end'}}>
                          <Text style={[globalStyles.headerTxt2,{alignItems: 'center',}]}>Filter Size : </Text>
                       </View>
                       <View style = {{flex:1, alignItems : 'flex-start'}}>
                          <Text style={[globalStyles.headerTxt2,{color: '#CACACA',fontWeight:'normal',alignItems: 'center',}]}>Five Season  </Text>
                       </View>
                     </View>
                     
                     <View style = {[{ flexDirection : 'row', justifyContent : 'center',paddingTop: 7}]}>
                       <View style = {{flex:1, alignItems : 'flex-end'}}>
                          <Text style={[globalStyles.headerTxt2,{alignItems: 'center',}]}>Filter Size : </Text>
                       </View>
                       <View style = {{flex:1, alignItems : 'flex-start'}}>
                          <Text style={[globalStyles.headerTxt2,{color: '#CACACA',fontWeight:'normal',alignItems: 'center',}]}>14 x 5 </Text>
                       </View>
                     </View>
                     

                     <View style = {[{ flexDirection : 'row', justifyContent : 'center',paddingTop: 7}]}>
                       <View style = {{flex:1, alignItems : 'flex-end'}}>
                         <Text style={[globalStyles.headerTxt2,{alignItems: 'center',}]}>Gas/Electric : </Text>
                       </View>
                       <View style = {{flex:1, alignItems : 'flex-start'}}>
                         <Text style={[globalStyles.headerTxt2,{color: '#CACACA',fontWeight:'normal',alignItems: 'center',}]}>Gas</Text>
                       </View>
                     </View>
                     
                     <View style = {[{ flexDirection : 'row', justifyContent : 'center',paddingTop: 7}]}>
                       <View style = {{flex:1, alignItems : 'flex-end'}}>
                        <Text style={[globalStyles.headerTxt2,{alignItems: 'center',}]}>Filter width : </Text>
                       </View>
                       <View style = {{flex:1, alignItems : 'flex-start'}}>
                         <Text style={[globalStyles.headerTxt2,{color: '#CACACA',fontWeight:'normal',alignItems: 'center',}]}>1</Text>
                       </View>
                     </View>

                     <View style = {[{ flexDirection : 'row', justifyContent : 'center',paddingTop: 7}]}>
                       <View style = {{flex:1, alignItems : 'flex-end'}}>
                          <Text style={[globalStyles.headerTxt2,{alignItems: 'center',}]}>Description  : </Text>
                       </View>
                       <View style = {{flex:1, alignItems : 'flex-start'}}>
                          <Text style={[globalStyles.headerTxt2,{color: '#CACACA',fontWeight:'normal',alignItems: 'center',}]}>Filter Housing for 1" Filters. Gas, Air-Title Series.</Text>
                       </View>
                     </View>                                  
               </View>               
             </View>

            </Modal>

    </View>
    );
  }

  backToFilterBases = () => {    
      this.props.navigator.pop();
  }


showFilterBasesResults =(id) => {
      switch(id)
        {           
          case 'wm0':
          {
            this.props.navigator.push(
            {
             name:'ProductPage',
             title:'Product Page',
              isHidden:false   
            });
          }
          break;

          case 'wm1':
          {
            this.props.navigator.push(
            {
             name:'ProductPage',
             title:'Product Page',
              isHidden:false     
            });
          }
          break; 
      }
  }

callToOrderForParts = () => {    
    let phoneNo = "";

    let pinCodeAsPerCurrentLatLong = "12110"; //or pinCodeAsPerUserRegisteredAddress
    let carrierSalesDetails = this.state.carrierSalesDetails;

    for(let i in carrierSalesDetails){
        if(carrierSalesDetails[i].Address.pinCode === pinCodeAsPerCurrentLatLong){
            phoneNo = carrierSalesDetails[i].Address.phoneNumber;
       }    
    }
    if(typeof phoneNo !== "string" || phoneNo.trim().length >10 || phoneNo === "") {
      console.log('the phone number must be provided as a String value');
      alert('the phone number must be provided as a String value');
      return;
    }    
    let url;

    if(Platform.OS !== 'android') {
      url = 'telprompt:' ;
    }
    else {
      url = 'tel:';
    }
    url += phoneNo;
    this.launchURL(url);
}

launchURL = (url) => {
    console.log("launchURL..."+url)
    Linking.canOpenURL(url).then(supported => 
    {
      if(!supported) {
        console.log('Can\'t handle url: ' + url);
      } 
      else {
        Linking.openURL(url)
        .catch(err => {
          if(url.includes('telprompt')) {
            console.log(err);
          } 
          else {
            console.warn('openURL error', err);
          }
        });
      }
    }).catch(err => console.warn('An unexpected error happened', err));
  }

}


const styles = StyleSheet.create({

	container : {
	flex : 1,
	flexDirection : "column",
	justifyContent : "flex-start",
	alignItems: 'flex-start',
	backgroundColor : "#F6F6F6" //F6F6F6
	},

  navBackImage : {
    width : 10,
    height : 10,
  },

  currentsPartsTextViewStyle :{
  	...Platform.select({
      ios: {
        paddingTop: 40,
      },
      android: {
        paddingTop: 10,
        
      },
    }),
  },
   backToCrossRefStyle : {
    alignSelf:'flex-start', 
    justifyContent : "flex-start", 
    marginTop :0, 
    marginLeft: 0 
  },

  backToFilterBaseTxtStyle : {
    color : "#429BE4", 
    fontFamily : "Droid Serif", 
    paddingLeft : 5, 
    fontStyle : 'italic', 
    fontWeight : '100', 
    fontSize : 12, 
    paddingTop: 10
  },

  filterOptionsView : {
  alignSelf : "stretch", 
  paddingTop: 0, 
  paddingLeft:10, 
  //flex : 2,//18 , 
  flex : (isItAndroidPhone ? 3 : 2),
  flexDirection : "column", 
  justifyContent : "flex-start", 
  alignItems : "flex-start",
  },

  filterSizeView : {
    alignSelf : "flex-start", 
    paddingTop : (isItiPhone6S ? 10 : (isItiPhone5S ? 0 : 20)),
    paddingLeft : 25, 
    flexDirection : "row",

  }, 
  filterOptionViewOthers : {
    alignSelf : "flex-start", 
    paddingTop : 5, 
    paddingLeft : 25, 
    flexDirection : "row",
  },

  filterSizeTxt :{
    color : "#06273F", 
    paddingRight : 20, 
    fontWeight : "normal", 
    fontFamily : "Montserrat", 
    fontSize : 18
  },
  selectedFilterSizeTxt : {
    backgroundColor: "#F6F6F6",
    fontWeight : "normal", 
    fontFamily : "Montserrat", 
    fontSize : 18, 
    color : "#CACACA"
  },
  backToFilterBasesView : {
    alignSelf : "flex-start", 
    paddingTop: 10, 
    paddingLeft:5, 
    flex : 2, 
    flexDirection : 'row', 
    justifyContent : "flex-start",
    backgroundColor : 'skyblue'
  },
  rowView: {
    paddingTop: 5, 
    paddingBottom: 5, 
    paddingLeft: 10,
    paddingRight: 10,
    height: 80, 
    backgroundColor: 'white'
  },

  swipeableRowBack: {
    alignItems: 'center',
    backgroundColor: '#429BE4',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20
  },

  backTextWhite: {
    color: '#FFF'
  },

  swipeableRowFront: {
    alignItems: 'center',
    backgroundColor: '#CCC',
    justifyContent: 'center',
    height: 70,
  },

  swipeImageStyle : {
    alignSelf : 'center',
  },
  textright: {    
    alignSelf: 'flex-end', 
    //fontSize: 30,
  },

});

export default FilterBasesResults;