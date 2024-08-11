import { createSlice } from '@reduxjs/toolkit';

const initialState: { value: string[] } = {
	value: [],
};

// Represents the feedback sent to the user if the confirmation password is invalid on the sign up and log in pages.
export const invalidConfirmPasswordFeedbackSlice = createSlice({
	name: 'invalidConfirmPasswordFeedback',
	initialState,
	reducers: {
		storeInvalidConfirmPasswordFeedback: ({ value }, action) => {
			return { value: [...value, action.payload] };
		},
		removeInvalidConfirmPasswordFeedback: () => {
			return { value: [] };
		},
	},
});

export const {
	storeInvalidConfirmPasswordFeedback,
	removeInvalidConfirmPasswordFeedback,
} = invalidConfirmPasswordFeedbackSlice.actions;
export default invalidConfirmPasswordFeedbackSlice.reducer;
