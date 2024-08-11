import FriendsSearchBar from '../FriendsSearchBar';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockFriendsSearchBar = () => {
	return (
		<TestWrapper>
			<FriendsSearchBar />
		</TestWrapper>
	);
};

describe('FriendsSearchBar', () => {
	it('should render component.', () => {
		render(<MockFriendsSearchBar />);
		const friendsContent = screen.getByTestId('friends-search-bar');

		expect(friendsContent).toBeInTheDocument();
	});
});
