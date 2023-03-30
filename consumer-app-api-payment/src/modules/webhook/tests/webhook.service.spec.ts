import { WebhookService } from "../webhook.service";
import { Test, TestingModule } from "@nestjs/testing";
import {
  MockedMailServiceClientProxy,
  mockedServiceProviders,
  MockedUserServiceClientProxy,
} from '../../../utils/mocks/client-proxy';
import { SubscriptionService } from "../../subscription/subscription.service";
import { SubscriptionServiceMock } from "../../subscription/tests/mocks/subscription.service.mock";
import { HttpService } from "@nestjs/common";
import { HttpServiceMock } from "./mocks/http.service.mock";
import { ConfigService } from "@nestjs/config";

describe('WebhookService', () => {
  let subscriptionService: WebhookService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WebhookService,
        ConfigService,
        {
          provide: SubscriptionService,
          useValue: SubscriptionServiceMock
        },
        {
          provide: HttpService,
          useValue: HttpServiceMock
        },
        ...mockedServiceProviders
      ],
    }).compile();

    subscriptionService = module.get<WebhookService>(WebhookService);
  });

  const webhookEvent = {
    profile_id: "772204ce-ebf6-4ed9-82b0-d8688ab62b01",
    customer_user_id: "616039830396be17b04413f1",
    event_type: "non_subscription_purchase",
    event_datetime: new Date('1995-12-17T03:24:00'),
    event_properties: {
      vendor_product_id: "772204ce-ebf6-4ed9-82b0-d8688ab62b01"
    },
    event_api_version: 1
  }
  describe('subscription_initial_purchase', () => {
    let createSpy: jest.SpyInstance;
    let sendMock;
    let createSubscriptionMock: jest.SpyInstance<any, any>;


    beforeEach(() => {
      sendMock = jest.spyOn(MockedUserServiceClientProxy, 'send').mockImplementation(() => ({
        toPromise: jest.fn().mockResolvedValue({})
      }));

      createSubscriptionMock = jest.spyOn(SubscriptionServiceMock, 'createSubscription')
    });

    it('should execute send and activateAndroidOfferCode methods', async () => {
      await subscriptionService.subscription_initial_purchase(webhookEvent);
      expect(sendMock).toBeCalled()
    });

    afterAll(() => {
      createSpy.mockClear()
      createSubscriptionMock.mockClear()
    })
  });

  describe('subscription_cancelled', () => {
    let createSpy: jest.SpyInstance;
    let sendMock;
    let updateSubscriptionMock: jest.SpyInstance<any, any>;



    beforeAll(() => {
      sendMock = jest.spyOn(MockedUserServiceClientProxy, 'send').mockImplementation(() => ({
        toPromise: jest.fn().mockResolvedValue({})
      }));
      updateSubscriptionMock = jest.spyOn(SubscriptionServiceMock, 'updateSubscription')

    });

    it('should execute send', async () => {
      await subscriptionService.subscription_cancelled(webhookEvent);
      expect(sendMock).toHaveBeenCalled()

    });

    afterAll(() => {
      createSpy.mockClear()
      updateSubscriptionMock.mockClear()
    })
  })

  describe('subscription_renewed', () => {
    let createSpy: jest.SpyInstance;
    let sendMock;
    let updateSubscriptionMock: jest.SpyInstance<any, any>;


    beforeAll(() => {
      sendMock = jest.spyOn(MockedUserServiceClientProxy, 'send').mockImplementation(() => ({
        toPromise: jest.fn().mockResolvedValue({})
      }));
      updateSubscriptionMock = jest.spyOn(SubscriptionServiceMock, 'updateSubscription')
    });

    it('should execute send', async () => {
      await subscriptionService.subscription_renewed(webhookEvent);
      expect(sendMock).toHaveBeenCalled()
    });

    afterAll(() => {
      createSpy.mockClear()
      updateSubscriptionMock.mockClear()
    })
  })

  describe('trial_started', () => {
    let createSpy: jest.SpyInstance;
    let sendMock;
    let updateSubscriptionMock: jest.SpyInstance<any, any>;


    beforeAll(() => {
      sendMock = jest.spyOn(MockedUserServiceClientProxy, 'send').mockImplementation(() => ({
        toPromise: jest.fn().mockResolvedValue({})
      }));
      updateSubscriptionMock = jest.spyOn(SubscriptionServiceMock, 'updateSubscription')
    });


    it('should execute send', async () => {
      await subscriptionService.trial_started(webhookEvent);
      expect(sendMock).toHaveBeenCalled()
    });

    afterAll(() => {
      createSpy.mockClear()
      updateSubscriptionMock.mockClear()
    })
  })

  describe('trial_cancelled', () => {
    let createSpy: jest.SpyInstance;
    let sendMock, mailMock;
    let updateSubscriptionMock: jest.SpyInstance<any, any>;

    beforeAll(() => {
      sendMock = jest.spyOn(MockedUserServiceClientProxy, 'send').mockImplementation(() => ({
        toPromise: jest.fn().mockResolvedValue({})
      }));
      mailMock = jest.spyOn(MockedMailServiceClientProxy, 'send').mockImplementation(() => ({
        toPromise: jest.fn().mockResolvedValue({})
      }));
      updateSubscriptionMock = jest.spyOn(SubscriptionServiceMock, 'updateSubscription')
    });

    it('should execute send', async () => {
      await subscriptionService.trial_cancelled(webhookEvent);
      expect(sendMock).toHaveBeenCalled()
      expect(mailMock).toHaveBeenCalled()
    });

    afterAll(() => {
      createSpy.mockClear()
    })
  })

  describe('subscription_refunded', () => {
    let createSpy: jest.SpyInstance;
    let sendMock;
    let updateSubscriptionMock: jest.SpyInstance<any, any>;

    beforeAll(() => {
      sendMock = jest.spyOn(MockedUserServiceClientProxy, 'send').mockImplementation(() => ({
        toPromise: jest.fn().mockResolvedValue({})
      }));
      updateSubscriptionMock = jest.spyOn(SubscriptionServiceMock, 'updateSubscription')
    });

    it('should execute send', async () => {
      await subscriptionService.subscription_refunded(webhookEvent);
      expect(sendMock).toHaveBeenCalled()
    });

    afterAll(() => {
      createSpy.mockClear()
    })
  })

  describe('redirectOnStage', () => {
    let createSpy: jest.SpyInstance;
    let postMock: jest.SpyInstance<any, any>;

    beforeAll(() => {
      postMock = jest.spyOn(HttpServiceMock, 'post').mockImplementation(() => ({
        toPromise: jest.fn().mockResolvedValue({})
      }));
    });

    it('should execute post', async () => {
      await subscriptionService.redirectOnStage(webhookEvent);
      expect(postMock).toHaveBeenCalled()
    });

    afterAll(() => {
      createSpy.mockClear()
    })
  })

})
