import React, { Component } from 'react';
import {
   StyleSheet,
   View,
   Text,
   Navigator,
   TouchableOpacity,
   Platform,
} from 'react-native';

class BackNavComponent extends Component {
  render() {
    const { backNavText } = this.props;  
    return(
       <View style= {{height:30, paddingLeft : 10}}>            
            <Text style = {styles.backToFilterBaseTxtStyle}>{this.props.backNavText}</Text>            
        </View >   
    ); 

  }
}
const styles = StyleSheet.create({

	container : {
	flex : 1,
	flexDirection : "column",
	justifyContent : "flex-start",
	alignItems: 'flex-start',
	backgroundColor : "#F6F6F6",
    paddingTop: 64,
	},

  backToFilterBaseTxtStyle : {
    color : "#429BE4", 
    fontFamily : "Droid Serif", 
    fontStyle : 'italic', 
    fontWeight : '100', 
    fontSize : 12, 
    paddingTop: 10
  },

});

export default BackNavComponent;