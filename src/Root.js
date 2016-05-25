'use strict';
import React, { Component, StyleSheet } from 'react-native';
import { Actions, Scene, Router, Reducer } from 'react-native-router-flux';

import loginInfo from './utils/loginInfo';
import Drawer from './components/drawer/Drawer';
import Splash from './components/Splash';
import Login from './components/Login';
import Glancer from './components/app/Glancer';

import GlancerList from './components/app/GlancerList';
import Api from './components/app/RssFeedApi';

import GlancerContent from './components/app/GlancerContent';

const DRAWER_IMAGE = require('./img/drawer_menu.png');
const BACK_BUTTON_IMAGE = require('./img/back.png');

//let nuxeo;
function reducerCreate(params) {
  const defaultReducer = Reducer(params);
  return (state, action) => {
    /*if (action) {
      // store the created Nuxeo client
      if (action.key === 'app' && action.nuxeo) {
        nuxeo = action.nuxeo;
      }
      if (nuxeo) {
        action.nuxeo = nuxeo;
      }
    }*/
    // workaround...
    //action.drawerImage = DRAWER_IMAGE
    //action.backButtonImage = BACK_BUTTON_IMAGE;
    return defaultReducer(state, action);
  }
};

class Root extends Component {
  render() {
    return <Router createReducer={reducerCreate} navigationBarStyle={styles.navbar} titleStyle={styles.title}>
      <Scene key="root" hideNavBar={true}>
        <Scene key="splash" component={Splash} initial={true} title="Splash" />
        <Scene key="login" component={Login} type="replace" title="Login" />
        <Scene key="app" component={Drawer} type="replace">
          <Scene key="main">
            <Scene key="glancer" component={Glancer} initial={true} title='dailyglancer' type="replace" />
            <Scene key="glancerList" component={GlancerList} title='Glancer' />
            <Scene key="glancerContent" component={GlancerContent} title='Glancer Content' />
          </Scene>
        </Scene>
      </Scene>
    </Router>
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#000000',
  },
  navbar: {
    backgroundColor: '#FDF058',
    borderBottomColor: 'transparent',
  }
});

export default Root;
