import { Test, TestingModule } from "@nestjs/testing";
import {
  MockedMailServiceClientProxy,
  mockedServiceProviders,
} from "../../../utils/mocks/client-proxy";
import { GiftCodeService } from "../gift-code.service";
import { GiftCodeRepository } from "../gift-code.repository";
import { GiftCodeRepositoryMock } from "./mocks/gift-code.repository.mock";
import { AdaptyServiceMock } from "./mocks/adapty.service.mock";
import { GiftCodeTemplateService } from "../../giftcodetemplate/gift-code-template.service";
import { GiftCodeTemplateServiceMock } from "../../giftcodetemplate/tests/mocks/gift-code-template.service.mock";
import { OfferCodeRepository } from "../../offercode/offercode.repository";
import { OfferCodeRepositoryMock } from "../../offercode/tests/mocks/offercode.repository.mock";
import {
  activeGiftCode,
  bulkCreateCodesMock,
  giftCode,
  inactiveTemplateMock,
  templateMock,
  user
} from "./models/gift-code.mock";
import { AdaptyService } from "../../adapty/adapty.service";
import { SubscriptionService } from "../../subscription/subscription.service";
import { SubscriptionServiceMock } from "../../subscription/tests/mocks/subscription.service.mock";
import { of } from 'rxjs';
import { Util } from "../../../utils/util";
import { ConfigService } from "@nestjs/config";

describe('GiftCodeService', () => {
  let giftCodeService: GiftCodeService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfigService,
        GiftCodeService,
        {
          provide: GiftCodeRepository,
          useValue: GiftCodeRepositoryMock
        },
        {
          provide: AdaptyService,
          useValue: AdaptyServiceMock
        },
        {
          provide: GiftCodeTemplateService,
          useValue: GiftCodeTemplateServiceMock
        },
        {
          provide: SubscriptionService,
          useValue: SubscriptionServiceMock
        },
        {
          provide: OfferCodeRepository,
          useValue: OfferCodeRepositoryMock
        },
        ...mockedServiceProviders
      ],
    }).compile();

    giftCodeService = module.get<GiftCodeService>(GiftCodeService);
  });

  describe('validateGiftCode', () => {
    let getGiftCode: jest.SpyInstance<any, any>;

    describe('gift code should be active', () => {
      beforeEach(() => {
        getGiftCode = jest.spyOn(GiftCodeRepositoryMock, 'getByCode').mockResolvedValue(activeGiftCode)
      });

      it('should return code', async () => {
        const result = await giftCodeService.validateGiftCode("614c81bc8ce1af06b2900285");
        expect(result).toMatchObject(activeGiftCode)
      });

      afterAll(() => {
        getGiftCode.mockClear()
      })
    });

    describe('gift code shouldn\'t be active', () => {
      beforeEach(() => {
        getGiftCode = jest.spyOn(GiftCodeRepositoryMock, 'getByCode').mockResolvedValue(null)
      });

      it('should return null', async () => {
        const result = await giftCodeService.validateGiftCode("614c81bc8ce1af06b2900285");
        expect(result).toEqual(null)
      });

      afterAll(() => {
        getGiftCode.mockClear()
      })
    });
  });

  describe('activateGiftCode', () => {
    let getByCodeMock: jest.SpyInstance;
    let getMock: jest.SpyInstance;
    let setAccessLevelMock: jest.SpyInstance<any, any>;
    let updateMock: jest.SpyInstance<any, any>;
    let editProfileMock: jest.SpyInstance<any, any>;

    beforeEach(() => {
      getByCodeMock = jest.spyOn(GiftCodeRepositoryMock, 'getByCode').mockResolvedValue(giftCode);
      getMock = jest.spyOn(GiftCodeTemplateServiceMock, 'get').mockResolvedValue(templateMock);
      setAccessLevelMock = jest.spyOn(AdaptyServiceMock, 'setAccessLevel').mockResolvedValue(user);
      updateMock = jest.spyOn(GiftCodeRepositoryMock, 'update').mockResolvedValue(giftCode);
      editProfileMock = jest.spyOn(AdaptyServiceMock, 'editProfile').mockResolvedValue({ });

    });

    it('should redeem code', async () => {
      const result = await giftCodeService.redeemCode("614c81bc8ce1af06b2900285", "month_subscription");
      expect(result).toMatchObject(giftCode)
    });

    afterAll(() => {
      getByCodeMock.mockClear()
      getMock.mockClear()
      setAccessLevelMock.mockClear()
      updateMock.mockClear()
    })
  });

  describe('bulkGiftCodeGeneration', () => {
    let getTemplateMock: jest.SpyInstance;
    let getInactiveTemplateMock: jest.SpyInstance;
    let genCodeMock: jest.SpyInstance;
    let sendEmailMock: jest.SpyInstance<any, any>;
    let saveCodeMock: jest.SpyInstance<any, any>;

    beforeEach(() => {
      genCodeMock = jest.spyOn(Util, 'generateCodeString')
        .mockReturnValueOnce("D683KF")
        .mockReturnValueOnce("H7RPA3");
      sendEmailMock = jest.spyOn(MockedMailServiceClientProxy, 'send').mockReturnValue(of(true));
      saveCodeMock = jest.spyOn(GiftCodeRepositoryMock, 'save').mockResolvedValue(true);
    });

    it('should generate gift codes', async () => {
      getTemplateMock = jest.spyOn(GiftCodeTemplateServiceMock, 'get').mockResolvedValueOnce(templateMock);
      const result = await giftCodeService.bulkCreate(
        ["test1@gmail.com", "test2@gmail.com"],
        "test",
        "614a1823c171720047064191"
      );
      expect(result).toMatchObject(bulkCreateCodesMock)
    });

    it('should throw exception', async () => {
      getInactiveTemplateMock = jest.spyOn(GiftCodeTemplateServiceMock, 'get').mockResolvedValueOnce(inactiveTemplateMock);
      await expect(async () => {
        await giftCodeService.bulkCreate(
          ["test1@gmail.com", "test2@gmail.com"],
          "test",
          "614a1823c171720047064191"
        )
      }).rejects.toThrow()
    });

    afterAll(() => {
      sendEmailMock.mockClear()
      saveCodeMock.mockClear()
    })
  });
});
