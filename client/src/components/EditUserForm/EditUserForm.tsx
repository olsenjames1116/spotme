import { useDispatch, useSelector } from 'react-redux';
import FormSubmitButton from '../FormSubmitButton/FormSubmitButton';
import { IRootState } from '../../redux/store';
import { User } from '../../../types';
import FileInput from '../FileInput/FileInput';
import { useRef, useState } from 'react';
import api from '../../axiosConfig';
import { storeUser } from '../../redux/state/userSlice';

// Represents the form which the user can update their information.
function EditUserForm() {
	const [imageFile, setImageFile] = useState<null | File>(null);

	const user: User | object = useSelector(
		(state: IRootState) => state.user.value
	);

	const formRef = useRef<HTMLFormElement>(null);

	const [disabled, setDisabled] = useState(true);

	const dispatch = useDispatch();

	// Check if a value is an instance of type user.
	const instanceOfUser = (user: object): user is User => {
		return 'balance' in user;
	};

	// Create form data to send to API.
	const createFormData: () => FormData = () => {
		const formData = new FormData();

		if (instanceOfUser(user)) {
			console.log(imageFile);
			if (imageFile instanceof File) {
				formData.append('pic', imageFile);
			}
		}
		return formData;
	};

	// Submit changes made by the user on the form to API.
	const submitChanges = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = createFormData();

		try {
			const response = await api.put('/users/account-info', formData, {
				headers: {
					Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
				},
			});

			dispatch(storeUser(response.data));
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<form
			onSubmit={(event) => submitChanges(event)}
			ref={formRef}
			data-testid="edit-user-form"
		>
			<FileInput
				formRef={formRef}
				setImageFile={setImageFile}
				setDisabled={setDisabled}
			/>
			<input
				type="text"
				className="form-control"
				placeholder={instanceOfUser(user) ? user.username : 'username'}
				disabled
			/>
			<input
				type="text"
				className="form-control"
				placeholder="Email"
				disabled
			/>
			<input
				type="text"
				className="form-control"
				placeholder="Phone"
				disabled
			/>
			<FormSubmitButton text="Submit" disabled={disabled} />
		</form>
	);
}

export default EditUserForm;
