## 🛠️ Configurando o Ambiente de Desenvolvimento

Siga estas instruções para configurar o projeto em sua máquina local e começar a contribuir.

---

### 1. **Forkando o Repositório (Criando sua Cópia)**

Antes de tudo, você precisará criar uma "cópia" pessoal do repositório principal em sua própria conta do GitHub (ou plataforma similar). Isso é chamado de **fork**.

**Passos:**
1. Acesse o repositório original: [CLIQUE AQUI](https://github.com/leolpc21/testes-api.git)
2. No canto superior direito, clique em **Fork**.
3. Se solicitado, escolha sua conta para criar o fork.
4. Após alguns instantes, você será redirecionado para a página do seu fork (ex: `https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO`).

---

### 2. **Clonando o Repositório Forkado (Baixando para sua Máquina)**

Agora, baixe o código do seu fork para o seu computador.

**Passos:**
1. Na página do seu fork, clique em **&lt; > Code**.
2. Copie a URL HTTPS (ex: `https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git`).
3. Abra o terminal ou Git Bash.
4. Navegue até o diretório onde deseja salvar o projeto.
5. Execute:

```bash
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
```
> Substitua `SEU_USUARIO` e `NOME_DO_REPOSITORIO` pelos seus dados.

6. Acesse o diretório do projeto:

```bash
cd NOME_DO_REPOSITORIO
```

---

### 3. **Configurando o Repositório Remoto "Upstream"**

Para manter seu fork atualizado com o repositório original:

1. No terminal, dentro do diretório do projeto, adicione o repositório original como "upstream":

```bash
git remote add upstream [LINK_DO_REPOSITORIO_ORIGINAL_AQUI.git]
```
> Substitua `[LINK_DO_REPOSITORIO_ORIGINAL_AQUI.git]` pela URL HTTPS do repositório original.

2. Verifique se o remote foi adicionado corretamente:

```bash
git remote -v
```

Você verá algo como:

```
origin    https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git (fetch)
origin    https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git (push)
upstream  https://github.com/REPOSITORIO_ORIGINAL/NOME_DO_REPOSITORIO.git (fetch)
upstream  https://github.com/REPOSITORIO_ORIGINAL/NOME_DO_REPOSITORIO.git (push)
```

---

### 4. **Instalando as Dependências do Projeto**

Este projeto utiliza **Node.js** e **npm** (ou **Yarn**) para gerenciar dependências, incluindo o Cypress.

- **Instale o Node.js e npm:**  
  Baixe a versão LTS em [nodejs.org](https://nodejs.org/).

- **Instale as dependências:**  
  No diretório raiz do projeto (onde está o `package.json`), execute:

Usando npm:
```bash
npm install
```
Ou, se usar Yarn:
```bash
yarn install
```
---

### 🚦 **Próximos Passos**

Com o ambiente configurado, você está pronto para:

- Executar os testes de API com Cypress (veja a documentação do projeto).
- Criar novas branches (siga o padrão de nomenclatura abaixo).
- Começar a desenvolver e contribuir!

**Mantenha seu fork e sua branch main local atualizados:**

```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main
```
---

# Nomenclatura de Branches Git

## 📚 Padrão de Nomenclatura de Branches

> **Mantenha o repositório organizado!**  
> Siga o padrão abaixo para criar branches facilmente identificáveis.

---

### 🔤 **Formato Geral**

```
tipo/AnoMes/nome_da_branch
```

- **tipo**: Propósito da branch ([veja abaixo](#tipos-de-branches))
- **AnoMes**: Ano e mês (`YYYYMM`) — ex: `202505` para Maio/2025
- **nome_da_branch**: Descritivo, minúsculo, palavras separadas por `_`

**Exemplo:**  
`feature/202505/cadastro_de_usuarios`

---

## 🏷️ Tipos de Branches

| Tipo     | Descrição                                                                 | Exemplos                                       |
|----------|---------------------------------------------------------------------------|------------------------------------------------|
| `feature`| Novas funcionalidades ou grandes alterações                               | `feature/202505/login_com_oauth`               |
| `chore`  | Manutenção, refatoração, dependências, configs                            | `chore/202506/refatoracao_servico_autenticacao`|
| `docs`   | Alterações na documentação                                                | `docs/202506/documentacao_endpoint_usuarios`   |

---

## 🚀 Como Criar uma Nova Branch

1. **Atualize a branch main:**
  ```bash
  git checkout main
  git pull origin main
  ```

2. **Crie sua branch seguindo o padrão:**
  ```bash
  git checkout -b tipo/AnoMes/nome_da_branch
  ```
  - Substitua:
    - `tipo`: feature, chore, docs, etc.
    - `AnoMes`: Ex: 202505
    - `nome_da_branch`: Ex: autenticacao_google

  **Exemplo prático:**
  ```bash
  git checkout -b feature/202505/autenticacao_google
  ```

3. **Publique sua branch no repositório remoto:**
  ```bash
  git push -u origin tipo/AnoMes/nome_da_branch
  ```
  **Exemplo:**
  ```bash
  git push -u origin feature/202505/autenticacao_google
  ```

---

> **Dica:**  
> Use sempre nomes claros e siga o padrão para facilitar o trabalho em equipe e o versionamento!

---
