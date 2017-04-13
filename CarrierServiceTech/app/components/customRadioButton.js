//This is file is use to implement the Custom Radio Button For Product Cross Reference Pages

import React, { Component } from 'react'
import {
    View,
    TouchableHighlight,
    TouchableOpacity,
    Text,
    Image,
    StyleSheet
} from 'react-native'

import {globalStyles, deviceFinder} from "./globalStyles";

const radioBtnCheckedSrc = require('../resources/images/CheckedStep.png');
const radioBtnUnCheckedSrc = require('../resources/images/UncheckedStep.png');
const CustomRadioButton = (props) =>  {
    var lfirstRadioBtnLbl = props.firstRadioBtnLbl;
    var lsecondRadioBtnLbl = props.secondRadioBtnLbl;

    var lfirstRadioSecondBtnLbl = props.firstRadioSecondBtnLbl;
    var lsecondRadioSecondBtnLbl = props.secondRadioSecondBtnLbl;

    var lfirstRadioThirdBtnLbl = props.firstRadioThirdBtnLbl;
    var lsecondRadioThirdBtnLbl = props.secondRadioThirdBtnLbl;

    /*------The below code is for radio tileon different Product cross reference Page-----*/
    if(props.isItFirstTier === "firstTier"){
        var firstTier = (
            <View style = {{flexDirection : 'row'}}>
                <View>
                    <TouchableOpacity style = {{padding:10}} onPress = {props.radioFirstBtnEventHandle}>
                        <Image style={[{paddingTop : 15,width: 22,height: 22}]} source={props.isCheckedFirst? props.radioBtnCheckedImg : props.radioBtnUnCheckedImg} />
                    </TouchableOpacity>
                </View>
                <View style = {{paddingRight : 35,paddingTop : 15}}>
                    <Text style={[ globalStyles.subordinateTxt]}>{lfirstRadioBtnLbl}</Text>
                </View>
                <View>
                    <TouchableOpacity style = {{padding:10}} onPress = {props.radioSecndBtnEventHandle}>
                        <Image style={[{width: 22 , height: 22}]} source={(props.isCheckedSecond)? props.radioBtnCheckedImg : props.radioBtnUnCheckedImg} />
                    </TouchableOpacity>
                </View>
                <View style = {{paddingRight : 10,paddingTop : 15}}>
                    <Text style={[globalStyles.subordinateTxt]}>{lsecondRadioBtnLbl}</Text>
                </View>
            </View>
        );
    }

    if(props.isItSecondTier === "secondTier"){
        var secondTier = (
            <View style = {{flexDirection : 'row'}}>
                <View>
                    <TouchableOpacity style = {{padding:10}} onPress = {props.radioFirstBtnSecondTileEventHandle}>
                        <Image style={[{paddingTop : 15,width: 22,height: 22}]} source={props.isSecondTileCheckedFirst? props.radioBtnSecondTileCheckedImg : props.radioBtnSecondTileUnCheckedImg} />
                    </TouchableOpacity>
                </View>
                <View style = {{paddingRight : 35,paddingTop : 15}}>
                    <Text style={[ globalStyles.subordinateTxt]}>{lfirstRadioSecondBtnLbl}</Text>
                </View>
                <View>
                    <TouchableOpacity style = {{padding:10}} onPress = {props.radioSecndBtnSecondTileEventHandle}>
                        <Image style={[{width: 22 , height: 22}]} source={(props.isSecondTileCheckedSecond)? props.radioBtnSecondTileCheckedImg : props.radioBtnSecondTileUnCheckedImg} />
                    </TouchableOpacity>
                </View>
                <View style = {{paddingRight : 10,paddingTop : 15}}>
                    <Text style={[globalStyles.subordinateTxt]}>{lsecondRadioSecondBtnLbl}</Text>
                </View>
            </View>
        );
    }

    if(props.isItThirdTier === "thirdTier"){
        var thirdTier = (
            <View style = {{flexDirection : 'row'}}>
                <View>
                    <TouchableOpacity style = {{padding:10}} onPress = {props.radioFirstBtnThirdTileEventHandle}>
                        <Image style={[{paddingTop : 15,width: 22,height: 22}]} source={props.isThirdTileCheckedFirst? props.radioBtnThirdTileCheckedImg : props.radioBtnThirdTileUnCheckedImg} />
                    </TouchableOpacity>
                </View>
                <View style = {{paddingRight : 35,paddingTop : 15}}>
                    <Text style={[ globalStyles.subordinateTxt]}>{lfirstRadioThirdBtnLbl}</Text>
                </View>
                <View>
                    <TouchableOpacity style = {{padding:10, paddingLeft: 60}} onPress = {props.radioSecndBtnThirdTileEventHandle}>
                        <Image style={[{width: 22 , height: 22}]} source={(props.isThirdTileCheckedSecond)? props.radioBtnThirdTileCheckedImg : props.radioBtnThirdTileUnCheckedImg} />
                    </TouchableOpacity>
                </View>
                <View style = {{paddingRight : 10,paddingTop : 15}}>
                    <Text style={[globalStyles.subordinateTxt]}>{lsecondRadioThirdBtnLbl}</Text>
                </View>
            </View>
        );
    }
    return (
        <View style = {{flexDirection : 'column'}}>

            {firstTier}
            {secondTier}
            {thirdTier}

        </View>
    );
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderWidth: 1,
        padding: 25,
        borderColor: 'black'
    }
});
export default CustomRadioButton;