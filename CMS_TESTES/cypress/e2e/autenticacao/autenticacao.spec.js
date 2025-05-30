describe('Autenticacao', () => {
  it('deve logar com usuario e senha validos', () => {
    cy.login('valid').as('auth');

    cy.get('@auth').then(({ status, body }) => {
      expect(status).to.equal(200);
      expect(body).to.have.property('token');
      expect(body).to.have.property('user');
      expect(body.user).to.be.a('object');
    });
  });

  it('nao deve logar com usuario ou senha errados', () => {
    cy.login('invalid').as('auth');

    cy.get('@auth').then(({ status, body }) => {
      expect(status).to.equal(401);
      expect(body).to.have.property('erro');
      expect(body.erro).to.contain('Email ou senha inválidos');
    });
  });

  it('nao deve logar com usuario ou senha vazios', () => {
    cy.login('empty').as('auth');

    cy.get('@auth').then(({ status, body }) => {
      expect(status).to.equal(400);
      expect(body).to.have.property('errors');
      expect(body.errors).to.be.an('array');
      expect(body.errors[0].msg).to.be.equal('Email inválido');
      expect(body.errors[1].msg).to.be.equal('Senha é obrigatória');

    });
  });

  it('nao deve logar com usuario ou senha inexistentes', () => {
    cy.login('required').as('auth');

    cy.get('@auth').then(({ status, body }) => {
      expect(status).to.equal(400);
      expect(body).to.have.property('errors');
      expect(body.errors).to.be.an('array');
      expect(body.errors[0].msg).to.be.equal('Email inválido');
      expect(body.errors[1].msg).to.be.equal('Senha é obrigatória');

    });
  });
});
