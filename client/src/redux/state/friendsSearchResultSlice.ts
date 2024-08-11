import { createSlice } from '@reduxjs/toolkit';

// Represents the results of the search for friends on the friends page.
export const friendsSearchResultSlice = createSlice({
	name: 'friendsSearchResult',
	initialState: {
		value: [],
	},
	reducers: {
		storeFriendsSearchResult: (state, action) => {
			return { value: action.payload };
		},
		removeFriendsSearchResult: () => {
			return { value: [] };
		},
	},
});

export const { storeFriendsSearchResult, removeFriendsSearchResult } =
	friendsSearchResultSlice.actions;
export default friendsSearchResultSlice.reducer;
