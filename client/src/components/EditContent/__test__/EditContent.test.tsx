import EditContent from '../EditContent';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';

const MockEditContent = () => {
	return (
		<TestWrapper>
			<EditContent />
		</TestWrapper>
	);
};

describe('EditContent', () => {
	it('should render component.', () => {
		render(<MockEditContent />);
		const editContent = screen.getByTestId('edit-content');

		expect(editContent).toBeInTheDocument();
	});
});
