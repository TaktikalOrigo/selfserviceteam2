export {};

describe("auth", () => {
  it("it successfully authenticates the user", () => {
    Cypress.Cookies.preserveOnce("ssn");
    cy.resetDb();
    cy.clearCookies();
    cy.visit("/");
    cy.get(`button[type="submit"]`).should("be.disabled");
    cy.get(`input[type="ssn"]`).type("161803159456");
    cy.get(`button[type="submit"]`)
      .should("not.be.disabled")
      .click();
    cy.get("h1").should("have.text", "Hæ Bruce,");
  });

  it("maintains the ssn on redirect", () => {
    cy.reload();
    cy.get("h1").should("have.text", "Hæ Bruce,");
  });
});
