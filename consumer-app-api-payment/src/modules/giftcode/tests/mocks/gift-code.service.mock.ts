export class GiftCodeServiceMock {

  static sendEmailWithCode = jest.fn().mockResolvedValue({});
  static createGiftCode = jest.fn().mockResolvedValue({});
  static bulkCreate = jest.fn().mockResolvedValue({});
  static activateGiftCode = jest.fn().mockResolvedValue({});
  static redeemCode = jest.fn().mockResolvedValue({});

}