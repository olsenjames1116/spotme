import { useEffect } from 'react';
import { IRootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../../types';
import api from '../../axiosConfig';
import { storeUser } from '../../redux/state/userSlice';
import { Link } from 'react-router-dom';
import moneyImage from '../../images/money.jpg';

function UserData() {
	const user: User | object = useSelector(
		(state: IRootState) => state.user.value
	);

	const dispatch = useDispatch();

	useEffect(() => {
		const getUserInfo = async () => {
			try {
				const response = await api.get('/users', {
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
					},
				});

				dispatch(storeUser(response.data));
			} catch (error) {
				console.log(error);
			}
		};

		getUserInfo();
	}, []);

	return (
		<div data-testid="user-data">
			<Link to="/edit">
				{!(user as User).pic ? (
					<img src={moneyImage} alt="Dollar bills" className="w-25 h-25" />
				) : (
					<img
						src={(user as User).pic!}
						alt="Profile photo"
						className="w-25 h-25"
					/>
				)}
				<span>{Object.keys(user).length > 0 && (user as User).username}</span>
			</Link>
			<span>{Object.keys(user).length > 0 && (user as User).balance}</span>
		</div>
	);
}

export default UserData;
