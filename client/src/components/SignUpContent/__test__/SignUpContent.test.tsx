import SignUpContent from '../SignUpContent';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockSignUpContent = () => {
	return (
		<TestWrapper>
			<SignUpContent />
		</TestWrapper>
	);
};

describe('SignUpContent', () => {
	it('should render component.', () => {
		render(<MockSignUpContent />);
		const signUpContent = screen.getByTestId('sign-up-content');

		expect(signUpContent).toBeInTheDocument();
	});
});
