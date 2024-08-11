interface Props {
	text: string;
	disabled: boolean;
}

/* Represents the component to submit form data on the log in 
and sign up pages. */
function FormSubmitButton({ text, disabled }: Props) {
	return (
		<button
			data-testid="form-submit-button"
			className="btn btn-primary"
			disabled={disabled}
		>
			{text}
		</button>
	);
}

export default FormSubmitButton;
