/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    ListView,
    TouchableOpacity,
    TouchableHighlight,
    AsyncStorage,
} from 'react-native';

/* Regex and Initial search value reset */
/*
 function filterDatasource(text){
 const safe = String(text || '').replace(/([.*^$+?!(){}\[\]\/\\])/g,'\\$1');
 const regex = new RegExp(safe, 'i');
 const filter = (row) => regex.test(row.title) || regex.test(row.modelNo) || regex.test(row.serialNo);
 var out = {};
 for(var sectionID in sections){
 if(!sections.hasOwnProperty(sectionID)){
 continue;
 }
 out[sectionID] = sections[sectionID].data.filter(filter);
 }
 const ds = new ListView.DataSource({
 rowHasChanged: (r1, r2) => r1 !== r2,
 sectionHeaderHasChanged: (h1, h2) => h1 !== h2,
 });
 return ds.cloneWithRowsAndSections(out)
 }
 */

const onSubmitClickSearchFromServer = (pObjSearch, lSearchedString) => {
    console.log(lSearchedString);
    if (lSearchedString) {
        
        AsyncStorage.getItem("myKey6").then((value) => {
            if (value) {
                var lTempArray = JSON.parse(value);
                var lArraylen = lTempArray.length;
                let isAlreadyExist = lTempArray.indexOf(lSearchedString)
                if (isAlreadyExist !== -1) {
                    return;
                }
                if (lArraylen === 9) {
                    lTempArray.pop();
                }
                lTempArray.unshift(lSearchedString);
                AsyncStorage.setItem("myKey6", JSON.stringify(lTempArray));
            }
            else {
                var lTempArray = [];
                lTempArray.unshift(lSearchedString);
                AsyncStorage.setItem("myKey6", JSON.stringify(lTempArray));
            }
        }).done()
        
    }
}
const onChangeTextSearchHistory = (pObjSearch, searchText) => {
    AsyncStorage.getItem("myKey6").then((value) => {
        if (searchText) {
            if (value) {
                const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
                var lTempArray = JSON.parse(value);
                var ltempSegArray = [];

                for (var index = 0; index < lTempArray.length; index++) {
                    console.log(lTempArray[index])
                    if (lTempArray[index].indexOf(searchText) >= 0) {
                        ltempSegArray.push(lTempArray[index]);
                    }
                }
                pObjSearch.setState({dataSourceSearch: ds.cloneWithRows(ltempSegArray)})
                pObjSearch.setState({willShowSearchResult: false})
                pObjSearch.setState({willShowHistoryListView: false})
                if (ltempSegArray.length)
                    pObjSearch.setState({willShowHistoryListView: true})
            }
        }
        else {
            pObjSearch.setState({willShowSearchResult: false})
            pObjSearch.setState({willShowHistoryListView: false})
        }
    }).done()
}
const saveData = (value) => {
    AsyncStorage.setItem("myKey6", value);
    this.setState({"myKey6": value});
}

module.exports = {
    onSubmitClickSearchFromServer,
    onChangeTextSearchHistory
}

