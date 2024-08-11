import { createSlice } from '@reduxjs/toolkit';

// Represents the user with their information in state to display.
export const userSlice = createSlice({
	name: 'user',
	initialState: {
		value: {},
	},
	reducers: {
		storeUser: (state, action) => {
			return { value: { ...action.payload } };
		},
		removeUser: () => {
			return { value: {} };
		},
	},
});

export const { storeUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
