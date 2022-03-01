import { UPDATE_LIST, RESET_LIST } from './types/ActionTypes';

export const updateMovies = (payload) => ({ type: UPDATE_LIST, payload });

export const ResetMovies = () => ({ type: RESET_LIST });
