import React, { Component, PropTypes } from 'react';

import {
   View,
   StyleSheet,
   TouchableOpacity,
   Animated,
   Platform,
   BackAndroid,
   Image,
   Text,
   ListView,
   TouchableHighlight,
   TextInput

} from 'react-native';

import * as dataResource from './dataResource';
import CellView from "./CellView";  
import LinearGradient from 'react-native-linear-gradient';
import {globalStyles, deviceFinder} from "./globalStyles"; 
import {getAddressByLatLong} from "../lib/PartsAndJobsServices";
import ActivityIndicator from "../components/ActivityIndicator";

class CustomModal extends Component {
   constructor() {
      super();
      const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      this.state = {
         opacity: new Animated.Value(0),
         scale: new Animated.Value(0.8),
         offset: new Animated.Value(0),

         //by Ravi
         heightAsPerDevice : 0,
         open : false,
         dataSource : ds.cloneWithRows(dataResource.jobDetails),
         checkBoxSelected : false,
         popUpWindowHeight: 0,
         imageSelecteState:null,
         willShowAddView:false,
         inputText:'',
         locationPlaceHolder : ''
      };

      this.checkBoxPressEvent = this.checkBoxPressEvent.bind(this);
      this.getLocationResponseCallBack = this.getLocationResponseCallBack.bind(this);
      
      //this.modalDidClose = this.modalDidClose.bind(this);
      //this.modalDidOpen = this.modalDidOpen.bind(this);
   }

   componentWillMount() {
    this.resetButtons();

     console.log("componentWillMount... ");
     if (this.props.open) {
         console.log("this.props.open... "+this.props.open);   
         this.open();
     }
     //by Ravi
      if (this.props.heightAsPerDevice){
          console.log("heightAsPerDevice for customModal : "+this.props.heightAsPerDevice);
          this.setState({heightAsPerDevice: this.props.heightAsPerDevice});
      }
  }
   
   componentWillReceiveProps(props) {

      console.log("componentWillReceiveProps... ");
      if(this.props.jobsList){
       
                var jobs = this.props.jobsList.getJobsResponse.getJobsReturn.Jobs.Job
                var stringValue = JSON.stringify(this.props.jobsList.getJobsResponse.getJobsReturn.Jobs)


                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({ 
                    dataSource : ds.cloneWithRows(jobs),
                })
         }
      if (props.open && props.children !== this.state.children) {
         this.setState({children: props.children});
      }
      if (props.open !== this.props.open) {
         if (props.open)
            this.open();
         else
            this.close();
      }
      if (props.offset !== this.props.offset) {
         this.animateOffset(props.offset);
      }

   }
   componentDidMount() {

      console.log("componentDidMount... ");
      if (Platform.OS === 'android') {
         BackAndroid.addEventListener('hardwareBackPress', () => {
            if (this.state.open) {
               this.close();
               return true;
            }
            return false;
         });
      }
   }
   setPhase(toValue) {
      console.log("setPhase... "+this.state.open );
      if (this.state.open != toValue) {
         console.log("setPhase toValue ... "+toValue);
         const {animationDuration, animationTension} = this.props;
         Animated.timing(
            this.state.opacity,
            {
               toValue,
               duration: animationDuration
            }
         ).start();

         Animated.spring(
            this.state.scale,
            {
               toValue: toValue ? 1 : 0.8,
               tension: animationTension
            }
         ).start();

         setTimeout(() => {
            if (toValue){

               //this.props.modalDidOpen();
               //modalDidOpen();
            }
            else {
               this.setState({open: false, children: undefined});
               this.props.modalDidClose();
               this.resetButtons();
            }
         }, animationDuration);
      }
   }

   resetButtons(){

    var imageState=[];
    for(var i=0; i<dataResource.jobDetails.length;i++){
     
        imageState[i]=0

    }
     this.setState({
      imageSelecteState:imageState
     });
   }

