'use strict';
import React, { Component, View, Text, StyleSheet,TextInput,TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Glancer extends Component {

  constructor(opts) {
    super(opts);
    this.state = {
       text: "What do you want to glance at?"
    };
  }

  buttonClicked() {
      console.log('button clicked');
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
             style={styles.input}
             onChangeText={(text) => this.setState({text})}
             placeholder={this.state.text}
         />
         <TouchableHighlight
        style={styles.button}
        onPress={this.buttonClicked.bind(this)}>
        <View>
          <Text style={styles.buttonText}>GO</Text>
        </View>
      </TouchableHighlight>
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
  },
  input:{
    height: 50,
    fontSize: 18,
    fontWeight: 'bold',
    /*borderColor: 'gray',
    borderWidth: 1,*/
    backgroundColor: '#FFFFFF',
    marginLeft: 15,
    marginRight: 15
  },
  button:{
    height: 40,
    backgroundColor: '#05ABF1',
    marginLeft: 15,
    marginRight: 15
  },
  buttonText:{
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    color: "#FFFFFF"
  }
})

export default Glancer;
