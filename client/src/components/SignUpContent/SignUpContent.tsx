import AccountFormContainer from '../AccountFormContainer/AccountFormContainer';
import SignUpForm from '../SignUpForm/SignUpForm';
import SignUpOptions from '../SignUpOptions/SignUpOptions';

// Represents the main content of the sign up page.
function SignUpContent() {
	return (
		<main data-testid="sign-up-content">
			<AccountFormContainer>
				<SignUpForm />
				<SignUpOptions />
			</AccountFormContainer>
		</main>
	);
}

export default SignUpContent;
