import FriendsSearchBar from '../FriendsSearchBar/FriendsSearchBar';
import FriendsSearchList from '../FriendsSearchList/FriendsSearchList';

function FriendsContent() {
	return (
		<main data-testid="friends-content">
			<FriendsSearchBar />
			<FriendsSearchList />
		</main>
	);
}

export default FriendsContent;
