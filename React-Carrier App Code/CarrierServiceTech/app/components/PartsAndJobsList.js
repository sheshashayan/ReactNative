/**
 * # PartsAndJobsList.js
 * This class is to render the expandable/ collapsing rows on Jobs & Parts screen
 * Author: Ravichandran P
 */

import React, { Component } from 'react';
import * as dataResource from './dataResource';
import {listItemData} from './dataResource';
import {globalStyles ,deviceFinder} from "./globalStyles";
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Animated,
    PropTypes,
    Image,
    Dimensions,
    Platform,
    TouchableHighlight,
    ListView,
    ScrollView,
    Easing,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const angleDown = (<Icon name="angle-down" size={28} color="#252525" />);
const angleUp = (<Icon name="angle-up" size={28} color="#252525" />);
const minusIcon = (<Icon name="minus-circle" size={24} color="#252525" />);
const isItiPhone5S = deviceFinder.isItiPhone5S();
const isItAndroidPhone = deviceFinder.isItAndroidPhone();

class PartsandJobsList extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        console.log('ds', ds)
        this.state ={
            dataSource : ds.cloneWithRows(dataResource.Items_Parts_List),
            dataSource1 : ds.cloneWithRows(dataResource.Items_Parts_List),
            isExpandable:false,
            isItExpanded : false,
            jobId: "",
            isJobDeleted : false,
            dataSourceJobDeletion : "",
            upArrow : 'false',
            updatedImage : false,
            rowID : null,
        }
        this.onJobRowPress = this.onJobRowPress.bind(this);
        this.fetchPartsList = this.fetchPartsList.bind(this);
        this.removePartsFromExpandedRow =  this.removePartsFromExpandedRow.bind(this);
        this.removeJobOrPartsFromExpandedRow =  this.removeJobOrPartsFromExpandedRow.bind(this);
        this.onPressDeleteParts = this.onPressDeleteParts.bind(this);
        this.jobsPartsList = null;
        this.partsListArray = [];
        this.partsListJobId = [];
        this.jobIdToBeExpanded = "";
        this.animatedValue = new Animated.Value(0);
        this.jobsCompleteList = [];
    }

    /**
     * # jobItemPress
     * Purpose: This function will update the state for expanding when
     * any one of the jobs in the list is pressed
     * Author: Ravichandran P
     * Input Param:
     * Output Param:
     */
    jobItemPress(){
        this.setState({isExpandable: !this.state.isExpandable});
    }

    /**
     * # onPressDeleteParts
     * Purpose: This function will be invoked to delete the parts which added for a job
     * Author: Ravichandran P
     * Input Param:
     * Output Param:
     */
    onPressDeleteParts(){
        alert('Development in progress');
        return;
    }

    /**
     * # fetchPartsList
     * Purpose: This function will render the parts related to the particular job
     * Author: Ravichandran P
     * Input Param: jobsPartsList
     * Output Param:
     */
    fetchPartsList = (jobsPartsList) => {
        var partsListArray = [];
        jobsPartsList.forEach(function(value, index, jobsPartsList){
            if(value !== "" && value && value['part'] &&  value['part'].length){
                if(value['part'].length > 0 ){
                    partsListArray.push(value);
                }
            }
        });
        return partsListArray;
    }

    componentWillMount(){
        this.jobsPartsList = listItemData.Items_Parts_List;
        this.partsListArray = this.fetchPartsList(listItemData.Items_Parts_List);
        this.jobsCompleteList = dataResource.Items_Parts_List;
    }

    componentDidMount(){
        console.log(this.state.isExpandable);
         if(this.props.jobsList){
                var stringValue = JSON.stringify(this.props.jobsList.getJobsResponse.getJobsReturn.Jobs)
                var jobs = this.props.jobsList.getJobsResponse.getJobsReturn.Jobs.Job

                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                this.setState({ 
                    dataSource : ds.cloneWithRows(jobs),
                    dataSource1 : ds.cloneWithRows(jobs)
                })
         }
    }

    /**
     * # animate
     * Purpose: This function will be invoked to apply animation while expanding list item
     * Author: Ravichandran P
     * Input Param:
     * Output Param:
     */
    animate(){
        this.animatedValue.setValue(0);
        Animated.parallel([
            Animated.timing(
                this.animatedValue,
                {easing : Easing.bounce, duration :2000, toValue : 1}).start(),
        ])
    }

    /**
     * # onJobRowPress
     * Purpose: This function will be invoked to press action on each job row in the list
     *          and to decide whether its expandable based on the parts existence
     * Author: Ravichandran P
     * Input Param: rowData, rowID
     * Output Param:
     */
    onJobRowPress(rowData, rowID){
        let partsListObj = this.partsListArray;
        let isExpanded = this.state.isItExpanded;
        if(partsListObj){
            for(let i =0 ; i<partsListObj.length;i++){
                if(partsListObj[i].jobId === rowData.jobId){
                    if(this.partsListJobId.indexOf(rowData.jobId) === -1){
                        this.partsListJobId.push(rowData.jobId);
                    }
                }
            }
        }
        else{
            return;
        }
        if(this.partsListJobId.indexOf(rowData.jobId) !== -1){
            this.jobIdToBeExpanded = rowData.jobId;
            this.setState({isItExpanded : !this.state.isItExpanded});
            this.setState({rowID : rowID});
        }
        else{
            alert("Part(s) is/ are not added to "+rowData.title);
        }
    }

    /**
     * # removeJobOrPartsFromExpandedRow
     * Purpose: This function will be invoked to remove a job along with associated parts
     * Author: Ravichandran P
     * Input Param: jobId
     * Output Param:
     */
    removeJobOrPartsFromExpandedRow(jobId){
        alert('Development in progress');
        return;

        let jobsPartsList = this.jobsPartsList;
        let jobsCompleteList = this.jobsCompleteList;
        console.log("jobsCompleteList : "+JSON.stringify(jobsCompleteList));
        console.log("jobsPartsList : "+JSON.stringify(jobsPartsList));
        let indexOfJob = null;
        let deletedJobsId = [];
        this.setState({isJobdeleted : true})
        this.jobsCompleteList.forEach(
            function(value,index,jobsCompleteList){
                if(value['jobId'] === jobId){
                    indexOfJob = jobsCompleteList.indexOf(value);
                    deletedJobsId.push(indexOfJob);
                    jobsCompleteList.splice(indexOfJob, 1);
                }
            })

        if(deletedJobsId.length >0 && deletedJobsId){
            this.setState({isJobDeleted : true});
        }
    }

    /**
     * # removePartsFromExpandedRow
     * Purpose: This function will be invoked to remove parts from the respective job
     * Author: Ravichandran P
     * Input Param: rowData
     * Output Param:
     */
    removePartsFromExpandedRow(rowData){
        let jobsPartsList = this.jobsPartsList;
        if(this.state.isItExpanded === false){
            if(this.jobsPartsList.indexOf(rowData.jobId) !== -1){
                console.log('Remove rowdata JobId fromCollapsed : '+rowData.jobId);
                let indexOfJob = this.jobsPartsList.indexOf(rowData.jobId);
                this.state.deletedJobsList.push(this.jobsPartsList.splice(indexOfJob, 1));
                rowData = this.jobsPartsList;
            }
        }
    }


    deleteJobs(jobToBeRemoved){
        //alert("Remove rowdata JobId"+jobToBeRemoved);
    }

    /**
     * # renderExpandedRows
     * Purpose: This function is to render the jobs list View once a job is expanded
     * Author: Ravichandran P
     * Input Param: rowData,sectionID,rowID
     * Output Param:
     */
    renderExpandedRows = (rowData, sectionID, rowID) => {
        return (
            <View style={styles.itemsContainer}>
              <View style={styles.itemPartsList}>
                <TouchableOpacity onPress={() => this.removeJobOrPartsFromExpandedRow(rowData.jobId)} style={styles.deleteJobItem} >
                  <View style={styles.deleteItemView}>
                      {minusIcon}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.onJobRowPress(rowData, rowID)} style={styles.JobTitleList} >
                  <View style={[globalStyles.rowView,styles.accord]}>
                    <View style={styles.itemPartsListLeft}>
                      <View style={styles.itemPartsTitleContainer}>
                        <Text style={[globalStyles.headerTxt2,styles.itemPartsTitle]}> {rowData.JobName} # {rowData.JobID}</Text>
                      </View>
                    </View>
                    <View style={styles.itemPartsListRight}>
                      <Text style={styles.accordionBtn}>
                          {this.state.isItExpanded && this.state.rowID ===  rowID ? angleUp : angleDown}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View>
                  { this.showExpandableView(rowData) }
              </View>
            </View>)
    }

    /**
     * # renderCollapsedRows
     * Purpose: This function is to render the collapsed jobs list view once an press action
     *          is happened over expanded job
     * Author: Ravichandran P
     * Input Param: rowData,sectionID,rowID
     * Output Param:
     */
    renderCollapsedRows = (rowData, sectionID, rowID) => {
        let jobDeleteBtn = (
            <View style = {{padding :5}}>
              <TouchableHighlight
                  style={[styles.minusBtnnPress]}>
                <View style={styles.removeJobContainer}>
                  <Text style={styles.removeJobIcon}>
                      {minusIcon}
                  </Text>
                </View>
              </TouchableHighlight>
            </View>);
        return (
            <View style={styles.itemsContainer}>
              <View style={styles.itemPartsList}>
                <TouchableOpacity onPress={() => this.removeJobOrPartsFromExpandedRow(rowData.jobId)} style={styles.deleteJobItem} >
                  <View style={styles.deleteItemView}>
                      {minusIcon}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => this.onJobRowPress(rowData, rowID)} style={styles.JobTitleList} >
                  <View style={[globalStyles.rowView,styles.accord]}>
                    <View style={styles.itemPartsListLeft}>
                      <View style={styles.itemPartsTitleContainer}>
                        <Text style={[globalStyles.headerTxt2,styles.itemPartsTitle]}> {rowData.JobName} # {rowData.JobID} </Text>
                      </View>
                    </View>
                    <View style={styles.itemPartsListRight}>
                      <Text style={styles.accordionBtn}>
                          {this.state.isItExpanded ? console.log("renderCollapsedRows..") : angleDown}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <View>
                </View>
                  { this.showExpandableView(rowData) }
              </View>
            </View> )
    }

    render() {
        let expandedListView = ( <ListView
            scrollEnabled = { true }
            dataSource={this.state.dataSource}
            renderRow={this.renderExpandedRows}
        />)
        let collapsedListView = (<ListView
            scrollEnabled = { true }
            dataSource={this.state.dataSource1}
            renderRow={this.renderCollapsedRows}
        />)
        let deletedJobsList = (<ListView
            scrollEnabled = { true }
            dataSource={this.state.dataSource1}
            renderRow={this.renderAfterDeletingJobs}
        />)
        return (
            <View style={styles.container}>
              <View style={styles.partsSellersList}>
                  {this.state.isItExpanded ? expandedListView : collapsedListView }
              </View>
            </View>
        );
    }

    /**
     * # showExpandableView
     * Purpose: This function is to show the associated parts once the job is expanded
     * Author: Ravichandran P
     * Input Param: rowData,sectionID,rowID
     * Output Param:
     */
    showExpandableView(rowData){
        if(rowData.jobId === this.jobIdToBeExpanded && this.jobIdToBeExpanded !== ""){
            const expandableRowAnim = this.animatedValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 200]
            });
            return (rowData.part && this.state.isItExpanded) ?
                rowData.part.map(function(row) {
                    return <Animated.View style={[ {expandableRowAnim} ]}>
                      <View style={[globalStyles.rowView,styles.partDetails]}>
                        <View style={[styles.partDetailsLeft,]}>
                          <Text style={[globalStyles.headerTxt2,styles.innerItemPartsTitle]}>
                              {row.title}</Text>
                          <View style={[globalStyles.rowView,styles.partDetailsRight]}>
                            <Text style={[globalStyles.headerTxt4,styles.innerItemParts,styles.innerItemPartsLeft]}>Item #: {row.itemno}</Text>
                            <Text style={[globalStyles.headerTxt4,styles.innerItemParts]}>Part #: {row.partno}</Text>
                          </View>
                        </View>
                        <TouchableOpacity
                            onPress = {() => alert("Development in progress")}
                            style={[{alignSelf:'center',alignItems:'center'}]}>
                          <View style={styles.deleteItemView}>
                              {minusIcon}
                          </View>
                        </TouchableOpacity>
                      </View>
                    </Animated.View>
                }) :<Text style={[]}></Text>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignSelf : "stretch"
    },
    headerContent:{
        paddingLeft: 10,
        paddingRight: 10,
    },
    jobPartsContainer: {

    },
    partsSellersList: {
        flex: 5,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 0,
    },
    itemsContainer: {
        flexDirection:'column',
        paddingLeft: 5,
        paddingRight: 5,
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    itemPartsList:{
        backgroundColor:'#ECECEC',
        shadowColor : "#CACACA",
        shadowOpacity : 1,
        shadowRadius : 3,
        shadowOffset : {width: 1, height: 1.0},
        borderRadius: 4,
        marginBottom: 14,
        flexDirection:'row',
        height: 50,
        flex: 1,
    },
    itemPartsListLeft: {
        alignItems:'flex-start',
        flex:8,
        paddingTop: 15,
    },
    removeJobContainer: {
        justifyContent:'center',
        alignItems:'flex-start',
    },
    itemPartsListRight: {
        alignItems:'flex-end',
        justifyContent:'center',
        flex:2,
    },
    removePartIcon: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    itemPartsTitleContainer: {
        justifyContent:'center',
    },
    itemPartsTitle:{
        fontWeight: 'normal',
        fontSize: 16,
    },
    innerItemPartsTitle: {
        fontWeight: 'normal',
        color:'#6A6A6A',
        fontSize: 16,
    },
    partDetails: {
        justifyContent:'space-between',
        alignItems: 'center',
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 10,
        borderBottomWidth: 1,
        borderColor: '#CACACA',
    },
    partDetailsLeft: {
        justifyContent:'flex-start',
        paddingBottom: 5,
        paddingTop: 5,
    },
    partDetailsRight: {
        justifyContent:'flex-end',
    },
    innerItemParts: {
        color: '#6a6a6a',
        fontSize: 14,
    },
    innerItemPartsLeft: {
        //paddingRight: 40,
        paddingRight: ((isItiPhone5S || isItAndroidPhone) ? 15: 40),
    },
    change: {
        position: 'relative',
        top: 3,
    },
    titleLink: {
        flexDirection:'row',
    },
    JobTitleList: {
        flex: 9,
        height: 50,
    },
    buttonGradient: {
        borderRadius: 40,
    },
    buttonText: {
        color: '#ffffff',
        padding: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
    accordionBtn: {
        width: 30,
        height: 30,
    },
    accordionBtn: {
        fontSize: 30,
    },
    deleteItemView: {
    },
    accord: {
        alignItems: 'stretch',
        flex:1,
        paddingRight: 10,
    },
    deleteJobItem: {
        width: 40,
        height: 50,
        paddingLeft: 10,
        paddingTop: 13,
    }
});

export default PartsandJobsList;