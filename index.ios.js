'use strict';

import React, { AppRegistry, Component } from 'react-native'
import Root from './src/Root';

class Dailyglancer extends Component {
  render() {
    return (
      <Root />
    );
  }
}

AppRegistry.registerComponent('dailyglancer', () => Dailyglancer);
