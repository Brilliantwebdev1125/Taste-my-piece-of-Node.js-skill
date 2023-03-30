export class HttpServiceMock {
  static get = jest.fn().mockResolvedValue({});
  static post = jest.fn().mockResolvedValue({});
}