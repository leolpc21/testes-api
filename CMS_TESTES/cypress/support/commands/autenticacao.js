import RandomDataGenerator from '../helpers/data/randomDataGenerator.js';

Cypress.Commands.add('login', (login_type) => {
  const { email, senha } = RandomDataGenerator.getUserToLogin(login_type);
  cy.api({
    method: 'POST',
    url: '/auth/login',
    body: {
      email,
      senha
    },
    failOnStatusCode: false,
  });
});