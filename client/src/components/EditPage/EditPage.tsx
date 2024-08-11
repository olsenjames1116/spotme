import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EditContent from '../EditContent/EditContent';
import Sidebar from '../Sidebar/Sidebar';

function EditPage() {
	const navigate = useNavigate();

	useEffect(() => {
		if (sessionStorage.length < 1) {
			navigate('/log-in');
		}
	}, []);

	return (
		<div data-testid="edit-page">
			<Sidebar />
			<EditContent />
		</div>
	);
}

export default EditPage;
