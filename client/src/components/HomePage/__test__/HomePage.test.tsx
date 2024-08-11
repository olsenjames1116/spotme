import HomePage from '../HomePage';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockHomePage = () => {
	return (
		<TestWrapper>
			<HomePage />
		</TestWrapper>
	);
};

describe('HomePage', () => {
	it('should render component.', () => {
		render(<MockHomePage />);
		const homePage = screen.getByTestId('home-page');

		expect(homePage).toBeInTheDocument();
	});
});
