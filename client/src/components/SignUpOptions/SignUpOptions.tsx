import { Link } from 'react-router-dom';

// Represents the alternative options a user has to signing up.
function SignUpOptions() {
	return (
		<ul data-testid="sign-up-options">
			<li>
				<Link to="/log-in" className="btn btn-outline-primary">
					Log In
				</Link>
			</li>
		</ul>
	);
}

export default SignUpOptions;
