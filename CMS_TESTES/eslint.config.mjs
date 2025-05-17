import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import pluginCypress from 'eslint-plugin-cypress/flat';

export default defineConfig([pluginCypress.configs.recommended, globalIgnores(['cypress/screenshots/*', 'cypress/videos/*']), {
  plugins: {
    cypress: pluginCypress
  },
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.commonjs,
      ...globals.node,
      ...globals.es2021
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'indent': ['error', 2], // Enforce indentação de 2 espaços
    'linebreak-style': ['error', 'unix'], // Usa quebras de linha no estilo Unix (\n)
    'quotes': ['error', 'single'], // Usa aspas simples para strings
    'semi': ['error', 'always'], // Exige ponto e vírgula no final das instruções
    'no-trailing-spaces': ['error'], // Proíbe espaços em branco no final das linhas
    'no-multiple-empty-lines': [ // Limita linhas em branco consecutivas
      'error',
      {
        'max': 1, // Máximo de 1 linha em branco consecutiva
        'maxEOF': 0, // Nenhuma linha em branco no final do arquivo
        'maxBOF': 0 // Nenhuma linha em branco no início do arquivo
      }
    ],
    'no-unused-vars': [ // Proíbe variáveis e argumentos de função não utilizados
      'error',
      {
        'vars': 'all', // Verifica todas as variáveis
        'args': 'all', // Verifica todos os argumentos de função
        'ignoreRestSiblings': false // Não ignora variáveis não usadas em desestruturação com rest
      }
    ],
    'no-console': 'warn', // Emite aviso ao usar console.log (evita em produção)
    'prefer-const': 'error', // Sugere uso de const quando a variável não é reatribuída
    'no-var': 'error' // Proíbe o uso de var, preferindo let ou const
  }
}, {
  files: ['**/*.js'],
}]);