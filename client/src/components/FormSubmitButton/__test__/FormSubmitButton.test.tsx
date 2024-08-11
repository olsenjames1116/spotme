import FormSubmitButton from '../FormSubmitButton';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

interface Props {
	text: string;
	disabled: boolean;
}

const MockFormSubmitButton = ({ text, disabled }: Props) => {
	return (
		<TestWrapper>
			<FormSubmitButton text={text} disabled={disabled} />
		</TestWrapper>
	);
};

describe('FormSubmitButton', () => {
	it('should render component.', () => {
		render(<MockFormSubmitButton text="" disabled={false} />);
		const formSubmitButton = screen.getByTestId('form-submit-button');

		expect(formSubmitButton).toBeInTheDocument();
	});

	it('should match the text content with the text prop.', () => {
		render(<MockFormSubmitButton text="Test Button" disabled={false} />);
		const formSubmitButton = screen.getByTestId('form-submit-button');

		expect(formSubmitButton).toHaveTextContent(/test button/i);
	});

	it('should disable the submit button with the disabled prop.', () => {
		render(<MockFormSubmitButton text="Test Button" disabled={true} />);
		const formSubmitButton = screen.getByTestId('form-submit-button');

		expect(formSubmitButton).toBeDisabled();
	});
});
FormSubmitButton;
