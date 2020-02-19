export {};

describe("redirect", () => {
  it("it redirects the user from '/' to '/umsokn'", () => {
    cy.visit("/");
    cy.location("pathname").should("eq", "/umsokn");
  });
});
