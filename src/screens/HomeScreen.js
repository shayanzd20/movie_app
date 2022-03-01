import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-navigation';
import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ActivityIndicator,
	TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { updateMovies, ResetMovies } from '../../redux/actions/moviesActions';

import { SearchBar } from 'react-native-elements';
import COLORS from '../constants/Colors';
import FONTS from '../constants/Fonts';
import MovieCard from '../components/MovieCard';
import ItemSeparator from '../components/ItemSeparator';
import { getSearchResultMovies } from '../services/MovieService';

const HomeScreen = ({ route, navigation }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [search, setSearch] = useState('');
	const [pageCurrent, setPageCurrent] = useState(1);
	const dispatch = useDispatch();
	const { movies: list } = useSelector((state) => state);
	const movies = list;

	useEffect(() => {
		if (route?.params?.target === 'goback') setSearch('');
	}, [route?.params?.target]);

	useEffect(() => {
		setIsLoading(true);
		getSearchResultMovies(search).then((movieResponse) => {
			if (movieResponse?.data?.Response === 'True') {
				dispatch(
					updateMovies(
						movieResponse?.data?.Search
							? movieResponse.data.Search
							: []
					)
				);
			} else {
				dispatch(ResetMovies());
			}

			setIsLoading(false);
		});
	}, [search]);

	useEffect(() => {
		setIsLoading(true);
		getSearchResultMovies(search, pageCurrent).then((movieResponse) => {
			if (movieResponse?.data?.Response === 'True') {
				dispatch(
					updateMovies(
						movies.movies.concat(movieResponse?.data?.Search)
					)
				);
			}
			setIsLoading(false);
		});
	}, [pageCurrent]);

	const updateSearch = (search) => {
		setSearch(search);
	};

	const renderFooter = () => {
		return isLoading ? (
			<View style={styles.loader}>
				<ActivityIndicator size="large" />
			</View>
		) : (
			movies.movies.length !== 0 && (
				<TouchableOpacity
					style={{ marginVertical: 10, alignItems: 'center' }}
					activeOpacity={0.5}
					onPress={() => handleLoadMore()}>
					<Text
						style={[
							styles.headerText,
							{ fontSize: 28, fontFamily: FONTS.REGULAR },
						]}>
						Load More
					</Text>
				</TouchableOpacity>
			)
		);
	};

	const handleLoadMore = () => {
		setPageCurrent(pageCurrent + 1);
		setIsLoading(true);
	};

	return (
		<View style={styles.container}>
			<StatusBar
				style="auto"
				translucent={false}
				backgroundColor={COLORS.BASIC_BACKGROUND}
			/>
			<View style={styles.headerContainer}>
				<Text style={styles.headerTitle}>Type title of Movie</Text>
			</View>
			<SearchBar
				placeholder="Type Here..."
				style={{ width: '100%' }}
				onChangeText={updateSearch}
				value={search}
			/>
			<View>
				{movies?.movies.length !== 0 && (
					<SafeAreaView style={{ flex: 1 }}>
						<FlatList
							data={movies.movies}
							vertical
							showsHorizontalScrollIndicator={false}
							keyExtractor={(item) => item.imdbID.toString()}
							ItemSeparatorComponent={() => (
								<ItemSeparator width={20} />
							)}
							ListHeaderComponent={() => (
								<ItemSeparator width={20} />
							)}
							ListFooterComponent={renderFooter}
							renderItem={({ item }) => (
								<MovieCard
									title={item.Title}
									poster={item.Poster}
									year={item.Year}
									type={item.Type}
									heartLess={false}
									onPress={() =>
										navigation.navigate('movie', {
											movieId: item.imdbID,
										})
									}
								/>
							)}
						/>
					</SafeAreaView>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.BASIC_BACKGROUND,
	},
	headerContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	loader: {
		marginTop: 10,
		alignItems: 'center',
	},
	headerTitle: {
		fontSize: 28,
		fontFamily: FONTS.REGULAR,
	},
});

export default HomeScreen;
