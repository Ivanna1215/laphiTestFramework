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
/**
 * Contains element and verify visibility
 * @memberOf Cypress.Chainable#
 * @name containsVisible
 * @function
 * @param {String} identifier
 * @param {String} value
 */

Cypress.Commands.add("containsVisible", (identifier, value) => {
    cy.contains(identifier, value).should('be.visible');
});

/**
 * Get element and verify visibility
 * @memberOf Cypress.Chainable#
 * @name getVisible
 * @function
 * @param {String} identifier
 */

Cypress.Commands.add("getVisible", (identifier) => {
    cy.get(identifier).should('be.visible');
});
