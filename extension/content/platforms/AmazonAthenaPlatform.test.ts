import { AmazonAthenaPlatform } from './AmazonAthenaPlatform';
import { ContentPlatform } from '../types/types-content-common';
import { NormalizedParsedResources } from '../../app/resources/resources-types';
import { getMockedResourcesData } from '../../tests/mocks';

describe('AmazonAthenaPlatform content test', () => {
  let platform: ContentPlatform;
  let mockedResourceData: NormalizedParsedResources;

  beforeEach(() => {
    platform = new AmazonAthenaPlatform();
    mockedResourceData = (() => {
      const mockedData = getMockedResourcesData();
      return {
        Accounts: mockedData.Accounts.test0,
        Assets: mockedData.Assets.test5,
      } as NormalizedParsedResources;
    })();
  });

  test('buildQueryParts include test', () => {
    let result = platform.buildQueryParts('include', mockedResourceData);
    expect(result)
      .toEqual('Accounts = \'account1\' OR Accounts = 2 OR Accounts = \'test2\' OR Accounts = 4 OR Accounts = \'test\\domain.com\' OR Accounts = \'"process.exe" -a -g https://some.site/some-page\' OR Assets = \'asset1\' OR Assets = 2 OR Assets = \'test2\' OR Assets = 4');

    result = platform.buildQueryParts('include', mockedResourceData, true);
    expect(result)
      .toEqual('where Accounts = \'account1\' OR Accounts = 2 OR Accounts = \'test2\' OR Accounts = 4 OR Accounts = \'test\\domain.com\' OR Accounts = \'"process.exe" -a -g https://some.site/some-page\' OR Assets = \'asset1\' OR Assets = 2 OR Assets = \'test2\' OR Assets = 4');
  });

  test('buildQueryParts exclude test', () => {
    let result = platform.buildQueryParts('include', mockedResourceData);
    expect(result)
      .toEqual('Accounts = \'account1\' OR Accounts = 2 OR Accounts = \'test2\' OR Accounts = 4 OR Accounts = \'test\\domain.com\' OR Accounts = \'"process.exe" -a -g https://some.site/some-page\' OR Assets = \'asset1\' OR Assets = 2 OR Assets = \'test2\' OR Assets = 4');

    result = platform.buildQueryParts('include', mockedResourceData, true);
    expect(result)
      .toEqual('where Accounts = \'account1\' OR Accounts = 2 OR Accounts = \'test2\' OR Accounts = 4 OR Accounts = \'test\\domain.com\' OR Accounts = \'"process.exe" -a -g https://some.site/some-page\' OR Assets = \'asset1\' OR Assets = 2 OR Assets = \'test2\' OR Assets = 4');
  });

  test('buildQueryParts show all test', () => {
    let result = platform.buildQueryParts('show all', mockedResourceData);
    expect(result)
      .toEqual('Accounts = \'account1\' OR Accounts = 2 OR Accounts = \'test2\' OR Accounts = 4 OR Accounts = \'test\\domain.com\' OR Accounts = \'"process.exe" -a -g https://some.site/some-page\' OR Assets = \'asset1\' OR Assets = 2 OR Assets = \'test2\' OR Assets = 4');

    result = platform.buildQueryParts('show all', mockedResourceData, true);
    expect(result)
      .toEqual('where Accounts = \'account1\' OR Accounts = 2 OR Accounts = \'test2\' OR Accounts = 4 OR Accounts = \'test\\domain.com\' OR Accounts = \'"process.exe" -a -g https://some.site/some-page\' OR Assets = \'asset1\' OR Assets = 2 OR Assets = \'test2\' OR Assets = 4');
  });
});
