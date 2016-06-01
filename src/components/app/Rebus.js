'use strict';
import React, { Component, View, Text, StyleSheet,TextInput,TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

var json = {

           "a" : [
                    {'name':'alarm', 'value':'\u{23F0}'},
                    {'name':'alembic', 'value':'\u{2697}'},
                    {'name':'anchor', 'value':'\u{2693}'},
                    {'name':'aquarius', 'value':'\u{2652}'},
                    {'name':'aries', 'value':'\u{2648}'},
                    {'name':'atom', 'value':'\u{269B}'}
                  ],
            "b" : [
                    {'name':'baseball', 'value':'\u{26BE}'},
                    {'name':'black', 'value':'\u{25AA}'},
                    {'name':'black', 'value':'\u{25FC}'},
                    {'name':'black', 'value':'\u{25FE}'}
                  ],
            "c" : [
                    {'name':'cancer', 'value':'\u{264B}'},
                    {'name':'capricorn', 'value':'\u{2651}'},
                    {'name':'check', 'value':'\u{2611}'},
                    {'name':'circle', 'value':'\u{26AA}'},
                    {'name':'circle', 'value':'\u{26AB}'},
                    {'name':'cloud', 'value':'\u{2601}'},
                    {'name':'cloudy', 'value':'\u{26C5}'},
                    {'name':'clubs', 'value':'\u{2663}'},
                    {'name':'coffee', 'value':'\u{2615}'},
                    {'name':'coffin', 'value':'\u{26B0}'},
                    {'name':'comet', 'value':'\u{2604}'},
                    {'name':'copyright', 'value':'\u{00A9}'}
                  ],

            "d" : [
                    {'name':'diamond', 'value':'\u{2666}'}
                  ],

            "e" : [
                    {'name':'eject', 'value':'\u{23CF}'}
                  ],

            "f" : [
                    {'name':'forward', 'value':'\u{23E9}'}
                  ],

            "g" : [
                    {'name':'gear', 'value':'\u{2699}'},
                    {'name':'gemini', 'value':'\u{264A}'},
                    {'name':'gray', 'value':'\u{25FD}'}
                  ],

            "h" : [
                    {'name':'hammer', 'value':'\u{2692}'},
                    {'name':'hat', 'value':'\u{1F3A9}'},
                    {'name':'heart', 'value':'\u{2665}'},
                    {'name':'hot', 'value':'\u{2668}'},
                    {'name':'hourglass', 'value':'\u{231B}'}
                  ],

            "i" : [
                    {'name':'information', 'value':'\u{2139}'}
                  ],

            "j" : [

                  ],

            "k" : [
                    {'name':'keyboard', 'value':'\u{2328}'}
                  ],

            "l" : [
                    {'name':'left', 'value':'\u{25C0}'},
                    {'name':'leo', 'value':'\u{264C}'},
                    {'name':'libra', 'value':'\u{264E}'},
                    {'name':'lily', 'value':'\u{269C}'}
                  ],

            "m" : [
                    {'name':'m', 'value':'\u{24C2}'},
                    {'name':'muslim', 'value':'\u{262A}'}
                  ],

            "n" : [
                    {'name':'northeast', 'value':'\u{2197}'},
                    {'name':'northwest', 'value':'\u{2196}'}
                  ],

            "o" : [
                    {'name':'orthodox', 'value':'\u{2626}'}
                  ],

            "p" : [
                    {'name':'pause', 'value':'\u{23F8}'},
                    {'name':'peace', 'value':'\u{262E}'},
                    {'name':'pisces', 'value':'\u{2653}'},
                    {'name':'playpause', 'value':'\u{23EF}'}
                  ],

            "q" : [

                  ],

            "r" : [
                    {'name':'radioactive', 'value':'\u{2622}'},
                    {'name':'record', 'value':'\u{23FA}'},
                    {'name':'recycle', 'value':'\u{267B}'},
                    {'name':'registered', 'value':'\u{00AE}'},
                    {'name':'rewind', 'value':'\u{23EA}'},
                    {'name':'right', 'value':'\u{25B6}'}
                  ],

            "s" : [
                    {'name':'sad', 'value':'\u{2639}'},
                    {'name':'sagittarius', 'value':'\u{2650}'},
                    {'name':'scales', 'value':'\u{2696}'},
                    {'name':'scorpius', 'value':'\u{264F}'},
                    {'name':'shamrock', 'value':'\u{2618}'},
                    {'name':'skull', 'value':'\u{2620}'},
                    {'name':'smile', 'value':'\u{263A}'},
                    {'name':'snowman', 'value':'\u{2603}'},
                    {'name':'snowman', 'value':'\u{26C4}'},
                    {'name':'soccer', 'value':'\u{26BD}'},
                    {'name':'southeast', 'value':'\u{2198}'},
                    {'name':'southwest', 'value':'\u{2199}'},
                    {'name':'spades', 'value':'\u{2660}'},
                    {'name':'stop', 'value':'\u{23F9}'},
                    {'name':'stopwatch', 'value':'\u{23F1}'},
                    {'name':'sun', 'value':'\u{2600}'},
                    {'name':'swords', 'value':'\u{2694}'}
                  ],

            "t" : [
                    {'name':'taurus', 'value':'\u{2649}'},
                    {'name':'telephone', 'value':'\u{260E}'},
                    {'name':'thunder', 'value':'\u{26C8}'},
                    {'name':'timer', 'value':'\u{23F2}'},
                    {'name':'trademark', 'value':'\u{2122}'}
                  ],

            "u" : [
                    {'name':'up', 'value':'\u{2B06}'},
                    {'name':'umbrella', 'value':'\u{2602}'},
                    {'name':'umbrella', 'value':'\u{2614}'}
                  ],

            "v" : [
                    {'name':'vase', 'value':'\u{26B1}'},
                    {'name':'virgo', 'value':'\u{264D}'},
                    {'name':'voltage', 'value':'\u{26A1}'}
                  ],

            "w" : [
                    {'name':'warning', 'value':'\u{26A0}'},
                    {'name':'watch', 'value':'\u{231A}'},
                    {'name':'wheelchair', 'value':'\u{267F}'},
                    {'name':'white', 'value':'\u{25AB}'},
                    {'name':'white', 'value':'\u{25FB}'}
                  ],

            "x" : [

                  ],

            "y" : [
                    {'name':'yinyang', 'value':'\u{262F}'}
                  ],

            "z" : [

                  ]
          }

class Rebus extends Component {

  constructor(opts) {
    super(opts);
    this.state = {
       text: "",
       rebus:"",
       previousText:"",
    };
  }

  buttonClicked() {
      console.log(this.state.rebus);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize: 30}}> {this.generate(this.state.text)}</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({text})}
          placeholder="Type your text here..."
        />
        <TouchableHighlight
          style={styles.button}
          onPress={this.buttonClicked.bind(this)}>
          <View>
            <Text style={styles.buttonText}>Send Rebus</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }

  generate(text) {
    console.log("text length ["+text.length+"]");
    if(text.length == 0)
    this.state.rebus = "";
    var textPart = text;

    var i = 0;

    //position of i should be just after the last space
    if(text.lastIndexOf(" ")>-1){
      i = text.lastIndexOf(" ");
      if((text.match(/ /g) || []).length > (this.state.rebus.match(/ /g) || []).length){
        this.state.rebus += " ";
      }
      textPart = text.substring(i+1,text.length);
      i++;
    }

    //unless we started removing some characters from the input
    //in this case we start from scratch
    if(text.length < this.state.previousText.length){
      i = 0;
      this.state.rebus = "";
      //in case there are other spaces after
      textPart = text;
      textPart = textPart.split(" ")[0];
    }

    while (i < text.length && text.length>0) {
        //if Char is not alphanumeric add it directly to the Rebus
        var str = text.toLowerCase().charAt(i);
        if(str.match(/[a-z]/i) === null){
          this.state.rebus += text.charAt(i);
          textPart = text.substring(i+1,text.length).split(" ")[0];
          //in case there are other spaces after
          textPart = textPart.split(" ")[0];
          i++;
          continue;
        }
        console.log("json length of ["+text.toLowerCase().charAt(i)+"] =>"+ json[text.toLowerCase().charAt(i)].length);

        for(var j = 0; j < json[text.toLowerCase().charAt(i)].length; j++){
          //simplest case => text is entirely contained in the emoji

          if(json[text.toLowerCase().charAt(i)][j].name.indexOf(textPart.toLowerCase()) > -1){

            //last character of my rebus isn't a space then remove previous rebus resolution
            //as we are building the rebus on the go
            if(this.state.rebus.charAt(this.state.rebus.length-1).match(/[a-z]/i) !== null){
                var idx = this.state.rebus.lastIndexOf(" ")>-1 ? this.state.rebus.lastIndexOf(" ")+1 : 0;
                this.state.rebus = this.state.rebus.substring(0, idx);
                this.state.rebus += json[text.toLowerCase().charAt(i)][j].value;
            }else{
                this.state.rebus += json[text.toLowerCase().charAt(i)][j].value;
            }
            var delta = json[text.toLowerCase().charAt(i)][j].name.replace(textPart.toLowerCase(), "");
            if(delta.length>0){
              this.state.rebus += "-"+delta;
            }
            i = i+textPart.length-1;
            break;
          }

            /*if(text.length < i+1 && json[text.toLowerCase().charAt(i)][j].name.length>1 && text.charAt(i+1) == json[text.toLowerCase().charAt(i)][j].name.charAt(1)){
               this.state.rebus = json[text.toLowerCase().charAt(i)][j]+"-"+json[text.toLowerCase().charAt(i)][j].name.substring(1, json[text.toLowerCase().charAt(i)][j].length);
               i=i+2;
               break;
            }*/
        }

        i++;
    }
    this.state.previousText = text;
    this.state.text = this.state.rebus;
    return this.state.rebus;
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
    marginRight: 15,
    marginTop:10,
  },
  buttonText:{
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    paddingTop:8,
    alignItems: 'center',
    color: "#FFFFFF"
  }
})

export default Rebus;
