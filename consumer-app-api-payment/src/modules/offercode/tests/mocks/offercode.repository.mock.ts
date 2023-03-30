export class OfferCodeRepositoryMock {
  static save = jest.fn().mockResolvedValue({});
  static getByCode = jest.fn().mockResolvedValue({});
  static getByAndroidSubscription = jest.fn().mockResolvedValue({});
  static getAll = jest.fn().mockResolvedValue({});
  static update = jest.fn().mockResolvedValue({});
}