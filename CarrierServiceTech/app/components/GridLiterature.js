import React, { Component } from 'react';
import CellView from "./CellView";  

import { StyleSheet, View, Button, Alert, AppRegistry,Text, TextInput, ListView, Image,Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
class GridLiterature extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = { 
      isIpad : false,
      dataSource : ds.cloneWithRows(dataResource.listItemData.Product_SubCategory_List), 
      rightImage : require('../resources/images/Next.png'),
      leftImage : require('../resources/images/carrierLogo.png'),   
    };

    this.isitPad = false;

   
  }
  
  



  render() {



    if(Dimensions.get('window').width > 500){
      
    
      this.isitPad = true;
    }
    
   return (

     <View style={{flex:1,backgroundColor: '#F6F6F6',marginTop:10}}>
     <Text style={styles.titleText}>{this.props.title}</Text>
     <ListView contentContainerStyle={styles.list} dataSource={this.state.dataSource} renderRow={(rowData) =>


      <View style={[{paddingLeft:this.isitPad? 70 : 10,width:(width)/2, height:200,backgroundColor:'#F6F6F6', flexDirection: 'row', marginTop:20, marginBottom:20}]}>
        <View style={{flex:0.3, backgroundColor:'#F6F6F6'}}>
          <Text style={{flex:1}}></Text>
        </View>
        <View style={{flex:1,backgroundColor:'#F6F6F6'}}>
          <Image
              style={{flex:10, alignSelf: 'stretch'}}
              source={require('../resources/images/pdfjs.jpg')}
            />
           <Text style={{flex:1, textAlign: 'left',color:'#6A6A6A' }}>{rowData}</Text>
        </View>
        <View style={{flex:0.5, backgroundColor:'#F6F6F6'}}>
        <Text style={{flex:4,color:'#6A6A6A'}}></Text>

        </View>
      </View>
      }/>
      </View>
        );
      }
    }




  const styles = StyleSheet.create({

    list: {
          flexDirection: 'row',
          flexWrap: 'wrap',
    
      },
      item: {
          backgroundColor: 'red',
          margin: 3,
          width: 200,

        },
        titleText: {
          fontSize: 16,
          marginTop: 10,
          paddingBottom: 2,
          marginLeft:25,
          color:'#213450',
          fontFamily: 'Montserrat',
          fontWeight : '100',
        },
        viewStyle:
        {
         
          
            paddingLeft: 70,
          
        },
      });
export default GridLiterature;
