import React, {Component, useCallback} from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableHighlight,
  PixelRatio,
  Dimensions,
  Button,
  Linking,
  ActivityIndicator,
} from 'react-native';
import YouTube, {
  YouTubeStandaloneIOS,
  YouTubeStandaloneAndroid,
} from 'react-native-youtube';
import axios from 'axios';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import LogoN from '../assets/image/Netflix-Logo.png';
export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailFilm: [],
      date: '',
      genre: [],
      crew: [],
      cast: [],
      modalVisible: false,
      isReady: false,
      status: null,
      quality: null,
      error: null,
      isPlaying: false,
      duration: 0,
      currentTime: 0,
      fullscreen: false,
      trailer: '',
      hidden: 'none',
      homepage: '',
      white: '#F4F4F4',
      spinn: true,
      displayAll: 'none',
      displaySpinn: 'flex',
    };
  }
  _youTubeRef = React.createRef();
  Spinner = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: '#393534',
          display: this.state.displaySpinn,
        }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  };
  data = () => {
    const {id, title} = this.props.route.params;
    console.log(id, title);
    this.setState({title});
    if (title === 'tv') {
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${id}/credits?api_key=1fdb707d0fb3912e6be0909078fcb461&language=en-US`,
        )
        .then((response) => {
          console.log('ini crew', response.data.crew);
          this.setState({crew: response.data.crew, cast: response.data.cast});
        });
      axios
        .get(
          `https://api.themoviedb.org/3/tv/${id}?api_key=1fdb707d0fb3912e6be0909078fcb461&language=en-US`,
        )
        .then((response) => {
          console.log('tanggal', response.data.last_air_date);
          this.setState({
            detailFilm: response.data,
            date: response.data.last_air_date.slice(0, 4),
            date2: response.data.last_air_date
              .replace('-', '/')
              .replace('-', '/'),
            genre: response.data.genres,
            homepage: response.data.homepage,
            displayAll: 'flex',
            displaySpinn: 'none',
          });
          console.log(
            response.data.release_date.replace('-', '/').replace('-', '/'),
          );
          homepage = response.data.homepage;
          console.log('ini home page', homepage);
          const site = homepage.includes('https://www.netflix.com');
          console.log(site);
          if (site === true) {
            this.setState({hidden: 'flex'});
          } else {
            this.setState({hidden: 'none'});
          }
        });
    } else  {
      let homepage = null;
      axios
        .get(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=1fdb707d0fb3912e6be0909078fcb461`,
        )
        .then((response) => {
          console.log(response);
          this.setState({crew: response.data.crew, cast: response.data.cast});
        })
        .catch((error) => {
          console.log(error);
        });
      axios
        .get(
          `
          https://api.themoviedb.org/3/movie/${id}?api_key=1fdb707d0fb3912e6be0909078fcb461&language=en-US`,
        )
        .then((response) => {
          console.log(response);
          console.log(
            response.data.release_date.replace('-', '/').replace('-', '/'),
          );
          homepage = response.data.homepage;
          console.log('ini home page', homepage);
          const site = homepage.includes('https://www.netflix.com');
          console.log(site);
          if (site === true) {
            this.setState({hidden: 'flex'});
          } else {
            this.setState({hidden: 'none'});
          }
          this.setState({
            detailFilm: response.data,
            date: response.data.release_date.slice(0, 4),
            date2: response.data.release_date
              .replace('-', '/')
              .replace('-', '/'),
            genre: response.data.genres,
            homepage: response.data.homepage,
            displayAll: 'flex',
            displaySpinn: 'none',
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  componentDidMount() {
    if (this.state.spinn === true) {
      this.data();
    } else {
      // this.data();
    }
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  OpenURLButton = ({url, children}) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <TouchableOpacity onPress={handlePress}>
        <Text
          style={{color: '	rgb(24,24,24)', fontSize: 19, fontWeight: 'bold'}}>
          {' '}
          {children}{' '}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    console.log('ini detail', detailFilm);
    const detail = this.state.detailFilm;
    console.log('ini average', this.state.detailFilm.vote_average);
    const {date, date2, genre, crew, detailFilm} = this.state;
    const genres = genre[genre.length - 1];
    const cru = crew[crew.length - 1];
    console.log(cru);
    // if(detailFilm.vote_average.includes('.') === true) {
    //     console.log(detailFilm.vote_average.slice('.'))
    // }else{
    //     console.log(detailFilm.vote_average)
    // }
    return (
      <View style={{flex: 1}}>
        <this.Spinner />
        <View style={{display: this.state.displayAll}}>
          <ScrollView style={{backgroundColor: '#22211F'}}>
            <ImageBackground
              style={{
                resizeMode: 'cover',
                justifyContent: 'center',
                height: 200,
              }}
              source={{
                uri: `https://image.tmdb.org/t/p/w500/${detailFilm.backdrop_path}`,
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={{height: 150, width: 100}}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500/${detailFilm.poster_path}`,
                    }}
                  />
                </View>
                <View style={{flex: 2, justifyContent: 'center'}}></View>
              </View>
            </ImageBackground>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  margin: 20,
                  color: 'white',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    fontFamily: 'Source Sans Pro, Arial, sans-serif',
                    color: 'white',
                  }}>
                  {' '}
                  {detailFilm.title || detailFilm.name}{' '}
                </Text>
                <Text style={{fontSize: 20, color: 'white'}}>({date}) </Text>
              </Text>
            </View>
            <View style={{flexDirection: 'row', margin: 20}}>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: 'white',
                    borderWidth: 1,
                    borderRadius: 20,
                    borderColor: 'white',
                    padding: 10,
                  }}>
                  {detailFilm.vote_average}%
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('Trailer', {
                      id: this.props.route.params.id,
                      title: this.state.title,
                    })
                  }>
                  <Text
                    style={{
                      color: 'white',
                      borderWidth: 1,
                      borderRadius: 20,
                      borderColor: 'white',
                      padding: 10,
                    }}>
                    <Icon name="play" /> Play Trailer
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderColor: 'rgb(211,211,211)',
                padding: 10,
              }}>
              <Text style={{color: 'white', fontSize: 15}}>
                {this.state.date2}
              </Text>
              <Text style={{color: 'white', fontSize: 14}}>
                {genre.map((gende) => {
                  if (gende.id === genres.id) {
                    return <Text> {gende.name} </Text>;
                  } else {
                    return <Text> {gende.name}, </Text>;
                  }
                })}
              </Text>
            </View>
            <View style={{marginLeft: 10}}>
              <View>
                <Text style={styless.status}>Overview</Text>
                <Text style={styless.statusDescription}>{detail.overview}</Text>
              </View>
              <View>
                {crew.map((crew) => {
                  if (crew.job === 'Writter' || crew.job === 'Producer') {
                    return (
                      <View style={{marginVertical: 30}} key={crew.id}>
                        <Text style={{color: 'white', fontSize: 20}}>
                          {crew.name}{' '}
                        </Text>
                        <Text style={{color: 'white', fontSize: 15}}>
                          {crew.job}
                        </Text>
                      </View>
                    );
                  }
                })}
              </View>
              <Text style={styless.status}>Top Billed cast</Text>
              <View>
                <ScrollView horizontal={true}>
                  {this.state.cast.map((cast) => {
                    if (cast.profile_path !== null) {
                      return (
                        <View
                          style={{
                            margin: 10,
                            borderWidth: 1,
                            borderColor: '	rgb(211,211,211)',
                            height: 240,
                            borderRadius: 5,
                            maxWidth: 130,
                            alignItems: 'center',
                          }}>
                          <Image
                            style={{width: 125, height: 150}}
                            source={{
                              uri: `https://image.tmdb.org/t/p/w500/${cast.profile_path}`,
                            }}
                          />
                          <View>
                            <Text
                              style={{
                                color: 'white',
                                marginTop: 5,
                                fontSize: 17,
                                fontWeight: 'bold',
                                margin: 2,
                              }}>
                              {cast.name}
                            </Text>
                            <Text
                              style={{
                                color: 'white',
                                marginTop: 2,
                                marginLeft: 2,
                              }}>
                              {cast.character}
                            </Text>
                          </View>
                        </View>
                      );
                    }
                  })}
                </ScrollView>
              </View>
              <View style={{marginHorizontal: 10}}>
                <View style={styless.statusArea}>
                  <Text style={styless.status}>Status</Text>
                  <Text style={styless.statusDescription}>
                    {' '}
                    {detailFilm.status}{' '}
                  </Text>
                </View>
                <View style={styless.statusArea}>
                  <Text style={styless.status}>Original Language</Text>
                  <Text style={styless.statusDescription}>
                    {' '}
                    {detailFilm.original_language}{' '}
                  </Text>
                </View>
                <View style={styless.statusArea}>
                  <Text style={styless.status}>Budget</Text>
                  <Text style={styless.statusDescription}>
                    {' '}
                    {detailFilm.budget || '-'}{' '}
                  </Text>
                </View>
                <View style={styless.statusArea}>
                  <Text style={styless.status}>Revenue</Text>
                  <Text style={styless.statusDescription}>
                    {' '}
                    {detailFilm.revenue || detailFilm.status}{' '}
                  </Text>
                </View>
                <View style={styless.statusArea}>
                  <Text style={styless.status}>Keywords</Text>
                  <Text style={styless.statusDescription}>
                    No Keywords have been added
                  </Text>
                </View>
                <View style={styless.statusArea}>
                  <Text style={styless.status}>Content Score</Text>
                  <Text
                    style={{
                      borderWidth: 1,
                      padding: 5,
                      fontSize: 16,
                      paddingBottom: 1,
                      paddingTop: 2,
                      color: 'white',
                    }}>
                    100
                  </Text>
                  <Text style={styless.statusDescription}>
                    Yes! Looking good
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View style={{display: this.state.hidden}}>
            <View
              style={{
                position: 'absolute',
                alignSelf: 'center',
                bottom: 10,
                backgroundColor: '	rgb(211,211,211)',
                paddingHorizontal: 20,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '	rgb(128,128,128)',
                opacity: 2,
              }}>
              <View
                style={{
                  alignItems: 'flex-end',
                  marginTop: 2,
                  marginBottom: -12,
                  marginRight: -10,
                }}>
                <TouchableOpacity
                  style={{
                    padding: 5,
                    paddingVertical: 0,
                    marginRight: -5,
                  }}
                  onPress={() => this.setState({hidden: 'none'})}>
                  <Text style={{margin: 0, fontWeight: 'bold'}}>X</Text>
                </TouchableOpacity>
              </View>
              <View style={{alignItems: 'center', marginTop: 0}}>
                <Image
                  style={{width: 140, height: 70, marginTop: 0}}
                  source={{
                    uri:
                      'https://logos-world.net/wp-content/uploads/2020/04/Netflix-Logo.png',
                  }}
                />
              </View>
              <View style={{alignItems: 'center'}}>
                <Text style={{color: '	rgb(32,32,32)'}}>Now Streaming</Text>
                <this.OpenURLButton url={this.state.homepage}>
                  Watch Now
                </this.OpenURLButton>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
const styless = StyleSheet.create({
  statusArea: {
    marginVertical: 10,
  },
  status: {fontWeight: 'bold', fontSize: 20, color: 'white'},
  statusDescription: {fontSize: 17, color: 'white'},
});
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#F4F4F4',
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
