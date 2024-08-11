import { createSlice } from '@reduxjs/toolkit';

/* Represents the image from the file input for the user to edit their 
profile photo. */
export const imageSlice = createSlice({
	name: 'image',
	initialState: {
		value: '',
	},
	reducers: {
		storeImage: (state, action) => {
			return { value: action.payload };
		},
		removeImage: () => {
			return { value: '' };
		},
	},
});

export const { storeImage, removeImage } = imageSlice.actions;
export default imageSlice.reducer;
