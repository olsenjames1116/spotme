describe('LogOut', () => {
	it('should return the user to the log in page after log out.', () => {
		cy.login();

		cy.logout();

		cy.url().should('match', /\/log-in$/);
	});
});
