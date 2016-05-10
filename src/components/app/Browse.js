'use strict';
import React, { Component, View, Text, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Browse extends Component {

  constructor(opts) {
    super(opts);
    //this._nuxeo = opts.nuxeo;
  }

  componentDidMount() {
    this._loadMyGlances().done();
  }

  async _loadMyGlances() {

  }

  render() {
    return (
      <Text>My Glances</Text>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FDF058',
  }
})

export default Browse;
