# Consumer App - Partial Codebase Overview

<a href="https://www.loom.com/share/7f8d3066d175477bbf63eca7e6ca396c">Please check this introduction loom video.</a>

Consumer app api is a part of a large platform that supports requests from web, mobile, and third-party services. 
The whole platform consists of 21 microservices, each with its own logical responsibility, and they are designed to scale independently. 
The architecture, code structure, and practices of each microservice are consistent, 
which helps with maintainability and development. The entire ecosystem is hosted on AWS and orchestrated by Kubernetes, 
with Docker used for containerization and CircleCI for continuous integration and delivery. 
Overall, the platform is robust and flexible, with a focus on scalability, reliability, and security.

# Microservices Description 
**consumer-app-api-mail**

The *consumer-app-api-mail* microservice is designed to handle various types of emails that a platform might need to send to its customers, 
such as account activation emails, password reset emails, newsletter subscriptions, transactional emails, and more. 
It also support customization of email templates to fit the platform's branding and messaging. 
Dynamic data could include information such as the customer's name, order details, personalized recommendations etc.

To accomplish this, the microservice use an email service provider to handle the actual sending of emails.

**consumer-app-api-payment**

The *consumer-app-api-payment* microservice provides payment processing capabilities for a consumer-facing application. 
This microservice is responsible for managing all aspects of payment processing related to gift codes, gift cards, offer codes, and subscriptions.

Gift codes and cards are a way for consumers to redeem a pre-paid amount for goods or services. The microservice handle the validation of the codes, 
as well as the deduction of the corresponding amount from the consumer's account.

Offer codes are used to provide discounts or special offers to consumers. The microservice manage the 
validation and application of the offer codes at the time of payment.

Subscriptions are a way for consumers to pay for access to a service or product over a period of time. The microservice 
manage the recurring billing for the subscriptions and handle any issues related to payment processing.

## Main Technologies Set

- [Node.js](https://nodejs.org/en/)
- [Nest.js](https://nestjs.com/)
- [Typescript](https://www.typescriptlang.org/)
- [MongoDB](https://www.mongodb.com)
- [RabbitMQ](https://www.rabbitmq.com)
- [CircleCI](https://circleci.com)
- [Docker](https://www.docker.com)
- [Kubernetes](https://kubernetes.io)
