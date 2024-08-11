import { Routes, Route } from 'react-router-dom';
import LogInPage from './components/LogInPage/LogInPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import HomePage from './components/HomePage/HomePage';
import FriendsPage from './components/FriendsPage/FriendsPage';
import EditPage from './components/EditPage/EditPage';

function Router() {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route path="/log-in" element={<LogInPage />} />
			<Route path="/sign-up" element={<SignUpPage />} />
			<Route path="/friends" element={<FriendsPage />} />
			<Route path="/edit" element={<EditPage />} />
		</Routes>
	);
}

export default Router;
