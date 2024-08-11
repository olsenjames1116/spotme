import NavItem from '../NavItem';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

interface Props {
	children: React.ReactNode;
	className?: string;
}

const MockNavItem = ({ children, className }: Props) => {
	return (
		<TestWrapper>
			<NavItem children={children} className={className} />
		</TestWrapper>
	);
};

describe('NavItem', () => {
	it('should render component.', () => {
		render(<MockNavItem children={<div />} className="" />);
		const navItem = screen.getByTestId('nav-item');

		expect(navItem).toBeInTheDocument();
	});

	it('should render child components.', () => {
		render(<MockNavItem children={<div />} className="" />);
		const navItem = screen.getByTestId('nav-item');

		expect(navItem).toContainHTML('<div />');
	});

	it('should have a class with to match the className prop.', () => {
		render(<MockNavItem children={<div />} className="test" />);
		const navItem = screen.getByTestId('nav-item');

		expect(navItem).toHaveClass(/test/i);
	});
});
