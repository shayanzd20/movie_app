import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import MovieScreen from './src/screens/MovieScreen';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import rootReducer from './redux/reducers/rootReducer';

const store = createStore(rootReducer, applyMiddleware(logger));

const Stack = createStackNavigator();

export default () => {
	const [fontLoaded] = useFonts({
		Regular: require('./assets/fonts/NunitoSans-Regular.ttf'),
		Bold: require('./assets/fonts/NunitoSans-Bold.ttf'),
		Black: require('./assets/fonts/NunitoSans-Black.ttf'),
		ExtraBold: require('./assets/fonts/NunitoSans-ExtraBold.ttf'),
		ExtraLight: require('./assets/fonts/NunitoSans-ExtraLight.ttf'),
		Light: require('./assets/fonts/NunitoSans-Light.ttf'),
		SemiBold: require('./assets/fonts/NunitoSans-SemiBold.ttf'),
	});

	return fontLoaded ? (
		<NavigationContainer>
			<Provider store={store}>
				<Stack.Navigator>
					<Stack.Screen
						name="home"
						component={HomeScreen}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="movie"
						component={MovieScreen}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</Provider>
		</NavigationContainer>
	) : (
		<AppLoading />
	);
};
