'use strict';

import React, { Component, Text } from 'react-native';
import Drawer from 'react-native-drawer';
import { DefaultRenderer } from 'react-native-router-flux';
import DrawerContent from './DrawerContent';

export default class extends Component {
  render(){
    const children = this.props.navigationState.children;
    return (
      <Drawer
        ref="navigation"
        type="displace"
        content={<DrawerContent />}
        tapToClose={true}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan={true}
        tweenHandler={(ratio) => ({
          main: { opacity:Math.max(0.54, 1 - ratio) }
        })}>
        <DefaultRenderer navigationState={children[0]} />
      </Drawer>
    );
  }
}
