import * as RandExp from 'randexp';

export class Util {

  static generateCodeString(symbols: number): String {
    return new RandExp(/^[0-9A-Z]{6}$/).gen();
  }
}