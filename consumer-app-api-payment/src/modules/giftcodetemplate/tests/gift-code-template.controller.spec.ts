import { Connection } from "mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { mockedServiceProviders } from "../../../utils/mocks/client-proxy";
import { GiftCodeTemplateController } from "../gift-code-template.controller";
import { GiftCodeTemplateService } from "../gift-code-template.service";
import { GiftCodeTemplateRepository } from "../gift-code-template.repository";
import { GiftCodeTemplateServiceMock } from "./mocks/gift-code-template.service.mock";

describe('GiftCodeTemplateController', () => {
  let controller: GiftCodeTemplateController;
  let connection: Connection;
  let service: GiftCodeTemplateService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('DB_URI'),
          }),
          inject: [ConfigService],
        })
      ],
      controllers: [GiftCodeTemplateController],
      providers: [ {
        provide: GiftCodeTemplateRepository,
        useValue: GiftCodeTemplateServiceMock
        }, {
        provide: GiftCodeTemplateService,
        useValue: GiftCodeTemplateServiceMock
      },
        ...mockedServiceProviders],
    }).compile();

    controller = module.get<GiftCodeTemplateController>(GiftCodeTemplateController);
    service = module.get<GiftCodeTemplateService>(GiftCodeTemplateService);
    connection = await module.get(getConnectionToken());
  });

  afterAll(async () => {
    await connection.close();
  });

  afterEach(async () => {
    await connection.dropDatabase();
    jest.clearAllMocks();
  });

  const templateMock = {

    isActive: true,
    accessLevel: "PREMIUM",
    websiteProductId: "website_product_id",
    name: "3_months_template",
    months: 3,
  }

  const getTemplatePayloadMock = {
    params: {
      id: 'id'
    }
  }

  describe('getGiftCodeTemplates', () => {
    let createSpy: jest.SpyInstance;
    let getGiftCodeTemplatesMock: jest.SpyInstance<any, any>;


    beforeEach(() => {
      getGiftCodeTemplatesMock = jest.spyOn(GiftCodeTemplateServiceMock, 'getActiveTemplates').mockResolvedValue([templateMock])
    });

    it('should return list of templates', async () => {
      const result = await controller.getGiftCodeTemplates();
      expect(result).toMatchObject([templateMock])
    });

    afterAll(() => {
      createSpy.mockClear()
      getGiftCodeTemplatesMock.mockClear()
    })
  });

  describe('getGiftCodeTemplate', () => {
    let createSpy: jest.SpyInstance;
    let getGiftCodeTemplatesMock: jest.SpyInstance<any, any>;


    beforeEach(() => {
      getGiftCodeTemplatesMock = jest.spyOn(GiftCodeTemplateServiceMock, 'get').mockResolvedValue(templateMock)
    });

    it('should return template', async () => {
      const result = await controller.getGiftCodeTemplate(getTemplatePayloadMock);
      expect(result).toMatchObject(templateMock)
    });

    afterAll(() => {
      createSpy.mockClear()
      getGiftCodeTemplatesMock.mockClear()
    })
  });
});