   render() {
      console.log("render... "+this.state.open);
      const {opacity, open, scale, offset, heightAsPerDevice, children} = this.state;
      console.log("children... "+children);
      let containerStyles = [styles.absolute, styles.container, this.props.containerStyle];
      if (!this.state.open) {
        console.log("render...containerStyles.push ");
        containerStyles.push(styles.hidden);
      }

      var additionView = null;

      if(this.state.willShowAddView){
          additionView = (<View style={{flex:1, backgroundColor:'white', right:0,left:0,bottom:5,position:'absolute', height:100, zIndex: 99, }} >
            <View style = {{flexDirection : "row", alignItems: 'center',flex :1,justifyContent : "center",borderRadius : 30,  paddingLeft: 10,paddingRight: 10, flexDirection: 'column', }}>
            <Text></Text>
                  <TextInput 
                        style={[globalStyles.specialMsgTxt,styles.textInputStyle]}  
    
                        value={this.state.inputText}
                        autoCapitalize="none"
                        autoCorrect={false}
                        underlineColorAndroid='transparent'
                        onChangeText={(inputText) => this.setTextinputValue(inputText)}
                        placeholder={this.state.locationPlaceHolder}
                        placeholderTextColor= '#CACACA'
                        onKeyPress={this.handleKeyDown}
                      />

                      <Text></Text>

                  <TouchableHighlight
                      style={{backgroundColor : "#57a3e2",borderRadius: 30,width: 150,marginTop: 5,padding: 10,paddingLeft: 20,paddingRight: 20,}}
                      onPress={() => this.createAndAddPressed()}
                      underlayColor='#4582b5'>
                      <Text style={[globalStyles.globalBtnTextViewStyle,styles.myJobsButtons]}>
                        Create & Add
                      </Text>
                  </TouchableHighlight>
                </View>  
            </View>)

      }
      else{

        additionView=null;
      }

      return (
         <View
         pointerEvents={open ? 'auto' : 'none'}
         style={containerStyles}>
            
            <TouchableOpacity
               style={styles.absolute}
               disabled={!this.props.closeOnTouchOutside}
               onPress={this.close.bind(this)}
               activeOpacity={0.75}>
               <Animated.View style={{flex: 1, opacity, backgroundColor: this.props.overlayBackground}} />
            </TouchableOpacity>

            <Animated.View
               style={[
                  styles.defaultModalStyle,
                  this.props.modalStyle,
                  {opacity, transform: [{scale}]},
                  {height: heightAsPerDevice}
               ]}>
                <View style={{flexDirection: 'column',alignSelf: 'stretch',position: 'relative'}}>
                  <View style ={{ alignSelf : "center",alignItems : 'center',paddingTop : 10, paddingBottom : 10}}>
                       <Text style = {[globalStyles.headerTxt2,{alignItems : 'center'}]}>My Jobs</Text>        
                 </View>
                 
                 <View style = {{position: 'absolute',right: -10,top:-10}}>
                    <TouchableOpacity 
                        onPress={this.close.bind(this)} style = {{ paddingLeft: 10,paddingBottom: 6,}}>                         
                         {/*<Image source={require('../resources/images/Close.png')}   />*/}
                          <Text style={{ color: '#333',fontSize: 25,textAlign: 'right',paddingRight: 8}}>&#10005;</Text>
                    </TouchableOpacity>
                 </View>

                 </View>
               <View style={[styles.jobList,{flex : 6}]}>            
                     <View style = {[{padding: 0}]}>
                        <ListView //last
                              scrollEnabled = { true }
                              dataSource={this.state.dataSource}
                              renderRow={this.renderExistingjobs}/>
                      </View>
               </View>

               <View style = {{flexDirection : 'row', flex : 1,justifyContent:'center', position:'relative',paddingTop: 15 ,paddingBottom: 10,}}>
                <View style = {{paddingLeft: 5,paddingRight: 5,}}>
                  <TouchableHighlight
                      style={{backgroundColor : "#57a3e2",borderRadius: 30,padding: 10,paddingLeft: 20,paddingRight: 20,}}
                      onPress={() => this.createJobPressed()}
                      underlayColor='#4582b5'>
                      <Text style={[globalStyles.globalBtnTextViewStyle,styles.myJobsButtons]}>
                        Create New Job
                      </Text>
                  </TouchableHighlight>
                </View> 

                <View style = {{paddingLeft: 5,paddingRight: 5,}}>
                  <TouchableHighlight
                      onPress={() => this.addToJob()}
                      style={{backgroundColor : "#57a3e2",borderRadius: 30,padding: 10,paddingLeft: 20,paddingRight: 20,}}
                      underlayColor='#4582b5'>
                      <Text style={[globalStyles.globalBtnTextViewStyle,styles.myJobsButtons]}>
                      Add to Job
                    </Text>
                  </TouchableHighlight>
                </View> 
                {additionView}
              </View> 

            </Animated.View>
         </View>


      );
   }
   open() {
      this.setState({open: true});
      this.setPhase(1);
   }
   close() {
     this.createAndAddPressed();
      this.setPhase(0);
   }
   closePopup = () => {
      this.state.open = true;
      console.log('this.state.open : '+this.state.open)
   }

renderExistingjobs = (rowData, sectionID, rowID) => {
      return <View style = {{flexDirection : 'column', padding : 5}}>        
          <View style={[styles.rowView,{flexDirection : "row", borderBottomWidth: 1,paddingTop: 8,paddingBottom: 10, borderColor: "#CCC",alignItems:'stretch',alignSelf:'stretch'}]}>    
              <View style ={{  flex : 5,alignSelf: "center",}}>
                <Text style = {[globalStyles.headerTxt3,{paddingLeft:15,}]}>{rowData.JobName} # {rowData.JobID}</Text>   
              </View>
              <View style ={{flex : 1, alignItems : "center", alignSelf: "center",justifyContent: "center"}}>
                <TouchableOpacity onPress = {() => this.checkBoxPressEvent(rowID)}>                         
                    <Image style={{width: 20,height: 20,}} source={ this.state.imageSelecteState[rowID]?require('../resources/images/CheckedStep.png') :require('../resources/images/UncheckedStep.png')}/>
                </TouchableOpacity>                             
              </View>                                                              
          </View>
          <View style={{alignSelf : "stretch", height : 1,borderBottomWidth: 1, borderBottomColor: "#CCC"}}>
          </View>
      </View>
  }

