import LogInForm from '../LogInForm';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';
import userEvent from '@testing-library/user-event';

const MockLogInForm = () => {
	return (
		<TestWrapper>
			<LogInForm />
		</TestWrapper>
	);
};

describe('LogInForm', () => {
	it('should render component.', () => {
		render(<MockLogInForm />);
		const logInForm = screen.getByTestId('log-in-form');

		expect(logInForm).toBeInTheDocument();
	});

	it('should add an invalid class to input elements if input is invalid', () => {
		render(<MockLogInForm />);
		const usernameInput = screen.getByTestId('username-input');
		const passwordInput = screen.getByTestId('password-input');
		const formSubmitButton = screen.getByTestId('form-submit-button');

		userEvent.click(formSubmitButton);

		expect(usernameInput).toBeInvalid();
		expect(passwordInput).toBeInvalid();
	});

	it('should display error messages if the inputs are invalid.', async () => {
		render(<MockLogInForm />);
		const formSubmitButton = screen.getByTestId('form-submit-button');

		await userEvent.click(formSubmitButton);
		const usernameInvalidFeedback = screen.getByTestId(
			'username-input-invalid-feedback'
		);
		const passwordInvalidFeedback = screen.getByTestId(
			'password-input-invalid-feedback'
		);

		expect(usernameInvalidFeedback).toHaveTextContent(
			/username must not be empty./i
		);
		expect(passwordInvalidFeedback).toHaveTextContent(
			/password must not be empty./i
		);
	});
});
