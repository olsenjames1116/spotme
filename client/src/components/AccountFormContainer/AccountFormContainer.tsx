interface Props {
	children: React.ReactNode;
}

// Represents the account form container component used on the log in and sign up pages.
function AccountFormContainer({ children }: Props) {
	return (
		<div data-testid="account-form-container" className="row">
			<h1>SpotMe</h1>
			{children}
		</div>
	);
}

export default AccountFormContainer;
