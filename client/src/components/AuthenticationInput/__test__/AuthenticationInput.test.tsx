import AuthenticationInput from '../AuthenticationInput';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

interface Props {
	testid: string;
	inputName: string;
	label: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	invalidFeedback: string[];
	elementRef: React.RefObject<HTMLInputElement>;
}

const mockRef = { current: null };

const MockAuthenticationInput = ({
	testid,
	inputName,
	label,
	handleChange,
	invalidFeedback,
	elementRef,
}: Props) => {
	return (
		<TestWrapper>
			<AuthenticationInput
				testid={testid}
				inputName={inputName}
				label={label}
				handleChange={handleChange}
				invalidFeedback={invalidFeedback}
				elementRef={elementRef}
			/>
		</TestWrapper>
	);
};

describe('AuthenticationInput', () => {
	it('should render component.', () => {
		render(
			<MockAuthenticationInput
				testid="auth"
				inputName="auth"
				label="Auth"
				handleChange={vi.fn()}
				invalidFeedback={['']}
				elementRef={mockRef}
			/>
		);
		const authenticationInput = screen.getByTestId('auth-input');

		expect(authenticationInput).toBeInTheDocument();
	});

	it('should have a id to match the inputName prop.', () => {
		render(
			<MockAuthenticationInput
				testid="auth"
				inputName="auth"
				label="Auth"
				handleChange={vi.fn()}
				invalidFeedback={['']}
				elementRef={mockRef}
			/>
		);
		const authenticationInput = screen.getByTestId('auth-input');

		expect(authenticationInput).toHaveAttribute('id', 'auth');
	});

	it('should display the label to match the label prop.', () => {
		render(
			<MockAuthenticationInput
				testid="auth"
				inputName="auth"
				label="Auth"
				handleChange={vi.fn()}
				invalidFeedback={['']}
				elementRef={mockRef}
			/>
		);
		const authenticationLabel = screen.getByTestId('auth-input-label');

		expect(authenticationLabel).toHaveTextContent(/auth/i);
	});

	it('should call the handleChange function when the input is typed in.', async () => {
		const mockHandleChange = vi.fn();
		render(
			<MockAuthenticationInput
				testid="auth"
				inputName="auth"
				label="Auth"
				handleChange={mockHandleChange}
				invalidFeedback={['']}
				elementRef={mockRef}
			/>
		);
		const authenticationInput = screen.getByTestId('auth-input');

		await userEvent.type(authenticationInput, 'auth');

		expect(mockHandleChange).toHaveBeenCalledTimes(4);
	});
});
