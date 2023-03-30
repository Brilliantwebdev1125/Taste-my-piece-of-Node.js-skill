import { Test, TestingModule } from "@nestjs/testing";
import { OfferCodeService } from "../offercode.service";
import { mockedServiceProviders, MockedUserServiceClientProxy } from "../../../utils/mocks/client-proxy";
import { OfferCodeRepository } from "../offercode.repository";
import { OfferCodeRepositoryMock } from "./mocks/offercode.repository.mock";

describe('OfferCodeService', () => {
  let offerCodeService: OfferCodeService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OfferCodeService,
        {
          provide: OfferCodeRepository,
          useValue: OfferCodeRepositoryMock
        },
        ...mockedServiceProviders
      ],
    }).compile();

    offerCodeService = module.get<OfferCodeService>(OfferCodeService);
  });

  const offerCode = {
    code: "TestCode",
    expirationDate: new Date(),
    isActive: true,
    users: []
  }
  describe('create', () => {
    let createSpy: jest.SpyInstance;
    let saveMock: jest.SpyInstance<any, any>;
    let getMock: jest.SpyInstance<any, any>;


    beforeEach(() => {

      saveMock = jest.spyOn(OfferCodeRepositoryMock, 'save').mockResolvedValue(offerCode)
      getMock = jest.spyOn(OfferCodeRepositoryMock, 'getByCode').mockResolvedValue(null)
    });

    it('should execute save and getByCode methods', async () => {
      const result = await offerCodeService.create(offerCode);
      expect(saveMock).toBeCalled()
      expect(getMock).toBeCalled()

      expect(result).toMatchObject(offerCode);
    });

    afterAll(() => {
      createSpy.mockClear()
    })
  });

  describe('validateAndroidOfferCode', () => {
    let createSpy: jest.SpyInstance;
    let updateMock: jest.SpyInstance<any, any>;
    let getMock: jest.SpyInstance<any, any>;


    beforeEach(() => {

      updateMock = jest.spyOn(OfferCodeRepositoryMock, 'update').mockResolvedValue(offerCode)
      getMock = jest.spyOn(OfferCodeRepositoryMock, 'getByCode').mockResolvedValue(offerCode)
    });

    it('should execute save and getByCode methods', async () => {
      const result = await offerCodeService.validateAndroidOfferCode('test', 'test');
      expect(updateMock).toBeCalled()
      expect(getMock).toBeCalled()
      expect(result).toMatchObject(offerCode);
    });

    afterAll(() => {
      createSpy.mockClear()
    })
  });

  describe('activateAndroidOfferCode', () => {
    let createSpy: jest.SpyInstance;
    let updateMock: jest.SpyInstance<any, any>;
    let getByAndroidSubscriptionMock: jest.SpyInstance<any, any>;


    beforeEach(() => {

      updateMock = jest.spyOn(OfferCodeRepositoryMock, 'update').mockResolvedValue(offerCode)
      getByAndroidSubscriptionMock = jest.spyOn(OfferCodeRepositoryMock, 'getByAndroidSubscription').mockResolvedValue(offerCode)
    });

    it('should execute update and getByAndroidSubscription methods', async () => {
      const result = await offerCodeService.activateAndroidOfferCode('test', 'test');
      expect(updateMock).toBeCalled()
      expect(getByAndroidSubscriptionMock).toBeCalled()
      expect(result).toMatchObject(offerCode);
    });

    afterAll(() => {
      createSpy.mockClear()
    })
  });

  describe('deactivateAndroidOfferCode', () => {
    let createSpy: jest.SpyInstance;
    let updateMock: jest.SpyInstance<any, any>;
    let getByAndroidSubscriptionMock: jest.SpyInstance<any, any>;


    beforeEach(() => {

      updateMock = jest.spyOn(OfferCodeRepositoryMock, 'update').mockResolvedValue(offerCode)
      getByAndroidSubscriptionMock = jest.spyOn(OfferCodeRepositoryMock, 'getByAndroidSubscription').mockResolvedValue(offerCode)
    });

    it('should execute update and getByAndroidSubscription methods', async () => {
      const result = await offerCodeService.deactivateAndroidOfferCode('test', 'test');
      expect(updateMock).toBeCalled()
      expect(getByAndroidSubscriptionMock).toBeCalled()
      expect(result).toMatchObject(offerCode);
    });

    afterAll(() => {
      createSpy.mockClear()
    })
  });
});