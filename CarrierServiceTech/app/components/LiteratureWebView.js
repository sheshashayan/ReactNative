import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Button,
    Alert,
    AppRegistry,
    Text,
    TextInput,
    ListView,
    Image,
    TouchableHighlight,
    TouchableOpacity,
    AsyncStorage,
    WebView
} from 'react-native';
import GridLiterature from './GridLiterature';
import LinearGradient from 'react-native-linear-gradient';
import {globalStyles, deviceFinder} from "./globalStyles";
import BackNavComponent from "./BackNavComponent";
import * as stringConstant from '../constants/StringConstant';
import ActivityIndicator from "./ActivityIndicator";

const backNavText = stringConstant.carrierConstClass.CHANGE_ANOTHER_STORE_BACK_BUTTON_FILTER;
class LiteratureWebView extends Component {

    constructor(props) {
        super(props);
        this.state = {

            URL: this.props.URL,
        }

    }
    render() {
        // let activityIndicator = new ActivityIndicator();
        // activityIndicator.startActivity();
        return (
            <View style={styles.container}>
                <View style={[globalStyles.backNavBtnStyle,styles.backNavBtnStyle]}>
                    <TouchableOpacity style={[]} onPress={ this.backToMainSearch }>
                        <BackNavComponent backNavText={backNavText}/>
                    </TouchableOpacity>
                </View>



                <View style={{backgroundColor: "#CACACA", flexDirection: 'row', height: 50,}}>

                    <View
                        style={{backgroundColor: "#CACACA", flexDirection: 'row', flex: 1, justifyContent: 'center',paddingTop: 10,paddingRight:10}}>
                        <View style={styles.webViewTopBtnContainer}>
                            <TouchableHighlight style={[styles.webViewTopBtns]} onPress={this.globalLiteratureFilterNav} underlayColor='#4582b5'>
                                <Text style={[styles.globalBtnTextViewStyle]}>ADD TO JOB </Text>
                            </TouchableHighlight>

                        </View>
                        <View style={styles.webViewTopBtnContainer}>
                            <TouchableHighlight
                                style={[styles.webViewTopBtns]} onPress={this.emailBtnPress} underlayColor='#4582b5'>
                                <Text style={[styles.globalBtnTextViewStyle]}>EMAIL</Text>
                            </TouchableHighlight>
                        </View>

                    </View>


                </View>


                <WebView style={{ flex: 1}}
                         javaScriptEnabled={true}
                         onLoadStart = {() => this.loadIndicator() }
                         onLoadEnd = {() => this.stopIndicator() }
                         source={{ uri: this.state.URL }}
                         onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                         scalesPageToFit={true}
                >
                </WebView>



            </View>


        );

    }

    onShouldStartLoadWithRequest = (event) => {
        // Don't forget to return!
        return true;
    };

    loadIndicator = () => {
        let activityIndicator = new ActivityIndicator();
        activityIndicator.startActivity();
    }

    stopIndicator = () => {
        let activityIndicator = new ActivityIndicator();
        activityIndicator.stopActivity();
    }
    backToMainSearch = () => {
        this.props.navigator.pop();
    }

    //the handling method of the event onNavigationChange
    onNavigationChange(event) {

        // let activityIndicator = new ActivityIndicator();
        // activityIndicator.stopActivity();

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        paddingTop: 64,
    },
    textbtnLeft: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 6,
        color: 'white',
        fontFamily: 'Montserrat',



    },
    textbtnRight: {
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: 6,
        color: 'white',
        fontFamily: 'Montserrat',



    },

    // globalBtnStyle: {
    //     padding: 2,
    //     backgroundColor: "#57a3e2",
    //     marginTop: 0,
    // },
    globalBtnTextViewStyle: {
        textAlign: 'center',
        color: "#FFFFFF",
        fontFamily:'Montserrat',
        fontSize: 12,
    },
    webViewTopBtnContainer:{
        height: 50,
        justifyContent:'flex-start',
        marginRight: 5,
        marginLeft: 5,
        alignItems:'flex-start',


    },

    webViewTopBtns:{
        backgroundColor: "#57a3e2",
        padding: 7,
        paddingLeft: 30,
        paddingRight:30,
        borderRadius: 20,
        textAlign:'center',

    },
    backNavBtnStyle:{
        paddingTop: 5,
    }

});


export default LiteratureWebView;