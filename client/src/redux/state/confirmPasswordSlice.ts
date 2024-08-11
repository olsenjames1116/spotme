import { createSlice } from '@reduxjs/toolkit';

// Represents the confirmation password entered on the sign up pages.
export const confirmPasswordSlice = createSlice({
	name: 'confirmPassword',
	initialState: {
		value: '',
	},
	reducers: {
		storeConfirmPassword: (state, action) => {
			return { value: action.payload };
		},
		removeConfirmPassword: () => {
			return { value: '' };
		},
	},
});

export const { storeConfirmPassword, removeConfirmPassword } =
	confirmPasswordSlice.actions;
export default confirmPasswordSlice.reducer;
