import { UPDATE_LIST, RESET_LIST } from '../actions/types/ActionTypes';

const INITIAL_STATE = { movies: [] };

const moviesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UPDATE_LIST:
			return { movies: [...action.payload] };
		case RESET_LIST:
			return { movies: [] };
		default:
			return state;
	}
};

export default moviesReducer;
