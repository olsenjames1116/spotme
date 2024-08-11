describe('LogInPage', () => {
	it('should route the user to the home page after a successful log in.', () => {
		cy.login();

		cy.url().should('match', /\/$/);
		cy.logout();
	});

	it('should display an error message if the inputs are empty.', () => {
		cy.visit('http://localhost:5173/log-in');

		cy.get('[data-testid="form-submit-button"]').click();

		cy.get('[data-testid="username-input-invalid-feedback"]')
			.find('li')
			.should('have.text', 'Username must not be empty.');
		cy.get('[data-testid="password-input-invalid-feedback"]')
			.find('li')
			.should('have.text', 'Password must not be empty.');
	});

	it('should display an error message if the username does not exist in the database.', () => {
		cy.visit('http://localhost:5173/log-in');

		cy.get('[data-testid="username-input"]').type('demo1');
		cy.get('[data-testid="password-input"]').type('123');
		cy.get('[data-testid="form-submit-button"]').click();

		cy.get('[data-testid="username-input-invalid-feedback"]')
			.find('li')
			.should('have.text', "User 'demo1' does not exist.");
	});

	it('should display an error if the password does not match the one stored in the database.', () => {
		cy.visit('http://localhost:5173/log-in');

		cy.get('[data-testid="username-input"]').type('demo');
		cy.get('[data-testid="password-input"]').type('456');
		cy.get('[data-testid="form-submit-button"]').click();

		cy.get('[data-testid="password-input-invalid-feedback"]')
			.find('li')
			.should('have.text', 'Password is incorrect.');
	});

	it('should navigate the user to the home page if they are logged in.', () => {
		cy.login();

		cy.wait(500);
		cy.visit('http://localhost:5173/log-in');

		cy.url().should('match', /\/$/);
		cy.logout();
	});
});
