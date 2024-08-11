import { createSlice } from '@reduxjs/toolkit';

const initialState: { value: string[] } = {
	value: [],
};

// Represents the feedback sent to the user if the password is invalid on the sign up and log in pages.
export const invalidPasswordFeedbackSlice = createSlice({
	name: 'invalidPasswordFeedback',
	initialState,
	reducers: {
		storeInvalidPasswordFeedback: ({ value }, action) => {
			return { value: [...value, action.payload] };
		},
		removeInvalidPasswordFeedback: () => {
			return { value: [] };
		},
	},
});

export const { storeInvalidPasswordFeedback, removeInvalidPasswordFeedback } =
	invalidPasswordFeedbackSlice.actions;
export default invalidPasswordFeedbackSlice.reducer;
