import { useNavigate } from 'react-router-dom';
import api from '../../axiosConfig';

/* Represents the component on the log in page to log the user in to 
a demo account. */
function DemoAccountLogIn() {
	const navigate = useNavigate();

	// Create a form data object with the user's input.
	const createFormData: () => FormData = () => {
		const formData = new FormData();
		formData.append('username', 'demo');
		formData.append('password', 'password123');

		return formData;
	};

	// Logs the user into the demo account.
	const logInDemoAccount = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = createFormData();

		try {
			api.post('/log-in', formData);

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
