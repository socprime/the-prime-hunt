import { MicrosoftDefenderPlatform } from './MicrosoftDefenderPlatform';

describe('MicrosoftDefenderPlatform background tests', () => {
  let platform: any;

  class Platform extends MicrosoftDefenderPlatform {
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
