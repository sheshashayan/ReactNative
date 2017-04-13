import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    Platform,
} from 'react-native';

var windowWidth = Dimensions.get('window').width;
var windowHeight = Dimensions.get('window').height;
console.log("windowHeight : " + this.windowHeight);

const globalStyles = StyleSheet.create({
    headerTxt1: {
        color: "#F6F6F6",
        fontWeight: "400",
        ...Platform.select({
            ios: {
                fontSize: 20,
            },
            android: {
                fontSize: 18,
                fontWeight: "300",
            },
        }),
        fontFamily: 'Montserrat',
    },
    headerTxt2: {
        color: "#6A6A6A",
        fontSize: 18,
        fontFamily: 'Montserrat',
        fontWeight: '300'
    },
    headerTxt3: {
        color: "#6A6A6A",
        fontSize: 16,
        fontFamily: 'Montserrat',
        fontWeight: '300'
    },
    headerTxt4: {
        color: "#6A6A6A",
        fontSize: 14,
        fontFamily: 'Montserrat',
        fontWeight: '300'
    },
    subordinateTxt: {
        color: "#6A6A6A",
        fontFamily: 'Droid Serif',
        fontWeight: 'normal',
        fontStyle: 'italic',
        fontSize: 12,
    },
    specialMsgTxt: {
        color: "#F6F6F6",
        fontSize: 16,
        fontFamily: 'Droid Serif',
        fontWeight: 'normal',
        fontStyle: 'italic',
    },
    buttonTxt: {
        color: "#6A6A6A",
        fontSize: 12,
        fontFamily: 'Montserrat',
        fontWeight: 'normal'
    },
    ResultsTxt: {
        color: "#6A6A6A",
        fontSize: 40,
        fontFamily: 'Montserrat',
        fontWeight: 'normal'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: 64,
        flexDirection: 'column',
    },
    colorCodes: {
        color: "#06273F",
        // color: "#429BE4",
        // color: "#6A6A6A",
        // color: "#CACACA",
        // color: "F6F6F6",
    },
    addIcon: {},
    globalBtnStyle: {
        marginTop: 25,
        marginLeft: 50,
        marginRight: 50,
        padding: 10,
        borderRadius: 30,
        backgroundColor: "#57a3e2"
    },
    globalBtnTextViewStyle: {
        textAlign: 'center',
        color: "#FFFFFF",
        fontFamily: 'Montserrat',
    },
    imageLogoView: {
        paddingTop: 60,
        paddingBottom: 40,
        alignItems: "center"
    },
    imageLogo: {
        width: 220,
        height: 90
    },
    compContainer: {
        backgroundColor: "#f7f7f7",
        flex: 1,
    },
    heading_Level_1: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'normal',
        // fontfamily: 'Montserrat-Regular'
    },
    heading_Level_2: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'normal',
        // fontfamily: 'Montserrat-Light'
    },
    special_messaging_text: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'normal',
        fontStyle: 'italic',
        // fontfamily: 'Montserrat-Light'
    },
    text_Input: {
        height: 60,
        color: 'white',
        fontSize: 18,
        fontWeight: 'normal',
    },
    titleText: {
        color: "#6A6A6A",
        fontSize: 20,
        fontFamily: 'Montserrat',
        fontWeight: "400",
    },
    rowView: {
        flexDirection: 'row',
    },
    columnView: {
        flexDirection: 'column',
    },
    Link: {
        color: "#429be4",
        fontSize: 12,
        fontFamily: 'Montserrat',
        fontWeight: 'normal',
        textDecorationLine: 'underline',
    },
    LinkText: {
        color: "#429be4",
        fontSize: 12,
        fontFamily: 'Montserrat',
        fontWeight: 'normal',
    },
    backNavBtnStyle: {
        alignSelf: "flex-start",
        justifyContent: "flex-start"
    }

});

var deviceFinder = {
    windowWidth: Dimensions.get('window').width,
    windowHeight: Dimensions.get('window').height,
    platform: Platform.OS,
    isItiPad: function () {
        if (this.windowWidth > 700 && this.platform === "ios") {
            return true;
        }
        else {
            return false;
        }
    },
    isItiPhone6S: function () {
        if ((this.windowWidth >= 360 && this.windowWidth < 500) && this.platform === "ios")
            return true;
        else
            return false;
    },
    isItiPhone5S: function () {
        if ((this.windowWidth >= 310 && this.windowWidth <= 360) && this.platform === "ios")
            return true;
        else
            return false;
    },
    isItiPhone4: function () {
        if ((this.windowWidth >= 260 && this.windowWidth <= 340) && this.platform === "ios")
            return true;
        else
            return false;
    },
    isIt7InchTablet: function () {
        if ((this.windowWidth > 500 && this.windowWidth < 700) && this.platform === "android")
            return true;
        else
            return false;
    },
    isIt10InchTablet: function () {
        if ((this.windowWidth > 700) && this.platform === "android")
            return true;
        else
            return false;
    },
    isItAndroidPhone: function () {
        if ((this.windowWidth > 300 && this.windowWidth < 500) && this.platform === "android")
            return true;
        else
            return false;
    },
}
module.exports = {
    deviceFinder,
    globalStyles
}
