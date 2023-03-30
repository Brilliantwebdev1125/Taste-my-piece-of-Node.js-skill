import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';

type ServiceOptions = {
  key: string;
  queue: string;
};

const createServiceProvider = (serviceOptions: ServiceOptions): Provider => ({
  provide: serviceOptions.key,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [`${configService.get('RABBITMQ_URL')}`],
        queue: serviceOptions.queue,
        queueOptions: {
          durable: true,
        },
      },
    });
  },
});

const createServiceProviders = (
  servicesOptions: Array<ServiceOptions>,
): Array<Provider> => {
  return servicesOptions.map((serviceOptions) =>
    createServiceProvider(serviceOptions),
  );
};

export { createServiceProvider, createServiceProviders };
