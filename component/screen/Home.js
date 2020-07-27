import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {Card, CardItem, Button} from 'native-base';
import Icons from 'react-native-vector-icons/Ionicons';
import Axios from 'axios';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
export default class Stack extends Component {
  constructor() {
    super();
    this.state = {
      topPopulerMovie: [],
      topPopulerTv: [],
      urlTopMovie: `https://api.themoviedb.org/3/movie/popular?api_key=1fdb707d0fb3912e6be0909078fcb461&language=en-US&page=`,
      urlTopTv: `https://api.themoviedb.org/3/tv/popular?api_key=1fdb707d0fb3912e6be0909078fcb461&language=en-US&page=`,
      displayPopularMovie: 'flex',
      displayPopularTv: 'flex',
      search: '',
      textInputSearch: 'none',
      side: 'none',
      white: '#F4F4F4',
      all: [],
      loading: true,
      displayall: 'none',
      displaySpinn: 'flex',
    };
  }
  data = () => {
    let Video = [];

    Axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=1fdb707d0fb3912e6be0909078fcb461`,
    ).then((response) => {
      Video = response.data.results;
      console.log(response.data.results);
      this.setState({topPopulerMovie: response.data.results});
      Axios.get(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=1fdb707d0fb3912e6be0909078fcb461`,
      ).then((response) => {
        console.log('ini movie', Video);
        // console.log(Video.concat(response.data.results));
        this.setState({
          topPopulerTv: response.data.results,
          all: Video.concat(response.data.results),
          loading: false,
          displayall: 'flex',
          side: 'none',
        });
      });
    });
  };
  componentDidMount = () => {
    if (this.state.loading === true) {
      this.setState({displaySpinn: 'flex', displayall: 'none'});
      this.data();
    } else {
      this.setState({displaySpinn: 'none', displayall: 'flex'});
    }
  };
  btnSearch = () => {
    if (this.state.textInputSearch === 'none') {
      this.setState({textInputSearch: 'flex'});
    } else {
      this.setState({textInputSearch: 'none'});
    }
  };
  onChangeText = (value) => {
    if (value !== '') {
      this.setState({
        search: value,
        displayPopularMovie: 'none',
        displayPopularTv: 'none',
        displaySpinn: 'none',
      });
    } else {
      this.data();
      this.setState({displayPopularMovie: 'flex', displayPopularTv: 'flex'});
    }
  };
  searchForAll = (search) => {
    console.log('ini adalah keyword', search.title);
    if (search.type === 'movie' || search.type === 'tv') {
      return (
        search.title.indexOf(this.state.search) !== -1 ||
        search.name.indexOf(this.state.search) !== -1
      );
    } else if (search.title === undefined) {
      return search.name.indexOf(this.state.search) !== -1;
    } else {
      return search.title.indexOf(this.state.search) !== -1;
    }
  };
  filterItems = (query) => {
    return fruits.filter(function (el) {
      return el.toLowerCase().indexOf(query.toLowerCase()) > -1;
    });
  };
  movieSort = () => {
    this.state.topPopulerMovie.sort();
  };
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

  ContentView = () => {
    return (
      <View>
        <Text>Welcome to React Native!</Text>
        <Text>To get started, edit index.ios.js</Text>
        <Text>
          Press Cmd+R to reload,{'\n'}
          Cmd+Control+Z for dev menu
        </Text>
      </View>
    );
  };
  Side = () => {
    if (this.state.side === 'none') {
      this.setState({side: 'flex'});
    } else {
      this.setState({side: 'none'});
    }
  };
  Move = (tes) => {
    console.log(tes);
    if (tes === 'Top Tv') {
      this.props.navigation.navigate('Tv');
      this.setState({side: 'none'});
    } else if (tes === 'Top Movie') {
      this.setState({side: 'none'});
      this.props.navigation.navigate('Movie');
    }
  };
  render() {
    return (
      <View style={{flex: 1}}>
        <this.Spinner />

        <ScrollView
          style={{backgroundColor: '#22211F', display: this.state.displayall}}>
          <View style={{display: this.state.displayall}}>
            <View style={{display: this.state.side}}>
              <View
                style={{
                  backgroundColor: '#393534',
                  position: 'absolute',
                  width: 200,
                  alignContent: 'center',
                  alignItems: 'center',
                  zIndex: 1,

                  paddingBottom: 20,
                }}>
                <View>
                  <Button
                    style={{marginTop: 10}}
                    transparent
                    onPress={() => this.Side()}>
                    <Icons
                      name="menu-outline"
                      size={30}
                      color="#FF7314"></Icons>
                  </Button>
                </View>
                <View
                  style={{justifyContent: 'center', alignContent: 'center'}}>
                  <Button transparent onPress={() => this.Move('Top Tv')}>
                    <Text style={{color: this.state.white}}>
                      Top Tv Popular
                    </Text>
                  </Button>
                  <Button transparent onPress={() => this.Move('Top Movie')}>
                    <Text style={{color: this.state.white}}>
                      Top Movie Popular
                    </Text>
                  </Button>
                </View>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1}}>
                <Button
                  style={{marginLeft: 20}}
                  transparent
                  onPress={() => this.Side()}>
                  <Icons name="menu-outline" size={30} color="#FF7314"></Icons>
                </Button>
              </View>
              <View
                style={{flex: 1, alignContent: 'center', alignItems: 'center'}}>
                <Image
                  style={{width: 67, height: 30}}
                  source={require('../assets/image/logo-tmdb.png')}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  justifyContent: 'flex-end',
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Button
                    transparent
                    style={{
                      alignSelf: 'flex-end',
                      margin: 10,
                    }}>
                    <Icons name="person" size={30} color="#FF7314"></Icons>
                  </Button>
                  <Button
                    style={{
                      margin: 10,
                    }}
                    transparent
                    onPress={() => this.btnSearch()}>
                    <Icons
                      name="search-outline"
                      size={30}
                      color="#FF7314"></Icons>
                  </Button>
                </View>
              </View>
            </View>
            <View
              style={{
                display: this.state.textInputSearch,
                position: 'relative',
                alignSelf: 'center',
                width: 320,
                margin: 5,
              }}>
              <TextInput
                style={{
                  height: 40,
                  borderColor: '#F4F4F4',
                  borderBottomWidth: 1,
                  paddingBottom: 0,
                  color: '#F4F4F4',
                }}
                onChangeText={(text) => this.onChangeText(text)}
              />
            </View>
            <View></View>
            <View
              style={{
                alignSelf: 'flex-start',
                display: this.state.displayPopularMovie,
              }}>
              <Text
                style={{
                  marginTop: 10,
                  paddingHorizontal: 10,
                  color: '#F4F4F4',
                  borderWidth: 1,
                  borderColor: '#F4F4F4',
                  borderRadius: 10,
                  margin: 10,
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Top Popular movie
                </Text>
              </Text>
            </View>
            <View style={{flex: 1}}></View>

            <ScrollView
              horizontal={true}
              style={{
                display: this.state.displayPopularMovie,
                padding: 10,
                paddingTop: 0,
                marginTop: 0,
              }}>
              {this.state.topPopulerMovie.slice(-10).map((topPopulerMovie) => {
                console.log(topPopulerMovie);
                return (
                  <Card
                    key={topPopulerMovie.id}
                    style={{
                      width: 150,
                      paddingHorizontal: 0,
                      height: 250,
                      borderRadius: 5,
                      backgroundColor: '#161a1b',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('Detail', {
                          id: topPopulerMovie.id,
                        });
                      }}>
                      <CardItem cardBody>
                        <Image
                          source={{
                            uri: `https://image.tmdb.org/t/p/w500/${topPopulerMovie.backdrop_path}`,
                          }}
                          style={{
                            height: 150,
                            width: null,
                            flex: 1,
                            marginTop: 0,
                            borderTopRightRadius: 3,
                            borderTopLeftRadius: 3,
                          }}
                        />
                      </CardItem>
                    </TouchableOpacity>
                    <Text numberOfLines={2}
                      style={{margin: 5, fontWeight: 'bold', color: '#F4F4F4'}}
                      onPress={() =>
                        this.props.navigation.navigate('Detail', {
                          id: topPopulerMovie.id,
                        })
                      }>
                      {topPopulerMovie.title}
                    </Text>
                    <Text style={{color: '#F4F4F4'}}>
                      {topPopulerMovie.release_date}
                    </Text>
                  </Card>
                );
              })}
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Movie')}>
                  <Text
                    style={{
                      color: '#F4F4F4',
                      margin: 20,
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 20,
                      borderColor: '	rgb(211,211,211)',
                    }}>
                    See More
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <View
              style={{
                alignSelf: 'flex-start',
                display: this.state.displayPopularMovie,
              }}>
              <Text
                style={{
                  marginTop: 10,
                  paddingHorizontal: 10,
                  color: '#F4F4F4',
                  borderWidth: 1,
                  borderColor: '#F4F4F4',
                  borderRadius: 10,
                  margin: 10,
                }}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Top Popular Tv
                </Text>
              </Text>
            </View>
            <View style={{flex: 1}}></View>
            <ScrollView
              horizontal={true}
              style={{
                padding: 10,
                paddingTop: 0,
                marginTop: 0,
                display: this.state.displayPopularTv,
              }}>
              {this.state.topPopulerTv.slice(-10).map((tv) => {
                console.log(tv);
                return (
                  <Card
                    key={tv.id}
                    style={{
                      width: 150,
                      paddingHorizontal: 0,
                      height: 250,
                      borderRadius: 5,
                      backgroundColor: '#161a1b',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate('Detail', {
                          id: tv.id,
                          title: tv.media_type,
                        });
                      }}>
                      <CardItem cardBody>
                        <Image
                          source={{
                            uri: `https://image.tmdb.org/t/p/w500/${tv.backdrop_path}`,
                          }}
                          style={{
                            height: 150,
                            width: null,
                            flex: 1,
                            marginTop: 0,
                            borderTopRightRadius: 3,
                            borderTopLeftRadius: 3,
                          }}
                        />
                      </CardItem>
                    </TouchableOpacity>
                    <Text
                      style={{margin: 5, fontWeight: 'bold', color: '#F4F4F4'}}
                      onPress={() =>
                        this.props.navigation.navigate('Detail', {
                          id: tv.id,
                          title: tv.media_type,
                        })
                      }>
                      {tv.name}
                    </Text>
                    <Text style={{color: '#F4F4F4'}}>{tv.first_air_date}</Text>
                  </Card>
                );
              })}
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Tv')}>
                  <Text
                    style={{
                      color: '#F4F4F4',
                      margin: 20,
                      borderWidth: 1,
                      padding: 10,
                      borderRadius: 20,
                      borderColor: '	rgb(211,211,211)',
                    }}>
                    See More
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <ScrollView style={{display: 'flex'}}>
              {this.state.all
                .filter((data) => this.searchForAll(data))
                .map((topPopulerMovie) => {
                  return (
                    <View
                      key={topPopulerMovie.id}
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderBottomWidth: 1,
                        borderColor: '#F4F4F4',
                        borderRadius: 10,
                        margin: 10,
                      }}>
                      <View style={{flex: 2}}>
                        <TouchableOpacity
                          onPress={() => {
                            // () => console.log(topPopulerMovie)
                            this.props.navigation.navigate('Detail', {
                              id: topPopulerMovie.id,
                              title: topPopulerMovie.media_type,
                            });
                          }}>
                          <Image
                            style={{width: 120, height: 150}}
                            source={{
                              uri: `https://image.tmdb.org/t/p/w500/${topPopulerMovie.poster_path}`,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{flex: 2}}>
                        <Text
                          style={{
                            color: '#F4F4F4',
                            marginVertical: 5,
                            marginTop: 5,
                            fontWeight: 'bold',
                          }}>
                          {topPopulerMovie.title || topPopulerMovie.name}
                        </Text>
                        <Text numberOfLines={3} style={{color: '#F4F4F4'}}>
                          {' '}
                          {topPopulerMovie.overview}{' '}
                        </Text>
                      </View>
                      <View style={{flex: 1}}>
                        <Text style={{color: '#F4F4F4'}}>
                          {topPopulerMovie.release_date ||
                            topPopulerMovie.first_air_date}
                        </Text>
                      </View>
                    </View>
                  );
                })}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
