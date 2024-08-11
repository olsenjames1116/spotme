import Nav from '../Nav';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockNav = () => {
	return (
		<TestWrapper>
			<Nav />
		</TestWrapper>
	);
};

describe('Nav', () => {
	it('should render component.', () => {
		render(<MockNav />);
		const nav = screen.getByTestId('nav');

		expect(nav).toBeInTheDocument();
	});
});
