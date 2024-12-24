<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Conceitos NestJS

Este repositório explora conceitos fundamentais do framework **NestJS**, oferecendo exemplos claros e organizados de boas práticas de desenvolvimento.

---

## 📋 Funcionalidades

- Demonstração da estrutura modular do **NestJS**.
- Exemplos de módulos, serviços, controladores e DTOs.
- Modularização prática com os seguintes componentes:
  - **Pessoa**: Gestão de informações relacionadas a pessoas.
  - **Recados**: Gerenciamento de recados ou mensagens.
  - **Conceitos Automáticos** e **Conceitos Manuais**: Exemplos de abstração e organização.

---

## 🛠️ Tecnologias Utilizadas

- **NestJS**: Framework para construção de aplicações Node.js escaláveis.
- **TypeScript**: Linguagem com tipagem estática para maior confiabilidade.
- **Docker**: Ambiente de containerização para desenvolvimento isolado.
- **Jest**: Framework de testes para validação de funcionalidade e integração.

---

## 📂 Estrutura do Projeto

```plaintext
src/
├── conceitos-automaticos/       # Módulo: Conceitos Automáticos
├── conceitos-manual/            # Módulo: Conceitos Manuais
├── pessoa/                      # Módulo: Pessoa
│   ├── pessoa.controller.ts     # Controlador do módulo "Pessoa"
│   ├── pessoa.module.ts         # Declaração do módulo "Pessoa"
│   ├── pessoa.service.ts        # Serviço do módulo "Pessoa"
│   └── dto/                     # DTOs do módulo "Pessoa"
├── recados/                     # Módulo: Recados
│   ├── recados.controller.ts    # Controlador do módulo "Recados"
│   ├── recados.module.ts        # Declaração do módulo "Recados"
│   ├── recados.service.ts       # Serviço do módulo "Recados"
│   └── dto/                     # DTOs do módulo "Recados"
├── app.controller.ts            # Controlador principal
├── app.module.ts                # Módulo principal
├── app.service.ts               # Serviço principal
└── main.ts                      # Ponto de entrada da aplicação

test/                            # Testes unitários e de integração
```

---

## 📦 Como Executar o Projeto

### 1. Clone o Repositório

```bash
git clone https://github.com/Belriax/conceitos_nest.git
cd conceitos_nest
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` com as configurações necessárias (porta, banco de dados, etc.).

### 4. Execute o Projeto

Modo desenvolvimento:

```bash
npm run start:dev
```

Modo produção:

```bash
npm run start:prod
```

---

## 🧪 Testes

### Rodar os Testes Unitários

```bash
npm run test
```

### Rodar os Testes de Cobertura

```bash
npm run test:cov
```

---

## 🐳 Docker

### Executar a Aplicação com Docker

Subir os containers:

```bash
docker-compose up -d
```

Encerrar os containers:

```bash
docker-compose down
```

---

## 🔑 Endpoints

### Exemplos

#### Módulo Pessoa

- **Listar todas as pessoas**
  - `GET /pessoa`
- **Criar uma nova pessoa**
  - `POST /pessoa`

#### Módulo Recados

- **Listar todos os recados**
  - `GET /recados`
- **Criar um novo recado**
  - `POST /recados`

---

## 📞 Contato

- **Autor**: Gleicon Sousa dos Santos
- **E-mail**: [gleiconsousa@gmail.com](mailto:gleiconsousa@gmail.com)
- **GitHub**: [Belriax](https://github.com/Belriax)

---

Este repositório foi projetado para auxiliar desenvolvedores a compreenderem conceitos básicos e avançados do NestJS.
