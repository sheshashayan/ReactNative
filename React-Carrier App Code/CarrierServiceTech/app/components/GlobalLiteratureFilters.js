/**
 * # GlobalLiteratureFilters.js
 * This component will render the list of literature as result of a Model Search
 * along with filtering options
 * Author: Ajit
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
    TouchableHighlight,
    Image,
    ListView,
    Dimensions,
    Platform,
    Animated,
    TouchableOpacity,
} from 'react-native';
import GridLiterature from './GridLiterature';
import ModalDropdown from 'react-native-modal-dropdown';
import CustomRadioButton from "./CustomRadioButton1";
import {globalStyles, deviceFinder} from "./globalStyles";
import LinearGradient from 'react-native-linear-gradient';
import * as dataResource from './dataResource';
import CellView from "./CellView";
import BackNavComponent from "./BackNavComponent";
import * as stringConstant from '../constants/StringConstant';

const backNavText = stringConstant.carrierConstClass.CHANGE_ANOTHER_STORE_BACK_BUTTON;

const {width, height} = Dimensions.get('window');

class GlobalLiteratureFilters extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {

            borderWidthFirst: 0,
            borderWidthSecond: 1,
            colorFirst: 'white',
            colorSecond: 'black',
            expanded: false,
            ldefaultValue : "All Document",
            animation: new Animated.Value(),
            flexFirst: 9,
            flexSecond: 4,
            allSearchedData: this.props.searchedData,
            
            FilterDropDownValue: this.props.DropDownData,
            dataSource: ds.cloneWithRows(this.props.CurrentDoc),
            SearchedModelNumber : this.props.Searchedtext,

            /*----------- two Radio buttons -----------*/
            
            
            imageBottom: 15,
            rightImage: require('../resources/images/Next.png'),
            dropDownValue1:"Current Document",
            dropDownValue2:"All Document",
            
        };
        this.icons = {
            'up': require('../resources/images/Minus.png'),
            'down': require('../resources/images/Add.png')
        };
        this.dropdownOnSelect1 = this.dropdownOnSelect1.bind(this);
        this.dropdownOnSelect2 = this.dropdownOnSelect2.bind(this);

        this.applyfilter = this.applyfilter.bind(this);

    }

    /**
     * # toggle
     * Purpose: This function is called to adjust the flex as per action on plus sign (+)
     * Author: Ajit
     * Input Param:
     * Output Param:
     */
    toggle() {

        if (Dimensions.get('window').width > 500) {
            this.setState({
                flexSecond: 3,
            });
        }
        if (this.state.expanded) {
            this.setState({
                flexFirst: 9,
                imageBottom: 15,
            });
        }
        else {
            this.setState({
                flexFirst: 6,
                imageBottom: 22,
            });
        }
        let initialValue = 0,
            finalValue = 120;
        this.setState({
            expanded: !this.state.expanded
        });
        this.state.animation.setValue(initialValue);  //Step 3
        Animated.spring(     //Step 4
            this.state.animation,
            {
                toValue: finalValue
            }
        ).start();  //Step 5
        this.windowWidth = 0;
        this.windowHeight = 0;
    }

    /**
     * # renderSeparator
     * Purpose: This function is called to create the seperator for each item in list view
     * Author: Ajit
     * Input Param: sectionID, rowID, adjacentRowHighlighted
     * Output Param: View
     */
    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        let lkey = `spr_${rowID}`;
        return (<View style={styles.separator} key={lkey}/>);
    }

    /**
     * # dropDownAdjustFrame
     * Purpose: This function will be called to adjust the frame of dropDown
     * Author: Ajit
     * Input Param: layout
     * Output Param: style
     */
    dropDownAdjustFrame(style) {
        console.log(`frameStyle={width:${style.width}, 
    height:${style.height}, top:${style.top}, left:${style.left}}`);
        style.left -= 9;
        style.top += 7;
        style.height -= 70;
        return style;
    }

    /**
     * # findDimensions
     * Purpose: This function will be invoked to set the layout width
     * Author: Ajit
     * Input Param: layout
     * Output Param:
     */
    findDimensions(layout) {
        this.setState({dropDownWidth: layout.width})
        console.log(layout.width);
    }


    backToMainSearch = () => {
        this.props.navigator.pop();
    }
    /**
     * # globalLiteratureWebNav
     * Purpose: This function will be invoked to navigate to globalLiteratureWebNav screen
     * Author: Ajit
     * Input Param:
     * Output Param:
     */
    globalLiteratureWebNav = (rowData) => {

        var lUrl = rowData.DocumentBaseURL + rowData.DocumentPath;
        console.log(lUrl);

        var lLiteratureId = rowData.ID;
        AsyncStorage.getItem("mostPopularLitIdArray").then((value) => {
            if(value) {
                var lLiteratureIdArray = JSON.parse(value);
                if(lLiteratureIdArray.indexOf(lLiteratureId) === -1){
                    AsyncStorage.getItem("mostPopularLit").then((LiteratureRowValue) => {
                        var lLiteratureRowArray = JSON.parse(LiteratureRowValue);
                        if (lLiteratureIdArray.length === 9) {
                            lLiteratureIdArray.pop();
                            lLiteratureRowArray.pop();
                        }

                        lLiteratureRowArray.unshift(rowData);
                        AsyncStorage.setItem("mostPopularLit", JSON.stringify(lLiteratureRowArray));

                    }).done()

                    lLiteratureIdArray.unshift(lLiteratureId);
                    AsyncStorage.setItem("mostPopularLitIdArray", JSON.stringify(lLiteratureIdArray));
                }
                
            }
            else{

                var lLiteratureIdArray = [];
                var lLiteratureRowArray = []

                lLiteratureIdArray.unshift(lLiteratureId);
                lLiteratureRowArray.unshift(rowData);

                AsyncStorage.setItem("mostPopularLitIdArray", JSON.stringify(lLiteratureIdArray));
                AsyncStorage.setItem("mostPopularLit", JSON.stringify(lLiteratureRowArray));
            }
            
        }).done()
        this.props.navigator.push({
            name: 'LiteratureWebView',
            title: 'LiteratureDetailsView',
            isHidden: false,
            passProps: {URL: lUrl}
        });


    }

    applyfilter = () => {

        var lDocumentStatus = this.state.dropDownValue1;
        var lDocumentType = this.state.dropDownValue2;
        
        console.log(lDocumentStatus)
        console.log(lDocumentType)

        var sortedArray = [];
        var lAlldataArray = this.state.allSearchedData;
        var filteredArray = lAlldataArray;


        if(lDocumentStatus === "All Document"){

            if(lDocumentType !== "All Document"){
                filteredArray = [];
                for(var index = 0; index < lAlldataArray.length; index++) {
                    var lObject = lAlldataArray[index];

                    console.log(lObject)
                    if(lObject["DMSType"] ===  lDocumentType){
                        filteredArray.push(lObject);
                    }
                }

            }
        }
        else{

            filteredArray = [];
            if(lDocumentType !== "All Document"){
                for(var index = 0; index < lAlldataArray.length; index++) {
                    var lObject = lAlldataArray[index];
                    console.log(lObject)
                    if(lObject["DMSType"] ===  lDocumentType && lDocumentStatus.includes(lObject["Status"])){
                        filteredArray.push(lObject);
                    }
                
                }
            }
            else{
                    for(var index = 0; index < lAlldataArray.length; index++) {
                        var lObject = lAlldataArray[index];

                        if(lDocumentStatus.includes(lObject["Status"])){
                            filteredArray.push(lObject);
                        }

                    }
                    
                }
            }
            this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(filteredArray)
                    });
        }

    render() {
        icon = this.icons['<'];
        let lviewpage = null;
        if (this.state.expanded) {
            icon = this.icons['>'];
            lviewpage = (
                <View style={{backgroundColor: '#CACACA', height: 220, width: width,}}>
                    <View style={[{marginLeft: 15, marginRight: 15, marginTop: 5, backgroundColor: '#CACACA'}]}>
                        <ModalDropdown
                            renderSeparator={this.renderSeparator.bind(this)}
                            defaultValue='Current Document'
                            ref={el => this.filterSizeDropDown = el}
                            style={styles.dropDownMenu}
                            textStyle={styles.dropdownText}
                            dropdownStyle={[styles.dropDown, {minWidth: this.state.dropDownWidth}]}
                            adjustFrame={style => this.dropDownAdjustFrame(style)}
                            onLayout={(event) => {
                                this.findDimensions(event.nativeEvent.layout)
                            }}
                            options={['All Document','Current Document', 'Obsolete Document']}
                            onSelect={(idx, value) => this.dropdownOnSelect1(idx, value)}/>
                        <Image source={require('../resources/images/FilterArrow.png')}
                               style={styles.backgroundImage}/>
                    </View>
                    <View style={[{marginLeft: 15, marginRight: 15, marginTop: 5, backgroundColor: '#CACACA'}]}>
                        <ModalDropdown
                            renderSeparator={this.renderSeparator.bind(this)}
                            defaultValue= { this.state.ldefaultValue }
                            ref={el => this.filterSizeDropDown = el}
                            style={styles.dropDownMenu}
                            textStyle={styles.dropdownText}
                            dropdownStyle={[styles.dropDown, {minWidth: this.state.dropDownWidth}]}
                            adjustFrame={style => this.dropDownAdjustFrame(style)}
                            onLayout={(event) => {
                                this.findDimensions(event.nativeEvent.layout)
                            }}
                            options={this.state.FilterDropDownValue}
                            

                              
                            onSelect={(idx, value) => this.dropdownOnSelect2(idx, value)}/>
                        <Image source={require('../resources/images/FilterArrow.png')}
                               style={styles.backgroundImage}/>
                    </View>
                    
                    <View style={styles.searchBtnContainer}>
                        <TouchableHighlight style={[globalStyles.globalBtnStyle, styles.globalBtnStyle]}
                                            onPress={this.applyfilter.bind(this)}>
                            <LinearGradient
                                start={{x: 0, y: 1}} end={{x: 1, y: 1}}
                                locations={[0, 0.5, 1]}
                                colors={['#57A3E3', '#56A6D1', '#57A3E3']}
                                underlayColor={['#4582B5', '#498FB5', '#4582B5']}
                                style={[{borderRadius: 40}]}>
                                <Text style={[styles.globalBtnTextViewStyle]}>Apply</Text>
                            </LinearGradient>
                        </TouchableHighlight>
                    </View>
                </View>  )
        }
        else {
            lviewpage = null;
        }
        let icon = this.icons['down'];
        if (this.state.expanded) {
            icon = this.icons['up'];
        }
        return (
            <View style={styles.container}>
                <View style={[globalStyles.backNavBtnStyle]}>
                    <TouchableOpacity style={[]} onPress={ this.backToMainSearch }>
                        <BackNavComponent backNavText={backNavText}/>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor: '#CACACA', flexDirection: 'row', width:width,paddingTop: 4,paddingBottom:4, }}>

                    <View style={{flex:0.5,paddingTop: 10,}}>
                        <Text style={styles.titleText}>Filtering Options</Text>
                    </View>

                    <View style={{flex:0.5}}>
                        <TouchableHighlight
                            style={{
                            backgroundColor: '#CACACA',
                            alignItems:'flex-end',
                            alignSelf:'flex-end',
                            height: 40,
                            width: 60,
                            paddingTop: 20,
                            paddingBottom: 20,
                            paddingRight: 20,
                            justifyContent:'center',
                        }}
                        underlayColor='#CACACA'
                        onPress={this.toggle.bind(this)}>
                        <Image style={{}}
                               source={icon}/>
                        </TouchableHighlight>
                    </View>

                </View>
                {lviewpage}
                <View style={styles.listNav}>
                    <Text style={styles.titleTexts}>Results for: {this.state.SearchedModelNumber}</Text>
                    <ListView
                        scrollEnabled={ true }
                        backgroundColor='#F6F6F6'
                        dataSource={this.state.dataSource}
                        renderRow={(rowData, sectionId, rowId) =>
                            <View style={styles.rowView}>
                                <TouchableOpacity style={{flex: 1}}  onPress={() => this.globalLiteratureWebNav(rowData)}> 

                                <CellView
                                        title={rowData["DocumentTitle"]}
                                        subTitle={rowData["DMSCategory"]}
                                        leftImage={this.state.leftImage}
                                        rightImage={this.state.rightImage}/>
                                </TouchableOpacity >
                            </View>
                        }/>
                </View>
            </View>
        );
    }

    /**
     * # dropdownOnSelect
     * Purpose: This function will be invoked to set the selected dropdown value
     * Author: Ajit
     * Input Param:
     * Output Param:
     */
    dropdownOnSelect1(idx, value) {

        this.setState({dropDownValue1:value});
        

    }
    /**
     * # dropdownOnSelect
     * Purpose: This function will be invoked to set the selected dropdown value
     * Author: Ajit
     * Input Param:
     * Output Param:
     */
    dropdownOnSelect2(idx, value) {

        console.log(value);
        var lDropDownValue = value;
        if(lDropDownValue !== "All Dcoument"){
            lDropDownValue = value.substring(0, value.length-4);
            console.log(lDropDownValue)
        }
        this.setState({dropDownValue2 : lDropDownValue});
        
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 64,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    titleText: {
        fontSize: 16,
        marginLeft: 20,
        color: '#213450',
        fontFamily: "Montserrat",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    imagestyle: {
        height: 22,
        width: 22,
    },
    dropdownText: {
        fontSize: 13,
    },
    dropDownMenu: {
        flexWrap: 'wrap',
        borderColor: "#CACACA",
        alignItems: 'stretch',
        borderWidth: 1,
        padding: 8,
        marginTop: 5,
        backgroundColor: 'white',
        position: 'relative',
        borderRadius: 3,
    },
    radioBtnViewStyle: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10,
        marginTop: 0
    },
    twoCustomRadioBtnTxt: {
        color: "#06273F",
        fontWeight: "normal",
        fontFamily: "Montserrat",
        fontSize: 18
    },
    globalBtnTextViewStyle: {
        textAlign: 'center',
        color: "#FFFFFF",
        paddingLeft: 60,
        paddingRight: 60,
        paddingBottom: 5,
    },
    searchBtnContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonGradient: {
        borderRadius: 30,
        width: 170,
        marginTop: 10,
        height: 33,
    },
    buttonText: {
        fontSize: 14,
        textAlign: 'center',
        color: '#ffffff',
        padding: 2,
        fontFamily: 'Montserrat',
    },
    HVACBtnStyle: {
        marginTop: 5,
    },
    listNav: {
        flex: 7,
        alignSelf: "stretch",
        backgroundColor: '#F6F6F6',
        paddingTop: 10,
        paddingBottom: 10,
    },
    globalBtnStyle: {
        marginLeft: 50,
        marginRight: 50,
        padding: 2,
        borderRadius: 20,
        backgroundColor: "#57a3e2",
        marginBottom: 10,
    },
    globalBtnStyle: {
        marginBottom: 10,
    },
    rowView: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        height: 80,
        backgroundColor: '#F6F6F6',
    },
    backgroundImage: {
        width: 10,
        height: 5,
        position: 'absolute',
        top: 16,
        right: 15,
    },
    titleTexts: {
        fontSize: 18,
        fontFamily: 'Montserrat',
        fontWeight: '100',
        marginLeft: 14,
        color: '#213450',
        marginBottom: 12,
    },
    titleTexts: {
        fontSize: 18,
        fontFamily: 'Montserrat',
        fontWeight: '100',
        marginLeft: 14,
        color: '#213450',
        marginBottom: 12,
    },
    dropDown: {
        alignSelf: "stretch",
        flexDirection: 'column',
        alignItems: 'stretch',
        flexWrap: 'wrap',
        shadowOffset: {
            width: 1,
            height: 3,
        },
    }
});
export default GlobalLiteratureFilters;