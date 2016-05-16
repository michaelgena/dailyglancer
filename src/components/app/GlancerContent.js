'use strict';
import React, { Component, View, Text, StyleSheet, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';

class GlancerContent extends Component {

  constructor(opts) {
    super(opts);
    this._url = opts.url;
  }

  componentDidMount() {
    this._loadGlancerContent().done();
  }

  async _loadGlancerContent() {

  }

  render() {
    return (
      <WebView
        url={this._url}
      />
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

export default GlancerContent;
