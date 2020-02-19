describe("application", () => {
  it("it successfully creates an application", () => {
    cy.resetDb();
    cy.clearCookies();
    cy.visit("/");
    cy.get(`button[type="submit"]`).should("be.disabled");
    cy.get(`input[type="ssn"]`).type("161803159456");
    cy.get(`button[type="submit"]`)
      .should("not.be.disabled")
      .click();
    cy.get("h1").should("have.text", "Hæ Bruce,");
    cy.getByTestId("dataAgreement__checkbox").click();
    cy.getByTestId<HTMLButtonElement>("dataAgreement__button").click();
    cy.scrollTo("bottom");
    cy.get(`button[type="submit"]`).click();
    cy.getByTestId("dateOfBirth__button").click();
    cy.scrollTo("bottom");
    cy.getByTestId("timePeriods__button").click();
    cy.getByTestId("paymentPlan__button").click();
    cy.get(`input[name="email"]`).type("email@email.com");
    cy.get(`input[name="phone"]`).type("0000000");
    cy.get(`input[name="bankanumer"]`).type("000000000000");
    cy.get(`input[name="employer_contact_name"]`).type("Jón Jónsson");
    cy.get(`input[name="employer_contact_email"]`).type("jon@jonsson.is");
    cy.getByTestId("confirmation__button").click();
    cy.get("h1").should("have.text", "Takk fyrir umsóknina");
  });

  it("shows the application on reload", () => {
    cy.mockAuth();
    cy.reload();
    cy.get("h1").should("have.text", "Umsóknir");
    cy.get("[data-application]")
      .its("length")
      .should("eq", 1);
  });
});
