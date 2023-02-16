import { SplunkPlatform } from './SplunkPlatform';

describe('SplunkPlatform background tests', () => {
  let platform: any;

  class Platform extends SplunkPlatform {
    checkValue(value: string): boolean {
      return super.checkValue(value);
    }
  }

  beforeEach(() => {
    platform = new Platform();
  });

  test('checkValue test', () => {
    expect(platform.checkValue('-')).toEqual(false);
    expect(platform.checkValue('')).toEqual(false);
    expect(platform.checkValue(' ')).toEqual(true);
  });
});