import LogOut from '../LogOut';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockLogOut = () => {
	return (
		<TestWrapper>
			<LogOut />
		</TestWrapper>
	);
};

describe('LogOut', () => {
	it('should render component.', () => {
		render(<MockLogOut />);
		const logOut = screen.getByTestId('log-out');

		expect(logOut).toBeInTheDocument();
	});
});
