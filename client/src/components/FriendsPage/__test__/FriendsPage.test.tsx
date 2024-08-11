import FriendsPage from '../FriendsPage';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockFriendsPage = () => {
	return (
		<TestWrapper>
			<FriendsPage />
		</TestWrapper>
	);
};

describe('FriendsPage', () => {
	it('should render component.', () => {
		render(<MockFriendsPage />);
		const friendsPage = screen.getByTestId('friends-page');

		expect(friendsPage).toBeInTheDocument();
	});
});
