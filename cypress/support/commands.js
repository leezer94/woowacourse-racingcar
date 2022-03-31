// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('checkAlertMessage', (expectedMessage) => {
  cy.on('window:alert', (message) => {
    expect(message).to.equal(expectedMessage);
  });
});

Cypress.Commands.add('inputCarNames', (names) => {
  cy.get('#car-name-input').type(names);
});

Cypress.Commands.add('inputRacingCount', (count) => {
  cy.get('#racing-count-input').type(count);
});

Cypress.Commands.add('submitCarNames', (names) => {
  cy.inputCarNames(names);
  cy.get('#car-name-submit').click();
});

Cypress.Commands.add('submitRacingCount', (count) => {
  cy.inputRacingCount(count);
  cy.get('#racing-count-submit').click();
});
