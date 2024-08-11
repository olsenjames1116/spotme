import { Link } from 'react-router-dom';
import DemoAccountLogIn from '../DemoAccountLogIn/DemoAccountLogIn';

// Represents the alternatives to logging in on the log in page.
function LogInOptions() {
	return (
		<ul data-testid="log-in-options">
			<li>
				<Link to="/sign-up" className="btn btn-outline-primary">
					Sign Up
				</Link>
			</li>
			<li>
				<DemoAccountLogIn />
			</li>
		</ul>
	);
}

export default LogInOptions;
