import PayForm from '../PayForm';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockPayForm = () => {
	return (
		<TestWrapper>
			<PayForm />
		</TestWrapper>
	);
};

describe('PayForm', () => {
	it('should render component.', () => {
		render(<MockPayForm />);
		const payForm = screen.getByTestId('pay-form');

		expect(payForm).toBeInTheDocument();
	});
});
