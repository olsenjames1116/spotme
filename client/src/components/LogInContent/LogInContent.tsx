import AccountFormContainer from '../AccountFormContainer/AccountFormContainer';
import LogInForm from '../LogInForm/LogInForm';
import LogInOptions from '../LogInOptions/LogInOptions';

// Represents the main content of the log in page.
function LogInContent() {
	return (
		<main data-testid="log-in-content">
			<AccountFormContainer>
				<LogInForm />
				<LogInOptions />
			</AccountFormContainer>
		</main>
	);
}

export default LogInContent;
