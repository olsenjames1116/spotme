import Logo from '../Logo/Logo.tsx';
import Nav from '../Nav/Nav.tsx';
import PayForm from '../PayForm/PayForm.tsx';
import UserData from '../UserData/UserData.tsx';

function Sidebar() {
	return (
		<section data-testid="sidebar">
			<Logo />
			<UserData />
			<PayForm />
			<Nav />
		</section>
	);
}

export default Sidebar;
