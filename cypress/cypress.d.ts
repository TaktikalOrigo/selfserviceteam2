declare namespace Cypress {
  interface Chainable {
    mockAuth(): Chainable<any>;
    getByTestId<T extends Element = HTMLElement>(testId: string): Chainable<T>;
    assertTestIdExists<T extends Element = HTMLElement>(testId: string): Chainable<T>;
    resetDb(): Chainable<any>;
  }
}
