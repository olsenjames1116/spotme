import UserData from '../UserData';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockUserData = () => {
	return (
		<TestWrapper>
			<UserData />
		</TestWrapper>
	);
};

describe('UserData', () => {
	it('should render component.', () => {
		render(<MockUserData />);
		const userData = screen.getByTestId('user-data');

		expect(userData).toBeInTheDocument();
	});

	it('should display user data.', async () => {
		render(<MockUserData />);
		const username = await screen.findByText(/testUser/i);
		const balance = await screen.findByText(/100/i);

		expect(username).toBeInTheDocument();
		expect(balance).toBeInTheDocument();
	});
});
