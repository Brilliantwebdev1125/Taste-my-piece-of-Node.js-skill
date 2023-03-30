import { GiftCodeTemplateService } from "../gift-code-template.service";
import { Test, TestingModule } from "@nestjs/testing";
import { GiftCodeTemplateRepository } from "../gift-code-template.repository";
import { GiftCodeTemplateRepositoryMock } from "./mocks/gift-code-template.repository.mock";
import { mockedServiceProviders } from "../../../utils/mocks/client-proxy";

describe('GiftCodeTemplateService', () => {
  let giftCodeTemplateService: GiftCodeTemplateService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GiftCodeTemplateService,
        {
          provide: GiftCodeTemplateRepository,
          useValue: GiftCodeTemplateRepositoryMock
        },
        ...mockedServiceProviders
      ],
    }).compile();

    giftCodeTemplateService = module.get<GiftCodeTemplateService>(GiftCodeTemplateService);
  });

  const templateMock = {

      isActive: true,
      androidProductId: "android_product_id",
      iosProductId: "ios_product_id",
      accessLevel: "PREMIUM",
      websiteProductId: "website_product_id",
      name: "3_months_template",
      months: 3,
  }
  describe('getActiveTemplates', () => {
    let createSpy: jest.SpyInstance;
    let getGiftCodeTemplatesMock: jest.SpyInstance<any, any>;


    beforeEach(() => {
      getGiftCodeTemplatesMock = jest.spyOn(GiftCodeTemplateRepositoryMock, 'getActiveCodeTemplates').mockResolvedValue([templateMock])
    });

    it('should return list of templates', async () => {
      const result = await giftCodeTemplateService.getActiveTemplates();
      expect(result).toMatchObject([templateMock])
    });

    afterAll(() => {
      createSpy.mockClear()
      getGiftCodeTemplatesMock.mockClear()
    })
  });

  describe('get', () => {
    let createSpy: jest.SpyInstance;
    let getGiftCodeTemplatesMock: jest.SpyInstance<any, any>;


    beforeEach(() => {
      getGiftCodeTemplatesMock = jest.spyOn(GiftCodeTemplateRepositoryMock, 'get').mockResolvedValue(templateMock)
    });

    it('should return code template', async () => {
      const result = await giftCodeTemplateService.get("id");
      expect(result).toMatchObject(templateMock)
    });

    afterAll(() => {
      createSpy.mockClear()
      getGiftCodeTemplatesMock.mockClear()
    })
  });
});