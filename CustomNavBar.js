import React, { Component } from 'react';
import {
   StyleSheet,
   Text,
   Navigator,
   TouchableOpacity
} from 'react-native';


class NavigationBar extends Navigator.NavigationBar {
  render() {
    var routes = this.props.navState.routeStack;

    if (routes.length) {
      var route = routes[routes.length - 1];
      if (route.isHidden === true) {
        return null;
      }
    }

    return super.render();
  }
}

export default NavigationBar;