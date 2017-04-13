import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  TouchableOpacity,
  Image,
  ScrollView
} from 'react-native';
import * as dataResource from './dataResource';
import CellView from "./CellView"; 
import * as stringConstant from '../constants/StringConstant';
import BackNavComponent from "./BackNavComponent";

const backNavText = stringConstant.carrierConstClass.WARRANTY_DETAILS_PAGE_BACK_BUTTON;

export default class ServiceContracts extends Component {
 constructor(props) {
	  super(props);
	  this.state = {
        backArrow : "<",
        serviceContractsArray: this.props.serviceContractsArray,
        contractNumber: "",
        cancelReason:"",
        modelNumber:"",
        modelName:"",
        serialNumber:"",
        serviceProviderName:"",
        thirdPartyContractNumber:"",
        planNumber:"",
        planType:"",
        planName:"",
        coverageStart:"",
        coverageEnd:""
    	};

	  };


    /* Updated by: Rakesh
    Adding view life cycle method
    componentWillMount() is invoked immediately after a component is mounted. 
*/
  componentWillMount(){
  
    let lcontractNumber= null;
    let lcancelReason = null;
    let lmodelNumber = null;
    let lmodelName = null;
    let lserialNumber = null;
    let lserviceProviderName = null;
    let lthirdPartyContractNumber = null;
    let lplanNumber = null;
    let lplanType = null;
    let lplanName = null;
    let lcoverageStart = null;
    let lcoverageEnd = null;

    let planArray = [];
    this.state.serviceContractsArray.forEach(function(element){
      
      if(element.dataKey === "contractNumber"){
        lcontractNumber = element.dataDescription
      }else if(element.dataKey === "cancelReason"){
        lcancelReason = element.dataDescription
      }else if(element.dataKey === "modelNumber"){
        lmodelNumber = element.dataDescription
      }else if(element.dataKey === "modelName"){
        lmodelName = element.dataDescription
      }else if(element.dataKey === "serialNumber"){
        lserialNumber = element.dataDescription
      }else if(element.dataKey === "serviceProviderName"){
        lserviceProviderName = element.dataDescription
      }
      else if(element.dataKey === "planInfo"){
        planArray = element.detailExt

        planArray.forEach(function(element){

          if(element.extDataKey === "thirdPartyContractNumber"){
            lthirdPartyContractNumber = element.extDataDescription
          }else if(element.extDataKey === "planNumber"){
            lplanNumber = element.extDataDescription
          }
          else if(element.extDataKey === "planType"){
            lplanType = element.extDataDescription
          }
          else if(element.extDataKey === "planName"){
            lreplSerial = element.extDataDescription
          }
          else if(element.extDataKey === "coverageStart"){
            lcoverageStart = element.extDataDescription
          }
          else if(element.extDataKey === "coverageEnd"){
            lcoverageEnd = element.extDataDescription
          }
        });
      }
    });

  this.setState({
      contractNumber:lcontractNumber,
      cancelReason:lcancelReason,
      modelNumber:lmodelNumber,
      modelName:lmodelName,
      serialNumber:lserialNumber,
      serviceProviderName:lserviceProviderName,
      thirdPartyContractNumber:lthirdPartyContractNumber,
      planNumber:lplanNumber,
      planType:lplanType,
      planName:lplanName,
      coverageStart:lcoverageStart,
      coverageEnd:lcoverageEnd
    })

  }
    
