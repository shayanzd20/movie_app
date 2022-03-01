import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import COLORS from '../constants/Colors';
import FONTS from '../constants/Fonts';

const CastCard = ({ originalName }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.originalName} numberOfLines={2}>
				{originalName}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	originalName: {
		width: 80,
		color: COLORS.BLACK,
		fontFamily: FONTS.BOLD,
		fontSize: 12,
	},
});

export default CastCard;
