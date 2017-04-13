

import ActivityIndicator from "../components/ActivityIndicator";
import * as stringConstant from '../constants/StringConstant';
import { Alert } from 'react-native';


const showAlert = (pMessage) =>{
  //Close Indicator started from web service
  let activityIndicator = new ActivityIndicator();
  activityIndicator.stopActivity();
    Alert.alert(stringConstant.carrierConstClass.ALERT, pMessage,
                        [{text: 'OK', onPress: () => {   }} ],
                        { cancelable: false })

}

module.exports = {showAlert}
