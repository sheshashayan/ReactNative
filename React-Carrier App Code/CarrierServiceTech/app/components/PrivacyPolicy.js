/**
 * # PrivacyPolicy.js
 * Purpose:Privacy Policy page as soon as the User launch the App first time
 * Author: Girija
 */

import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Image,
    WebView,
    ScrollView,
    Alert,
    BackAndroid,
    AsyncStorage,
    StatusBar,
    Platform
} from 'react-native';
import {globalStyles, deviceFinder} from "./globalStyles";
import Modal from 'react-native-simple-modal';
import EndUserLicense from "./EndUserLicense";
import Router from "./Router";
import * as stringConstant from '../constants/StringConstant';


const correctStatusBar= "";
export default class PrivacyPolicy extends Component {
    state = {open: false};

    constructor(props) {
        super(props);
    }
    componentWillMount(){
        if(Platform.OS === "android"){
            correctStatusBar =(<StatusBar
                backgroundColor="#06273F"
                barStyle=  "light-content"
            />);
        }
        else{
            correctStatusBar =( <StatusBar
                backgroundColor="#06273F"
                barStyle=  "dark-content"
            />);
        }
    }
    render() {
        let html = stringConstant.carrierConstClass.PRIVACY_POLICY;
        return (

            <View style = {[globalStyles.CompContainer,styles.container]}>
                {correctStatusBar}
                <View style = {styles.logo}>
                    <Image source={require('../resources/images/carrierLogo.png')}/>
                </View>

                <View style={styles.webView}>
                    <View style ={styles.webViewStyle}>
                        <WebView source={{html}} />
                    </View>
                </View>

                <View style={styles.footer}>
                    <TouchableHighlight style={styles.declineButton} onPress={this.declineButtonAction} underlayColor='#4582b5'>
                        <Text style={styles.declineText}>DECLINE</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.acceptButton} onPress =  {this.AcceptPrivacyPolicy} underlayColor='#4582b5'>
                        <Text style={styles.acceptText} >ACCEPT</Text>
                    </TouchableHighlight>
                </View>
            </View>


        );
    }

//Navigate to End User License page on tapping the "Accept" button
    AcceptPrivacyPolicy = () => {
        var key = 'privacyKey';
        var value = 'isPrivacyAccepted';
        AsyncStorage.setItem(key, JSON.stringify(value))


        this.props.navigator.immediatelyResetRouteStack([{

            name:'EndUserLicense',
            title:'End User License',
            isHidden:true
        }]);
    }

    declineButtonAction = () =>{
        Alert.alert(
                  'Privacy Policy',
                  stringConstant.carrierConstClass.POLICY_ALERT_MESSAGE,
                  [{text: 'OK'},]);
    }
}



const styles = StyleSheet.create({
    container:{
        flex : 1,
        flexDirection : 'column',
        justifyContent : 'space-around',
        alignItems : "stretch"
    },
    logo:{
        paddingTop: 30,
        paddingBottom: 90,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    webView: {
        flex: 5,
        flexDirection: 'column',
        marginTop: 10,
        marginBottom: 30,
    },
    footer: {
        flex:0.1,
        flexDirection:'row',
        height:80,
        alignItems:'center',
        marginBottom: 11,
    },
    declineButton: {
        alignItems:'center',
        justifyContent: 'center',
        flex:1,
        height:40,
        backgroundColor:'#FFFFFF',
        borderColor:'#57a3e2',
        borderWidth:2,
        fontSize:12,
    },
    acceptButton: {
        alignItems:'center',
        justifyContent: 'center',
        flex:1,
        height:40,
        backgroundColor:'#57a3e2',
        borderColor:'#57a3e2',
        borderWidth:2,
        textAlign : 'center',
        fontFamily: 'Montserrat',
        fontSize:12,
    },

    acceptText: {
        color:'white',
        fontWeight:'bold',
        alignItems:'center',
        fontFamily: 'Montserrat',
        fontSize:12,
    },
    declineText: {
        color:'#57a3e2',
        fontWeight:'bold',
        alignItems:'center',
        fontFamily: 'Montserrat',
        fontSize:12,
    },

    webViewStyle:{
        flex :1,
        flexDirection : 'row',
        justifyContent : 'center',
        paddingTop:10,
    }
})