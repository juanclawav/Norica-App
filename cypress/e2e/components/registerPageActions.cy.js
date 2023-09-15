describe('Recover PWD Page Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/auth/register');
  });

  it("should add an email address correctly", () => {
    cy.get("input[id='email']")
      .type("fake@email.com").should('have.value', 'fake@email.com');
  });

  it("should add a password correctly", () => {
    cy.get("input[id='password']")
      .type("fakePassword123").should('have.value', 'fakePassword123');
  });

  it("should add again my last password correctly", () => {
    cy.get("input[id='confirm-password']")
      .type("fakePassword123").should('have.value', 'fakePassword123');
  });

  it("should show message to confirm submit and when trying to submit show error", () => {
    cy.get("button[type='submit']")
      .click();
    
    cy.get("input[id='email']")
      .should('have.value','').should('exist');

    cy.get("input[id='password']")
      .should('have.value','').should('exist');

    cy.get("input[id='confirm-password']")
      .should('have.value','').should('exist');

    cy.get("div[id='ModalConfirmationNorica']")
      .should('exist');

    cy.get("button[id='ModalConfirmationButtonOneNorica']")
      .click();
    
    cy.get("div[id='ModalMessageNorica']").should('exist');
  });
})