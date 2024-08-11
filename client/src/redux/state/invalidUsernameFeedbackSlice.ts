import { createSlice } from '@reduxjs/toolkit';

const initialState: { value: string[] } = {
	value: [],
};

// Represents the feedback sent to the user if the username is invalid on the sign up and log in pages.
export const invalidUsernameFeedbackSlice = createSlice({
	name: 'invalidUsernameFeedback',
	initialState,
	reducers: {
		storeInvalidUsernameFeedback: ({ value }, action) => {
			return { value: [...value, action.payload] };
		},
		removeInvalidUsernameFeedback: () => {
			return { value: [] };
		},
	},
});

export const { storeInvalidUsernameFeedback, removeInvalidUsernameFeedback } =
	invalidUsernameFeedbackSlice.actions;
export default invalidUsernameFeedbackSlice.reducer;
