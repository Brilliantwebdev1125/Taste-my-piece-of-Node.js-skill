export class WebhookServiceMock {

  static subscription_initial_purchase = jest.fn().mockResolvedValue({});
  static subscription_cancelled = jest.fn().mockResolvedValue({});
  static subscription_renewed = jest.fn().mockResolvedValue({});
  static trial_started = jest.fn().mockResolvedValue({});
  static trial_cancelled = jest.fn().mockResolvedValue({});
  static subscription_refunded = jest.fn().mockResolvedValue({});
  static redirectOnStage = jest.fn().mockResolvedValue({});
}
