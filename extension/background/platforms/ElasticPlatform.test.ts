import { ElasticPlatform } from './ElasticPlatform';

describe('ElasticPlatform background tests', () => {
  let platform: any;

  class Platform extends ElasticPlatform {
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