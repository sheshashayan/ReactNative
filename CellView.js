import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  PixelRatio,
  TouchableOpacity,
   PropTypes,
  } from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {deviceFinder} from "./globalStyles";


const isItiPhone6S = deviceFinder.isItiPhone6S();
const isItiPhone5S = deviceFinder.isItiPhone5S();
const isItiPad = deviceFinder.isItiPad();
const isIt7InchTablet = deviceFinder.isIt7InchTablet();
const isIt10InchTablet = deviceFinder.isIt10InchTablet();
const isItAndroidPhone = deviceFinder.isItAndroidPhone();

class CellView extends Component {
	constructor(props) {
	  super(props);	
	  this.state = {};
	}

	render(){
		const { title, 
          subTitle, leftImage, 
          rightImage,toBePopulatedOn, 
          isButtonEnabled, buttonAction,
          isProductCrossRef, isProductCrossResult, 
          modelNo} = this.props;
    
    let leftImageView = null;
    let rightImageView = null;
    let titleText = null;
    let subTitleText = null;
    let rightButton = null;
   
   //productSubCategotryList
   
   /* Customize behaviour for left Image */

    if(leftImage && leftImage !== null ){

      if(toBePopulatedOn === "mainSearchView" && isButtonEnabled){
        leftImageView = (
          <View style={[styles.contentView,{paddingRight : 3}]}>
            <Image
                style={[styles.leftImage]}
                source={leftImage}/>
          </View> );                    
      }else if(toBePopulatedOn === "productPage" && isButtonEnabled){
        leftImageView = (
          <View style={[styles.contentView,{flex :1, paddingRight : 10}]}>
            <Image
                style={[styles.leftImage,{marginLeft: 20 }]}
                source={leftImage}/>
          </View> );
      }else if(toBePopulatedOn === "SubCategoryList"){
        leftImageView = (
          <View style={styles.productSubCategotryList}>
            <Image 
                style={[{height:40, width:40}]}
                source={leftImage}/>
          </View> );
      }else {
        leftImageView = (
          <View style={styles.contentView}>
            <Image
                style={styles.leftImage}
                source={leftImage}/>
          </View> );                 
      }
  }

/* Customize behaviour for right Image */
    if(rightImage && rightImage !== ""){ 
        if(toBePopulatedOn === "FilterBasesResults"){
           rightImageView = (
          <View style={[styles.crossRefResultsContent]}>
            <Image
                style={[styles.crossRefResultsRightImage]}
                source={ rightImage }/>      
          </View> );
        } else if(toBePopulatedOn === "ProductCategoryItems"){
           rightImageView = (
          <View style={[styles.crossRefResultsContent]}>
            <Image
                style={[styles.crossRefResultsRightImage,styles.rightArrowImage]}
                source={ rightImage }/>      
          </View> );
        } else if(toBePopulatedOn === "ProductSubCategoryList"){
          rightImageView = (
          <View style={[styles.crossRefResultsContent]}>
            <Image
                style={[styles.crossRefResultsRightImage,styles.rightArrowImage]}
                source={ rightImage }/>      
          </View> );
        }
        else if(toBePopulatedOn === "ProductCategoryDetails"){
           rightImageView = (
          <View style={[styles.crossRefResultsContent]}>
            <Image
                style={[styles.crossRefResultsRightImage,styles.rightArrowImage]}
                source={ rightImage }/>      
          </View> );
        }
        else if(toBePopulatedOn === "CrossRef" && toBePopulatedOn !== ""){
           rightImageView = (
          <View style={styles.contentView}>
            <Image
                style={styles.rightImage}
                source={ rightImage }/>
          </View>
        );
        } else if(toBePopulatedOn === "mainSearchView" && toBePopulatedOn !== ""){
           rightImageView = (
          <View style={[styles.contentView,{}]}>
            <Image
                style={[styles.rightImage,{}]}
                source={ rightImage }/>
          </View> );
        }  else if(toBePopulatedOn === "SwipeRightImage" && toBePopulatedOn !== ""){
           rightImageView = (
          <View style={[styles.contentView,{}]}>
            <Image
                style={[styles.crossRefResultsRightImage,{}]}
                source={ rightImage }/>
          </View> );
        } else {
           rightImageView = (
            <View style={styles.contentView}>
              <Image
                  style={styles.rightImage}
                  source={ rightImage }/>
            </View> );
        }
    }


    if(isButtonEnabled){
      if(toBePopulatedOn === "mainSearchView"){
          if(isItiPhone5S){
              rightImageView = (
                <View style={{ width:64, height: 28, backgroundColor:'#56A6D1',marginTop: 16, justifyContent: 'center', alignItems: 'center',right: 15,borderRadius : 120,position: 'relative',}}>
                  <Text style={[styles.buttonTxt, {paddingRight: 15, paddingLeft : 15, color : "#FFFFFF"}]}>Scan</Text>
                </View>
                );
           }
          else{
              rightImageView = (
              <View style={{ width:90, height: 28, backgroundColor:'#56A6D1',marginTop: 15, justifyContent: 'center', alignItems: 'center',right: 20,borderRadius : 120,position: 'relative',}}>
                <Text style={[styles.buttonTxt, {paddingRight: 15, paddingLeft : 15, color : "#FFFFFF"}]}>Scan</Text>
              </View>
              );
          }
        }
       else if(toBePopulatedOn === "productPage"){
              rightImageView = (
              <View style={{ width:120, height: 28, backgroundColor:'#56A6D1',marginTop: 20, justifyContent: 'center', alignItems: 'center',right:5,borderRadius : 120,position: 'relative',}}>
                <Text style={[styles.buttonTxt, {paddingRight: 15, paddingLeft : 15, color : "#FFFFFF"}]}>Add Serial #</Text>
              </View>
              );         
       }
    }

    if(title && title !== ""){
      if(toBePopulatedOn === "FilterBasesResults"){         
           titleText = (
              <Text style={styles.heading_Level_2}>{title}</Text>
            );          
      }
      else if(toBePopulatedOn === "CrossRef"){
        titleText = (
        <Text style={styles.heading_Level_2}>{title}</Text>
        );
      }        
      else{
        if(isItiPhone5S){
            titleText = (
              <Text adjustsFontSizeToFit ={true} minimumFontScale= {0.9} style={styles.heading_Level_2}>{title}</Text>
            );
         }
         else{
           titleText = (
              <Text style={styles.heading_Level_2}>{title}</Text>
            );
         }
      }      
    }
    
    if(subTitle && subTitle !== ""){

      if(toBePopulatedOn === "FilterBasesResults"){
         subTitleText = (
            <Text style={styles.heading_Level_4}>{subTitle}</Text>
          );

      }
      
      else if(toBePopulatedOn === "ProductCategoryItems"){
         subTitleText = (
            <Text style={[styles.heading_Level_4,{color: '#06273F'}]}>{subTitle}</Text>
          );

      }
      else if(toBePopulatedOn === "ProductSubCategoryList"){
         subTitleText = (
            <Text style={[styles.heading_Level_4,{color: '#06273F'}]}>{subTitle + " "+modelNo}</Text>
          );

      }
      else if(toBePopulatedOn === "ProductCategoryDetails"){
         subTitleText = (
            <Text style={[globalStyles.subordinateTxt,styles.productPageSubordinateTxt]}>{subTitle}</Text>
          );

      }

      else if(toBePopulatedOn === "CrossRef"){
        subTitleText = (
        <Text style={styles.subordinate_text}>{subTitle}</Text>
        );

      }
      else if(toBePopulatedOn === "SwipeRightImage"){
        subTitleText = (
        <Text style={styles.subordinate_text1}>{subTitle}</Text>
        );

      }
      else{

        subTitleText = (
        <Text style={styles.subordinate_text}>{subTitle}</Text>
        );
      }
      
    }

		return(
				<View style={styles.mainView}>
          {leftImageView}
          <View style={[styles.textView,{} ]}>
            {titleText}
            {subTitleText}
          </View>
          {/*<TouchableOpacity style={{justifyContent: 'center'}} onPress= {this.props.onPress}>*/}
          {rightImageView}
          {/*</TouchableOpacity>*/}
        </View>
			);
	}
}