   animateOffset(offset) {
      Animated.spring(
         this.state.offset,
         {toValue: offset}
      ).start();
   }

checkBoxPressEvent = (rowId) => {

 var imageState=[];
    for(var i=0; i<dataResource.jobDetails.length;i++){
      if(i==rowId){
        imageState[i]=!this.state.imageSelecteState[i]
      }
      else{
        imageState[i]=this.state.imageSelecteState[i]
      }

    }
     this.setState({
      imageSelecteState:imageState
     });  
}

/*modalDidOpen = () => {

   console.log('modalDidOpen... '+this.state.open);
   console.log('modal did open');
}*/

/*
  Objective: Start web service to get user current location
  @Param: null
  @return: null
  */
 createJobPressed(){
    let activityIndicator = new ActivityIndicator();
    activityIndicator.startActivity();
    getAddressByLatLong(this.getLocationResponseCallBack)
 }

/*
  Objective: implement response for getJobs webserives
  @Param: locationResponse, error : location detail or error if any
  @return: null
  */
 getLocationResponseCallBack(locationResponse, error){
   let activityIndicator = new ActivityIndicator();
    activityIndicator.stopActivity();
    var location = ""
    if(error){
        alert(error);
    }
    else{
        location = locationResponse.results[0].formatted_address;
    }
    
     this.setState({
      inputText: "",
      willShowAddView: true,
      locationPlaceHolder : location
    });
 }

 addToJob(){
  alert("Development in Progress");
 }

 createAndAddPressed(){

    this.setState({willShowAddView: false});
 }

 setTextinputValue(value){
  this.setState({inputText: value});
 }

}

CustomModal.propTypes = {
   open: PropTypes.bool,
   offset: PropTypes.number,
   overlayBackground: PropTypes.string,
   animationDuration: PropTypes.number,
   animationTension: PropTypes.number,
   //modalDidOpen: PropTypes.func,
   modalDidClose: PropTypes.func,
   closeOnTouchOutside: PropTypes.bool,
};

CustomModal.defaultProps = {
   open: false,
   offset: 0,
   overlayBackground: 'rgba(0, 0, 0, 0.75)',
   animationDuration: 200,
   animationTension: 40,
   //modalDidOpen: () => undefined,
   modalDidClose: () => undefined,
   closeOnTouchOutside: true,
};


const styles = StyleSheet.create({
   absolute: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0)'
   },
   container: {
      justifyContent: 'center'
   },
   defaultModalStyle: {
      borderRadius: 2,
      margin: 15,
      padding: 10,
      backgroundColor: '#FFF',
      position: 'relative'
      //height : this.state.heightAsPerDevice, // By Ravi

   },
   hidden: {
      top: -10000,
      left: 0,
      height: 0,
      width: 0
   },

   textInputStyle: {
    paddingTop : 9,
    paddingLeft : 3,
    paddingBottom : 5,
    paddingLeft: 10,
    borderColor : "black", 
    height: 35,
    fontWeight: "100",
    fontWeight: 'normal',
    color:"#000000", 
    fontSize: 14,
    fontFamily: 'Droid Serif',
    fontStyle: 'italic',
    borderColor:"lightgray", 
    borderWidth:1, borderRadius:2, 
    shadowOffset : {width: 1, height: 1.0}, 
    shadowColor : "#808080",
    shadowOpacity : 0.2,
    shadowRadius : 2,
    minWidth: 250,
  },
  myJobsTxt :{
    color : "#06273F", 
    paddingRight : 20, 
    fontWeight : "normal", 
    fontFamily : "Montserrat", 
    fontSize : 18
  },
  myJobsButtons:{
    fontSize: (Platform.OS === 'ios' ? 12 : 12),
  },
  defaultBtn: {
    padding: 10, 
    borderRadius : 30, 
    backgroundColor : "#57a3e2",
  }
});

export default CustomModal;
