import SignUpOptions from '../SignUpOptions';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockSignUpOptions = () => {
	return (
		<TestWrapper>
			<SignUpOptions />
		</TestWrapper>
	);
};

describe('SignUpOptions', () => {
	it('should render component.', () => {
		render(<MockSignUpOptions />);
		const logInContent = screen.getByTestId('sign-up-options');

		expect(logInContent).toBeInTheDocument();
	});
});
SignUpOptions;
