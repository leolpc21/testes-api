import RandomDataGenerator from '../helpers/data/randomDataGenerator.js';

Cypress.Commands.add('createCategory', (type_user) => {
  const { nome, descricao } = RandomDataGenerator.getCategory(type_user);
  cy.api({
    method: 'POST',
    url: '/categorias',
    body: {
      nome,
      descricao
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('deleteCategory', (categoryId) => {
  cy.api({
    method: 'DELETE',
    url: '/categorias/' + categoryId,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('updateCategory', (type_user, categoryId) => {
  const { nome, descricao } = RandomDataGenerator.getCategory(type_user);
  cy.api({
    method: 'PUT',
    url: '/categorias/' + categoryId,
    body: {
      nome,
      descricao
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('getAllCategory', () => {
  cy.api({
    method: 'GET',
    url: '/categorias',
  });
});

Cypress.Commands.add('getCategoryById', (categoryId) => {
  cy.api({
    method: 'GET',
    url: '/categorias/' + categoryId,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('getCategoryByParam', (params) => {
  cy.api({
    method: 'GET',
    url: '/categorias',
    qs: params,
  });
});