var styles = StyleSheet.create({
  mainView: {
    borderRadius:2,
    flexDirection: 'row',
    flex: 1,
    height: 3,

    shadowOffset:{
            width: 1,
            height: 3,
        },
        shadowColor: 'rgba(0,0,0,0.32)',
        shadowOpacity: 0.32,
         shadowRadius: 2,
        borderColor: '#F6F6F6',
        borderWidth: 1,
        borderBottomWidth: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
  },
  contentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    
  },

  textView: {
    flex: 8,
    marginLeft: 10,
    justifyContent: 'center',
    //backgroundColor: 'steelblue',

  },

  leftImage: {
    marginLeft:10,
    width: 24,
    height: 24,
  },


  subCategoryTextView: {
    flex: 3,
    marginLeft: 10,
    justifyContent: 'center',
    //backgroundColor: 'steelblue',

  },

  rightImage: {
    width: 10,
    height: 16,
    
    marginRight: 15
  },
  biggerRightImage: {
    width: 10,
    height: 28,
    marginRight: 15
  },
  rightArrowImage: {
    width: 10,
    height: 16,
  },
  
  heading_Level_1: {
    color: '#429BE4',
    fontSize: 20,
    fontWeight: 'normal',
    // fontfamily: 'Montserrat-Regular'
  },
  subordinate_text: {
    color: '#6A6A6A',
    fontSize: 12,
    fontWeight: 'normal',
    fontStyle: 'italic',
    marginTop: 8,
    fontFamily: 'Droid Serif'
  },

  heading_Level_2: {
    color: '#06273F',
    fontSize: 18,
    fontFamily: 'Montserrat',
    fontWeight: 'normal'
  },

  //------- by Ravi

  crossRefResultsContent : {
    flex : 1 ,
    flexDirection : 'row',
    //backgroundColor : "yellow",
    justifyContent : 'flex-end',
    marginRight : 10,
 
  },
  
  // Added by Rakesh
  productSubCategotryList : {
    width:60,
    height:60,
    paddingLeft:5,
    paddingRight:10,
    justifyContent:'center',
 
  },

   crossRefResultsRightImage: {
    width: 7,
    height: 28,
    alignSelf : 'center'
  },

  heading_Level_4: {
    color: '#CACACA',
    fontSize: 14,
    fontWeight: '200',
    fontFamily: 'Montserrat'
  },
  globalBtnStyle : { 
    marginTop : 25, 
    marginLeft: 50, 
    marginRight : 50, 
    padding: 10, 
    borderRadius : 30, 
    backgroundColor : "#57a3e2"

    },
    globalBtnTextViewStyle: {
    textAlign : 'center',
    color : "#FFFFFF",
   
    },
    buttonTxt:{
        color: "#F6F6F6",
        fontSize: 12,
        fontFamily: 'Montserrat',
    },

    crossRefproductResultsLeftImage:{
      width: 60,
      height: 30,
      alignSelf : 'center',
      marginLeft: 10,
  },
   heading_Product_List: {
    color: "#6A6A6A",
    fontSize: 18,
  },
  productPageSubordinateTxt:{
    color: "#CACACA",
  },



});
export default CellView;