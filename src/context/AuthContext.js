import AsyncStorage from '@react-native-async-storage/async-storage';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
	switch (action.type) {
		case 'add_error':
			return { ...state, errorMessage: action.payload };
		case 'signin':
			return { errorMessage: '', token: action.payload };
		case 'clear_error_message':
			return { ...state, errorMessage: '' };
		default:
			return state;
	}
};

const clearErrorMessage = (dispatch) => () => {
	dispatch({ type: 'clear_error_message' });
};

const signup = (dispatch) => {
	return async ({ email, password }) => {
		try {
			const response = await trackerApi.post('/signup', { email, password });
			await AsyncStorage.setItem('token', response.data.token);
			dispatch({ type: 'signin', payload: response.data.token });
			// navigate to main flow

			navigate('TrackList');
		} catch (err) {
			dispatch({
				type: 'add_error',
				payload: 'Something went wrong with sign up'
			});
		}

		// make api requeset to sign up with that email and password
		// if we sign up, modify our state, and say that we are authenticated
		// if sign up fails, we need to reflect an error message
	};
};

const signin =
	(dispatch) =>
	async ({ email, password }) => {
		try {
			const response = await trackerApi.post('/signin', { email, password });
			await AsyncStorage.setItem('token', response.data.token);
			dispatch({ type: 'signin', payload: response.data.token });
			navigate('TrackList');
		} catch (err) {
			dispatch({
				type: 'add_error',
				payload: 'Something went wrong with sign in'
			});
		}
	};

const signout = (dispatch) => {
	return () => {
		//signout
	};
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signin, signout, signup, clearErrorMessage },
	{ token: null, errorMessage: '' }
);
