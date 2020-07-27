import HomeScreen from './component/screen/Home';
import Trailer from './component/screen/Trailer';
import DetailFilm from './component/screen/Detail';
import Tv from './component/screen/Tv';
import Movie from './component/screen/Movie';
import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

function DetailsScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.push('Details')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  const forFade = ({current}) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" headerMode="none">
        <Stack.Screen
          options={{cardStyleInterpolator: forFade}}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{cardStyleInterpolator: forFade}}
          name="Detail"
          component={DetailFilm}
        />
        <Stack.Screen
          options={{cardStyleInterpolator: forFade}}
          name="Tv"
          component={Tv}
        />
        <Stack.Screen
          options={{cardStyleInterpolator: forFade}}
          name="Movie"
          component={Movie}
        />
        <Stack.Screen
          options={{cardStyleInterpolator: forFade}}
          name="Trailer"
          component={Trailer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
