/**
 * # EndUserLicense.js
 * Purpose:End User License page as soon as the User launch the App first time
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
    Alert,
    ScrollView,
    BackAndroid,
    AsyncStorage,
    StatusBar,
    Platform
} from 'react-native';
import {globalStyles, deviceFinder} from "./globalStyles";
import Modal from 'react-native-simple-modal';
import * as stringConstant from '../constants/StringConstant';

var alertMessage = 'You must agree End User License terms in order to use this app'
const correctStatusBar= "";
export default class EndUserLicense extends Component {
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
        let html = stringConstant.carrierConstClass.ENDUSER_LICENSE;
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
                    <TouchableHighlight style={styles.declineButton} onPress = {this.declineButtonAction}>
                        <View>
                            <Text style={styles.declineText}>DECLINE</Text>
                        </View>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.acceptButton} onPress =  {this.acceptButton}>
                        <Text style={styles.acceptText} onPress =  {this.AcceptEndUserPolicy}>ACCEPT</Text>
                    </TouchableHighlight>
                </View>

            </View>


        );
    }

//Navigate to Login page on tapping the "Accept" button
    AcceptEndUserPolicy = () => {
        var key = 'isEULAAcceptedKey';
        var value = 'isEULAAcceptedValue';
        AsyncStorage.setItem(key, JSON.stringify(value))

        this.props.navigator.immediatelyResetRouteStack([{
            name:'LoginTypes',
            title:'Login Types',
            isHidden:true
        }]);
    }

    declineButtonAction = () =>{
        Alert.alert(
                  'End User License',
                  stringConstant.carrierConstClass.EULA_ALERT_MESSAGE,
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
        paddingTop:10
    }

})