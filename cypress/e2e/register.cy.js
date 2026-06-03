describe("Registration page", () => {
  it("shows password length validation", () => {
    cy.visit("/register");

    cy.get('input[name="username"]').type("testuser123");
    cy.get('input[name="email"]').type("testuser123@example.com");
    cy.get('input[name="password"]').type("short");
    cy.get('button[type="submit"]').click();

    cy.contains("Password must be at least 8 characters", {
      timeout: 10000,
    }).should("exist");
  });

  it("can submit the registration form with valid input", () => {
    cy.intercept("POST", "/api/auth/register").as("registerRequest");

    cy.visit("/register");

    const uniqueValue = Date.now();

    cy.get('input[name="username"]').type(`user${uniqueValue}`);
    cy.get('input[name="email"]').type(`user${uniqueValue}@example.com`);
    cy.get('input[name="password"]').type("Abcd1234!");
    cy.get('button[type="submit"]').click();

    cy.wait("@registerRequest")
      .its("response.statusCode")
      .should("eq", 201);

    cy.contains("Account created successfully!", { timeout: 10000 }).should(
      "exist"
    );
  });
});