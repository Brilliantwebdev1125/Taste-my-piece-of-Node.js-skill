# Consumer Application Payment Service

This is a repository for payment microservice.

**NOTE: To start service in development mode, please use [meta]("private repository") repository. If you want to start this service independently, please use following steps.**

## Technologies used

- [Node.js](https://nodejs.org/en/)
- [Nest.js](https://nestjs.com/)
- [Typescript](https://www.typescriptlang.org/)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js [Node.js](https://nodejs.org/en/)

## Install dependencies

To install all dependencies:

```
npm install
```

## Start service

To start service, use:

```
npm run start
```

To start service in development mode, use:

```
npm run start:dev
```

To start service in debug mode, use:

```
npm run start:debug
```

## Testing

This servide uses [jest](https://jestjs.io/en/) to run tests.

To run unit/integration tests, use:

```
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

To run unit/integration coverage, use:

```
npm run test:cov
```

To reinstall packages in the container, use:
```
docker-compose -f docker-compose.test.yml up --build -V --no-start 
```
