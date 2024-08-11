import SignUpForm from '../SignUpForm';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';
import userEvent from '@testing-library/user-event';

const MockSignUpForm = () => {
	return (
		<TestWrapper>
			<SignUpForm />
		</TestWrapper>
	);
};

describe('SignUpForm', () => {
	it('should render component.', () => {
		render(<MockSignUpForm />);
		const signUpForm = screen.getByTestId('sign-up-form');

		expect(signUpForm).toBeInTheDocument();
	});

	it('should add an invalid class to input elements if input is invalid', () => {
		render(<MockSignUpForm />);
		const usernameInput = screen.getByTestId('username-input');
		const passwordInput = screen.getByTestId('password-input');
		const confirmPasswordInput = screen.getByTestId('confirm-password-input');
		const formSubmitButton = screen.getByTestId('form-submit-button');

		userEvent.click(formSubmitButton);

		expect(usernameInput).toBeInvalid();
		expect(passwordInput).toBeInvalid();
		expect(confirmPasswordInput).toBeInvalid();
	});

	it('should display error messages if the inputs are invalid.', async () => {
		render(<MockSignUpForm />);
		const formSubmitButton = screen.getByTestId('form-submit-button');

		await userEvent.click(formSubmitButton);
		const usernameInvalidFeedback = screen.getByTestId(
			'username-input-invalid-feedback'
		);
		const passwordInvalidFeedback = screen.getByTestId(
			'password-input-invalid-feedback'
		);
		const confirmPasswordInvalidFeedback = screen.getByTestId(
			'confirm-password-input-invalid-feedback'
		);

		expect(usernameInvalidFeedback).toHaveTextContent(
			/username must not be empty./i
		);
		expect(passwordInvalidFeedback).toHaveTextContent(
			/password must not be empty./i
		);
		expect(confirmPasswordInvalidFeedback).toHaveTextContent(
			/confirmation password must not be empty./i
		);
	});
});
