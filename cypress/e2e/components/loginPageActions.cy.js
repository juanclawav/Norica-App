describe('Login Page Actions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/auth/login');
  });

  it("should add an email address correctly", () => {
    cy.get("input[id='email']")
      .type("fake@email.com").should('have.value', 'fake@email.com');
  });

  it("should add a password correctly", () => {
    cy.get("input[id='password']")
      .type("fakePassword123").should('have.value', 'fakePassword123');
  });

  it("should show 'Sign In Error' correctly when filling inputs with wrong data",() => {
    cy.get("input[id='email']")
      .type("fake@email.com").should('have.value', 'fake@email.com');

    cy.get("input[id='password']")
      .type("fakePassword123").should('have.value', 'fakePassword123');

    cy.get("button[type='submit']")
      .click();

    cy.get("div[id='ModalMessageNorica']")
      .should('exist');
  });

  it("should show 'Sign In Error' correctly when clicking directly sign in button", () => {
    cy.get("button[type='submit']")
      .click();
    
    cy.get("input[id='email']")
      .should('have.value','').should('exist');

    cy.get("input[id='password']")
      .should('have.value','').should('exist');
  });
})