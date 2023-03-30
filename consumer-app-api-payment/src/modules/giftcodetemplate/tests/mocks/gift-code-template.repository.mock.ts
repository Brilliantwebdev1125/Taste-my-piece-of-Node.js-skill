export class GiftCodeTemplateRepositoryMock {

  static save = jest.fn().mockResolvedValue({});
  static getActiveCodeTemplates = jest.fn().mockResolvedValue({});
  static get = jest.fn().mockResolvedValue({});
}