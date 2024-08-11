import { createSlice } from '@reduxjs/toolkit';

// Represents the username entered on the log in and sign up pages.
export const usernameSlice = createSlice({
	name: 'username',
	initialState: {
		value: '',
	},
	reducers: {
		storeUsername: (state, action) => {
			return { value: action.payload };
		},
		removeUsername: () => {
			return { value: '' };
		},
	},
});

export const { storeUsername, removeUsername } = usernameSlice.actions;
export default usernameSlice.reducer;
