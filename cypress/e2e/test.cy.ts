describe('Home Page', () => {
  it('Visits the Home Page URL', () => {
    cy.visit('/tabs/home');
    cy.get('[data-testid="page-home"]').should('be.visible');
  });
});
