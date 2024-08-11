import EditPage from '../EditPage';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockEditPage = () => {
	return (
		<TestWrapper>
			<EditPage />
		</TestWrapper>
	);
};

describe('EditPage', () => {
	it('should render component.', () => {
		render(<MockEditPage />);
		const editPage = screen.getByTestId('edit-page');

		expect(editPage).toBeInTheDocument();
	});
});
