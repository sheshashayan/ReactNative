
/**
 * # AlternativePartCrossReference.js
 * This class is used to show the details for cross reference within alternative parts view.
 * Author: Rakesh
 */

'use strict'

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native';

import * as dataResource from '../components/dataResource';
import * as stringConstant from '../constants/StringConstant';
import { globalStyles, deviceFinder } from "../components/globalStyles";

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        paddingTop : 10,
    },
    viewContainer1:{
        flexDirection: 'row',
        paddingTop : 10,
        paddingLeft:20,
    },
    viewContainer2:{
        flexDirection: 'column',
        paddingTop : 10,
    },
    viewContainer3:{
        flexDirection: 'column',
        paddingTop : 10,
    },
});


export default class AlternativeParts extends Component{
    constructor(props){
        super(props);
        this.state = {
            partDetails:stringConstant.carrierConstClass.PARTDETAILS,
            hpHeader:stringConstant.carrierConstClass.HPHEADER,
            volategHeader:stringConstant.carrierConstClass.VOLTAGEHEADER,
            speedHeader:stringConstant.carrierConstClass.SPEEDHEADER,
            hpValue:stringConstant.carrierConstClass.HPVALUE,
            voltageValue:stringConstant.carrierConstClass.VOLTAGEVALUE,
            speedValue:stringConstant.carrierConstClass.SPEEDVALUE,

        }
    }


    render(){
        return(
            <View style = {styles.container}>
                <Text style = {[globalStyles.headerTxt2,{marginTop: 6, marginLeft:20, marginRight:20, color:'#06273F'}]}>
                                {this.state.partDetails}</Text>

            <View style = {styles.viewContainer1}>
                <View style = {styles.viewContainer2}>
                    <Text style = {[globalStyles.headerTxt3,{marginTop: 6, marginLeft:20, marginRight:20, color:'#06273F'}]}>
                                {this.state.hpHeader}</Text>
                    <Text style = {[globalStyles.headerTxt3,{marginTop: 6, marginLeft:20, marginRight:20, color:'#06273F'}]}>
                                {this.state.volategHeader}</Text>
                    <Text style = {[globalStyles.headerTxt3,{marginTop: 6, marginLeft:20, marginRight:20, color:'#06273F'}]}>
                                {this.state.speedHeader}</Text>
                </View>
                <View style = {styles.viewContainer3}>

                    <Text style = {[globalStyles.headerTxt3,{marginTop: 6, marginLeft:20, marginRight:20,  color:'#CACACA', flex:1, textAlign:'left'}]}>
                                {this.state.hpValue}</Text>

                
                     <Text style = {[globalStyles.headerTxt3,{marginTop: 6, marginLeft:20, marginRight:20, color:'#CACACA',flex:1, textAlign:'left'}]}>
                                {this.state.voltageValue}</Text>

                
                     <Text style = {[globalStyles.headerTxt3,{marginTop: 6, marginLeft:20, marginRight:20, color:'#CACACA',flex:1, textAlign:'left'}]}>
                                {this.state.speedValue}</Text>

                </View>
            </View>
            </View>




        );
    }
}