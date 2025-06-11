const { faker } = require('@faker-js/faker');
const env = Cypress.env();

class RandomDataGenerator {
  static getUserToLogin(login_type) {
    switch (login_type) {
    case 'valid':
      return {
        'email': env.AUTH_USER_KEY,
        'senha': env.AUTH_USER_SECRET,
      };
    case 'empty':
      return {
        'email': '',
        'senha': ''
      };
    case 'invalid':
      return {
        'email': faker.internet.email(),
        'senha': faker.internet.password()
      };
    case 'required': return {};
    }
  }

  static getRandomUser() {
    const fullName = faker.person.fullName();
    const userName = faker.internet.username({ firstName: fullName });
    const user = {
      nomeCompleto: fullName,
      nomeUsuario: userName,
      email: `${userName}@email.com`,
      senha: '1234Qwer',
    };
    return { user };
  }

  static generateTimestamp() {
    const now = new Date();
    return now.toISOString().slice(0, 10);
  }
}

module.exports = {
  RandomDataGenerator
};