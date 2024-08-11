import { createSlice } from '@reduxjs/toolkit';

// Represents the password entered on the log in and sign up pages.
export const passwordSlice = createSlice({
	name: 'password',
	initialState: {
		value: '',
	},
	reducers: {
		storePassword: (state, action) => {
			return { value: action.payload };
		},
		removePassword: () => {
			return { value: '' };
		},
	},
});

export const { storePassword, removePassword } = passwordSlice.actions;
export default passwordSlice.reducer;
