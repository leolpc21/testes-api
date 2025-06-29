// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import 'cypress-plugin-api';
import './commands';
import './commands/autenticacao';
import './commands/usuarios';
chai.use(require('chai-json-schema'));
import { RandomDataGenerator } from './helpers/data/randomDataGenerator.js';

before(() => {
  const { user } = RandomDataGenerator.getRandomUser();

  cy.criarNovoUsuario(user).as('newUser');
  cy.login('valid').as('auth');

  cy.get('@auth').then(({ status, body }) => {
    expect(status).to.equal(200);
    expect(body).to.have.property('token');
    Cypress.env('token', body.token);
  });
});