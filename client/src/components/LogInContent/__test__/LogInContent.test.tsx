import LogInContent from '../LogInContent';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockLogInContent = () => {
	return (
		<TestWrapper>
			<LogInContent />
		</TestWrapper>
	);
};

describe('LogInContent', () => {
	it('should render component.', () => {
		render(<MockLogInContent />);
		const logInContent = screen.getByTestId('log-in-content');

		expect(logInContent).toBeInTheDocument();
	});
});
