Cypress.Commands.add("mockAuth", () => {
  return cy.setCookie("ssn", "161803159456");
});

Cypress.Commands.add("getByTestId", testId => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add("assertTestIdExists", testId => {
  return cy.get(`[data-testid="${testId}"]`);
});

Cypress.Commands.add("resetDb", () => {
  return cy.request("POST", "/api/db/reset");
});
