import { useEffect } from 'react';
import LogInContent from '../LogInContent/LogInContent';
import { useNavigate } from 'react-router-dom';

// Represents the page for the user to log in.
function LogInPage() {
	const navigate = useNavigate();

	useEffect(() => {
		if (sessionStorage.length > 0) {
			navigate('/');
		}
	}, []);

	return (
		<div data-testid="log-in-page">
			<LogInContent />
		</div>
	);
}

export default LogInPage;
