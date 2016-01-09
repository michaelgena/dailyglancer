'use strict';
 
var React = require('react-native');
var GlanceDetail = require('./GlanceDetail');
var REQUEST_URL = 'https://www.googleapis.com/books/v1/volumes?q=subject:fiction';

 
var {
	Image,
    StyleSheet,
    Text,
    View,
    Component,
    ListView,
    TouchableHighlight,
    ActivityIndicatorIOS
   } = React;
 
var styles = StyleSheet.create({
	container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10
    },
    thumbnail: {
        width: 53,
        height: 81,
        marginRight: 10
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 8
    },
    author: {
        color: '#656565'
    },
    separator: {
       height: 1,
       backgroundColor: '#dddddd'
   	},
   	listView: {
       backgroundColor: '#F5FCFF'
   },
   loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   }	
});
 
class GlanceList extends Component {
	
	constructor(props) {
       super(props);
       this.state = {
       		isLoading: true,
           	dataSource: new ListView.DataSource({
               	rowHasChanged: (row1, row2) => row1 !== row2
           	})
       };
   	}

    render() {
    	if (this.state.isLoading) {
           return this.renderLoadingView();
       	}
       
    	return (
       		<ListView
            	dataSource={this.state.dataSource}
            	renderRow={this.renderGlance.bind(this)}
            	style={styles.listView}
            	/>
    	);
	}
	
	renderLoadingView() {
    	return (
        	<View style={styles.loading}>
           	 <ActivityIndicatorIOS
           	     size='large'/>
           	 <Text>
           	     Loading glances...
        	    </Text>
        	</View>
    	);
	}
	
	renderGlance(glance) {
       return (
            <TouchableHighlight onPress={() => this.showGlanceDetail(glance)}  underlayColor='#dddddd'>
                <View>
                    <View style={styles.container}>
                        <Image
                            source={{uri: glance.volumeInfo.imageLinks.thumbnail}}
                            style={styles.thumbnail} />
                        <View style={styles.rightContainer}>
                            <Text style={styles.title}>{glance.volumeInfo.title}</Text>
                            <Text style={styles.author}>{glance.volumeInfo.authors}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
       );
   }
    
    componentDidMount() {
    	this.fetchData();
   	}
   	
   	fetchData() {
       fetch(REQUEST_URL)
       .then((response) => response.json())
       .then((responseData) => {
           this.setState({
               dataSource: this.state.dataSource.cloneWithRows(responseData.items),
               isLoading: false
           });
       })
       .done();
   	}
   	
	showGlanceDetail(glance) {
    	   this.props.navigator.push({
        	 	title: glance.volumeInfo.title,
           		component: GlanceDetail,
           		passProps: {glance}
       		});
   	}
}
 
module.exports = GlanceList;