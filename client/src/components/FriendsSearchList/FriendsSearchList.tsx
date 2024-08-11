import { useSelector } from 'react-redux';
import { IRootState } from '../../redux/store';
import { Friend } from '../../../types';
import moneyImage from '../../images/money.jpg';
import api from '../../axiosConfig';

function FriendsSearchList() {
	const friendsSearchResult = useSelector(
		(state: IRootState) => state.friendsSearchResult.value
	);

	const addFriend = async (
		event: React.FormEvent<HTMLFormElement>,
		id: string
	) => {
		event.preventDefault();

		try {
			const response = await api.put(
				'/users',
				{ id },
				{
					headers: {
						Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
					},
				}
			);

			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<ul>
			{friendsSearchResult.map((result: Friend) => {
				return (
					<li key={result.id}>
						{result.pic ? (
							<img src={result.pic} alt="" />
						) : (
							<img src={moneyImage} />
						)}
						<span>{result.username}</span>
						<form onSubmit={(event) => addFriend(event, result.id)}>
							<button className="btn btn-primary">+ Add</button>
						</form>
					</li>
				);
			})}
		</ul>
	);
}

export default FriendsSearchList;
