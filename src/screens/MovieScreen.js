import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import COLORS from '../constants/Colors';
import FONTS from '../constants/Fonts';
import { getMovieById } from '../services/MovieService';
import ItemSeparator from '../components/ItemSeparator';
import CastCard from '../components/CastCard';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { ResetMovies } from '../../redux/actions/moviesActions';

const { height, width } = Dimensions.get('window');

const setHeight = (h) => (height / 100) * h;
const setWidth = (w) => (width / 100) * w;

const MovieScreen = ({ route, navigation }) => {
	const { movieId } = route.params;
	const [movieDetail, setMovieDetail] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		getMovieById(movieId).then((response) =>
			setMovieDetail(response?.data)
		);
	}, []);

	return (
		<ScrollView style={styles.container}>
			<StatusBar style="light" />
			<LinearGradient
				colors={['rgba(0, 0, 0, 0.5)', 'rgba(217, 217, 217, 0)']}
				start={[0, 0.3]}
				style={styles.linearGradient}
			/>
			<View style={styles.moviePosterImageContainer}>
				<Image
					style={[styles.moviePosterImage]}
					resizeMode="contain"
					source={{ uri: movieDetail?.Poster }}
				/>
			</View>
			<View style={styles.headerContainer}>
				<TouchableOpacity
					activeOpacity={0.5}
					onPress={() => {
						dispatch(ResetMovies());
						navigation.navigate('home', { target: 'goback' });
						// navigation.goBack();
					}}>
					<Feather
						name="chevron-left"
						size={35}
						color={COLORS.BLACK}
					/>
				</TouchableOpacity>
			</View>
			<ItemSeparator height={setHeight(37)} />
			<View style={styles.movieTitleContainer}>
				<Text style={styles.movieTitle} numberOfLines={2}>
					{movieDetail?.Title}
				</Text>
				<View style={styles.row}>
					<Text style={[styles.ratingText, { color: COLORS.HEART }]}>
						{movieDetail?.imdbRating}
					</Text>
					<Text style={styles.ratingText}> Rate </Text>
				</View>
			</View>
			<Text style={styles.genreText}>
				{movieDetail?.Genre} | {movieDetail?.Runtime}
			</Text>
			<Text style={styles.genreText}>
				Languages: {movieDetail?.Language}
			</Text>
			<View style={styles.overviewContainer}>
				<Text style={styles.overviewTitle}>Overview</Text>
				<Text style={styles.overviewText}>{movieDetail?.Plot}</Text>
			</View>
			<View>
				<Text style={styles.castTitle}>Cast</Text>

				{movieDetail?.Actors && (
					<FlatList
						style={{ marginVertical: 5 }}
						data={movieDetail?.Actors.split(',')}
						keyExtractor={(item) =>
							movieDetail?.Actors.split(',')
								.indexOf(item)
								.toString()
						}
						horizontal
						showsHorizontalScrollIndicator={false}
						ListHeaderComponent={() => <ItemSeparator width={20} />}
						ItemSeparatorComponent={() => (
							<ItemSeparator width={20} />
						)}
						ListFooterComponent={() => <ItemSeparator width={20} />}
						renderItem={({ item }) => (
							<CastCard originalName={item} />
						)}
					/>
				)}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.BASIC_BACKGROUND,
	},
	moviePosterImageContainer: {
		height: setHeight(35),
		width: setWidth(145),
		alignItems: 'center',
		position: 'absolute',
		left: setWidth((100 - 145) / 2),
		top: 0,
		borderBottomRightRadius: 300,
		borderBottomLeftRadius: 300,
		elevation: 8,
	},
	moviePosterImage: {
		borderBottomRightRadius: 100,
		borderBottomLeftRadius: 100,
		width: setWidth(100),
		height: setHeight(35),
	},
	linearGradient: {
		width: setWidth(100),
		height: setHeight(6),
		position: 'absolute',
		top: 0,
		elevation: 9,
	},
	headerContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		position: 'absolute',
		right: 0,
		left: 0,
		top: 50,
		elevation: 20,
	},
	movieTitleContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
	},
	movieTitle: {
		color: COLORS.BLACK,
		fontFamily: FONTS.EXTRA_BOLD,
		fontSize: 18,
		width: setWidth(60),
	},
	ratingText: {
		marginLeft: 5,
		color: COLORS.BLACK,
		fontFamily: FONTS.EXTRA_BOLD,
		fontSize: 15,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	genreText: {
		color: COLORS.LIGHT_GRAY,
		paddingHorizontal: 20,
		paddingTop: 5,
		fontFamily: FONTS.BOLD,
		fontSize: 13,
	},
	overviewContainer: {
		backgroundColor: COLORS.EXTRA_LIGHT_GRAY,
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginVertical: 10,
	},
	overviewTitle: {
		color: COLORS.BLACK,
		fontFamily: FONTS.BOLD,
		fontSize: 18,
	},
	overviewText: {
		color: COLORS.LIGHT_GRAY,
		paddingVertical: 5,
		fontFamily: FONTS.BOLD,
		fontSize: 13,
		textAlign: 'justify',
	},
	castTitle: {
		marginLeft: 20,
		color: COLORS.BLACK,
		fontFamily: FONTS.BOLD,
		fontSize: 18,
	},
});

export default MovieScreen;
