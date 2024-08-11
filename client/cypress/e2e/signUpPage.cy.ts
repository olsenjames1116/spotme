describe('SignUpPage', () => {
	it('should display an alert with a success message if the user is signed up successfully.', () => {
		cy.visit('http://localhost:5173/sign-up');

		cy.get('[data-testid="username-input"]').type('testUser');
		cy.get('[data-testid="password-input"]').type('password');
		cy.get('[data-testid="confirm-password-input"]').type('password');
		cy.get('[data-testid="form-submit-button"]').click();

		cy.on('window:alert', (str) => {
			expect(str).to.contain('Account created.');
		});
	});

	it('should display an error message if the input is empty.', () => {
		cy.visit('http://localhost:5173/sign-up');

		cy.get('[data-testid="form-submit-button"]').click();

		cy.get('[data-testid="username-input-invalid-feedback"]')
			.find('li')
			.should('have.text', 'Username must not be empty.');
		cy.get('[data-testid="password-input-invalid-feedback"]')
			.find('li')
			.should('have.text', 'Password must not be empty.');
		cy.get('[data-testid="confirm-password-input-invalid-feedback"]')
			.find('li')
			.should('have.text', 'Confirmation password must not be empty.');
	});

	it('should display an error message if a user tries to use an existing username.', () => {
		cy.visit('http://localhost:5173/sign-up');

		cy.get('[data-testid="username-input"]').type('demo');
		cy.get('[data-testid="password-input"]').type('123');
		cy.get('[data-testid="confirm-password-input"]').type('123');
		cy.get('[data-testid="form-submit-button"]').click();
		cy.get('[data-testid="username-input-invalid-feedback"]')
			.find('li')
			.should('have.text', "User 'demo' already exists.");
	});

	it('should display an error message if the passwords do not match.', () => {
		cy.visit('http://localhost:5173/sign-up');

		cy.get('[data-testid="username-input"]').type('demo');
		cy.get('[data-testid="password-input"]').type('123');
		cy.get('[data-testid="confirm-password-input"]').type('456');
		cy.get('[data-testid="form-submit-button"]').click();
		cy.get('[data-testid="confirm-password-input-invalid-feedback"]')
			.find('li')
			.should('have.text', 'Passwords must match.');
	});

	it('should redirect the user to the home page if they are logged in.', () => {
		cy.visit('http://localhost:5173/sign-up');

		cy.get('[data-testid="username-input"]').type('testUser1');
		cy.get('[data-testid="password-input"]').type('123');
		cy.get('[data-testid="confirm-password-input"]').type('123');
		cy.get('[data-testid="form-submit-button"]').click();

		cy.url().should('match', /\/log-in$/i);
	});

	it('should navigate the user to the home page if they are logged in.', () => {
		cy.login();

		cy.wait(500);
		cy.visit('http://localhost:5173/sign-up');

		cy.url().should('match', /\/$/);
	});
});
