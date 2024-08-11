import SignUpContent from '../SignUpContent/SignUpContent';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// Represents the page for the user to sign up.
function SignUpPage() {
	const navigate = useNavigate();

	useEffect(() => {
		if (sessionStorage.length > 0) {
			navigate('/');
		}
	}, []);

	return (
		<div data-testid="sign-up-page">
			<SignUpContent />
		</div>
	);
}

export default SignUpPage;
