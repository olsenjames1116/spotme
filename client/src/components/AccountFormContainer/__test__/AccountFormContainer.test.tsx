import AccountFormContainer from '../AccountFormContainer';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';
import React from 'react';

interface Props {
	children: React.ReactNode;
}

const MockAccountFormContainer = ({ children }: Props) => {
	return (
		<TestWrapper>
			<AccountFormContainer children={children} />
		</TestWrapper>
	);
};

describe('AccountFormContainer', () => {
	it('should render component.', () => {
		render(<MockAccountFormContainer children={<div />} />);
		const accountFormContainer = screen.getByTestId('account-form-container');

		expect(accountFormContainer).toBeInTheDocument();
	});

	it('should render children.', () => {
		render(
			<MockAccountFormContainer
				children={<div data-testid="account-form-child" />}
			/>
		);
		const accountFormChild = screen.getByTestId('account-form-child');

		expect(accountFormChild).toBeInTheDocument();
	});
});
