import React, { View, Text, StyleSheet, Image, ScrollView, ListView,TouchableHighlight, ActivityIndicatorIOS } from "react-native";
import Button from "react-native-button";
import { Actions } from "react-native-router-flux";

import loginInfo from '../../utils/loginInfo';

var REQUEST_URL = "http://dailyglancer.com/react/get_glance_makers_by_token.php?PgePrntToken=2e1058f32da92fa136ce12e24462e1d1";

class DrawerContent extends React.Component {
  constructor(opts) {
    super(opts);
    this.state = {
   		isLoading: true,
       	dataSource: new ListView.DataSource({
           	rowHasChanged: (row1, row2) => row1 !== row2
       	})
    };
  }

  _signOut() {
    loginInfo.removeLoginInfo().then(() => {
      Actions.login();
    }).done();
  }

  componentDidMount() {
    	this.fetchData();
   	}

	fetchData() {
       fetch(REQUEST_URL)
       .then((response) => response.json())
       .then((responseData) => {
           this.setState({
               dataSource: this.state.dataSource.cloneWithRows(responseData.glance_makers),
               isLoading: false
           });

       })
       .done();
  }

  renderLoadingView() {
    	return (
    	<ScrollView scrollsToTop={false} style={styles.menu}>
        	<View style={styles.loading}>
           	 <ActivityIndicatorIOS
           	     size='small'/>
        	</View>
         </ScrollView>
    	);
	}

  renderGlanceMaker(glanceMaker) {
  		const drawer = this.context.drawer;
       return (
            <TouchableHighlight onPress={()=>{drawer.close(); Actions.glancerList({glanceMaker, title: glanceMaker.PgeTitle})}}  underlayColor='#dddddd'>
                <View>
                	<Text style={styles.item}>{glanceMaker.PgeTitle}</Text>
                </View>
            </TouchableHighlight>
       );
  }

  render(){
    const drawer = this.context.drawer;

    if (this.state.isLoading) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>
        <ScrollView scrollsToTop={false} style={styles.menu}>
          <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderGlanceMaker.bind(this)}
              style={styles.itemLabel}
              />
        </ScrollView>
        <View style={styles.menuItem}>
          <Image style={styles.itemImage} source={require('../../img/search.png')} />
          <Button style={styles.itemLabel} onPress={() => { drawer.close();}}>Search</Button>
        </View>
        <View style={styles.menuItem}>
          <Image style={styles.itemImage} source={require('../../img/settings.png')} />
          <Button style={styles.itemLabel} onPress={() => { drawer.close();}}>Settings</Button>
        </View>
        <View style={styles.menuItem}>
          <Image style={styles.itemImage} source={require('../../img/signout.png')} />
          <Button style={styles.itemLabel} onPress={() => this._signOut()}>Sign out</Button>
        </View>
      </View>
    );
  }
}

DrawerContent.contextTypes = {
  drawer: React.PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF058',
  },
  backgroundImage: {
    width: 300,
    height: 150,
  },
  menuItem: {
    flexDirection: 'row',
    padding: 20,
  },
  itemImage: {
    marginTop: 1,
    width: 18,
    height: 18,
  },
  itemLabel: {
    paddingLeft: 2
  },
  item: {
    fontSize: 16
  },
  loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   },
   menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#FDF058',
    padding: 20,
  }
});

export default DrawerContent;
