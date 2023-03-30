import { Connection } from "mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { mockedServiceProviders } from "../../../utils/mocks/client-proxy";
import { GiftCodeController } from "../gift-code.controller";
import { GiftCodeService } from "../gift-code.service";
import { GiftCodeServiceMock } from "./mocks/gift-code.service.mock";
import { GiftCodeRepository } from "../gift-code.repository";
import { GiftCodeRepositoryMock } from "./mocks/gift-code.repository.mock";
import { giftCode, bulkCreateCodesMock } from "./models/gift-code.mock";
import { SubscriptionModule } from "../../subscription/subscription.module";

describe('GiftCodeController', () => {
  let controller: GiftCodeController;
  let connection: Connection;

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
        }),
        SubscriptionModule
      ],
      controllers: [GiftCodeController],
      providers: [{
        provide: GiftCodeService,
        useValue: GiftCodeServiceMock
      },
        {
          provide: GiftCodeRepository,
          useValue: GiftCodeRepositoryMock
        },
        ...mockedServiceProviders],
    }).compile();

    controller = module.get<GiftCodeController>(GiftCodeController);
    connection = await module.get(getConnectionToken());
  });

  afterAll(async () => {
    await connection.close();
  });

  afterEach(async () => {
    await connection.dropDatabase();
    jest.clearAllMocks();
  });

  describe('createGiftCode', () => {
    let sendMock;
    let createGiftCodeMock: jest.SpyInstance<any, any>;

    beforeEach(() => {
      createGiftCodeMock = jest.spyOn(GiftCodeServiceMock, 'createGiftCode').mockResolvedValue(giftCode);
    });

    it('should gift code be created', async () => {
      const result = await controller.createGiftCode({
        body: { template: "template", buyerEmail: "test", receiverEmail: "test"}
      });
      expect(result).toMatchObject(giftCode)
    });
  });

  describe('redeemCode', () => {
    let sendMock;
    let createGiftCodeMock: jest.SpyInstance<any, any>;

    beforeEach(() => {
      createGiftCodeMock = jest.spyOn(GiftCodeServiceMock, 'redeemCode').mockResolvedValue(giftCode);
    });

    it('gift code should be redeemed', async () => {
      const result = await controller.redeemGiftCode({
        body: { code: "code" },
        params: {id: 'test'}
      });
      expect(result).toMatchObject(giftCode)
    });
  });

  describe('bulkCreate', () => {
    let bulkCreateMock: jest.SpyInstance<any, any>;

    beforeEach(() => {
      bulkCreateMock = jest.spyOn(GiftCodeServiceMock, 'bulkCreate').mockResolvedValue(bulkCreateCodesMock);
    });

    it('should gift codes be created', async () => {
      const result = await controller.bulkGiftCodeGenerate({
        body: {
          templateId: "template",
          buyerEmail: "test",
          receivers: [
            "test1@gmail.com",
            "test2@gmail.com"
          ]
        }
      });
      expect(result).toMatchObject(bulkCreateCodesMock)
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
