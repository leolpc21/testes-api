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
