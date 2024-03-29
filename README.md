# Gentem backend in GraphQL Express

[![Continuos integration](https://github.com/GentemProject/backend/actions/workflows/ci.yml/badge.svg)](https://github.com/GentemProject/backend/actions/workflows/ci.yml)
[![Continuos deployment (Development)](https://github.com/GentemProject/backend/actions/workflows/cd-dev.yml/badge.svg?branch=dev)](https://github.com/GentemProject/backend/actions/workflows/cd-dev.yml)
[![Continuos deployment (Production)](https://github.com/GentemProject/backend/actions/workflows/cd-prod.yml/badge.svg?branch=master)](https://github.com/GentemProject/backend/actions/workflows/cd-prod.yml)

Deployed in Amazon Web Services using lambda concept.

## Graphql Playground Environments

Production Playground(Inactive for obvius reasons): [https://api-prod.gentem.org/graphql](https://api-prod.gentem.org/graphql)<br />
Development Playground: [https://api-dev.gentem.org/graphql](https://api-dev.gentem.org/graphql)

## Healthy Environments

Production Enviroment: [https://api-prod.gentem.org/health](https://api-prod.gentem.org/health)<br />
Development Enviroment: [https://api-dev.gentem.org/health](https://api-dev.gentem.org/health)

## Tech used

This project uses:<br />
[Typescript](https://www.typescriptlang.org/): TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.<br />
[Express Js](https://www.express.com/): Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.<br />
[GraphQL](https://graphql.org/): GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data.<br />
[Apollo-Server](https://www.apollographql.com/docs/apollo-server/): Apollo Server is an open-source, spec-compliant GraphQL server that's compatible with any GraphQL client, including Apollo Client.
[Mongoose](https://mongoosejs.com/): Let's face it, writing MongoDB validation, casting and business logic boilerplate is a drag. That's why we wrote Mongoose.
[Pino](https://github.com/pinojs/pino): Very low overhead Node.js logger.

## Available Scripts

In the project, you can run:

### `yarn dev`

You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.<br />

The build is minified and the filenames include the hashes.<br />

## Available Endpoints

## Directory layout

```
.
├── build/                  <-- Packaged app
├── src/                    <-- Application components and source code
     ├── config/            <-- Configs for the project
     ├── graphql/           <-- GraphQL and Apollo Files
     ├── middlewares/       <-- Middlewares
     ├── services/          <-- All GraphQL Services
     ├── utils/             <-- Utils folder
```
