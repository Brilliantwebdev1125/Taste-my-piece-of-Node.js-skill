import { Test, TestingModule } from "@nestjs/testing";
import { mockedServiceProviders } from "../../../utils/mocks/client-proxy";
import { AdaptyService } from "../adapty.service";
import { HttpService } from "@nestjs/common";
import { HttpServiceMock } from "./mocks/http.service.mock";
import { ConfigService } from "@nestjs/config";

describe('AdaptyService', () => {
  let adaptyService: AdaptyService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        AdaptyService,
        {
          provide: HttpService,
          useValue: HttpServiceMock
        },
        ...mockedServiceProviders
      ],
    }).compile();

    adaptyService = module.get<AdaptyService>(AdaptyService);
  });

  let httpServiceGetResponse = {
    status: 200,
      "app_id": "140c30fb-9c93-4fbc-b3e2-04479cd7926a",
        "profile_id": "ca8aca06-ecc8-4604-878c-3568bd55521b",
        "customer_user_id": "614c6a8588a0e50011b4085a",
        "paid_access_levels": {
        "premium": {
          "id": "premium",
            "is_active": false,
            "is_lifetime": false,
            "expires_at": "2021-09-23T13:26:58.000000+0000",
            "starts_at": null,
            "will_renew": true,
            "vendor_product_id": "annual_subscription",
            "store": "app_store",
            "activated_at": "2021-09-20T07:47:57.000000+0000",
            "renewed_at": "2021-09-23T12:26:58.000000+0000",
            "unsubscribed_at": null,
            "billing_issue_detected_at": null,
            "is_in_grace_period": false,
            "active_introductory_offer_type": null,
            "active_promotional_offer_type": null,
            "active_promotional_offer_id": null,
            "cancellation_reason": null,
            "is_refund": false
        }
      },
      "subscriptions": {
        "monthly_subscription": {
          "is_active": false,
            "is_lifetime": false,
            "expires_at": "2021-09-23T12:46:11.000000+0000",
            "starts_at": null,
            "will_renew": false,
            "vendor_product_id": "monthly_subscription",
            "vendor_transaction_id": "1000000882439007",
            "vendor_original_transaction_id": "1000000880466162",
            "store": "app_store",
            "activated_at": "2021-09-20T07:47:57.000000+0000",
            "renewed_at": "2021-09-23T12:41:11.000000+0000",
            "unsubscribed_at": "2021-09-23T12:46:11.000000+0000",
            "billing_issue_detected_at": "2021-09-23T12:46:11.000000+0000",
            "is_in_grace_period": false,
            "active_introductory_offer_type": null,
            "active_promotional_offer_type": null,
            "active_promotional_offer_id": null,
            "cancellation_reason": "voluntarily_cancelled",
            "is_sandbox": true,
            "is_refund": false
        },
        "annual_subscription": {
          "is_active": false,
            "is_lifetime": false,
            "expires_at": "2021-09-23T13:26:58.000000+0000",
            "starts_at": null,
            "will_renew": true,
            "vendor_product_id": "annual_subscription",
            "vendor_transaction_id": "1000000882430339",
            "vendor_original_transaction_id": "1000000880466162",
            "store": "app_store",
            "activated_at": "2021-09-20T07:47:57.000000+0000",
            "renewed_at": "2021-09-23T12:26:58.000000+0000",
            "unsubscribed_at": null,
            "billing_issue_detected_at": null,
            "is_in_grace_period": false,
            "active_introductory_offer_type": null,
            "active_promotional_offer_type": null,
            "active_promotional_offer_id": null,
            "cancellation_reason": null,
            "is_sandbox": true,
            "is_refund": false
        }
      },
      "non_subscriptions": null,
        "promotional_offer_eligibility": true,
        "introductory_offer_eligibility": true,
        "custom_attributes": {}
      }


  describe('getProfile', () => {
    let getMock: jest.SpyInstance<any, any>;

    beforeEach(() => {
      getMock = jest.spyOn(HttpServiceMock, 'get').mockImplementation(() => ({
        pipe: jest.fn().mockImplementation(() => ({
          toPromise: jest.fn().mockResolvedValue(httpServiceGetResponse)
        }))
      }))
    });

    it('should return profile', async () => {
      const result = await adaptyService.getProfile("614c81bc8ce1af06b2900285");
      expect(result).toMatchObject(httpServiceGetResponse)
    });

    afterAll(() => {
      getMock.mockClear()
    })
  });

  describe('setAccessLevel', () => {
    let postMock: jest.SpyInstance<any, any>;

    beforeEach(() => {
      postMock = jest.spyOn(HttpServiceMock, 'post').mockImplementation(() => ({
        pipe: jest.fn().mockImplementation(() => ({
          toPromise: jest.fn().mockResolvedValue(httpServiceGetResponse)
        }))
      }))
    });

    it('should set access level', async () => {
      const result = await adaptyService.setAccessLevel("614c81bc8ce1af06b2900285", "premium", new Date());
      expect(result).toMatchObject(httpServiceGetResponse)
    });

    afterAll(() => {
      postMock.mockClear()
    })
  });

  describe('createProfile', () => {
    let postMock: jest.SpyInstance<any, any>;

    beforeEach(() => {
      postMock = jest.spyOn(HttpServiceMock, 'post').mockImplementation(() => ({
        pipe: jest.fn().mockImplementation(() => ({
          toPromise: jest.fn().mockResolvedValue(httpServiceGetResponse)
        }))
      }))
    });

    it('should create new adapty profile', async () => {
      const result = await adaptyService.createProfile("614c81bc8ce1af06b2900285");
      expect(result).toMatchObject(httpServiceGetResponse)
    });

    afterAll(() => {
      postMock.mockClear()
    })
  });
});