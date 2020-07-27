/**
 * @format
 * @flow
 */

import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  PixelRatio,
  Platform,
  Button,
  Dimensions,
} from 'react-native';
import YouTube, {
  YouTubeStandaloneIOS,
  YouTubeStandaloneAndroid,
} from 'react-native-youtube';
import Axios from 'axios';

export default class ReactNativeYouTubeExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: true,
      isLooping: false,
      currentTime: 0,
      fullscreen: false,
      playerWidth: Dimensions.get('window').width,
    };
  }
  _youTubeRef = React.createRef();

  componentDidMount = () => {
    console.log(this.props.route.params.id);
    const {id, title} = this.props.route.params;
    console.log(title);
    if (title === 'tv') {
      Axios.get(
        `https://api.themoviedb.org/3/tv/${id}/videos?api_key=1fdb707d0fb3912e6be0909078fcb461&language=en-US`,
      ).then((Response) => {
        console.log(Response.data.results[0].key);
        this.setState({trailer: Response.data.results[0].key});
      });
    } else {
      Axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=1fdb707d0fb3912e6be0909078fcb461&language=en-US`,
      ).then((Response) => {
        console.log(Response.data.results[0].key);
        this.setState({trailer: Response.data.results[0].key});
      });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1}}></View>
        <View style={{flex: 1}}>
          <YouTube
            ref={this._youTubeRef}
            // You must have an API Key for the player to load in Android
            apiKey="YOUR_API_KEY"
            // Un-comment one of videoId / videoIds / playlist.
            // You can also edit these props while Hot-Loading in development mode to see how
            // it affects the loaded native module
            videoId={this.state.trailer}
            // videoIds={['uMK0prafzw0', 'qzYgSecGQww', 'XXlZfc1TrD0', 'czcjU1w-c6k']}
            // playlistId="PLF797E961509B4EB5"
            play={this.state.isPlaying}
            loop={this.state.isLooping}
            fullscreen={this.state.fullscreen}
            controls={1}
            style={[
              {
                height: PixelRatio.roundToNearestPixel(
                  this.state.playerWidth / (16 / 9),
                ),
              },
              styles.player,
            ]}
            onError={(e) => {
              this.setState({error: e.error});
            }}
            onReady={(e) => {
              this.setState({isReady: true});
            }}
            onChangeState={(e) => {
              this.setState({status: e.state});
            }}
            onChangeQuality={(e) => {
              this.setState({quality: e.quality});
            }}
            onChangeFullscreen={(e) => {
              this.setState({fullscreen: e.isFullscreen});
            }}
            onProgress={(e) => {
              this.setState({currentTime: e.currentTime});
            }}
          />
        </View>
        <View style={{flex: 1}}></View>
        <View style={{flex: 1}}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingBottom: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
});
