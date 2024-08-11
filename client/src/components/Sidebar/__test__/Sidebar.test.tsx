import Sidebar from '../Sidebar';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockSidebar = () => {
	return (
		<TestWrapper>
			<Sidebar />
		</TestWrapper>
	);
};

describe('Sidebar', () => {
	it('should render component.', () => {
		render(<MockSidebar />);
		const sidebar = screen.getByTestId('sidebar');

		expect(sidebar).toBeInTheDocument();
	});
});
