export class AdaptyServiceMock {
  static getProfile = jest.fn().mockResolvedValue({});
  static setAccessLevel = jest.fn().mockResolvedValue({});
  static editProfile = jest.fn().mockResolvedValue({});

}
