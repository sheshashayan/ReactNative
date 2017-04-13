
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

export default class ServiceHistory extends Component {
 constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
        backArrow : "<",
         dataSource : ds.cloneWithRows(dataResource.listItemData.Warranty_Page_List),
      };
    };
    
    
  render() {
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

            <View style = {{ flexDirection : "column",paddingTop : 10,}}>

            <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                <Text style= {styles.textStyleLeft}>Serial Number:</Text>
                <Text style= {[styles.textStyleRight, {paddingLeft:16}]}>QW1233</Text>
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row",  }}>
                <Text style= {styles.textStyleLeft}>Model Number:</Text>
                 <Text style= {[styles.textStyleRight, {paddingLeft:12}]}>RT231232</Text>
              </View>
            </View>

           <View style = {{ paddingLeft:20,backgroundColor:'#6A6A6A'}}>
            <Text style= {{color : "#FFFFFF", paddingRight : 20, fontSize:12, fontWeight:'bold', fontFamily : "Montserrat", }}>Claim#12344</Text>
          </View>

          <View style = {{ flexDirection : "column",paddingTop : 10,}}>

            <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                <Text style= {styles.textStyleLeft}>Explanation:</Text>
                <Text style= {[styles.textStyleRight, {paddingLeft:60}]}>Click here to view Explanation</Text>
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" ,backgroundColor:'#CACACA'}}>
                <Text style= {styles.textStyleLeft}>Service Date:</Text>
                 <Text style= {[styles.textStyleRight, {paddingLeft:54}]}>12-03-2017</Text>
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                  <Text style= {styles.textStyleLeft}>Defect Code:</Text>
                  <Text style= {[styles.textStyleRight, {paddingLeft:54}]}>Noise</Text>            
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" ,backgroundColor:'#CACACA'}}>
                  <Text style= {styles.textStyleLeft}>Part Number:</Text> 
                  <Text style= {[styles.textStyleRight, {paddingLeft:52}]}>01CN241#RCD</Text>                
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                  <Text style= {styles.textStyleLeft}>Part Name:</Text>  
                  <Text style= {[styles.textStyleRight, {paddingLeft:65}]}>Transformer</Text>
              </View>
          </View>

          <View style = {{ paddingLeft:20,backgroundColor:'#6A6A6A'}}>
            <Text style= {{color : "#FFFFFF", paddingRight : 20, fontSize:12, fontWeight:'bold', fontFamily : "Montserrat", }}>Claim#12344</Text>
          </View>

          <View style = {{ flexDirection : "column",paddingTop : 10,}}>

            <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                <Text style= {styles.textStyleLeft}>Explanation:</Text>
                <Text style= {[styles.textStyleRight, {paddingLeft:60}]}>Click here to view Explanation</Text>
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" ,backgroundColor:'#CACACA'}}>
                <Text style= {styles.textStyleLeft}>Service Date:</Text>
                 <Text style= {[styles.textStyleRight, {paddingLeft:54}]}>12-03-2017</Text>
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                  <Text style= {styles.textStyleLeft}>Defect Code:</Text>
                  <Text style= {[styles.textStyleRight, {paddingLeft:54}]}>Noise</Text>            
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" ,backgroundColor:'#CACACA'}}>
                  <Text style= {styles.textStyleLeft}>Part Number:</Text> 
                  <Text style= {[styles.textStyleRight, {paddingLeft:52}]}>01CN241#RCD</Text>                
              </View>

              <View style = {{paddingTop : 5, paddingLeft : 25, flexDirection : "row" }}>
                  <Text style= {styles.textStyleLeft}>Part Name:</Text>  
                  <Text style= {[styles.textStyleRight, {paddingLeft:65}]}>Filter Drier</Text>
              </View>
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
    paddingBottom:10,
    flex:1,
    textAlign:'left',
  },



});