  render() {

     let contractDetaisl = null;
      let providerDetails = null;
      let thirdPartyNumberDetails = null;
      let planNumberDetails = null;
      let planTypeDetails = null;
      let coverageDetails =null;
      let coverageEnd = null;



       contractDetaisl = (<View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                  <Text style= {styles.textStyleLeft}>Contract Number:</Text>
                  <Text style= {[styles.textStyleRight, {paddingLeft:64}]}>{this.state.contractNumber}</Text>
                </View>)
       providerDetails = (<View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" ,backgroundColor:'#CACACA'}}>
                  <Text style= {styles.textStyleLeft}>Provider Name:</Text>
                  <Text style= {[styles.textStyleRight, {paddingLeft:78}]}>{this.state.serviceProviderName}</Text>
                </View>)
       thirdPartyNumberDetails = ( <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                    <Text style= {styles.textStyleLeft}>3rd Party Contract Number:</Text>
                    <Text style= {[styles.textStyleRight, {paddingLeft:4}]}>{this.state.thirdPartyContractNumber}</Text>            
                </View>)
       planNumberDetails = ( <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row", backgroundColor:'#CACACA' }}>
                    <Text style= {styles.textStyleLeft}>Plan Number:</Text> 
                    <Text style= {[styles.textStyleRight, {paddingLeft:90}]}>{this.state.planNumber}</Text>                
                </View>)
       planTypeDetails = (<View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                    <Text style= {styles.textStyleLeft}>Plan Type:</Text>  
                    <Text style= {[styles.textStyleRight, {paddingLeft:110}]}>{this.state.planType}</Text>
                </View>)
       coverageDetails = ( <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row", backgroundColor:'#CACACA' }}>
                    <Text style= {styles.textStyleLeft}>Coverage Start:</Text>  
                    <Text style= {[styles.textStyleRight, {paddingLeft:75}]}>{this.state.coverageStart}</Text>
                </View>)

       coverageEnd = ( <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                    <Text style= {styles.textStyleLeft}>Coverage End:</Text>  
                    <Text style= {[styles.textStyleRight, {paddingLeft:79}]}>{this.state.coverageEnd}</Text>
                </View>)


    return (
     
        <View  style = {[styles.container]} >
          <View style = {[styles.backNavBtnStyle]}>
            <TouchableOpacity onPress = { this.backToWarrantyPage }  > 
                <BackNavComponent 
                    backNavText =  {backNavText} />
             </TouchableOpacity>     
          </View>

         <ScrollView>  
          <View   style = {styles.upperContainer}>
            <View style = {{ paddingLeft:20,backgroundColor:'#6A6A6A'}}>
            <Text style= {{color : "#FFFFFF", paddingRight : 20, fontSize:12, fontWeight:'bold', fontFamily : "Montserrat", }}>Claim#12344</Text>
            </View>
            <View style = {{ flexDirection : "column",paddingTop : 10,}}>
              {contractDetaisl}
              {providerDetails}
              {thirdPartyNumberDetails}
              {planNumberDetails}
              {planTypeDetails}
              {coverageDetails}
              {coverageEnd}

            </View>
        </View>
      </ScrollView>
    </View>  
   
    
    );
  }

   backToWarrantyPage = () => {
      this.props.navigator.pop();
  }
 
}

const styles = StyleSheet.create({
  container:{
        flex:1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        paddingTop : 64,
    },
  upperContainer: {
    flexDirection : "column",  
    paddingTop: 10,
    paddingBottom: 10,
  },
   backToFilterBasesView : {
    paddingTop: 10, 
    paddingLeft:5, 
    height : 50,
  },
  filterOptionsView : {
  alignSelf : "stretch", 
  paddingTop: 20, 
  paddingLeft:10, 
  flex : 18 ,  
  flexDirection : "column", 
  justifyContent : "flex-start", 
  alignItems : "flex-start",
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
  backToCrossRefStyle : {
    alignSelf:'flex-start', 
    justifyContent : "flex-start", 
    marginTop :0, 
    marginLeft: 0 
  },
  listNav: {
    flex:5,
  },
  rowView : {
    paddingTop: 2, 
    paddingBottom: 5,   
    paddingLeft: 5,
    paddingRight: 5,
    height: 80, 
  },
  textStyleLeft:{
    color : "#6A6A6A", 
    paddingRight : 20, 
    fontWeight : "normal", 
    fontFamily : "Montserrat", 
    fontSize : 12,
    paddingBottom:10,
  },
  textStyleRight:{
    color : "#000000", 
    paddingRight : 20, 
    fontWeight : "normal", 
    fontFamily : "Montserrat", 
    fontSize : 12,
    paddingBottom:9,
    flex:1,
    textAlign:'left',
  },



});