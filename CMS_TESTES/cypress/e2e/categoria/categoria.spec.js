import RandomDataGenerator from '../../support/helpers/data/randomDataGenerator.js';

describe('Categoria', () => {

  describe('GET categoria', () => {

    let categoryId;
    let categoryName;

    before(() => {
      cy.createCategory('valid').as('createCategory');

      cy.get('@createCategory').then(({ status, body }) => {
        expect(status).to.equal(201);
        expect(body).to.have.property('id');
        categoryId = body.id;
        categoryName = body.nome;
      });;
    });

    it('nao deve listar categorias quando ID inexistente', () => {
      const nonExistentCategoryId = RandomDataGenerator.getUUID();
      cy.getCategoryById(nonExistentCategoryId).as('getCategoryByIdInvalid');

      cy.get('@getCategoryByIdInvalid').then(({ status, body }) => {
        expect(status).to.equal(404);
        expect(body).to.be.an('object');
        expect(body).to.have.property('erro', 'Categoria não encontrada');
      });
    });

    it('deve listar todas as categorias', () => {
      cy.getAllCategory().as('allCategories');

      cy.get('@allCategories').then(({ status, body }) => {
        expect(status).to.equal(200);
        expect(body).to.be.an('array');
      });
    });

    it('deve listar categorias por ID', () => {
      cy.getCategoryById(categoryId).as('getCategoryById');

      cy.get('@getCategoryById').then(({ status, body }) => {
        expect(status).to.equal(200);
        expect(body).to.be.an('object');
        expect(body).to.have.property('nome');
        expect(body).to.have.property('descricao');
        expect(body).to.have.property('id');
        expect(body).to.have.property('dataCriacao');
      });

    });

    it('deve listar categorias por param "nome"', () => {
      cy.getCategoryByParam({ nome: categoryName}).as('getCategoryByParam');

      cy.get('@getCategoryByParam').then(({ status, body }) => {
        expect(status).to.equal(200);
        expect(body).to.be.an('array');
      });

    });
  });
  describe('POST categoria', () => {
    it('nao deve criar uma categoria quando atributo nome inexistente', () => {
      cy.createCategory('required').as('CategoryRequired');

      cy.get('@CategoryRequired').then(({ status, body }) => {
        expect(status).to.equal(400);
        expect(body).to.have.property('errors');
        expect(body.errors).to.be.an('array');
        expect(body.errors[0]).to.have.property('msg', 'Nome é obrigatório');
      });
    });

    it('nao deve criar uma categoria quando nome e descricao vazio', () => {
      cy.createCategory('empty').as('CategoryEmpty');

      cy.get('@CategoryEmpty').then(({ status, body }) => {
        expect(status).to.equal(400);
        expect(body).to.have.property('errors');
        expect(body.errors).to.be.an('array');
        expect(body.errors[0]).to.have.property('msg', 'Nome é obrigatório');
      });
    });

    it('nao deve criar uma categoria quando nome duplicado', () => {
      cy.createCategory('duplicate').as('createCategory');
      cy.createCategory('duplicate').as('createCategoryDuplicate');

      cy.get('@createCategoryDuplicate').then(({ status, body }) => {
        expect(status).to.equal(400);
        expect(body).to.have.property('erro', 'Nome de categoria já existe');
      });
    });

    it('deve criar uma categoria', () => {
      cy.createCategory('valid').as('createCategory');

      cy.get('@createCategory').then(({ status, body }) => {
        expect(status).to.equal(201);
        expect(body).to.have.property('nome');
        expect(body).to.have.property('descricao');
        expect(body).to.have.property('id');
        expect(body).to.have.property('dataCriacao');
      });
    });
  });

  describe('PUT categoria', () => {

    let categoryId;

    before(() => {
      cy.createCategory('valid').as('createCategory');

      cy.get('@createCategory').then(({ status, body }) => {
        expect(status).to.equal(201);
        expect(body).to.have.property('id');
        categoryId = body.id;
      });;
    });

    it('nao deve atualizar uma categoria quando id inexistente', () => {
      const nonExistentCategoryId = RandomDataGenerator.getUUID();
      cy.updateCategory('valid', nonExistentCategoryId).as('updateCategory');
      cy.get('@updateCategory').then(({ status, body }) => {
        expect(status).to.equal(404);
        expect(body).to.have.property('erro', 'Categoria não encontrada');
      });
    });

    it('nao deve atualizar uma categoria quando nome inexistente', () => {
      cy.createCategory('duplicate').as('createCategoryDuplicate');
      cy.updateCategory('duplicate', categoryId).as('updateCategoryDuplicate');

      cy.get('@updateCategoryDuplicate').then(({ status, body }) => {
        expect(status).to.equal(400);
        expect(body).to.have.property('erro', 'Nome de categoria já existe');
      });
    });

    it('nao deve atualizar uma categoria quando descricao vazia', () => {
      cy.updateCategory('empty', categoryId).as('updateCategoryEmpty');

      cy.get('@updateCategoryEmpty').then(({ status, body }) => {
        expect(status).to.equal(400);
        expect(body.errors[0]).to.have.property('msg', 'Descrição não pode ser vazia');
      });
    });

    it('deve atualizar uma categoria', () => {
      cy.updateCategory('valid', categoryId).as('updateCategory');
      cy.get('@updateCategory').then(({ status, body }) => {
        expect(status).to.equal(200);
        expect(body).to.have.property('nome');
        expect(body).to.have.property('descricao');
        expect(body).to.have.property('id');
        expect(body).to.have.property('dataCriacao');
      });
    });
  });

  describe('DELETE categoria', () => {

    let categoryId;

    before(() => {
      cy.createCategory('valid').as('createCategory');

      cy.get('@createCategory').then(({ status, body }) => {
        expect(status).to.equal(201);
        expect(body).to.have.property('id');
        categoryId = body.id;
      });;
    });

    it('nao deve excluir categoria quando id inexistente', () => {
      const nonExistentCategoryId = RandomDataGenerator.getUUID();
      cy.deleteCategory(nonExistentCategoryId).as('deleteCategory');

      cy.get('@deleteCategory').then(({ status, body }) => {
        expect(status).to.equal(404);
        expect(body).to.have.property('erro', 'Categoria não encontrada');
      });
    });

    it('deve excluir categoria', () => {
      cy.deleteCategory(categoryId).as('deleteCategory');

      cy.get('@deleteCategory').then(({ status, body }) => {
        expect(status).to.equal(204);
        expect(body).to.be.empty;
      });
    });

  });
});