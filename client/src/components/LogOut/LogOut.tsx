import { useNavigate } from 'react-router-dom';

function LogOut() {
	const navigate = useNavigate();

	const logOut = async (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		event.preventDefault();

		sessionStorage.removeItem('access_token');
		navigate('/log-in');
	};

	return (
		<button
			onClick={(event) => logOut(event)}
			className="btn btn-link p-0"
			data-testid="log-out"
		>
			Log Out
		</button>
	);
}

export default LogOut;
