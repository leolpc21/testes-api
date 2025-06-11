Cypress.Commands.add('criarNovoUsuario', (body) => {
  Cypress.env('AUTH_USER_KEY', body.email);
  Cypress.env('AUTH_USER_SECRET', body.senha);

  cy.api({
    method: 'POST',
    url: '/usuarios',
    body: body,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('listarUsuarios', ({ nomeUsuario, email }) => {
  cy.api({
    method: 'GET',
    url: '/usuarios',
    qs: {
      nomeUsuario,
      email
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('listarUsuariosPorID', ({ id }) => {
  cy.api({
    method: 'GET',
    url: `/usuarios/${id}`,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('atualizarUsuario', ({ id, user }) => {
  cy.api({
    method: 'PUT',
    url: `/usuarios/${id}`,
    body: user,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('deletarUsuario', ({ id }) => {
  cy.api({
    method: 'DELETE',
    url: `/usuarios/${id}`,
    failOnStatusCode: false,
  });
});