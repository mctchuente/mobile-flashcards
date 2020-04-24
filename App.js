import * as React from 'react';
import { Platform, Text, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';

import DeckDetailScreen from './screens/DeckDetailScreen';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'

import { purple, white } from './utils/colors'

const store = createStore(reducer, applyMiddleware(thunk))
const Stack = createStackNavigator();

export default class App extends React.Component {
  componentDidMount() {
    //setLocalNotification()
  }
  render() {
    //console.log(addCardToDeck('JavaScript', {question: 'What is Premise?', answer: 'It is getting async data without using callback'}))
	return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen 
			    name="Root" 
				component={BottomTabNavigator} 
				options={{
				  headerStyle: {
					backgroundColor: purple,
				  },
				  headerTintColor: white,
				  headerTitleStyle: {
					fontWeight: 'bold',
				  },
				}}
			  />
			  <Stack.Screen 
			    name="DeckDetail" 
				component={DeckDetailScreen} 
				options={{
				  headerStyle: {
					backgroundColor: purple,
				  },
				  headerTintColor: white,
				  headerTitleStyle: {
					fontWeight: 'bold',
					textAlign: 'center',
				  },
				}}
			  />
            </Stack.Navigator>
          </NavigationContainer>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
  },
});
