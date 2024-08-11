import { useDispatch, useSelector } from 'react-redux';
import { removeUsername, storeUsername } from '../../redux/state/usernameSlice';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton';
import { useEffect, useRef } from 'react';
import { removePassword, storePassword } from '../../redux/state/passwordSlice';
import {
	removeConfirmPassword,
	storeConfirmPassword,
} from '../../redux/state/confirmPasswordSlice';
import {
	removeInvalidUsernameFeedback,
	storeInvalidUsernameFeedback,
} from '../../redux/state/invalidUsernameFeedbackSlice';
import { IRootState } from '../../redux/store';
import {
	removeInvalidPasswordFeedback,
	storeInvalidPasswordFeedback,
} from '../../redux/state/invalidPasswordFeedbackSlice';
import {
	removeInvalidConfirmPasswordFeedback,
	storeInvalidConfirmPasswordFeedback,
} from '../../redux/state/invalidConfirmPasswordFeedbackSlice';
import AuthenticationInput from '../AuthenticationInput/AuthenticationInput';
import api from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

// Represents the form to create a new user.
function SignUpForm() {
	// Assign all the state for displaying error messages to the user to scoped variables.
	const invalidUsernameFeedback = useSelector(
		(state: IRootState) => state.invalidUsernameFeedback.value
	);
	const invalidPasswordFeedback = useSelector(
		(state: IRootState) => state.invalidPasswordFeedback.value
	);
	const invalidConfirmPasswordFeedback = useSelector(
		(state: IRootState) => state.invalidConfirmPasswordFeedback.value
	);

	// Assign all the state for storing user input to scoped variables.
	const username = useSelector((state: IRootState) => state.username.value);
	const password = useSelector((state: IRootState) => state.password.value);
	const confirmPassword = useSelector(
		(state: IRootState) => state.confirmPassword.value
	);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	// Create references for the form and all the inputs.
	const formRef = useRef<HTMLFormElement>(null);
	const usernameRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const confirmPasswordRef = useRef<HTMLInputElement>(null);

	// Clear all the feedback state.
	const clearFeedback = () => {
		dispatch(removeInvalidUsernameFeedback());
		dispatch(removeInvalidPasswordFeedback());
		dispatch(removeInvalidConfirmPasswordFeedback());

		usernameRef.current?.setCustomValidity('');
		passwordRef.current?.setCustomValidity('');
		confirmPasswordRef.current?.setCustomValidity('');
	};

	// Clear all the state for storing user input on initial render.
	useEffect(() => {
		dispatch(removeUsername());
		dispatch(removePassword());
		dispatch(removeConfirmPassword());
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

	/* Perform a validity check on the confirmation password field for the user's invalid 
	input to determine which message is most meaningful to display back to the user. */
	const confirmPasswordValidityCheck = () => {
		if (confirmPasswordRef.current?.validity.valueMissing) {
			dispatch(
				storeInvalidConfirmPasswordFeedback(
					'Confirmation password must not be empty.'
				)
			);
		}

		if (confirmPasswordRef.current?.validity.tooLong) {
			dispatch(
				storeInvalidConfirmPasswordFeedback(
					'Confirmation password must be less than 50 characters.'
				)
			);
		}
	};

	// Run through the validity checks for all input fields from invalid input.
	const displayInvalidMessages = () => {
		usernameValidityCheck();
		passwordValidityCheck();
		confirmPasswordValidityCheck();
	};

	// Create a form data object with the user's input.
	const createFormData: () => FormData = () => {
		const formData = new FormData();
		formData.append('username', username);
		formData.append('password', password);
		formData.append('confirmPassword', confirmPassword);

		return formData;
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
		const confirmPasswordPattern = /confirmation password|passwords/i;

		messages.map((message: string) => {
			if (usernamePattern.test(message)) {
				dispatch(storeInvalidUsernameFeedback(message));
				usernameRef.current?.setCustomValidity('invalid');
			}

			if (passwordPattern.test(message)) {
				dispatch(storeInvalidPasswordFeedback(message));
				passwordRef.current?.setCustomValidity('invalid');
			}

			if (confirmPasswordPattern.test(message)) {
				dispatch(storeInvalidConfirmPasswordFeedback(message));
				confirmPasswordRef.current?.setCustomValidity('invalid');
			}
		});
	};

	// Sign up the user by passing form data to the API.
	const signUp = async () => {
		const formData = createFormData();

		try {
			await api.post('/users', formData);

			// Alert the user they will be redirected and redirect them.
			alert('Account created. You will be redirected to log in.');
			navigate('/log-in');
		} catch (error) {
			if (error instanceof AxiosError) {
				if (error.response?.status === 400 || error.response?.status === 409) {
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
			signUp();
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
			case 'confirmPassword':
				dispatch(storeConfirmPassword(value));
				break;
			default:
				console.log('None of the input ids matched.');
		}
	};

	return (
		<form
			data-testid="sign-up-form"
			noValidate
			onSubmit={(event) => validateInput(event)}
			ref={formRef}
		>
			<AuthenticationInput
				type="text"
				inputName="username"
				testid="username"
				label="Username"
				handleChange={updateInputInState}
				invalidFeedback={invalidUsernameFeedback}
				elementRef={usernameRef}
			/>
			<AuthenticationInput
				type="password"
				inputName="password"
				testid="password"
				label="Password"
				handleChange={updateInputInState}
				invalidFeedback={invalidPasswordFeedback}
				elementRef={passwordRef}
			/>
			<AuthenticationInput
				type="password"
				inputName="confirmPassword"
				testid="confirm-password"
				label="Confirmation Password"
				handleChange={updateInputInState}
				invalidFeedback={invalidConfirmPasswordFeedback}
				elementRef={confirmPasswordRef}
			/>
			<FormSubmitButton text="Sign Up" disabled={false} />
		</form>
	);
}

export default SignUpForm;
