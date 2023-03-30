import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { RpcValidationFilter } from "./filters/rpc-validation.filter";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const config = app.get(ConfigService);

  const microservice = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [`${config.get('RABBITMQ_URL')}`],
        queue: 'payment',
        queueOptions: {
          durable: true,
        },
      },
    },
  );
  microservice.useGlobalFilters(new RpcValidationFilter());
  microservice.listen(() => console.log('Microservice is listening'));
}

bootstrap();
