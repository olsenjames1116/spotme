import DemoAccountLogIn from '../DemoAccountLogIn';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockDemoAccountLogIn = () => {
	return (
		<TestWrapper>
			<DemoAccountLogIn />
		</TestWrapper>
	);
};

describe('DemoAccountLogIn', () => {
	it('should render component.', () => {
		render(<MockDemoAccountLogIn />);
		const demoAccountLogIn = screen.getByTestId('demo-account-log-in');

		expect(demoAccountLogIn).toBeInTheDocument();
	});
});
