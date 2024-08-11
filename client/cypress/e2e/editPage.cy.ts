describe('EditPage', () => {
	it('should redirect user to log in page if they are not logged in.', () => {
		cy.visit('http://localhost:5173/edit');

		cy.wait(500);

		cy.url().should('match', /\/log-in$/);
	});
});
