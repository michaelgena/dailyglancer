'use strict';
import React, { Component, View, Text, StyleSheet,ListView,TouchableHighlight,ActivityIndicatorIOS,Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import {GoogleSignin} from 'react-native-google-signin';

//var GlanceDetail = require('./GlanceDetail');
var REQUEST_FEED_URL = "http://dailyglancer.com/action/get_feed_urls.php?PgeToken=";
var GOOGLE_FEED_API_URL = "https://ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=-1&q=";
var REQUEST_INSTAGRAM_TAGS_URL = "http://dailyglancer.com/action/get_instagram_tags.php?PgeToken=";
//...
var REQUEST_YOUTUBE_TAGS_URL = "http://dailyglancer.com/action/get_youtube_tags.php?PgeToken=";

GoogleSignin.configure({
  iosClientId: "AIzaSyBuSw_HVf_EgVc1Z49q4uX6QQaXBRdglD4", // only for iOS
})
.then(() => {
  // you can now call currentUserAsync()
});

var OAUTH2_CLIENT_ID = 'AIzaSyBuSw_HVf_EgVc1Z49q4uX6QQaXBRdglD4';
var OAUTH2_SCOPES = [
  'https://www.googleapis.com/auth/youtube'
];


import ImageResolver from 'image-resolver';
import {FitImage} from 'react-native-fit-image';

var resolver = new ImageResolver();
resolver.register(new ImageResolver.FileExtension());
resolver.register(new ImageResolver.MimeType());
resolver.register(new ImageResolver.Opengraph());
resolver.register(new ImageResolver.Webpage());



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
        flex: 1,
				backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 20,
        marginLeft: 5,
        marginRight: 5,
        marginBottom: 0
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
			 height: 350
	},
	fitImage: {

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

			 this._currentYoutubePageIndex = 0;
			 this._youtubeTags = [];
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
        	</View>
    	);
	}

	renderGlancer(glance) {
			console.log("glance.type:"+ glance.type);

			if(glance.type == "Picture"){
				return (
             <TouchableHighlight onPress={()=>{Actions.glancerContent({url: glance.link, title: 'Instagram'})}} underlayColor='#dddddd'>
                 <View>
                      <View style={styles.rightContainer}>

													<Image style={styles.image}source={{uri: glance.image}} resizeMode='contain' />
                         <Text style={styles.content}>{glance.contentSnippet}</Text>
                     </View>
                     <View style={styles.separator} />
                 </View>
             </TouchableHighlight>
        );
			}

			if(glance.type == "Video"){
				return (
						 <TouchableHighlight onPress={()=>{Actions.glancerContent({url: glance.link, title: 'Youtube'})}} underlayColor='#dddddd'>
								 <View>
											<View style={styles.rightContainer}>

													<Image style={styles.image}source={{uri: glance.image}}
													style={{height: 280}}
                  				resizeMode={Image.resizeMode.cover}
													/>
												 <Text style={styles.title}>{glance.title}</Text>
										 </View>
										 <View style={styles.separator} />
								 </View>
						 </TouchableHighlight>
				);
			}

			if(glance.type == "Article"){
				var title = glance.title;
				if(glance.title.length > 40){
					 var length = parseInt(glance.title.length / 2);
					 title = glance.title.substring(0, length - 10) + "..." +glance.title.substring((glance.title.length - 10), glance.title.length);
				}
				if(glance.image !== undefined){
	       return (
	            <TouchableHighlight onPress={()=>{Actions.glancerContent({url: glance.link, title: title})}} underlayColor='#dddddd'>
	                <View>
	                     <View style={styles.rightContainer}>
											 		<Image style={styles.image}source={{uri: glance.image}} resizeMode='contain' />
	                        <Text style={styles.title}>{glance.title}</Text>
	                    </View>
	                    <View style={styles.separator} />
	                </View>
	            </TouchableHighlight>
	       );
			 	}else{
				 return (
							<TouchableHighlight onPress={()=>{Actions.glancerContent({url: glance.link, title: title})}} underlayColor='#dddddd'>
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
		 }

   }

    componentDidMount() {
    	this.fetchData();

      if(this._youtubeTags.length > 0){
        GoogleSignin.currentUserAsync()
        .then((user) => {
          console.log('USER', user);

          if(user == null){
            GoogleSignin.signIn()
            .then((user) => {
            console.log(user);
            //this.setState({user: user});
            })
            .catch((err) => {
            console.log('WRONG SIGNIN', err);
            })
            .done();
          }
          //this.setState({user: user});
        })
        .done();
      }

   	}

   	fetchData() {
       fetch(REQUEST_FEED_URL+this._glanceMaker.PgeToken)
       .then((response) => response.json())
       .then((responseData) => {
				 	//Ugly hack
				 	//Remove unwanted feeds
				 	for(var i=0;i<responseData.urls.length;i++){
				 		if(!responseData.urls[i].startsWith("http://gdata.youtube.com")){
					 		this._feedUrls.push(responseData.urls[i]);
				 		}
			 	 	}
					console.log("Feeds Urls: "+JSON.stringify(this._feedUrls));
					if(this._feedUrls.length > 0){
						this.loadFeeds(this._feedUrls[0]);
					}
       })
       .done();

			 fetch(REQUEST_INSTAGRAM_TAGS_URL+this._glanceMaker.PgeToken)
       .then((response) => response.json())
       .then((responseData) => {
					this._instagramTags = responseData.tags;
					console.log("Instagram Tags: "+JSON.stringify(responseData.tags));
					if(this._feedUrls.length == 0 && this._instagramTags.length>0){
						this.loadInstagramPicsByTag(this._instagramTags[0]);
					}
       })
       .done();

			 //REQUEST_INSTAGRAM_USER_URL

			 fetch(REQUEST_YOUTUBE_TAGS_URL+this._glanceMaker.PgeToken)
			 .then((response) => response.json())
			 .then((responseData) => {
				 console.log("Youtube Tags: "+JSON.stringify(responseData.tags));
				 this._youtubeTags = responseData.tags;
				 if(this._feedUrls.length == 0 && this._instagramTags.length == 0 &&  this._youtubeTags.length > 0){
					 this.loadYoutubeVideosByTag(this._youtubeTags[0]);
				 }
			 })
			 .done();
   	}


		loadFeeds(url){
			this._isFetching = true;
			console.log("url: "+ url);
			var feedUrl = GOOGLE_FEED_API_URL + encodeURIComponent(url);
			var entries;
			var glances = [];
			fetch(feedUrl)
			.then((response) => response.json())
			.then((responseData) => {
				if(responseData.responseData !== null && responseData.responseData.feed.entries !== undefined){
					entries = responseData.responseData.feed.entries;
					//console.log("entries"+ JSON.stringify(entries));
					//handle Image extraction here
					var nbImageToSearch = 0;
					for(var i=0;i<entries.length;i++){
						var re = /.*src="([^"]*)/;
						var m;
						var src="";
						if ((m = re.exec(entries[i].content)) !== null) {
								if (m.index === re.lastIndex) {
										re.lastIndex++;
								}
								src = m[1];
								entries[i].image = src;
								var glance = {};
								glance.title = entries[i].title;
								glance.link = entries[i].link;
								glance.contentSnippet = entries[i].contentSnippet;
								glance.image = src;
								glance.source = "Feed";
								glance.type = "Article";
								glances.push(glance);
						}else{

							var glance = {};
							glance.title = entries[i].title;
							glance.link = entries[i].link;
							glance.contentSnippet = entries[i].contentSnippet;
							glance.source = "Feed";
							glance.type = "Article";
							glances.push(glance);
							//nbImageToSearch++;
							//we save the entry index as i is going to change

							/*resolver.resolve( entries[i].link, function( result ){
							    if ( result ) {
											console.log("result"+ JSON.stringify(result));
											for(var j=0; j<entries.length;j++){
												if(entries[j].link == result.url){
														console.log( result.image );
														entries[j].image = result.image;
														console.log("entries"+ JSON.stringify(entries[j]));

														var glance = {};
														glance.title = entries[j].title;
														glance.link = entries[j].link;
														glance.content = entries[j].content;
														glance.image = result.image;
														glances.push(glance);

														break;
												}
											}

							    } else {
							        console.log( 'No image found ' );
							    }
									nbImageToSearch--;
									if(i == entries.length && nbImageToSearch == 0){

										return glances;
										this._entries.concat(glances);
										this.setState({
												dataSource: this.state.dataSource.cloneWithRows(glances),
												isLoading: false
										});
										this._isFetching = false;
									}
							});*/
						}
					}
					this._entries.concat(glances);
					this.setState({
							dataSource: this.state.dataSource.cloneWithRows(glances),
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
			fetch(instagramTagUrl)
			.then((response) => response.json())
			.then((responseData) => {
				var entries = responseData.data;
				if(entries !== undefined){
					console.log("Instagram:"+ JSON.stringify(entries));
					var glances = [];
					for(var i=0;i<entries.length;i++){
						var glance = {};
						glance.title = "";
						glance.link = entries[i].link;
						glance.contentSnippet = entries[i].contentSnippet;
						glance.image = entries[i].images.low_resolution.url;
						glance.source = "Instagram";
						glance.type = "Picture";
						glances.push(glance);
					}
					this._entries.concat(glances);
					this.setState({
							dataSource: this.state.dataSource.cloneWithRows(glances),
							isLoading: false
					});
					this._isFetching = false;
				}
			})
			.done();
		}


		loadYoutubeVideosByTag(tag){
			this._isFetching = true;
			var youtubeTagUrl = "http://gdata.youtube.com/feeds/api/videos/-/"+tag+"?alt=json&max-results=30&format=5&v=2";
			fetch(youtubeTagUrl)
			.then((response) => response.json())
			.then((responseData) => {
				var entries = responseData.feed.entry;
				if(entries !== undefined){
					console.log("Youtube:"+ JSON.stringify(entries));
					var glances = [];
					for(var i=0;i<entries.length;i++){
						var glance = {};
						glance.title = entries[i].title.$t;
						glance.link = entries[i].media$group.media$content[0].url;
						glance.contentSnippet = "";
						glance.image = entries[i].media$group.media$thumbnail[1].url;
						glance.source = "Youtube";
						glance.type = "Video";
						glances.push(glance);
					}
					this._entries.concat(glances);
					this.setState({
							dataSource: this.state.dataSource.cloneWithRows(glances),
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
			}else if(this._currentYoutubePageIndex < this._youtubeTags.length){
				this.loadYoutubeVideosByTag(this._youtubeTags[this._currentYoutubePageIndex]);
				this._currentYoutubePageIndex++;
				return;
			}
	  }

		_onEndReached() {
			this._fetchCurrentPage().done();
		}

	}
module.exports = GlancerList;
