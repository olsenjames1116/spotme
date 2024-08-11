import EditUserForm from '../EditUserForm';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';
import userEvent from '@testing-library/user-event';

const MockEditUserForm = () => {
	return (
		<TestWrapper>
			<EditUserForm />
		</TestWrapper>
	);
};

describe('EditUserForm', () => {
	it('should render component.', () => {
		render(<MockEditUserForm />);
		const editUserForm = screen.getByTestId('edit-user-form');

		expect(editUserForm).toBeInTheDocument();
	});

	it('should display an error message and disable submit button if input is invalid.', async () => {
		render(<MockEditUserForm />);
		const fileInput = screen.getByTestId('file-input');
		const blob = new Blob();
		const file = new File([blob], 'testFile.pdf', {
			type: 'application/pdf',
		});

		await userEvent.upload(fileInput, file);
		const fileInputInvalidFeedback = screen.getByTestId(
			'file-input-invalid-feedback'
		);
		const formSubmitButton = screen.getByTestId('form-submit-button');

		expect(fileInputInvalidFeedback).toHaveTextContent(
			/file must be an image/i
		);
		expect(formSubmitButton).toBeDisabled();
	});
});
