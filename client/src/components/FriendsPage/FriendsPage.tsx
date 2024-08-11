import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { storeLocation } from '../../redux/state/locationSlice';
import Sidebar from '../Sidebar/Sidebar';
import FriendsContent from '../FriendsContent/FriendsContent';

// Represents the page to view a user's friends.
function FriendsPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (sessionStorage.length < 1) {
			navigate('/log-in');
		} else {
			document.title = 'Friends';
			dispatch(storeLocation(window.location.pathname));
		}
	}, []);

	return (
		<div data-testid="friends-page">
			<Sidebar />
			<FriendsContent />
		</div>
	);
}

export default FriendsPage;
