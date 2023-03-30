import { WebhookController } from "../webhook.controller";
import { Connection } from "mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { OfferCodeModule } from "../../offercode/offercode.module";
import { WebhookService } from "../webhook.service";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { mockedServiceProviders, MockedUserServiceClientProxy } from "../../../utils/mocks/client-proxy";
import { SubscriptionModule } from "../../subscription/subscription.module";
import { HttpModule, HttpService } from "@nestjs/common";
import { HttpServiceMock } from "./mocks/http.service.mock";

describe('WebhookController', () => {
  let controller: WebhookController;
  let connection: Connection;
  let service: WebhookService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        HttpModule,
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('DB_URI'),
          }),
          inject: [ConfigService],
        }),
        OfferCodeModule,
        SubscriptionModule
      ],
      controllers: [WebhookController],
      providers: [
        {
          provide: HttpService,
          useValue: HttpServiceMock
        },
        WebhookService,
        ...mockedServiceProviders],
    }).compile();

    controller = module.get<WebhookController>(WebhookController);
    service = module.get<WebhookService>(WebhookService);
    connection = await module.get(getConnectionToken());
  });

  afterAll(async () => {
    await connection.close();
  });

  afterEach(async () => {
    await connection.dropDatabase();
    jest.clearAllMocks();
  });

  const webhookEvent = {
    profile_id: "772204ce-ebf6-4ed9-82b0-d8688ab62b01",
    customer_user_id: "616039830396be17b04413f1",
    event_type: "subscription_initial_purchase",
    event_datetime: new Date('1995-12-17T03:24:00'),
    event_properties: {
      environment: "Production",
      vendor_product_id: "772204ce-ebf6-4ed9-82b0-d8688ab62b01"
    },
    event_api_version: 1
  }

  const webhookEventSandbox = {
    profile_id: "772204ce-ebf6-4ed9-82b0-d8688ab62b01",
    customer_user_id: "616039830396be17b04413f1",
    event_type: "subscription_initial_purchase",
    event_datetime: new Date('1995-12-17T03:24:00'),
    event_properties: {
      environment: "Sandbox",
      vendor_product_id: "772204ce-ebf6-4ed9-82b0-d8688ab62b01"
    },
    event_api_version: 1
  }

  describe('React to webhook', () => {
    let sendMock;
    let redirectMock: jest.SpyInstance<any, any>;

    beforeEach(() => {
      sendMock = jest.spyOn(MockedUserServiceClientProxy, 'send').mockImplementation(() => ({
        toPromise: jest.fn().mockResolvedValue({})
      }));
      redirectMock = jest.spyOn(HttpServiceMock, 'post').mockImplementation(() => ({
        toPromise: jest.fn().mockResolvedValue({})
      }));
      process.env = Object.assign(process.env, { NODE_ENV: 'production' });

    });

    it('should non_subscription_purchase be invoked', async () => {
      await controller.processWebhook(webhookEvent);
      expect(sendMock).toBeCalled()
    });

    webhookEvent.event_type = 'subscription_cancelled';

    it('should subscription_cancelled be invoked', async () => {
      await controller.processWebhook(webhookEvent);
      expect(sendMock).toBeCalled()
    });

    webhookEvent.event_type = 'subscription_renewed';

    it('should subscription_renewed be invoked', async () => {
      await controller.processWebhook(webhookEvent);
      expect(sendMock).toBeCalled()
    });

    webhookEvent.event_type = 'trial_started';

    it('should trial_started be invoked', async () => {
      await controller.processWebhook(webhookEvent);
      expect(sendMock).toBeCalled()
    });

    webhookEvent.event_type = 'trial_cancelled';

    it('should trial_cancelled be invoked', async () => {
      await controller.processWebhook(webhookEvent);
      expect(sendMock).toBeCalled()
    });

    webhookEvent.event_type = 'subscription_refunded';

    it('should subscription_refunded be invoked', async () => {
      await controller.processWebhook(webhookEvent);
      expect(sendMock).toBeCalled()
    });

    it('should redirect to sandbox', async () => {
      await controller.processWebhook(webhookEventSandbox);
      expect(redirectMock).toBeCalled()
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});