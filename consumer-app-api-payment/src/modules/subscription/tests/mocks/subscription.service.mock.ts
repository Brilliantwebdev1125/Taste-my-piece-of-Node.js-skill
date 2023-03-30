export class SubscriptionServiceMock {

  static getByUser = jest.fn().mockResolvedValue({});
  static get = jest.fn().mockResolvedValue({});
  static createSubscription = jest.fn().mockResolvedValue({});
  static updateSubscription = jest.fn().mockResolvedValue({});
  static useGiftCode = jest.fn().mockResolvedValue({});
}