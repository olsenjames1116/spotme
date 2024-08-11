import FriendsContent from '../FriendsContent';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockFriendsContent = () => {
	return (
		<TestWrapper>
			<FriendsContent />
		</TestWrapper>
	);
};

describe('FriendsContent', () => {
	it('should render component.', () => {
		render(<MockFriendsContent />);
		const friendsContent = screen.getByTestId('friends-content');

		expect(friendsContent).toBeInTheDocument();
	});
});
