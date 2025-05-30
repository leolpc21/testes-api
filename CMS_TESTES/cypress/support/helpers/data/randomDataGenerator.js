import { faker } from '@faker-js/faker';
const env = Cypress.env();

class RandomDataGenerator {
  static getUserToLogin(login_type) {
    switch (login_type) {
    case 'valid':
      return {
        'email':env.AUTH_USER_KEY,
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
}

export default RandomDataGenerator;