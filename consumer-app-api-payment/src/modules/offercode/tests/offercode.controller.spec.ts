import { Connection } from "mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { getConnectionToken, MongooseModule } from "@nestjs/mongoose";
import { mockedServiceProviders } from "../../../utils/mocks/client-proxy";
import { OfferCodeController } from "../offercode.controller";
import { OfferCodeService } from "../offercode.service";
import { OfferCodeRepository } from "../offercode.repository";
import { OfferCodeServiceMock } from "./mocks/offercode.service.mock";
import { OfferCodeRepositoryMock } from "./mocks/offercode.repository.mock";

describe('OfferCodeController', () => {
  let controller: OfferCodeController;
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
        })
      ],
      controllers: [OfferCodeController],
      providers: [        {
        provide: OfferCodeRepository,
        useValue: OfferCodeRepositoryMock
      },
      {
        provide: OfferCodeService,
        useValue: OfferCodeServiceMock
      },
        ...mockedServiceProviders],
    }).compile();

    controller = module.get<OfferCodeController>(OfferCodeController);
    connection = await module.get(getConnectionToken());
  });

  afterAll(async () => {
    await connection.close();
  });

  afterEach(async () => {
    await connection.dropDatabase();
    jest.clearAllMocks();
  });

  describe('createAndroidOfferCode', () => {
    let sendMock;
    let createAndroidOfferCodeMock: jest.SpyInstance<any, any>;

    beforeEach(() => {
      createAndroidOfferCodeMock = jest.spyOn(OfferCodeServiceMock, 'create').mockResolvedValue({});
    });

    it('should non_subscription_purchase be invoked', async () => {
      await controller.createAndroidOfferCode({
        body: { code: 'test', expirationDate: new Date() },
        params: {id: 'test'}
      });
      expect(createAndroidOfferCodeMock).toBeCalled()
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

});