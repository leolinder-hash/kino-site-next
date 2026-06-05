describe("Login page", () => {
  it("loads the login page", () => {
    cy.visit("/login");
    cy.contains("Logga in").should("exist");
  });

  it("contains username and password fields", () => {
    cy.visit("/login");

    cy.get('input').should("have.length.at.least", 2);
    cy.get('input[type="password"]').should("exist");
  });

  it("has a login button", () => {
    cy.visit("/login");
    cy.get('button[type="submit"]').should("exist");
    cy.contains("Logga in").should("exist");
  });
});