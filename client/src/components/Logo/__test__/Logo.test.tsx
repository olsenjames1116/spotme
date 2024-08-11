import Logo from '../Logo';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockLogo = () => {
	return (
		<TestWrapper>
			<Logo />
		</TestWrapper>
	);
};

describe('Logo', () => {
	it('should render component.', () => {
		render(<MockLogo />);
		const logo = screen.getByTestId('logo');

		expect(logo).toBeInTheDocument();
	});
});
