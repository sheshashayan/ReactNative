

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

const CustomThreeRadioButton = (props) => {

    let lthreeRadiofirstBtnLbl = props.threeRadiofirstBtnLbl;
    let lthreeRadiosecondBtnLbl = props.threeRadiosecondBtnLbl;
    let lthreeRadiothirdBtnLbl = props.threeRadiothirdBtnLbl;

    return (
        <View style = {{flexDirection : 'row'}}>
            <View>
                <TouchableOpacity style = {{padding:10}} onPress = {props.threeRadioBtnFirstEventHandle}>
                    <Image style={[{width: 22 , height: 22}]} source={(props.isThreeCheckedFirst)? props.radioBtnCheckedImg3 : props.radioBtnUnCheckedImg3} />
                </TouchableOpacity>
            </View>
            <View style = {{paddingTop : 15}}>
                <Text style={[globalStyles.subordinateTxt,{paddingRight : 50}]}>{lthreeRadiofirstBtnLbl}</Text>
            </View>

            <View>
                <TouchableOpacity style = {{padding:10}} onPress = {props.threeRadioBtnSecondEventHandle}>
                    <Image style={[{paddingTop : 10,width: 22 , height: 22}]} source={(props.isThreeCheckedSecond)? props.radioBtnCheckedImg3 : props.radioBtnUnCheckedImg3} />
                </TouchableOpacity>
            </View>
            <View style = {{paddingTop : 15}}>
                <Text style={[globalStyles.subordinateTxt,{paddingRight : 50}]}>{lthreeRadiosecondBtnLbl}</Text>
            </View>

            <View>
                <TouchableOpacity style = {{padding:10}} onPress = {props.threeRadioBtnThirdEventHandle}>
                    <Image style={[{paddingTop : 10,width: 22 , height: 22}]} source={(props.isThreeCheckedThird)? props.radioBtnCheckedImg3 : props.radioBtnUnCheckedImg3} />
                </TouchableOpacity>
            </View>
            <View style = {{ paddingTop : 15}}>
                <Text style={[globalStyles.subordinateTxt,{paddingRight : 50}]}>{lthreeRadiothirdBtnLbl}</Text>
            </View>
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
})

export default CustomThreeRadioButton;