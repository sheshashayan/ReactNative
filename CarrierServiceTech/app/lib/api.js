import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReduxers} from 'redux';

class Api {

static headers() {
	"Accept" : "application/json",
	"Content-Type" : "application/json",
	"dataType" : "json",
	"X-Requested-With" : "XMLHttpRequest",
	"X-Mashape-Key" : ""

}



static get(route){

	return this.xhr(route, null, 'GET');
}

static post(route, params){

	return this.xhr(route, params, 'POST');

}

static delete(route, params){

	return this.xhr(route, params, 'DELETE');

}

static put(route, params){

	return this.xhr(route, params, 'PUT');
}

static xhr(route, params, verb){

	const host = "https:// ";
	const url = '${host}${route}';
	let options = Object.assign({}, params ? { body : JSON.stringify(params) }, null);
	options.headers = Api.headers();

	return fetch(url, options)
		    .then( resp => {
		    		let json = resp.json();
		    		if(resp.ok){

		    			return json;
		    		}

		    		return json.then(err => {throw err});
		    });
	
		}
}



export default Api;

