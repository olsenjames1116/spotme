import { useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { storeLocation } from '../../redux/state/locationSlice';

function HomePage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (sessionStorage.length < 1) {
			navigate('/log-in');
		} else {
			document.title = 'SpotMe';
			dispatch(storeLocation(window.location.pathname));
		}
	}, []);

	return (
		<div data-testid="home-page">
			<Sidebar />
		</div>
	);
}

export default HomePage;
