import LogInOptions from '../LogInOptions';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockLogInOptions = () => {
	return (
		<TestWrapper>
			<LogInOptions />
		</TestWrapper>
	);
};

describe('LogInOptions', () => {
	it('should render component.', () => {
		render(<MockLogInOptions />);
		const logInOptions = screen.getByTestId('log-in-options');

		expect(logInOptions).toBeInTheDocument();
	});
});
