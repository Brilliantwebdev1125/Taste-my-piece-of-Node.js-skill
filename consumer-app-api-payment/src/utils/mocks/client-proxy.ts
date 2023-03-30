export default class MockedClientProxy {
  static send = jest.fn()
}

export class MockedUserServiceClientProxy extends MockedClientProxy {}
export class MockedMailServiceClientProxy extends MockedClientProxy {}

const services = {
  'USER_SERVICE': MockedUserServiceClientProxy,
  'MAIL_SERVICE': MockedMailServiceClientProxy,
}

const mockedServiceProviders = Object.entries(services).map((entry) => {
  const [key, value] = entry;
  return { provide: key, useValue: value}
});

export { mockedServiceProviders }
