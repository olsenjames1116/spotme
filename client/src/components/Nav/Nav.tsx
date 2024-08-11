import { Link } from 'react-router-dom';
import NavItem from '../NavItem/NavItem';
import LogOut from '../LogOut/LogOut';
import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';

function Nav() {
	const location = useSelector((state: IRootState) => state.location.value);

	return (
		<nav data-testid="nav">
			<ul className="nav flex-col">
				<NavItem className={location === '/friends' ? 'active' : ''}>
					<Link to="/friends">Friends</Link>
				</NavItem>
				<NavItem className={location === '/' ? 'active' : ''}>
					<Link to="/">Feed</Link>
				</NavItem>
				<NavItem>
					<LogOut />
				</NavItem>
			</ul>
		</nav>
	);
}

export default Nav;
