'use strict';
import React, { Component, StyleSheet } from 'react-native';
import { Actions, Scene, Router, Reducer } from 'react-native-router-flux';

import loginInfo from './utils/loginInfo';
import Drawer from './components/drawer/Drawer';
import Splash from './components/Splash';
import Login from './components/Login';
import Browse from './components/app/Browse';

import GlancerList from './components/app/GlancerList';
import Api from './components/app/RssFeedApi';

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
    action.drawerImage = DRAWER_IMAGE;
    action.backButtonImage = BACK_BUTTON_IMAGE;
    return defaultReducer(state, action);
  }
};

class Root extends Component {
  render() {
    return <Router createReducer={reducerCreate} navigationBarStyle={styles.navbar} titleStyle={styles.title}
      drawerImage={DRAWER_IMAGE} backButtonImage={BACK_BUTTON_IMAGE}>
      <Scene key="root" hideNavBar={true}>
        <Scene key="splash" component={Splash} initial={true} title="Splash" />
        <Scene key="login" component={Login} type="replace" title="Login" />
        <Scene key="app" component={Drawer} type="replace">
          <Scene key="main">
            <Scene key="browse" component={Browse} initial={true} title='My Glances' type="replace" />
            <Scene key="glancerList" component={GlancerList} title='Glancer' />
          </Scene>
        </Scene>
      </Scene>
    </Router>
  }
}

const styles = StyleSheet.create({
  title: {
    color: '#213f7d',
  },
  navbar: {
    backgroundColor: '#fff',
    borderBottomColor: 'transparent',
  }
});

export default Root;
