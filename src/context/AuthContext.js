import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const authReducer = (state, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

const signup = (dispatch) => {
	return async ({ email, password }) => {
		try {
			const response = await trackerApi.post('/signup', { email, password });
			console.log(response.data);
		} catch (err) {
			console.log(err.message);
		}

		// make api requeset to sign up with that email and password
		// if we sign up, modify our state, and say that we are authenticated
		// if sign up fails, we need to reflect an error message
	};
};

const signin = (dispatch) => {
	return ({ email, password }) => {
		// try to signin
		// handle success by updating state
		// handle failure by showing error message
	};
};

const signout = (dispatch) => {
	return () => {
		//signout
	};
};

export const { Provider, Context } = createDataContext(
	authReducer,
	{ signin, signout, signup },
	{ isSignedIn: false }
);
