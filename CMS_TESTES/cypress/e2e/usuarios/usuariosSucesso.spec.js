import { RandomDataGenerator } from '../../support/helpers/data/randomDataGenerator.js';

describe('POST Usuários', function () {
  it('deve cadastrar um novo usuário', function () {
    const { user } = RandomDataGenerator.getRandomUser();

    cy.criarNovoUsuario(user).as('newUser');

    cy.get('@newUser').then(({ status, body }) => {
      const { nomeCompleto, nomeUsuario, email, dataCriacao } = body;
      expect(status).to.equal(201);
      expect(body).to.have.property('id');
      expect(body).to.be.an('object');
      expect(nomeUsuario).to.be.equal(user.nomeUsuario);
      expect(nomeCompleto).to.be.equal(user.nomeCompleto);
      expect(email).to.be.equal(user.email);
      expect(dataCriacao).to.be.contain(RandomDataGenerator.generateTimestamp());
    });
  });
});

describe('GET Usuários', function () {
  const { user } = RandomDataGenerator.getRandomUser();

  before(function () {
    cy.criarNovoUsuario(user).then(({ body }) => {
      const { id } = body;
      this.userId = id;
    });
  });

  it('deve listar todos os usuários', function () {
    cy.listarUsuarios({}).as('listUsers');

    cy.get('@listUsers').then(({ status, body }) => {

      expect(status).to.equal(200);
      expect(body).to.be.an('array');
    });
  });

  it('deve filtrar por nomeUsuario', function () {
    cy.listarUsuarios({ nomeUsuario: user.nomeUsuario }).as('listUsers');

    cy.get('@listUsers').then(({ status, body }) => {
      const [{ nomeCompleto, nomeUsuario, email, dataCriacao, id }] = body;

      expect(status).to.equal(200);
      expect(body).to.be.an('array');
      expect(id).to.be.equal(this.userId);
      expect(nomeUsuario).to.be.equal(user.nomeUsuario);
      expect(nomeCompleto).to.be.equal(user.nomeCompleto);
      expect(email).to.be.equal(user.email);
      expect(dataCriacao).to.be.contain(RandomDataGenerator.generateTimestamp());
    });
  });

  it('deve filtrar por email', function () {
    cy.listarUsuarios({ email: user.email }).as('listUsers');

    cy.get('@listUsers').then(({ status, body }) => {
      const [{ nomeCompleto, nomeUsuario, email, dataCriacao, id }] = body;

      expect(status).to.equal(200);
      expect(body).to.be.an('array');
      expect(id).to.be.equal(this.userId);
      expect(nomeUsuario).to.be.equal(user.nomeUsuario);
      expect(nomeCompleto).to.be.equal(user.nomeCompleto);
      expect(email).to.be.equal(user.email);
      expect(dataCriacao).to.be.contain(RandomDataGenerator.generateTimestamp());
    });
  });

  it('deve filtrar por ID', function () {
    cy.listarUsuariosPorID({ id: this.userId }).as('listUsers');

    cy.get('@listUsers').then(({ status, body }) => {
      const { nomeCompleto, nomeUsuario, email, dataCriacao, id } = body;

      expect(status).to.equal(200);
      expect(body).to.be.an('object');
      expect(id).to.be.equal(this.userId);
      expect(nomeUsuario).to.be.equal(user.nomeUsuario);
      expect(nomeCompleto).to.be.equal(user.nomeCompleto);
      expect(email).to.be.equal(user.email);
      expect(dataCriacao).to.be.contain(RandomDataGenerator.generateTimestamp());
    });
  });
});

describe('PUT Usuários', function () {
  const { user: userToEdit } = RandomDataGenerator.getRandomUser();

  before(function () {
    cy.criarNovoUsuario(userToEdit).then(({ body }) => {
      const { id } = body;
      this.userId = id;
    });
  });

  it('deve atualizar um usuário', function () {
    const { user } = RandomDataGenerator.getRandomUser();

    cy.atualizarUsuario({ id: this.userId, user }).as('editUser');

    cy.get('@editUser').then(({ status, body }) => {
      const { email, nomeCompleto, nomeUsuario, id } = body;

      expect(status).to.equal(200);
      expect(body).to.be.an('object');
      expect(id).to.be.equal(this.userId);
      expect(email).to.be.equal(user.email);
      expect(nomeCompleto).to.be.equal(user.nomeCompleto);
      expect(nomeUsuario).to.be.equal(user.nomeUsuario);

      expect(email).to.not.be.equal(userToEdit.email);
      expect(nomeCompleto).to.not.be.equal(userToEdit.nomeCompleto);
      expect(nomeUsuario).to.not.be.equal(userToEdit.nomeUsuario);

      Cypress.env('AUTH_USER_KEY', user.email);
      Cypress.env('AUTH_USER_SECRET', user.senha);
      cy.login('valid').as('auth');
      cy.get('@auth').then(({ status, body }) => {
        const { user } = body;
        const { id } = user;

        expect(status).to.equal(200);
        expect(id).to.be.equal(this.userId);
      });
    });
  });
});

describe('DELETE Usuários', function () {
  const { user } = RandomDataGenerator.getRandomUser();

  before(function () {
    cy.criarNovoUsuario(user).then(({ body }) => {
      const { id } = body;
      this.userId = id;
    });
  });

  it('deve deletar um usuário', function () {
    cy.deletarUsuario({ id: this.userId }).as('deleteUser');

    cy.get('@deleteUser').then(({ status, body }) => {
      expect(status).to.equal(204);
      expect(body).to.be.empty;

      cy.listarUsuariosPorID({ id: this.userId }).as('listUsers');

      cy.get('@listUsers').then(({ status, body }) => {
        const { erro } = body;

        expect(status).to.equal(404);
        expect(body).to.have.property('erro');
        expect(erro).to.contain('Usuário não encontrado');
      });
    });
  });
});
