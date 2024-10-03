describe('Sign In Page', () => {
  it('Visits the Sign In Page', () => {
    cy.visit('/auth/signin');
    cy.get('[data-testid="page-signin"]').should('be.visible');
  });
});
