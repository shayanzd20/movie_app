const axios = require('axios').default;
import { OMDBAPI_BASE_URL, OMDB_API_KEY } from '../constants/Urls';

const OMDB_HTTP_REQUEST = axios.create({
	baseURL: OMDBAPI_BASE_URL,
	params: {
		apiKey: OMDB_API_KEY,
	},
});

// get a movie detail
const getMovieById = (id, append_to_response = '') =>
	OMDB_HTTP_REQUEST.get(
		`/?i=${id}`,
		append_to_response ? { params: { append_to_response } } : null
	);

const getSearchResultMovies = (title, page, append_to_response = '') => {
	return OMDB_HTTP_REQUEST.get(
		`/?s=${title}&page=${page ? page : 1}`,
		append_to_response ? { params: { append_to_response } } : null
	);
};

export { getMovieById, getSearchResultMovies };
