export class GiftCodeRepositoryMock {

  static save = jest.fn().mockResolvedValue({});
  static getByCode = jest.fn().mockResolvedValue({});
  static getById = jest.fn().mockResolvedValue({});
  static getAll = jest.fn().mockResolvedValue({});
  static update = jest.fn().mockResolvedValue({});
}