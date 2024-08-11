import LogInPage from '../LogInPage';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockLogInPage = () => {
	return (
		<TestWrapper>
			<LogInPage />
		</TestWrapper>
	);
};

describe('LogInPage', () => {
	it('should render component.', () => {
		render(<MockLogInPage />);
		const logInPage = screen.getByTestId('log-in-page');

		expect(logInPage).toBeInTheDocument();
	});
});
