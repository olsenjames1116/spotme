import 'bootstrap/dist/css/bootstrap.min.css';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { removeUsername, storeUsername } from '../../redux/state/usernameSlice';
import { removePassword, storePassword } from '../../redux/state/passwordSlice';
import { IRootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import {
	removeInvalidPasswordFeedback,
	storeInvalidPasswordFeedback,
} from '../../redux/state/invalidPasswordFeedbackSlice';
import {
	removeInvalidUsernameFeedback,
	storeInvalidUsernameFeedback,
} from '../../redux/state/invalidUsernameFeedbackSlice';
import api from '../../axiosConfig';
import AuthenticationInput from '../AuthenticationInput/AuthenticationInput';
import { AxiosError } from 'axios';

// Represents the form to log in an existing user.
function LogInForm() {
	// Assign all the state for displaying error messages to the user to scoped variables.
	const invalidUsernameFeedback = useSelector(
		(state: IRootState) => state.invalidUsernameFeedback.value
	);
	const invalidPasswordFeedback = useSelector(
		(state: IRootState) => state.invalidPasswordFeedback.value
	);

	// Assign all the state for storing user input to scoped variables.
	const username = useSelector((state: IRootState) => state.username.value);
	const password = useSelector((state: IRootState) => state.password.value);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Create references for the form an all its inputs.
	const formRef = useRef<HTMLFormElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	// Clear all the feedback state.
	const clearFeedback = () => {
		dispatch(removeInvalidUsernameFeedback());
		dispatch(removeInvalidPasswordFeedback());

		usernameRef.current?.setCustomValidity('');
		passwordRef.current?.setCustomValidity('');
	};

	// Clear all the state for storing user input on initial render.
	useEffect(() => {
		dispatch(removeUsername());
		dispatch(removePassword());
	}, []);

	/* Perform a validity check on the username field for the user's invalid input to 
	determine which message is most meaningful to display back to the user. */
	const usernameValidityCheck = () => {
		if (!usernameRef.current?.checkValidity()) {
			if (usernameRef.current?.validity.valueMissing) {
				dispatch(storeInvalidUsernameFeedback('Username must not be empty.'));
			}

			if (usernameRef.current?.validity.tooLong) {
				dispatch(
					storeInvalidUsernameFeedback(
						'Username must be less than 50 characters.'
					)
				);
			}
		}
	};

	/* Perform a validity check on the password field for the user's invalid input to 
	determine which message is most meaningful to display back to the user. */
	const passwordValidityCheck = () => {
		if (passwordRef.current?.validity.valueMissing) {
			dispatch(storeInvalidPasswordFeedback('Password must not be empty.'));
		}

		if (passwordRef.current?.validity.tooLong) {
			dispatch(
				storeInvalidPasswordFeedback(
					'Password must be less than 50 characters.'
				)
			);
		}
	};

	// Run through the validity checks for all input fields from invalid input.
	const displayInvalidMessages = () => {
		usernameValidityCheck();
		passwordValidityCheck();
	};

	// Display meaningful errors to the user from server-side validation.
	const displayInputServerErrors = (data: { message: string[] | string }) => {
		let messages;

		if (typeof data.message === 'string') {
			messages = [data.message];
		} else {
			messages = data.message;
		}

		const usernamePattern = /username|user/i;
		const passwordPattern = /^Password/;

		messages.map((message: string) => {
			if (usernamePattern.test(message)) {
				dispatch(storeInvalidUsernameFeedback(message));
				usernameRef.current?.setCustomValidity('invalid');
			}

			if (passwordPattern.test(message)) {
				dispatch(storeInvalidPasswordFeedback(message));
				passwordRef.current?.setCustomValidity('invalid');
			}
		});
	};

	// Log in the user by passing form data to the API.
	const logIn = async () => {
		try {
			const response = await api.post('/auth/log-in', { username, password });

			sessionStorage.setItem('access_token', response.data.access_token);
			navigate('/');
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 400 || error.response?.status === 401) {
					const { data } = error.response;
					displayInputServerErrors(data);
				}
			}

			console.log(error);
		}
	};

	// Validate the user's input.
	const validateInput = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		clearFeedback();

		// Add Bootstrap class for styling valid and invalid input fields.
		formRef.current?.classList.add('was-validated');

		if (!formRef.current?.checkValidity()) {
			displayInvalidMessages();
		} else {
			logIn();
		}
	};

	// Update the appropriate state variable from a changed input field.
	const updateInputInState = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target;

		switch (id) {
			case 'username':
				dispatch(storeUsername(value));
				break;
			case 'password':
				dispatch(storePassword(value));
				break;
			default:
				console.log('None of the input ids matched.');
		}
	};

	return (
		<form
			data-testid="log-in-form"
			noValidate
			className="col"
			onSubmit={(event) => validateInput(event)}
			ref={formRef}
		>
			<AuthenticationInput
				inputName="username"
				testid="username"
				label="Username"
				handleChange={updateInputInState}
				invalidFeedback={invalidUsernameFeedback}
				elementRef={usernameRef}
			/>
			<AuthenticationInput
				inputName="password"
				testid="password"
				label="Password"
				handleChange={updateInputInState}
				invalidFeedback={invalidPasswordFeedback}
				elementRef={passwordRef}
			/>
			<FormSubmitButton text="Log In" disabled={false} />
		</form>
	);
}

export default LogInForm;
