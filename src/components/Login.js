'use strict';
import React, { Component, View, TextInput, StyleSheet } from 'react-native';
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

import loginInfo from '../utils/loginInfo';

class Login extends Component {

  constructor(opts) {
    super(opts);
    this.state = {
      username: 'username',
      password: 'password',
    };
  }

  async _connect() {
    Actions.app();
    //Actions.app({ nuxeo });
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="Username"
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={ (username) => this.setState({ username }) }
          value={this.state.username}
        />
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          placeholder="Password"
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={ (password) => this.setState({ password }) }
          value={this.state.password}
        />
        <Button
          style={{fontSize: 20}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._connect()}>
          Connect
        </Button>
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

export default Login;
