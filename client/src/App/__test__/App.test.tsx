import App from '../App';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../utils/TestWrapper';

const MockApp = () => {
	return (
		<TestWrapper>
			<App />
		</TestWrapper>
	);
};

describe('App', () => {
	it('should render component.', () => {
		render(<MockApp />);
		const app = screen.getByTestId('app');

		expect(app).toBeInTheDocument();
	});
});
