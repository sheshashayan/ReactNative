/**
 * # LoginTypesIpad.js
 * This class will render the two types of login
 * Author: Ravichandran P
 */

import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    StatusBar,
    Platform,
} from 'react-native';


import * as stringConstant from '../constants/StringConstant';
import SideMenu from "./SideMenu";
import HvacPartnersLogin from "./HvacPartnersLogin";
import {globalStyles, deviceFinder} from "./globalStyles";
const correctStatusBar= "";
export default class LoginTypesIpad extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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
        return (
            <View style={[globalStyles.CompContainer, {
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: "stretch"
            }]}>

                {correctStatusBar}

                <View style={{
                    paddingTop: 80,
                    paddingBottom: 40,
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center'
                }}>
                    <Image
                        style={styles.guestSignupImage}
                        source={require('../resources/images/carrierLogo.png')}/>
                </View>
                <View style={[{flex: 3, flexDirection: 'column', justifyContent: 'center'}]}>

                    <View style={[{flex: 0.5, flexDirection: 'column', alignItems: "center", paddingTop: 20}]}>
                        <Text style={[globalStyles.headerTxt4, {color: "#06273F"}]}>Guest login will grant you access to
                            some </Text>
                        <Text style={[globalStyles.headerTxt4, {color: "#06273F"}]}>of the features within the app. You
                            can </Text>
                        <Text style={[globalStyles.headerTxt4, {color: "#06273F"}]}>always login through HVAC
                            Partners </Text>
                        <Text style={[globalStyles.headerTxt4, {color: "#06273F"}]}>within the app under user
                            settings.</Text>
                    </View>
                    <View style={[{flex: 2}]}>
                        <TouchableHighlight style={[globalStyles.globalBtnStyle, styles.HVACBtnStyle]}
                                            onPress={this.LoginAsHvacPartner} underlayColor='#4582b5'>
                            <View style={[]}>
                                <Text style={[globalStyles.globalBtnTextViewStyle]}>Login through HVAC Partners</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight style={[globalStyles.globalBtnStyle, styles.guestLoginBtnStyle]}
                                            onPress={this.LoginAsGuest} underlayColor='#4582b5'>
                            <View style={[]}>
                                <Text style={[globalStyles.globalBtnTextViewStyle]}>
                                    Login as a Guest
                                </Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        );
    }

    /**
     * # LoginAsHvacPartner
     * Purpose: This function is invoked to handle the action on login through HVACPartners button
     * Author: Ravichandran P
     * Input Param:
     * Output Param:
     */
    LoginAsHvacPartner = () => {
        this.props.navigator.push({
            name: 'HvacPartnersLogin',
            title: 'HvacPartnersLogin',
            isHidden: true
        });
    }

    /**
     * # LoginAsGuest
     * Purpose: This function will be invoked to handle the action on guest as login button
     * Author: Ravichandran P
     * Input Param:
     * Output Param:
     */
    LoginAsGuest = () => {
        let sideMenu = new SideMenu();
        sideMenu.setupLogoutBtnText(stringConstant.carrierConstClass.LOGINAS_HVAC_PARTNERS);
        this.props.navigator.replace({
            name: 'MainSearchView',
            title: 'Search for a Product',
            isHidden: false
        });
    }
}

const styles = StyleSheet.create({
    guestSignupImage: {

    },
    HVACBtnStyle: {
        marginTop: 20,

    },
    guestLoginBtnStyle: {
        marginTop: 40,
    }
});
