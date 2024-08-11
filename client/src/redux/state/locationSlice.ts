import { createSlice } from '@reduxjs/toolkit';

// Represents the current location of the page.
export const locationSlice = createSlice({
	name: 'location',
	initialState: {
		value: '',
	},
	reducers: {
		storeLocation: (state, action) => {
			return { value: action.payload };
		},
		removeLocation: () => {
			return { value: '' };
		},
	},
});

export const { storeLocation, removeLocation } = locationSlice.actions;
export default locationSlice.reducer;
