import React, {Component} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Icon,
  Left,
  Body,
  Right,
  Thumbnail,
  Title,
  Button,
} from 'native-base';
import SideMenu from 'react-native-side-menu';
import Icons from 'react-native-vector-icons/Ionicons';
import {SvgUri, SvgCssUri} from 'react-native-svg';
import Axios from 'axios';
import {
  ScrollView,
  TouchableHighlight,
  TextInput,
} from 'react-native-gesture-handler';
import Sidebar from 'react-native-sidebar';
export default class Stack extends Component {
  constructor() {
    super();
    this.state = {
      topPopulerMovie: [],
      topPopulerTv: [],
      urlTopMovie: `https://api.themoviedb.org/3/movie/popular?api_key=1fdb707d0fb3912e6be0909078fcb461&language=en-US&page=`,
      urlTopTv: `https://api.themoviedb.org/3/tv/popular?api_key=1fdb707d0fb3912e6be0909078fcb461&language=en-US&page=`,
      displayPopularMovie: 'none',
      displayPopularTv: 'none',
      search: '',
      textInputSearch: 'none',
      side: 'none',
      white: '#F4F4F4',
      displayAll: 'none',
      loading: true,
      displaySpinn: 'flex',
      sort: '',
    };
  }
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
  componentDidMount = () => {
    if (this.state.loading === true) {
      const {urlTopMovie, urlTopTv} = this.state;
      let movie1 = [];
      let movie2 = [];
      let video = null;
      let example = [];
      Axios.get(urlTopMovie, '3').then((Response) => {
        movie1 = Response.data.results;
        this.setState({
          topPopulerMovie: movie1,
          displayPopularMovie: 'flex',
          displayAll: 'flex',
          displaySpinn: 'none',
        });
      });
    }
    setTimeout(() => {
      this.List;
    }, 1000);
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
      });
    } else {
      this.setState({displayPopularMovie: 'flex'});
      this.List();
    }
  };
  searchFor = (search) => {
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
  List = () => {
    // setTimeout(() => {
    return (
      <ScrollView style={{display: this.state.displayPopularMovie}}>
        {this.state.topPopulerMovie
          .sort((a, b) => this.Sort(a, b))
          .filter((data) => this.searchFor(data))
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
                        title: 'movie',
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
    );
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
  Side = () => {
    if (this.state.side === 'none') {
      this.setState({side: 'flex'});
    } else {
      this.setState({side: 'none'});
    }
  };
  Sort = (first, last) => {
    if (this.state.sort === 'Sort') {
      var nameA = first.release_date.toUpperCase(); // ignore upper and lowercase
      var nameB = last.release_date.toUpperCase(); // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    } else if (this.state.sort === 'ASC') {
      var nameA = first.title.toUpperCase(); // ignore upper and lowercase
      var nameB = last.title.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    } else if (this.state.sort === 'DESC') {
      var nameA = first.title.toUpperCase(); // ignore upper and lowercase
      var nameB = last.title.toUpperCase(); // ignore upper and lowercase
      if (nameA > nameB) {
        return -1;
      }
      if (nameA < nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    }
  };
  render() {
    console.log(this.state.topPopulerMovie.length);
    return (
      <View style={{flex: 1}}>
        <this.Spinner />
        <ScrollView
          style={{backgroundColor: '#22211F', display: this.state.displayAll}}>
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
                  <Icons name="menu-outline" size={30} color="#FF7314"></Icons>
                </Button>
              </View>
              <View style={{justifyContent: 'center', alignContent: 'center'}}>
                <Button transparent onPress={() => this.Move('Top Tv')}>
                  <Text style={{color: this.state.white}}>Top Tv Popular</Text>
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
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}>
                <Image
                  style={{width: 67, height: 30}}
                  source={require('../assets/image/logo-tmdb.png')}
                />
              </TouchableOpacity>
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
          <View style={{alignSelf: 'center'}}>
            <Text style={styles.judul}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Top Popular movie
              </Text>
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                borderWidth: 1,
                borderColor: this.state.white,
                borderRadius: 10,
              }}>
              <View style={{justifyContent: 'center', padding: 0}}>
                <Text style={{fontWeight: 'bold', paddingLeft: 10}}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: this.state.white,
                    }}>
                    Sort :
                  </Text>
                </Text>
              </View>
              <View>
                <Picker
                  selectedValue={this.state.sort}
                  style={{width: 150, color: this.state.white}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({sort: itemValue})
                  }>
                  <Picker.Item label="Sort" value="Sort" />
                  <Picker.Item label="ASC" value="ASC" />
                  <Picker.Item label="DESC" value="DESC" />
                </Picker>
              </View>
            </View>
          </View>

          <View style={{flex: 1}}></View>

          <this.List />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  judul: {
    marginTop: 10,
    paddingHorizontal: 10,
    color: '#F4F4F4',
    borderWidth: 1,
    borderColor: '#F4F4F4',
    borderRadius: 10,
    margin: 10,
  },
});
