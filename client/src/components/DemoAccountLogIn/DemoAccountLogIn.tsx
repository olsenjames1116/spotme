import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';

/* Represents the component on the log in page to log the user in to 
a demo account. */
function DemoAccountLogIn() {
	const navigate = useNavigate();

	// Logs the user into the demo account.
	const logInDemoAccount = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await api.post('/auth/login', {
				username: 'demo',
				password: 'password123',
			});

			sessionStorage.setItem('access_token', response.data[0]);
			navigate('/');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form onSubmit={(event) => logInDemoAccount(event)}>
			<button
				className="btn btn-outline-primary"
				data-testid="demo-account-log-in"
			>
				Demo Account
			</button>
		</form>
	);
}

export default DemoAccountLogIn;
