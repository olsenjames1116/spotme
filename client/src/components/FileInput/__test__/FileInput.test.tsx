import FileInput from '../FileInput';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TestWrapper from '../../../utils/TestWrapper';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

interface Props {
	formRef: React.RefObject<HTMLFormElement>;
	setImageFile: React.Dispatch<React.SetStateAction<null | File>>;
	setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const mockRef = {
	current: null,
};

const MockFileInput = ({ formRef, setImageFile, setDisabled }: Props) => {
	return (
		<TestWrapper>
			<FileInput
				formRef={formRef}
				setImageFile={setImageFile}
				setDisabled={setDisabled}
			/>
		</TestWrapper>
	);
};

global.URL.createObjectURL = vi.fn();

describe('FileInput', () => {
	it('should render component.', () => {
		render(
			<MockFileInput
				formRef={mockRef}
				setImageFile={vi.fn()}
				setDisabled={vi.fn()}
			/>
		);
		const fileInputContainer = screen.getByTestId('file-input-container');

		expect(fileInputContainer).toBeInTheDocument();
	});

	it('should call setImageFile if an image is uploaded.', async () => {
		const mockSetImageFile = vi.fn();
		render(
			<MockFileInput
				formRef={mockRef}
				setImageFile={mockSetImageFile}
				setDisabled={vi.fn()}
			/>
		);
		const fileInput = screen.getByTestId('file-input');
		const blob = new Blob();
		const image = new File([blob], 'testImage.jpg', {
			type: 'image/jpeg',
		});

		await userEvent.upload(fileInput, image);

		expect(mockSetImageFile).toHaveBeenCalled();
	});

	it('should call setDisabled if the wrong file type is input.', async () => {
		const mockSetDisabled = vi.fn();
		render(
			<MockFileInput
				formRef={mockRef}
				setImageFile={vi.fn()}
				setDisabled={mockSetDisabled}
			/>
		);
		const fileInput = screen.getByTestId('file-input');
		const blob = new Blob();
		const image = new File([blob], 'testImage.jpg', {
			type: 'application/pdf',
		});

		await userEvent.upload(fileInput, image);

		expect(mockSetDisabled).toHaveBeenCalled();
	});
});
