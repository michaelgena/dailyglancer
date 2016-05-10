'use strict';
import React, { Component, View, Text, StyleSheet,ListView,TouchableHighlight,ActivityIndicatorIOS,Image } from 'react-native';
import { Actions } from 'react-native-router-flux';

//var GlanceDetail = require('./GlanceDetail');
var REQUEST_FEED_URL = "http://dailyglancer.com/action/get_feed_urls.php?PgeToken=";
var GOOGLE_FEED_API_URL = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=";
var REQUEST_INSTAGRAM_TAGS_URL = "http://dailyglancer.com/action/get_instagram_tags.php?PgeToken=";

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
        width: 380,
        height: 350
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 8
    },
    content: {
        color: '#656565',
        margin: 5
    },
    separator: {
       height: 1,
       backgroundColor: '#dddddd'
   	},
   	listView: {
       backgroundColor: '#F5FCFF',
			 marginTop: 65
   },
   loading: {
       flex: 1,
       alignItems: 'center',
       justifyContent: 'center'
   },
	 image: {
	     flex: 1,
	     width: null,
	     height: 350,
	}
});

class GlancerList extends Component {

	constructor(props) {
       super(props);
			 this._glanceMaker = props.glanceMaker;
       this.state = {
       		isLoading: true,
          dataSource: new ListView.DataSource({
        		rowHasChanged: (row1, row2) => row1 !== row2
        	})
       };
			 this._currentPageIndex = 0;
	     this._hasNextPage = true;
	     this._isFetching = false;
			 this._entries = [];
			 this._feedUrls = [];

			 this._currentInstagramPageIndex = 0;
			 this._instagramTags = [];
   	}

    render() {
    	if (this.state.isLoading) {
           return this.renderLoadingView();
       	}

    	return (
       		<ListView
            	dataSource={this.state.dataSource}
            	renderRow={this.renderGlancer.bind(this)}
							onEndReached={this._onEndReached.bind(this)}
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

	renderGlancer(glance) {

			if(glance.images !== undefined){
				return (
             <TouchableHighlight underlayColor='#dddddd'>
                 <View>
                      <View style={styles.rightContainer}>
                         <Image style={styles.image}source={{uri: glance.images.low_resolution.url}} resizeMode='contain' />
                         <Text style={styles.content}>{(glance.caption !== null)? glance.caption.text: ""}</Text>
                     </View>
                     <View style={styles.separator} />
                 </View>
             </TouchableHighlight>
        );
			}

       return (
            <TouchableHighlight underlayColor='#dddddd'>
                <View>
                     <View style={styles.rightContainer}>
                        <Text style={styles.title}>{glance.title}</Text>
                        <Text style={styles.content}>{glance.contentSnippet}</Text>
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
       fetch(REQUEST_FEED_URL+this._glanceMaker.PgeToken)
       .then((response) => response.json())
       .then((responseData) => {
					this._feedUrls = responseData.urls;
					this.loadFeeds(responseData.urls[0]);
       })
       .done();

			 fetch(REQUEST_INSTAGRAM_TAGS_URL+this._glanceMaker.PgeToken)
       .then((response) => response.json())
       .then((responseData) => {
					this._instagramTags = responseData.tags;
					if(this._feedUrls.length == 0){
						this.loadInstagramPicsByTag(responseData.tags[0]);
					}
       })
       .done();
   	}

		loadFeeds(url){
			this._isFetching = true;
			var feedUrl = GOOGLE_FEED_API_URL + encodeURIComponent(url);
			var last = 0;
			var entries;
			fetch(feedUrl)
			.then((response) => response.json())
			.then((responseData) => {
				if(responseData.responseData !== null && responseData.responseData.feed.entries !== undefined){
					entries = responseData.responseData.feed.entries;
					console.log("feeds");
					this._entries.concat(entries);
					this.setState({
							dataSource: this.state.dataSource.cloneWithRows(entries),
							isLoading: false
					});
					this._isFetching = false;
				}
			})
			.done();
		}

		loadInstagramPicsByTag(tag){
			this._isFetching = true;
			var instagramTagUrl = "https://api.instagram.com/v1/tags/"+tag+"/media/recent?client_id=cfee888def7841888c39abaeb1cf8869&access_token=241876767.cfee888.ceca372f726e43ac834f28729c735588";
			var last = 0;
			var entries;
			fetch(instagramTagUrl)
			.then((response) => response.json())
			.then((responseData) => {
				entries = responseData.data;
				if(entries !== undefined){
					console.log("Instagram");
					this._entries.concat(entries);
					this.setState({
							dataSource: this.state.dataSource.cloneWithRows(entries),
							isLoading: false
					});
					this._isFetching = false;
				}
			})
			.done();
		}


		async _fetchCurrentPage() {
	    if (this._isFetching || !this._hasNextPage) {
	      return;
	    }
			if(this._currentPageIndex < this._feedUrls.length){
	    	this.loadFeeds(this._feedUrls[this._currentPageIndex]);
				this._currentPageIndex++;
				return;
			}else if(this._currentInstagramPageIndex < this._instagramTags.length){
				this.loadInstagramPicsByTag(this._instagramTags[this._currentInstagramPageIndex]);
				this._currentInstagramPageIndex++;
				return;
			}
	  }

		_onEndReached() {
			this._fetchCurrentPage().done();
		}

	}
module.exports = GlancerList;
