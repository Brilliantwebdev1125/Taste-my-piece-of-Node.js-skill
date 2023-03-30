export class OfferCodeServiceMock {
  static activateAndroidOfferCode = jest.fn().mockResolvedValue({});
  static deactivateAndroidOfferCode = jest.fn().mockResolvedValue({});
  static create = jest.fn().mockResolvedValue({});
  static update = jest.fn().mockResolvedValue({});
  static validateAndroidOfferCode = jest.fn().mockResolvedValue({});
}
