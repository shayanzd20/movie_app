import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	ImageBackground,
} from 'react-native';
import COLORS from '../constants/Colors';
import FONTS from '../constants/Fonts';
import IMAGES from '../constants/Images';

const MovieCard = ({ title, poster, year, type, size, onPress }) => {
	return (
		<TouchableOpacity activeOpacity={0.8} onPress={onPress}>
			<View style={styles.movieContainer}>
				<ImageBackground
					style={{
						...styles.container,
						width: 230 / 2,
						height: 340 / 2,
					}}
					imageStyle={{ borderRadius: 12 }}
					source={{ uri: poster }}>
					<View
						style={{
							...styles.imdbContainer,
							paddingVertical: 3 * size,
						}}>
						<Image
							source={IMAGES.IMDB}
							resizeMode="cover"
							style={{
								...styles.imdbImage,
								height: 20 * size,
								width: 50 * size,
							}}
						/>
					</View>
				</ImageBackground>
				<View style={styles.movieShortDetailContainer}>
					<Text
						style={{ ...styles.movieTitle, width: 230 * size }}
						numberOfLines={3}>
						{title}
					</Text>
					<Text
						style={{
							...styles.movieYear,
							width: 230 * size,
						}}
						numberOfLines={3}>
						{year}
					</Text>
					<Text
						style={{
							...styles.movieType,
							width: 230 * size,
						}}
						numberOfLines={3}>
						{type}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		height: 340,
		width: 230,
		borderRadius: 12,
		elevation: 5,
		marginVertical: 2,
	},
	movieContainer: {
		flexDirection: 'row',
		paddingTop: 5,
		paddingHorizontal: 5,
	},
	movieShortDetailContainer: {
		paddingHorizontal: 10,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderRightWidth: 1,
		flex: 1,
		borderTopRightRadius: 25,
		borderBottomRightRadius: 25,
	},
	movieTitle: {
		fontFamily: FONTS.EXTRA_BOLD,
		color: COLORS.GRAY,
		paddingVertical: 2,
		marginTop: 5,
		width: 230,
	},
	imdbContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-end',
		backgroundColor: COLORS.YELLOW,
		borderBottomLeftRadius: 5,
		paddingVertical: 3,
	},
	imdbImage: {
		height: 20,
		width: 50,
		borderBottomLeftRadius: 5,
	},
});

MovieCard.defaultProps = {
	size: 1,
	heartLess: true,
};

export default MovieCard;
