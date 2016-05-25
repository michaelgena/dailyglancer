'use strict';
import React, { Component, View, Text, StyleSheet, ActivityIndicatorIOS, WebView } from 'react-native';
import { Actions } from 'react-native-router-flux';

class GlancerContent extends Component {

  constructor(opts) {
    super(opts);
    this.state = {
       url: opts.url
    };
  }

  render() {
      return (
        <WebView
          source={{uri: this.state.url}}
          renderLoading={this.renderLoadingView}
          startInLoadingState={true}
        />
      );
  }

  renderLoadingView() {
      return (
          <View style={styles.loading}>
             <ActivityIndicatorIOS
                 size='large'/>
          </View>
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
