import React, { Component } from 'react';
import { StyleSheet, View, Button, Alert, AppRegistry,Text, TextInput, ListView, Image, TouchableHighlight} from 'react-native';
import Grid from './Grid';
import LinearGradient from 'react-native-linear-gradient';
class SearchLiterature extends Component {
  constructor() { super();
  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  this.state = { dataSource: ds.cloneWithRows(['row 1', 'row 2','row 3','row 4','row 5','row 6','row 7','row 8']),
  testData : ['row 1', 'row 2','row 3','row 4','row 5','row 6','row 7','row 8'],
  isSalesSelected:true, isTechnicalSelected:false
};
this._onPress = this._onPress.bind(this);
}

_onPress() {
  this.setState({ isSalesSelected:this.state.isSalesSelected?false:true, isTechnicalSelected:this.state.isTechnicalSelected?false:true});
}
render() {
  return (
    <View style={{flex:1}}><View style={styles.container}>
    <Text style={styles.titleText}>Search Literature</Text>

    <View style={[styles.buttonContainerLeft,{backgroundColor:this.state.isSalesSelected?'#669AE1':"#FFFFFF"}]}>
    <Button style={{flex:1}} onPress={this._onPress} title="Sales" color={this.state.isSalesSelected?'#FFFFFF':"#5B6A79"} accessibilityLabel="Tap on Me"/>
    </View>
    <View style={[styles.buttonContainerRight,{backgroundColor:this.state.isTechnicalSelected?'#669AE1':"#FFFFFF"}]}>
    <Button  style={{flex:1}} onPress={this._onPress} title="Technical" color={this.state.isTechnicalSelected?'#FFFFFF':"#5B6A79"} accessibilityLabel="Tap on Me"/>
    </View>
    </View>
    <View style={{flex:3,backgroundColor: 'white'}}>
    <TextInput
     style={{height: 40, borderColor: '#D3D3D3',marginLeft: 18, marginRight: 20,borderWidth: 1, keyboardType: 'default',fontSize:14}}
     placeholder="  Search by Model # or keyword"
     placeholderTextColor='#D3D3D3'/>
     <View style={styles.searchBtnContainer}>
                 <TouchableHighlight onPress={this._onPressSearchBtn}>
                     <LinearGradient
                     start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                     locations={[0,0.5,1]}
                     colors={['#57A3E3', '#56A6D1', '#57A3E3']}
                     underlayColor={['#4582B5', '#498FB5', '#4582B5']}
                     style={styles.buttonGradient}>
                     <Text style={[styles.buttonText,{}]}>
                       Search
                     </Text>
                   </LinearGradient>
                 </TouchableHighlight>
               </View>


   <Grid
   gridData={10}
   dataSource={this.state.testData}
   >
   </Grid>
   </View>
   </View>
 );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop:20,
    marginRight:20,

  },
  buttonContainerLeft: {
    flex:1,
    marginTop: 97,
    shadowColor: '#000000',
    borderWidth: 1,
    borderColor:'grey',
    marginLeft:-150,
  },
  buttonContainerRight: {
    flex:1,
    marginTop: 97,
    shadowColor: '#000000',
    borderWidth: 1,
    borderColor:'grey',
  },
  list: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    item: {
        backgroundColor: 'red',
        margin: 3,
        width: 100
    },
    titleText: {
   fontSize: 18,
   fontWeight: 'bold',
   marginTop: 60,
   marginLeft:18,
   color:'#213450',

 },
 searchBtnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGradient: {
    borderRadius: 40,
    width: 170,
    marginTop: 30,
    height: 40,
  },
  buttonText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#ffffff',
    padding: 10,
  },
})
AppRegistry.registerComponent('Sample_Proj', () => Sample_Proj);
