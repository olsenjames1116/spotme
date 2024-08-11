import SignUpPage from '../SignUpPage';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockSignUpPage = () => {
	return (
		<TestWrapper>
			<SignUpPage />
		</TestWrapper>
	);
};

describe('SignUpPage', () => {
	it('should render component.', () => {
		render(<MockSignUpPage />);
		const signUpPage = screen.getByTestId('sign-up-page');

		expect(signUpPage).toBeInTheDocument();
	});
});
