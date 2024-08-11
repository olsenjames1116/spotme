import { useDispatch } from 'react-redux';
import api from '../../axiosConfig';
import {
	removeFriendsSearchResult,
	storeFriendsSearchResult,
} from '../../redux/state/friendsSearchResultSlice';

// Represents the search bar on the friends page.
function FriendsSearchBar() {
	const dispatch = useDispatch();

	const searchUsers = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;

		if (value === '') dispatch(removeFriendsSearchResult());

		try {
			const response = await api.get(`/users/${value}`);

			dispatch(storeFriendsSearchResult(response.data));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form data-testid="friends-search-bar">
			<div className="input-group mb">
				<span className="input-group-text">🔍</span>
				<input
					type="text"
					className="form-control"
					onChange={(event) => searchUsers(event)}
				/>
			</div>
		</form>
	);
}

export default FriendsSearchBar;
